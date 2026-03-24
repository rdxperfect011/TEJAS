import os
import time
import requests
import re
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")

# Load API Key (Checking both names just in case)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_API_KEY")

def fetch_with_retry(url, retries=2, timeout=10):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    for attempt in range(retries + 1):
        try:
            res = requests.get(url, headers=headers, timeout=timeout)
            res.raise_for_status()
            return res.text
        except requests.RequestException as e:
            if attempt == retries:
                print(f"Failed to fetch {url} after {retries} retries: {e}")
                return None
            time.sleep(1)

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
    
    # Keyword map
    target_urls = set()
    keyword_map = {
        "result": ["https://jkbote.ac.in/noticeResult.php"],
        "exam": ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
        "datesheet": ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
        "semester": ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/notice.php"],
        "college": ["https://jkbote.ac.in/colleges.php"],
        "institute": ["https://jkbote.ac.in/colleges.php"],
        "diploma": ["https://jkbote.ac.in/Diploma.php"],
        "course": ["https://jkbote.ac.in/Diploma.php"],
        "syllabus": ["https://jkbote.ac.in/Diploma.php"],
        "about": ["https://jkbote.ac.in/about.php"],
        "secretary": ["https://jkbote.ac.in/about.php"],
        "director": ["https://jkbote.ac.in/about.php"],
        "contact": ["https://jkbote.ac.in/contact.php"],
        "notice": ["https://jkbote.ac.in/notice.php"],
        "notification": ["https://jkbote.ac.in/notice.php"],
        "admission": ["https://jkbote.ac.in/notice.php"],
        "latest": ["https://jkbote.ac.in/notice.php"],
        "calendar": ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
        "academic": ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
        "schedule": ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/noticeExam.php"],
        "timeline": ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/noticeExam.php"]
    }
    
    query = last_user_message
    for key, urls in keyword_map.items():
        if key in query:
            target_urls.update(urls)
            
    if not target_urls:
        target_urls.add("https://jkbote.ac.in/notice.php")

    all_links = []
    seen_urls = set()

    # Limit to 3 pages to avoid too long processing
    for url in list(target_urls)[:3]:
        html = fetch_with_retry(url)
        if html:
            soup = BeautifulSoup(html, "html.parser")
            for a in soup.find_all("a", href=True):
                href = urljoin(url, a["href"])
                text = a.text.replace("(NEW)", "").strip()
                
                # JKBOTE links only
                if "jkbote.ac.in" not in href.lower():
                    continue
                
                if len(text) > 8 and href not in seen_urls and not href.startswith(("javascript:", "mailto:", "tel:")):
                    all_links.append({"text": text, "href": href})
                    seen_urls.add(href)

    query_words = set(re.findall(r'\w+', query.lower()))
    
    def score_link(link):
        link_text_lower = link["text"].lower()
        score = 0
        for w in query_words:
            if w in link_text_lower and len(w) > 2:
                score += 1
        return score
    
    all_links.sort(key=score_link, reverse=True)
    top_links = all_links[:10]
    
    latest_notifications_str = "\n".join([f'- [{lnk["text"]}]({lnk["href"]})' for lnk in top_links])

    contents = []
    for msg in messages:
        role = "model" if msg.get("role") == "ai" else "user"
        if "text" in msg:
            contents.append({"role": role, "parts": [{"text": msg["text"]}]})

    system_instruction = (
        "You are TEJAS, JKBOTE assistant.\n\n"
        "You must ONLY use JKBOTE website data.\n\n"
        "If exact answer is not available:\n"
        "- Analyze previous notices\n"
        "- Infer approximate timing (like MJ = May-June, ND = Nov-Dec)\n\n"
        "Always give:\n"
        "1. A short helpful answer (can include estimated timing)\n"
        "2. Sources with JKBOTE links formatted strictly as markdown hyperlinks: [Link Text](URL)\n\n"
        "Do NOT use external websites.\n"
        "Do NOT say 'not found' unless there are zero links."
    )
    if latest_notifications_str:
        system_instruction += f"\n\nHere is the scraped data:\n{latest_notifications_str}"

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
    app.run(debug=True, port=5010)
