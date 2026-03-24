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

    # ----------------------------------------------------------------
    # JKBOTE Site Structure (March 2026 crawl)
    # ----------------------------------------------------------------
    # Main pages:
    #   https://jkbote.ac.in/                    - Homepage / What's New
    #   https://jkbote.ac.in/about.php           - About: Introduction, Fee Structure, Board Members,
    #                                              Mission & Vision, Examination Rules, Org Structure
    #   https://jkbote.ac.in/about.php#fee       - Fee Structure (anchor)
    #   https://jkbote.ac.in/about.php#mm        - Board Members (anchor)
    #   https://jkbote.ac.in/about.php#tt        - Mission & Vision (anchor)
    #   https://jkbote.ac.in/about.php#er        - Examination Rules (anchor)
    #   https://jkbote.ac.in/honorBoard.php      - Honor Board
    #   https://jkbote.ac.in/notice.php          - All Notifications
    #   https://jkbote.ac.in/noticeResult.php    - Result Notifications only
    #   https://jkbote.ac.in/noticeExam.php      - Examination Notifications only
    #   https://jkbote.ac.in/noticeDatesheet.php - Datesheet Notifications only
    #   https://jkbote.ac.in/colleges.php        - List of Polytechnic Colleges
    #   https://jkbote.ac.in/Diploma.php         - Diploma Courses Offered
    #   https://jkbote.ac.in/RTI.php             - RTI (Right to Information)
    #   https://jkbote.ac.in/Committee.php       - Committees
    #   https://jkbote.ac.in/contact.php         - Contact Us / Who's Who
    #   https://jkbote.ac.in/feedback.php        - Feedback
    #   https://jkbote.ac.in/workpro.php         - Working Professionals (Polytechnic)
    #   https://jkbote.ac.in/Migration/          - Migration (for 3-year Diploma pass-outs)
    #   https://jkbote.ac.in/prereg/             - Pre-Registration for Upcoming Admission 2026
    #   https://jkbote.ac.in/AC.pdf              - Examination Calendar PDF
    # Syllabus PDFs:
    #   1st Sem: https://jkbote.ac.in/NEP-FIRST.pdf
    #   2nd Sem: https://jkbote.ac.in/2nd_Semester_Curriculum.pdf
    #   3rd Sem: https://jkbote.ac.in/3rdSemester.pdf
    #   4th Sem: https://jkbote.ac.in/4thSemester.pdf
    #   5th Sem: https://jkbote.ac.in/5thSemester.pdf
    #   6th Sem: https://jkbote.ac.in/6thSemester.pdf
    # Portals / Sub-domains:
    #   Polytechnic Exam Portal: https://examination.jkbote.ac.in/indexPolytechnic.php
    #   Result (NEP): https://examination.jkbote.ac.in/resulthomenep.php
    #   Result (NEW): https://examination.jkbote.ac.in/resulthome.php
    #   ITI Examination/Registration: https://itiexamination.jkbote.ac.in/
    #   ITI Result: https://itiexamination.jkbote.ac.in/ResultHome.php
    #   Board Registration: https://registration.jkbote.ac.in/
    #   Staff Login (Polytechnic): https://institute.jkbote.ac.in/
    #   Staff Login (ITI): https://iti.jkbote.ac.in/
    #   Help/Tickets: https://help.jkbote.ac.in/
    # Fee Payment: https://pages.razorpay.com/pl_ODQaumm5UoxmrH/view
    # Office Addresses:
    #   Central: Old Secretariat Block A 1st Floor / Block C 2nd Floor, Srinagar 190001
    #   Kashmir Div: Old Secretariat Block B Ground Floor, Srinagar 190001
    #   Jammu Div: Govt Polytechnic College, Bikram Chowk, Jammu 180004
    # Phone: 0191-2430650  Email: jkbote2002@gmail.com
    # ----------------------------------------------------------------

    target_urls = set()
    keyword_map = {
        # Results
        "result":           ["https://jkbote.ac.in/noticeResult.php"],
        "gazette":          ["https://jkbote.ac.in/noticeResult.php"],
        "reevaluation":     ["https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeExam.php"],
        "revaluation":      ["https://jkbote.ac.in/noticeResult.php"],
        "marks":            ["https://jkbote.ac.in/noticeResult.php"],
        "pass":             ["https://jkbote.ac.in/noticeResult.php"],
        "fail":             ["https://jkbote.ac.in/noticeResult.php"],
        # Exams
        "exam":             ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
        "examination":      ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
        "registration":     ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
        "form":             ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
        "lateral":          ["https://jkbote.ac.in/noticeExam.php"],
        "practical":        ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/noticeExam.php"],
        "theory":           ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/noticeExam.php"],
        # Datesheets / Schedules
        "datesheet":        ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
        "date sheet":       ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
        "schedule":         ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/noticeExam.php"],
        "timetable":        ["https://jkbote.ac.in/noticeDatesheet.php"],
        "time table":       ["https://jkbote.ac.in/noticeDatesheet.php"],
        "calendar":         ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
        "academic calendar":["https://jkbote.ac.in/AC.pdf", "https://jkbote.ac.in/noticeDatesheet.php"],
        "timeline":         ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/noticeExam.php"],
        "ac.pdf":           ["https://jkbote.ac.in/AC.pdf"],
        # Semester-specific
        "semester":         ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/notice.php"],
        "1st":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        "2nd":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        "3rd":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        "4th":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        "5th":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        "6th":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        # Academics / Syllabus
        "syllabus":         ["https://jkbote.ac.in/Diploma.php", "https://jkbote.ac.in/about.php"],
        "curriculum":       ["https://jkbote.ac.in/Diploma.php"],
        "course":           ["https://jkbote.ac.in/Diploma.php"],
        "diploma":          ["https://jkbote.ac.in/Diploma.php", "https://jkbote.ac.in/noticeExam.php"],
        "nep":              ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        "new scheme":       ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
        # Admission
        "admission":        ["https://jkbote.ac.in/notice.php", "https://jkbote.ac.in/prereg/"],
        "pre-registration": ["https://jkbote.ac.in/prereg/"],
        "pre registration": ["https://jkbote.ac.in/prereg/"],
        "2026":             ["https://jkbote.ac.in/notice.php", "https://jkbote.ac.in/prereg/"],
        "readmission":      ["https://jkbote.ac.in/notice.php"],
        "re-admission":     ["https://jkbote.ac.in/notice.php"],
        # Colleges / Institutes
        "college":          ["https://jkbote.ac.in/colleges.php"],
        "polytechnic":      ["https://jkbote.ac.in/colleges.php", "https://jkbote.ac.in/noticeExam.php"],
        "institute":        ["https://jkbote.ac.in/colleges.php"],
        "iti":              ["https://jkbote.ac.in/notice.php"],
        "scvt":             ["https://jkbote.ac.in/notice.php"],
        "migration":        ["https://jkbote.ac.in/Migration/"],
        "working professional": ["https://jkbote.ac.in/workpro.php"],
        # Org / About
        "about":            ["https://jkbote.ac.in/about.php"],
        "introduction":     ["https://jkbote.ac.in/about.php"],
        "history":          ["https://jkbote.ac.in/about.php"],
        "mission":          ["https://jkbote.ac.in/about.php"],
        "vision":           ["https://jkbote.ac.in/about.php"],
        "board member":     ["https://jkbote.ac.in/about.php"],
        "secretary":        ["https://jkbote.ac.in/about.php"],
        "director":         ["https://jkbote.ac.in/about.php"],
        "chairman":         ["https://jkbote.ac.in/about.php"],
        "honor":            ["https://jkbote.ac.in/honorBoard.php"],
        "honour":           ["https://jkbote.ac.in/honorBoard.php"],
        "rti":              ["https://jkbote.ac.in/RTI.php"],
        "committee":        ["https://jkbote.ac.in/Committee.php"],
        "fee":              ["https://jkbote.ac.in/about.php"],
        "fee structure":    ["https://jkbote.ac.in/about.php"],
        "pay":              ["https://jkbote.ac.in/about.php"],
        # Contact
        "contact":          ["https://jkbote.ac.in/contact.php"],
        "address":          ["https://jkbote.ac.in/contact.php"],
        "phone":            ["https://jkbote.ac.in/contact.php"],
        "email":            ["https://jkbote.ac.in/contact.php"],
        "helpdesk":         ["https://jkbote.ac.in/contact.php"],
        "grievance":        ["https://jkbote.ac.in/contact.php"],
        "feedback":         ["https://jkbote.ac.in/feedback.php"],
        # Catch-all / latest
        "notice":           ["https://jkbote.ac.in/notice.php"],
        "notification":     ["https://jkbote.ac.in/notice.php"],
        "latest":           ["https://jkbote.ac.in/notice.php"],
        "new":              ["https://jkbote.ac.in/notice.php"],
        "update":           ["https://jkbote.ac.in/notice.php"],
        "academic":         ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/notice.php"],
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
                
                # JKBOTE domain links only (main site + sub-domains)
                is_jkbote = (
                    "jkbote.ac.in" in href.lower() or
                    "jksbotelive.com" in href.lower()
                )
                if not is_jkbote:
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

    # Build the known-URL reference block for the system prompt
    site_directory = """
JKBOTE OFFICIAL SITE DIRECTORY (jkbote.ac.in) — use these exact URLs when citing sources:
• Homepage / What's New notices   : https://jkbote.ac.in/
• All Notifications               : https://jkbote.ac.in/notice.php
• Result Notifications            : https://jkbote.ac.in/noticeResult.php
• Examination Notifications       : https://jkbote.ac.in/noticeExam.php
• Datesheet Notifications         : https://jkbote.ac.in/noticeDatesheet.php
• Examination Calendar PDF        : https://jkbote.ac.in/AC.pdf
• About / Introduction            : https://jkbote.ac.in/about.php
• Fee Structure                   : https://jkbote.ac.in/about.php#fee
• Board Members                   : https://jkbote.ac.in/about.php#mm
• Mission & Vision                : https://jkbote.ac.in/about.php#tt
• Examination Rules               : https://jkbote.ac.in/about.php#er
• Honor Board                     : https://jkbote.ac.in/honorBoard.php
• RTI                             : https://jkbote.ac.in/RTI.php
• Committees                      : https://jkbote.ac.in/Committee.php
• List of Polytechnic Colleges    : https://jkbote.ac.in/colleges.php
• Diploma Courses                 : https://jkbote.ac.in/Diploma.php
• Working Professional (Polytechnic): https://jkbote.ac.in/workpro.php
• Migration (3-year Diploma)      : https://jkbote.ac.in/Migration/
• Pre-Registration 2026 Admission : https://jkbote.ac.in/prereg/
• Contact / Who's Who             : https://jkbote.ac.in/contact.php
• Feedback                        : https://jkbote.ac.in/feedback.php
• Help / Raise a Ticket           : https://help.jkbote.ac.in/
• Fee Payment (Readmission etc.)  : https://pages.razorpay.com/pl_ODQaumm5UoxmrH/view
• Polytechnic Examination Portal  : https://examination.jkbote.ac.in/indexPolytechnic.php
• Results — NEP Scheme            : https://examination.jkbote.ac.in/resulthomenep.php
• Results — NEW Scheme            : https://examination.jkbote.ac.in/resulthome.php
• ITI Registration & Exam Portal  : https://itiexamination.jkbote.ac.in/
• ITI Results                     : https://itiexamination.jkbote.ac.in/ResultHome.php
• Board Registration              : https://registration.jkbote.ac.in/
• Syllabus 1st Sem (NEP)          : https://jkbote.ac.in/NEP-FIRST.pdf
• Syllabus 2nd Sem                : https://jkbote.ac.in/2nd_Semester_Curriculum.pdf
• Syllabus 3rd Sem                : https://jkbote.ac.in/3rdSemester.pdf
• Syllabus 4th Sem                : https://jkbote.ac.in/4thSemester.pdf
• Syllabus 5th Sem                : https://jkbote.ac.in/5thSemester.pdf
• Syllabus 6th Sem                : https://jkbote.ac.in/6thSemester.pdf
Office: Central — Old Secretariat Block A/C, Srinagar 190001 | Jammu Div — Bikram Chowk, Jammu 180004
Phone: 0191-2430650 | Email: jkbote2002@gmail.com
"""

    system_instruction = (
        "You are TEJAS, the official AI assistant for JKBOTE (Jammu & Kashmir Board of Technical Education).\n\n"
        + site_directory + "\n"
        "STRICT RULES:\n"
        "1. Answer ONLY from official JKBOTE sources. Do NOT use general knowledge or make assumptions.\n"
        "2. If the query is broad (e.g. 'Academic Calendar', 'when will exam start'), summarise the most recent relevant dates/events from the scraped links below. Never say 'Not found' if relevant links exist.\n"
        "3. If a user asks for a specific document (syllabus, datesheet, result) and a matching link is in the scraped list, return that exact link directly.\n"
        "4. Prioritise the most recent notice/document when multiple exist.\n"
        "5. Be VERY SHORT — max 3-4 sentences. Mention exact event names and dates where available.\n"
        "6. Do NOT say 'check the website' or 'refer to document' — give the direct answer and link.\n\n"
        "ANSWER FORMAT:\n"
        "- Short direct answer.\n"
        "- ALWAYS end with: Source: [Title](URL) using an official jkbote.ac.in domain URL.\n"
        "- NEVER cite third-party sites (careers360, shiksha, scribd, etc.).\n\n"
        "FAILSAFE (use ONLY when zero relevant official content exists):\n"
        "\"This information is not currently available on the official JKBOTE website. Please visit https://jkbote.ac.in or call 0191-2430650.\""
    )
    if latest_notifications_str:
        system_instruction += f"\n\nRecent Official Scraped Links (answer directly from these; use Google Search only if these are insufficient):\n{latest_notifications_str}"

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    gemini_payload = {
        "contents": contents,
        "systemInstruction": {
            "role": "system",
            "parts": [{"text": system_instruction}]
        },
        "tools": [{"googleSearch": {}}]
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
