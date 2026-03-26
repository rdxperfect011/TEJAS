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

def deduplicate_urls(text):
    """Remove duplicate URLs from AI response, keeping only the first occurrence."""
    seen = set()
    def replace_if_seen(m):
        url = m.group(0)
        if url in seen:
            return ''  # Remove this duplicate URL
        seen.add(url)
        return url
    return re.sub(r'https?://[^\s)>"]+', replace_if_seen, text)

def markdown_to_html(text):
    """Convert Gemini markdown output to safe HTML with clickable hyperlinks."""
    # 1. Escape raw < > to avoid XSS (but we add our own tags below)
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # 2. Convert **bold** and *italic*
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    # 3. Convert markdown links [title](url) → clickable <a> tags
    def replace_link(m):
        link_text = m.group(1)
        url = m.group(2)
        # Only allow http/https URLs
        if not url.startswith(("http://", "https://")):
            return m.group(0)
        return (
            f'<a href="{url}" target="_blank" rel="noopener noreferrer" '
            f'style="color:#0056b3;font-weight:600;text-decoration:underline;">'
            f'{link_text}</a>'
        )
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replace_link, text)
    # 4. Convert bare URLs that are NOT already inside an <a> tag
    text = re.sub(
        r'(?<!href=")(?<!")(https?://[^\s<>"]+)',
        lambda m: f'<a href="{m.group(1)}" target="_blank" rel="noopener noreferrer" '
                  f'style="color:#0056b3;font-weight:600;text-decoration:underline;">'
                  f'{m.group(1)}</a>',
        text
    )
    # 5. Convert bullet points (- item or * item)
    lines = text.split('\n')
    html_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('- ') or stripped.startswith('* '):
            html_lines.append(f'<li style="margin:2px 0;">{stripped[2:]}</li>')
        elif stripped == '':
            html_lines.append('<br>')
        else:
            html_lines.append(f'<p style="margin:4px 0;">{line}</p>')
    # Wrap consecutive <li> items in <ul>
    result = []
    i = 0
    while i < len(html_lines):
        if html_lines[i].startswith('<li'):
            result.append('<ul style="margin:4px 0 4px 16px;padding:0;">')
            while i < len(html_lines) and html_lines[i].startswith('<li'):
                result.append(html_lines[i])
                i += 1
            result.append('</ul>')
        else:
            result.append(html_lines[i])
            i += 1
    return ''.join(result)

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
        # Passing marks / grading / examination rules
        "passing":          ["https://jkbote.ac.in/about.php"],
        "grade":            ["https://jkbote.ac.in/about.php"],
        "grading":          ["https://jkbote.ac.in/about.php"],
        "marksheet":        ["https://examination.jkbote.ac.in/resulthomenep.php", "https://examination.jkbote.ac.in/resulthome.php"],
        "mark sheet":       ["https://examination.jkbote.ac.in/resulthomenep.php", "https://examination.jkbote.ac.in/resulthome.php"],
        "backlog":          ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
        "document":         ["https://jkbote.ac.in/prereg/", "https://jkbote.ac.in/notice.php"],
        "certificate":      ["https://jkbote.ac.in/about.php", "https://jkbote.ac.in/notice.php"],
        "merit":            ["https://jkbote.ac.in/notice.php", "https://jkbote.ac.in/prereg/"],
        "branch change":    ["https://jkbote.ac.in/notice.php"],
        "branch":           ["https://jkbote.ac.in/notice.php"],
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
                
                # Allow: JKBOTE domains + jksbotelive.com + Google Drive
                # (All datesheets/results are hosted as Google Drive PDFs)
                is_allowed = (
                    "jkbote.ac.in" in href.lower() or
                    "jksbotelive.com" in href.lower() or
                    "drive.google.com" in href.lower()
                )
                if not is_allowed:
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
    
    # If scraper found no links at all for a no-search query,
    # fall back to Google Search so Gemini still has something to work with.
    if not top_links and not use_google_search:
        use_google_search = True

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
    # ----------------------------------------------------------------
    # KNOWN_ANSWERS: queries where the FULL answer IS a single direct link.
    # These hardcode the response AND disable Google Search.
    # Sorted by SPECIFICITY (most specific phrases first).
    # ----------------------------------------------------------------
    KNOWN_ANSWERS = {
        # Admission documents (Most specific)
        ("documents", "document", "required", "needed", "polytechnic admission"): (
            "For JKBOTE Polytechnic admission, candidates typically need: 10th pass certificate & marksheet, "
            "category certificate (if applicable), domicile certificate, passport photos, and income certificate. "
            "Full details are published in the official admission notification.",
            "https://jkbote.ac.in/prereg/",
            "JKBOTE Pre-Registration & Admission 2026"
        ),
        # Merit / Admission criteria
        ("merit", "selection criteria", "admission process"): (
            "JKBOTE Polytechnic admission is merit-based, using 10th class marks as the primary criterion. "
            "Candidates are selected through JKPET (J&K Polytechnic Entrance Test) or direct merit. "
            "Full merit criteria are published with each year's admission notification.",
            "https://jkbote.ac.in/prereg/",
            "JKBOTE Admission 2026 (Pre-Registration)"
        ),
        # Examination Rules / Passing marks / Grading
        ("passing marks", "pass marks", "minimum marks", "pass percentage",
         "fail marks", "what are passing", "how many marks to pass"): (
            "For JKBOTE Polytechnic diploma exams, passing criteria and grading rules are detailed in the official Examination Rules. "
            "Candidates must refer to the official Examination Rules document on the JKBOTE website for exact passing marks per subject.",
            "https://jkbote.ac.in/about.php#er",
            "JKBOTE Examination Rules & Guidelines"
        ),
        ("grading system", "grade system", "grade criteria", "grade point", "cgpa", "sgpa"): (
            "JKBOTE Polytechnic diploma grading is governed by the official Examination Rules. "
            "The grading and credit system details are available in the Examination Rules section on the JKBOTE website.",
            "https://jkbote.ac.in/about.php#er",
            "JKBOTE Examination Rules & Guidelines"
        ),
        # NEP 2020
        ("nep 2020", "national education policy", "new education policy"): (
            "JKBOTE has implemented the NEP 2020 curriculum for Polytechnic diploma courses. "
            "New syllabi under NEP 2020 are available for each semester. "
            "Examinations and results are categorized as NEP/NEW scheme on the official portal.",
            "https://jkbote.ac.in/Diploma.php",
            "JKBOTE Diploma Courses (NEP 2020 Scheme)"
        ),
        # Marksheet / Result check online
        ("check marksheet", "download marksheet", "marksheet online", "check mark sheet",
         "get marksheet", "view result", "check my result", "download result",
         "result online", "check result online"): (
            "To check or download your marksheet/result online, visit the official JKBOTE result portal. "
            "Select 'NEP Scheme' or 'NEW/Old Scheme' based on your batch, enter your roll number, and download your result.",
            "https://examination.jkbote.ac.in/resulthomenep.php",
            "JKBOTE Online Result Portal (NEP Scheme)"
        ),
        # Re-appear attempts limit
        ("re-appear", "maximum attempts", "attempt limit", "number of attempts",
         "re-appear limit", "how many times can i appear", "maximum re-appear"): (
            "According to JKBOTE Examination Rules, a student pursuing a 3-year diploma must complete all semesters "
            "within a maximum of 8 years from the date of admission. There is no fixed limit on re-appear attempts within this period. "
            "Refer to the Examination Rules for full details.",
            "https://jkbote.ac.in/about.php#er",
            "JKBOTE Examination Rules & Guidelines"
        ),
        # Admission / Pre-registration (Less specific broad match)
        ("admission", "apply", "pre-registration", "pre registration", "prereg",
         "apply online", "when will admission", "admission start", "admission 2026",
         "jkpet", "application form", "how to apply"): (
            "Pre-registration for JK Polytechnic Admissions 2026 is OPEN on the official JKBOTE portal.",
            "https://jkbote.ac.in/prereg/",
            "Pre-Registration for Admission 2026"
        ),
        # Academic Calendar PDF (with common typos)
        ("academic calendar", "examination calendar", "ac.pdf", "exam calendar", "academic calender", "examination calender", "exam calender"): (
            "The JKBOTE Examination Calendar (Academic Calendar) is available as a PDF on the official website. "
            "It contains the schedule for examinations, registration, and other academic milestones.",
            "https://jkbote.ac.in/AC.pdf",
            "JKBOTE Examination Calendar PDF"
        ),
        # Migration
        ("migration", "transfer certificate"): (
            "Migration (for 3-year Diploma pass-outs) can be applied through the official JKBOTE Migration portal.",
            "https://jkbote.ac.in/Migration/",
            "JKBOTE Migration Portal"
        ),
        # Fee payment
        ("fee payment", "readmission fee", "pay fee", "branch change fee"): (
            "Fee payment for readmission, branch change, etc. can be done via the official JKBOTE payment portal.",
            "https://pages.razorpay.com/pl_ODQaumm5UoxmrH/view",
            "JKBOTE Fee Payment Portal"
        ),
        # Contact
        ("phone number", "contact number", "email address", "jkbote contact",
         "office address", "helpdesk"): (
            "JKBOTE can be reached at Phone: 0191-2430650, Email: jkbote2002@gmail.com. "
            "Central Office: Old Secretariat Block A/C, Srinagar 190001.",
            "https://jkbote.ac.in/contact.php",
            "JKBOTE Contact Us"
        ),
    }

    # ----------------------------------------------------------------
    # NO_SEARCH_KEYWORDS: queries that need real scraped content but
    # must NOT use Google Search (to prevent Scribd/careers360 citations).
    # Gemini will answer from the JKBOTE-scraped links only.
    # ----------------------------------------------------------------
    NO_SEARCH_KEYWORDS = (
        # Exam schedule / datesheet / when will exams start
        "when will exam", "exam start", "exam date", "exam schedule", "exam time",
        "exam timetable", "when exam", "when is exam", "datesheet", "date sheet",
        "time table", "timetable", "practical date", "theory date",
        "exam notification", "exam notice",
        "1st sem exam", "2nd sem exam", "3rd sem exam", "4th sem exam",
        "5th sem exam", "6th sem exam",
        "semester exam", "when will 1st", "when will 2nd", "when will 3rd",
        "when will 4th", "when will 5th", "when will 6th",
        "nd25", "mj25", "mj26", "nd24",
        # Results
        "result", "check result", "nep result", "new scheme result",
        "nd25 result", "semester result", "declared result",
        "passing marks", "pass marks", "minimum marks", "grading system",
        "marksheet", "mark sheet",
        # ITI
        "iti result", "iti examination", "iti registration", "iti scvt", "scvt result",
        # Lateral entry / working professional
        "lateral entry", "lateral admission", "working professional",
        # General notices
        "latest notification", "latest notice", "new notification", "recent notice",
        "what is new", "all notification", "all notice",
        # Admission docs / merit
        "documents for admission", "documents needed", "required documents",
        "merit criteria", "selection criteria", "admission process",
        "nep 2020", "re-appear limit", "maximum attempts",
        "academic calendar", "academic calender", "examination calendar", "examination calender",
    )

    known_answer_block = ""
    use_google_search = True  # will be set False by KNOWN_ANSWERS OR NO_SEARCH_KEYWORDS

    query_lower = query.lower()
    for keywords, (answer_text, answer_url, answer_title) in KNOWN_ANSWERS.items():
        # Match if all words in ANY keyword are present in the query
        for kw in keywords:
            words = kw.split()
            if all(word in query_lower for word in words):
                known_answer_block = (
                    f"AUTHORITATIVE ANSWER (use this directly, do NOT use Google Search or any external source):\n"
                    f"{answer_text}\n"
                    f"Source: [{answer_title}]({answer_url})"
                )
                use_google_search = False
                break
        if not use_google_search:
            break

    # If not matched by KNOWN_ANSWERS, check NO_SEARCH_KEYWORDS to disable
    # Google Search without replacing the answer with a hardcoded message.
    if use_google_search and any(kw in query_lower for kw in NO_SEARCH_KEYWORDS):
        use_google_search = False

    system_instruction = (
        "You are TEJAS, the official AI assistant for JKBOTE (Jammu & Kashmir Board of Technical Education).\n"
        "JKBOTE = Polytechnic/ITI Board. Do NOT confuse it with JKBOSE (J&K Board of School Education — a completely different board for schools).\n"
        "NEVER give information about JKBOSE, Class 10th/12th school exams, or school grading systems.\n"
        "ALL your answers must be about Polytechnic/ITI diploma education under JKBOTE only.\n\n"
        "Your main ability is to read and understand fetched documents (PDFs or website content) and answer questions based only on that content.\n\n"
        + site_directory + "\n"
        "INSTRUCTIONS:\n"
        "When a user asks a question:\n"
        "1. Always read and analyze the fetched document/links before answering.\n"
        "2. Provide a clear and concise summary relevant to the user's question (2-4 lines).\n"
        "3. Extract only important details such as dates, events, and key information.\n"
        "4. Do NOT use any external or general knowledge.\n"
        "5. Always include the link to the original document from the official JKBOTE website (https://jkbote.ac.in/).\n"
        "6. NEVER ask clarifying questions. If a query is broad (e.g. '4th semester result'), list ALL relevant results or documents you find and let the user pick.\n"
        "7. CRITICAL: If you can see relevant scraped links below (even if they are Google Drive PDFs you cannot open), "
        "ALWAYS share those links directly with a brief description. NEVER say 'Information not available' when relevant links exist in the scraped list. "
        "Only say 'Information not available in the official document.' if the scraped list is completely empty OR contains zero relevant links.\n\n"
        "ANSWER FORMAT:\n"
        "- Short summary (2-4 lines)\n"
        "- Key detail (if applicable, e.g. exact dates, event names, deadlines)\n"
        "- Source: [Document Title](URL) — ONLY jkbote.ac.in or drive.google.com links from JKBOTE pages are allowed. NEVER link to third-party sites.\n"
        "- STRICT RULE: Never include the same URL more than once in your entire response. Each link must appear exactly once.\n"
        "- CRITICAL: If you use the Google Search tool, ONLY extract information from JKBOTE-related websites like jkbote.ac.in. "
        "DO NOT cite or link to vertexaisearch.cloud.google.com, careers360, shiksha, or any other non-JKBOTE domain.\n"
        "- Do NOT repeat the same URL more than once in a single response.\n\n"
        "ADDITIONAL RULES:\n"
        "- Prioritise the most recent notice/document when multiple exist.\n"
        "- If multiple datesheets/results exist, list all the relevant ones with their direct links.\n"
        "- NEVER cite third-party sites (careers360, shiksha, scribd, etc.) or vertexaisearch citations."
    )

    if known_answer_block:
        system_instruction += f"\n\n{known_answer_block}"
    
    with open("/tmp/tejas_debug.txt", "a") as f:
        f.write(f"\n--- DEBUG START ---\n")
        f.write(f"Query: {query_lower}\n")
        f.write(f"Known Answer Set: {bool(known_answer_block)}\n")
        if known_answer_block:
            f.write(f"Block: {known_answer_block}\n")
        f.write(f"--- DEBUG END ---\n")

    if latest_notifications_str:
        system_instruction += f"\n\nRecent Official Scraped Links (use only if the Authoritative Answer above does not apply):\n{latest_notifications_str}"

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    gemini_payload = {
        "contents": contents,
        "systemInstruction": {
            "role": "system",
            "parts": [{"text": system_instruction}]
        }
    }
    # Only enable Google Search when we DON'T have a hardcoded authoritative answer.
    # This prevents Gemini from consulting careers360/shiksha for known official URLs.
    if use_google_search:
        gemini_payload["tools"] = [{"googleSearch": {}}]

    try:
        response = requests.post(gemini_url, json=gemini_payload, headers={"Content-Type": "application/json"})
        response.raise_for_status()
        data = response.json()
        
        if "candidates" in data and len(data["candidates"]) > 0:
            ai_text = data["candidates"][0]["content"]["parts"][0]["text"]
            
            # Post-processing: Remove vertexaisearch links or other undesirable links
            # We explicitly target the vertexaisearch redirect links often added by Google Search grounding
            ai_text = re.sub(r'https?://vertexaisearch\.cloud\.google\.com/[^\s)]+', '', ai_text)
            # Remove any trailing empty citations like [1] [2] or (Source: ) that might point to the deleted links
            ai_text = re.sub(r'\[\d+\]', '', ai_text)
            # Deduplicate URLs — if Gemini repeats the same link, only keep the first mention
            ai_text = deduplicate_urls(ai_text)
            
            ai_html = markdown_to_html(ai_text)
            return jsonify({"html": ai_html})
        else:
            return jsonify({"text": "I'm sorry, I couldn't generate a response."})
            
    except Exception as e:
        print("Gemini API Error:", e)
        return jsonify({"error": "Failed to connect to the Gemini API."})

if __name__ == "__main__":
    app.run(debug=True, port=5010)
