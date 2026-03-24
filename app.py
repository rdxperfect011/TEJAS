import os
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")

# Load API Key (Checking both names just in case)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_API_KEY")

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

@app.route("/api/chat", methods=["POST"])
def chat():
    if not GEMINI_API_KEY:
        return jsonify({"text": "Error: GEMINI_API_KEY is not set in your .env file."})

    data = request.json
    messages = data.get("messages", [])
    if not messages:
        return jsonify({"text": "No messages provided."})

    last_user_message = messages[-1].get("text", "").lower()
    
    # 1. Scrape JKBOTE if requested
    latest_notifications_str = ""
    keywords = ["notification", "notice", "admission", "result", "jkbote", "latest"]
    if any(keyword in last_user_message for keyword in keywords):
        try:
            res = requests.get("https://jkbote.ac.in/notice.php", timeout=5)
            soup = BeautifulSoup(res.text, "html.parser")
            links = []
            for a in soup.find_all("a", href=True):
                href = a["href"]
                if href.startswith("/"):
                    href = "https://jkbote.ac.in" + href
                text = a.text.replace("(NEW)", "").strip()
                if len(text) > 25 and "javascript:" not in href and "mailto:" not in href and "tel:" not in href:
                    links.append(f'Title: "{text}", URL: {href}')
            
            # Take top 25 links
            if links:
                latest_notifications_str = "LIVE DATA FROM JKBOTE.AC.IN/NOTICE.PHP: " + " | ".join(links[:25])
        except Exception as e:
            print("Scraping error:", e)

    # 2. Format payload for Gemini API
    contents = []
    for msg in messages:
        role = "model" if msg.get("role") == "ai" else "user"
        # We only pass text-based parts from history
        if "text" in msg:
            contents.append({"role": role, "parts": [{"text": msg["text"]}]})

    system_instruction = "You are TEJAS, a helpful virtual assistant for the JKBOTE portal."
    if latest_notifications_str:
        system_instruction += f" Here are the latest notifications dynamically scraped from the official site: {latest_notifications_str}. If the user asks for notifications, you MUST summarize them into a beautifully formatted bulleted list, AND you MUST ALWAYS wrap them in exact Markdown links like: [Notification Title](URL). Group them logically if possible."
    else:
        system_instruction += " Respond clearly and concisely."

    # 3. Call Gemini API using Raw Requests (simplest and avoids dependency conflicts)
    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    gemini_payload = {
        "contents": contents,
        "systemInstruction": {
            "role": "system",
            "parts": [{"text": system_instruction}]
        }
    }

    try:
        response = requests.post(gemini_url, json=gemini_payload, headers={"Content-Type": "application/json"})
        response.raise_for_status()
        data = response.json()
        
        if "candidates" in data and len(data["candidates"]) > 0:
            ai_text = data["candidates"][0]["content"]["parts"][0]["text"]
            return jsonify({"text": ai_text})
        else:
            return jsonify({"text": "I'm sorry, I couldn't generate a response."})
            
    except Exception as e:
        print("Gemini API Error:", e)
        return jsonify({"error": "Failed to connect to the Gemini API."})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
