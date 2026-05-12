"""
TEJAS – Technical Education Joint AI Assistant
================================================
Main Flask application for the JKBOTE AI chatbot.

This module handles:
  • HTTP routing and security middleware
  • In-memory rate limiting
  • NLP pre-processing of user queries
  • Web-scraping of JKBOTE notification pages
  • Gemini API integration and response post-processing
  • Response caching and query logging via database.py

Dependencies: Flask, BeautifulSoup4, NLTK, requests, python-dotenv
Deploy target: Vercel (serverless) or any WSGI host
"""

import os
import datetime
import time
import requests
import re
import html
import threading
import concurrent.futures
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.chunk import ne_chunk
from nltk.tag import pos_tag
from collections import Counter
import logging
import string

# Configure NLTK data directory for Vercel
nltk_data_dir = '/tmp/nltk_data' if os.environ.get("VERCEL") else None
if nltk_data_dir:
    nltk.data.path.append(nltk_data_dir)

# Download required NLTK data
packages = [
    ('tokenizers', 'punkt'),
    ('tokenizers', 'punkt_tab'),
    ('corpora', 'stopwords'),
    ('corpora', 'wordnet'),
    ('taggers', 'averaged_perceptron_tagger'),
    ('taggers', 'averaged_perceptron_tagger_eng'),
    ('chunkers', 'maxent_ne_chunker'),
    ('corpora', 'words')
]

for category, pkg in packages:
    try:
        nltk.data.find(f'{category}/{pkg}')
    except LookupError:
        nltk.download(pkg, download_dir=nltk_data_dir)

# Import database and site directory modules
from database import get_database, log_query, log_response, cache_notification, get_cached_notification, track_popular_query, log_error, get_cached_query, cache_query
from site_directory import JKBOTE_SITE_DIRECTORY, KEYWORD_MAP, OFFICE_INFO, get_target_urls

load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# ── Production Security Configuration ────────────────────────────────────────
app.config["MAX_CONTENT_LENGTH"] = 1 * 1024 * 1024  # 1 MB request size limit

# Logging — suppress debug output in production
LOG_LEVEL = logging.DEBUG if os.environ.get("FLASK_DEBUG") else logging.WARNING
logging.basicConfig(level=LOG_LEVEL, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("tejas")

# In-memory rate limiting (per IP, 60 requests per 60 seconds)
_rate_store: dict = {}
_rate_lock = threading.Lock()

def is_rate_limited(ip: str, limit: int = 60, window: int = 60) -> bool:
    """
    Sliding-window rate limiter.

    Keeps a list of request timestamps per IP address and evicts entries
    older than `window` seconds on every call.  Returns True (blocked) when
    the number of recent requests reaches `limit`.

    Args:
        ip:     Client IP address string.
        limit:  Maximum allowed requests within the window.
        window: Rolling time window in seconds.

    Returns:
        True if the client has exceeded the rate limit, False otherwise.
    """
    now = time.time()
    with _rate_lock:  # Thread-safe access to the shared timestamp store
        # Discard timestamps that have fallen outside the current window
        timestamps = [t for t in _rate_store.get(ip, []) if now - t < window]
        if len(timestamps) >= limit:
            _rate_store[ip] = timestamps  # Persist the pruned list
            return True
        timestamps.append(now)           # Record this request
        _rate_store[ip] = timestamps
    return False

@app.after_request
def set_security_headers(response):
    """
    Attach security-hardening HTTP headers to every response.

    Headers applied:
      • X-Content-Type-Options   – prevents MIME-type sniffing
      • X-Frame-Options          – blocks clickjacking via iframes
      • Referrer-Policy          – limits referrer leakage on cross-origin requests
      • Permissions-Policy       – disables unused browser APIs
      • Strict-Transport-Security– enforces HTTPS (only on secure connections / Vercel)
      • Content-Security-Policy  – restricts resource origins to trusted domains
    """
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    # Only set HSTS over HTTPS or when deployed to Vercel (which always uses HTTPS)
    if request.is_secure or os.environ.get("VERCEL"):
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data: https://jkbote.ac.in https://img.icons8.com; "
        "connect-src 'self'; "
        "frame-ancestors 'none';"
    )
    return response
# ─────────────────────────────────────────────────────────────────────────────

# Load API Key (Checking both names just in case)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_API_KEY")

# Initialize NLP components
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Academic and JKBOTE-specific terms to preserve
JKBOTE_TERMS = {
    'jkbote', 'polytechnic', 'diploma', 'examination', 'semester', 'result', 
    'notification', 'notice', 'datesheet', 'admission', 'form', 'application',
    'nep', 'scheme', 'session', 'mj', 'nd', 'iti', 'scvt', 'migration',
    'readmission', 'branch', 'college', 'fee', 'payment', 'registration'
}

class NLPProcessor:
    """Natural Language Processing for enhanced query understanding"""
    
    def __init__(self):
        self.lemmatizer = lemmatizer
        self.stop_words = stop_words - JKBOTE_TERMS  # Remove JKBOTE terms from stopwords
    
    def preprocess_query(self, query):
        """Clean and preprocess user query with fallback"""
        try:
            # Convert to lowercase
            query = query.lower()
            
            # Remove punctuation but keep important symbols
            query = re.sub(r'[^\w\s\-/]', ' ', query)
            
            # Tokenize
            tokens = word_tokenize(query)
            
            # Remove stopwords but keep JKBOTE terms
            tokens = [token for token in tokens if token not in self.stop_words]
            
            # Lemmatize
            tokens = [self.lemmatizer.lemmatize(token) for token in tokens]
            
            return tokens
        except Exception as e:
            # Fallback to simple tokenization
            query = query.lower()
            query = re.sub(r'[^\w\s\-/]', ' ', query)
            tokens = query.split()
            # Remove common stopwords manually
            simple_stopwords = {'the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'for', 'are', 'as'}
            tokens = [token for token in tokens if token not in simple_stopwords and len(token) > 1]
            return tokens
    
    def extract_entities(self, query):
        """Extract named entities from query with fallback"""
        try:
            tokens = word_tokenize(query)
            pos_tags = pos_tag(tokens)
            entities = ne_chunk(pos_tags)
            
            extracted_entities = []
            for chunk in entities:
                if hasattr(chunk, 'label'):
                    entity_name = ' '.join(c[0] for c in chunk)
                    extracted_entities.append({
                        'name': entity_name,
                        'type': chunk.label()
                    })
            return extracted_entities
        except Exception as e:
            # Fallback to simple pattern matching
            entities = []
            # Extract numbers that might be semester numbers
            numbers = re.findall(r'\b\d+\b', query)
            for num in numbers:
                entities.append({'name': num, 'type': 'NUMBER'})
            return entities
    
    def extract_semester_info(self, tokens):
        """Extract semester information from tokens"""
        semester_info = {'semester': None, 'year': None}
        
        for i, token in enumerate(tokens):
            if token in ['semester', 'sem']:
                # Look for semester number
                if i + 1 < len(tokens) and tokens[i + 1].isdigit():
                    semester_info['semester'] = tokens[i + 1]
                elif i - 1 >= 0 and tokens[i - 1].isdigit():
                    semester_info['semester'] = tokens[i - 1]
        
        return semester_info
    
    def extract_session_info(self, tokens):
        """Extract session information (MJ/ND + year)"""
        session_patterns = [
            r'(mj|nd)(\d{2})',
            r'(march|june|november|december)\s*(\d{4})',
            r'(\d{4})\s*(session)'
        ]
        
        query_text = ' '.join(tokens)
        for pattern in session_patterns:
            match = re.search(pattern, query_text)
            if match:
                return match.group(0)
        
        return None
    
    def classify_query_type(self, tokens):
        """Classify the type of query"""
        query_lower = ' '.join(tokens).lower()
        
        query_types = {
            'result': ['result', 'marksheet', 'grade', 'score', 'pass', 'fail'],
            'admission': ['admission', 'apply', 'application', 'register', 'prereg'],
            'examination': ['exam', 'examination', 'test', 'datesheet', 'schedule'],
            'form': ['form', 'application', 'fill', 'submit', 'online'],
            'notification': ['notification', 'notice', 'announcement', 'latest', 'new'],
            'syllabus': ['syllabus', 'curriculum', 'subject', 'course'],
            'contact': ['contact', 'phone', 'email', 'address', 'help'],
            'fee': ['fee', 'payment', 'pay', 'cost', 'charge']
        }
        
        for query_type, keywords in query_types.items():
            if any(keyword in query_lower for keyword in keywords):
                return query_type
        
        return 'general'
    
    def enhance_query_search(self, original_query):
        """Enhance query with synonyms and related terms"""
        tokens = self.preprocess_query(original_query)
        
        # Synonym mappings
        synonyms = {
            'exam': ['examination', 'test', 'assessment'],
            'form': ['application', 'apply', 'registration'],
            'result': ['marksheet', 'grade', 'score', 'outcome'],
            'notice': ['notification', 'announcement', 'circular'],
            'date': ['schedule', 'timeline', 'deadline']
        }
        
        enhanced_tokens = tokens.copy()
        for token in tokens:
            if token in synonyms:
                enhanced_tokens.extend(synonyms[token])
        
        return enhanced_tokens, tokens
    
    def calculate_query_intent(self, original_query):
        """Calculate the intent and key entities of the query"""
        tokens = self.preprocess_query(original_query)
        entities = self.extract_entities(original_query)
        semester_info = self.extract_semester_info(tokens)
        session_info = self.extract_session_info(tokens)
        query_type = self.classify_query_type(tokens)
        enhanced_tokens, original_tokens = self.enhance_query_search(original_query)
        
        return {
            'original_query': original_query,
            'processed_tokens': original_tokens,
            'enhanced_tokens': enhanced_tokens,
            'entities': entities,
            'semester_info': semester_info,
            'session_info': session_info,
            'query_type': query_type,
            'confidence': self._calculate_confidence(tokens, query_type)
        }
    
    def _calculate_confidence(self, tokens, query_type):
        """Calculate confidence score for query classification"""
        type_keywords = {
            'result': ['result', 'marksheet', 'grade'],
            'admission': ['admission', 'apply', 'application'],
            'examination': ['exam', 'examination', 'test'],
            'form': ['form', 'application', 'fill'],
            'notification': ['notification', 'notice', 'new']
        }
        
        if query_type in type_keywords:
            matches = sum(1 for token in tokens if token in type_keywords[query_type])
            return min(matches / len(tokens), 1.0)
        
        return 0.5

# Initialize NLP processor
nlp_processor = NLPProcessor()

# Move recency scoring function outside of chat endpoint for better organization
def get_recency_score(doc):
    """Calculate recency score for documents with JKBOTE session code handling"""
    if not doc.get('dates'):
        return 0
    
    import re
    current_year = datetime.datetime.now().year
    score = 0
    
    for date_str in doc['dates']:
        # Handle JKBOTE session codes (MJ26, ND25, etc.)
        session_match = re.match(r'(MJ|ND)(\d{2})', date_str.upper())
        if session_match:
            year = 2000 + int(session_match.group(2))  # MJ26 -> 2026
            if year >= current_year:
                score += 100  # Current/future sessions get highest priority
            elif year == current_year - 1:
                score += 80   # Previous year gets high priority
            elif year == current_year - 2:
                score += 60   # Two years back gets medium priority
            else:
                score += 20   # Older sessions get low priority
            continue
        
        # Handle regular dates
        year_match = re.search(r'\b(20\d{2})\b', date_str)
        if year_match:
            year = int(year_match.group(1))
            if year >= current_year:
                score += 50
            elif year == current_year - 1:
                score += 40
            elif year == current_year - 2:
                score += 30
            else:
                score += 10
    
    # Bonus for documents with "NEW" or recent keywords in title
    title_lower = doc.get('title', '').lower()
    if any(keyword in title_lower for keyword in ['new', 'latest', 'recent', '(new)', 'mj26', '2026']):
        score += 25
    
    return score

def extract_document_content(url, title):
    """
    Fetch and extract the main textual content from a JKBOTE page URL.

    The function strips navigation/boilerplate elements, attempts several
    CSS selectors that match known JKBOTE page structures, and falls back
    to scanning all text-bearing tags.  Duplicate sentences are removed
    before returning.

    Args:
        url:   Fully-qualified URL of the page to scrape.
        title: Human-readable title associated with this link (used as metadata).

    Returns:
        A dict with keys {content, dates, title} on success, or None if the
        page could not be fetched or contained no usable text.
    """
    content = fetch_with_retry(url)
    if not content:
        return None
    
    soup = BeautifulSoup(content, "html.parser")
    # Remove script and style elements
    for script in soup(["script", "style"]):
        script.decompose()
    
    # Remove navigation and header elements that are common across JKBOTE pages
    for element in soup.find_all(['nav', 'header', 'footer']):
        element.decompose()
    
    # Extract text from main content areas with JKBOTE-specific selectors
    text_content = ""
    
    # JKBOTE-specific content selectors based on site structure analysis
    content_selectors = [
        'div.content', 'div.main', 'div.notice', 'div.notification', 
        'div.post', 'article', 'main', '.notice-content', '.notification-content',
        # JKBOTE specific patterns
        'div[style*="margin"]', 'div[style*="padding"]', 
        'table', 'tbody', 'tr', 'td'
    ]
    
    found_content = False
    for selector in content_selectors:
        elements = soup.select(selector)
        for element in elements:
            text = element.get_text(strip=True)
            if len(text) > 50 and not is_navigation_text(text):
                text_content += text + " "
                found_content = True
                break
        if found_content:
            break
    
    # If no specific content found, get all meaningful text
    if not found_content:
        for tag in soup.find_all(['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td']):
            parent_class = tag.get('class', [])
            if any(cls in ['nav', 'menu', 'footer', 'header', 'sidebar'] for cls in parent_class):
                continue
            text = tag.get_text(strip=True)
            if len(text) > 20 and not is_navigation_text(text):
                text_content += text + " "
    
    if text_content:
        # Clean up the text and remove duplicates
        text_content = ' '.join(text_content.split())
        # Remove duplicate sentences/phrases
        sentences = text_content.split('. ')
        unique_sentences = []
        seen = set()
        for sentence in sentences:
            sentence = sentence.strip()
            if sentence and sentence not in seen:
                unique_sentences.append(sentence)
                seen.add(sentence)
        text_content = '. '.join(unique_sentences)
        
        # Try to extract dates for freshness check
        import re
        date_patterns = [
            r'\b\d{1,2}[-/]\d{1,2}[-/]\d{4}\b',  # DD-MM-YYYY or DD/MM/YYYY
            r'\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b',  # YYYY-MM-DD or YYYY/MM/DD
            r'\b\w+ \d{1,2}, \d{4}\b',           # Month DD, YYYY
            r'\b(MJ|ND)\d{2}\b',                  # JKBOTE session codes (MJ26, ND25, etc.) - only with numbers
        ]
        dates = []
        for pattern in date_patterns:
            matches = re.findall(pattern, text_content)
            # Only add valid session codes (with numbers) and dates
            for match in matches:
                if re.match(r'(MJ|ND)\d{2}', match):  # Only session codes with 2 digits
                    dates.append(match)
                elif len(match) > 4:  # Only proper dates
                    dates.append(match)
        
        return {
            'content': text_content[:1000] + "..." if len(text_content) > 1000 else text_content,
            'dates': dates,
            'title': title
        }
    
    return None

def is_navigation_text(text):
    """
    Heuristic filter to discard common JKBOTE navigation/menu strings.

    Returns True only when the text is both very short (<20 chars) AND
    exactly matches a known navigation label.  This prevents valid content
    that merely *contains* a nav keyword from being discarded.

    Args:
        text: Raw string extracted from an HTML element.

    Returns:
        True if the text is navigation boilerplate, False otherwise.
    """
    nav_keywords = [
        'home', 'about us', 'contact us', 'login', 'register', 'skip to main content',
        'call', 'mail', 'polytechnic', 'iti', 'examination portal', 'migration',
        'board registration', 'working professional', 'academics', 'syllabus',
        'notifications', 'result', 'examination', 'datesheet', 'rti', 'committee',
        'staff login', 'introduction', 'fee structure', 'board members', 'mission',
        'vision', 'examination rules', 'honor board'
    ]
    text_lower = text.lower().strip()
    # Only filter if it's EXACTLY a navigation term AND very short
    return text_lower in nav_keywords and len(text) < 20



def markdown_to_html(text):
    """
    Convert Gemini's Markdown-flavoured response text to sanitised HTML.

    Processing steps (in order):
      1. HTML-escape raw < > & to neutralise any injection attempts.
      2. Convert **bold** and *italic* Markdown to <strong>/<em> tags.
      3. Convert [title](url) Markdown links → clickable <a> tags
         (only http/https URLs are allowed; others are left untouched).
      4. Convert bare https?:// URLs that are not already inside an <a> tag.
      5. Convert leading `- ` or `* ` list items → <li> elements,
         wrapping consecutive items in a <ul>.

    Args:
        text: Raw Markdown string returned by the Gemini API.

    Returns:
        Safe HTML string ready to be inserted into the DOM.
    """
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
    """
    Fetch a URL with a simple retry strategy and a browser-like User-Agent.

    Retries on any RequestException with a 1-second pause between attempts.
    Returns the raw response body as text, or None on permanent failure.

    Args:
        url:     Target URL to fetch.
        retries: Number of additional attempts after the first failure.
        timeout: Per-request timeout in seconds.

    Returns:
        Response text string on success, None if all attempts fail.
    """
    # Mimic a real browser to avoid being blocked by JKBOTE's server
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    for attempt in range(retries + 1):
        try:
            res = requests.get(url, headers=headers, timeout=timeout)
            res.raise_for_status()  # Raise an error for 4xx/5xx responses
            return res.text
        except requests.RequestException as e:
            if attempt == retries:  # All retries exhausted
                print(f"Failed to fetch {url} after {retries} retries: {e}")
                return None
            time.sleep(1)  # Brief pause before next attempt

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

@app.route("/api/chat", methods=["POST"])
def chat():
    # Rate limiting
    client_ip = request.headers.get("X-Forwarded-For", request.remote_addr).split(",")[0].strip()
    if is_rate_limited(client_ip):
        return jsonify({"error": "Too many requests. Please slow down."}), 429

    if not GEMINI_API_KEY:
        return jsonify({"text": "Error: GEMINI_API_KEY is not set in your .env file."})

    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json."}), 415

    data = request.json
    messages = data.get("messages", [])
    if not messages:
        return jsonify({"text": "No messages provided."})

    last_user_msg_obj = messages[-1]
    last_user_message = last_user_msg_obj.get("text", "")
    if not last_user_message and "html" in last_user_msg_obj:
        soup_last = BeautifulSoup(last_user_msg_obj.get("html", ""), "html.parser")
        last_user_message = soup_last.get_text(separator=" ").strip()

    # Input validation and sanitization
    last_user_message = re.sub(r"<[^>]+>", "", last_user_message).strip()
    if len(last_user_message) > 500:
        last_user_message = last_user_message[:500]
    last_user_message = html.escape(last_user_message)
    
    # Process query with NLP for enhanced understanding
    query_intent = nlp_processor.calculate_query_intent(last_user_message)
    
    # Use enhanced tokens for better search
    enhanced_search_query = ' '.join(query_intent['enhanced_tokens'])
    normalized_query = enhanced_search_query.lower()
    
    # Determine if this is a follow-up conversation to avoid conversational cache collisions
    user_message_count = sum(1 for msg in messages if msg.get("role") == "user")
    is_follow_up = user_message_count > 1
    
    # Check query cache for similar queries (ONLY if it's the first question, refreshing every 24 hours)
    cached_response = None
    if not is_follow_up:
        cached_response = get_cached_query(normalized_query, max_age_minutes=1440)
        
    if cached_response:
        logger.debug("Cache hit for query: %s", normalized_query)
        return jsonify({"html": cached_response})

    logger.debug("Original: %s | Type: %s | Enhanced: %s | Semester: %s | Session: %s",
                 query_intent['original_query'], query_intent['query_type'],
                 enhanced_search_query, query_intent['semester_info'], query_intent['session_info'])

    # ----------------------------------------------------------------
    # Use imported site directory from site_directory.py with NLP-enhanced query
    # ----------------------------------------------------------------
    from site_directory import get_target_urls
    target_urls = get_target_urls(enhanced_search_query)
    
    # Add additional URLs based on NLP analysis
    if query_intent['query_type'] == 'result':
        target_urls.update(["https://examination.jkbote.ac.in/resulthomenep.php", 
                           "https://examination.jkbote.ac.in/resulthome.php"])
    elif query_intent['query_type'] == 'form':
        target_urls.update(["https://jkbote.ac.in/noticeExam.php"])
    elif query_intent['query_type'] == 'admission':
        target_urls.update(["https://jkbote.ac.in/prereg/"])

    all_links = []
    seen_urls = set()

    # Fetch top 3 pages in parallel to reduce lag
    def scan_url_for_links(url):
        """
        Scrape all qualifying anchor tags from a single JKBOTE page.

        A link qualifies when:
          • Its resolved href belongs to an allowed domain
            (jkbote.ac.in, jksbotelive.com, or drive.google.com).
          • The visible link text is longer than 8 characters.
          • The href is not a javascript:, mailto:, or tel: pseudo-link.

        Args:
            url: URL of the page to scrape.

        Returns:
            List of dicts with keys {text, href}.
        """
        found_links = []
        page_html = fetch_with_retry(url, retries=1, timeout=5)
        if page_html:
            soup = BeautifulSoup(page_html, "html.parser")
            for a in soup.find_all("a", href=True):
                href = urljoin(url, a["href"])  # Resolve relative URLs
                is_new = "(NEW)" in a.text.upper() or "NEW" in a.text.upper()
                text = a.text.replace("(NEW)", "").replace("(new)", "").replace("NEW", "").strip()  # Strip "(NEW)" badge text

                # Only keep links from trusted JKBOTE-related domains
                is_allowed = (
                    "jkbote.ac.in" in href.lower() or
                    "jksbotelive.com" in href.lower() or
                    "drive.google.com" in href.lower()
                )
                if not is_allowed:
                    continue

                # Ignore pure navigation links if they are short
                if len(text) > 8 and not href.startswith(("javascript:", "mailto:", "tel:")):
                    found_links.append({
                        "text": text, 
                        "href": href,
                        "is_new": is_new,
                        "is_pdf": href.lower().endswith(".pdf")
                    })
        return found_links

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        for links in executor.map(scan_url_for_links, list(target_urls)[:3]):
            for link in links:
                if link["href"] not in seen_urls:
                    all_links.append(link)
                    seen_urls.add(link["href"])

    query_words = set(re.findall(r'\w+', enhanced_search_query.lower()))
    
    # Enhanced relevance scoring with NLP insights
    def enhanced_score_link(link):
        """
        Compute a relevance score for a scraped link relative to the user query.

        Scoring factors:
          +1  per query word (>2 chars) found in the link text (base keyword match)
          +3  if the link text matches the NLP-detected query type
              (e.g. 'form' in text when query_type == 'form')
          +5  if the link text contains the specific semester number
          +4  if the link text contains the specific session code (MJ/ND)

        Args:
            link: Dict with keys {text, href} from scan_url_for_links.

        Returns:
            Integer relevance score (higher = more relevant).
        """
        link_text_lower = link["text"].lower()
        score = 0

        # Base keyword matching: count query words present in the link title
        for w in query_words:
            if w in link_text_lower and len(w) > 2:
                score += 1

        # Type-specific boosting: reward links that match the detected query type
        if query_intent['query_type'] == 'form' and 'form' in link_text_lower:
            score += 3
        if query_intent['query_type'] == 'result' and 'result' in link_text_lower:
            score += 3
        if query_intent['query_type'] == 'examination' and 'exam' in link_text_lower:
            score += 3

        # Semester-specific boosting: e.g. "6" or "6th" in link text
        if query_intent['semester_info']['semester']:
            sem_num = query_intent['semester_info']['semester']
            if f"{sem_num}" in link_text_lower or f"{sem_num}th" in link_text_lower:
                score += 5

        # Session-specific boosting: e.g. "mj26" or "nd25" in link text
        if query_intent['session_info']:
            session = query_intent['session_info'].lower()
            if session in link_text_lower:
                score += 4

        # Boost actual document links over general listing pages
        if link.get("is_pdf"):
            score += 2

        # Give a significant boost to newly posted links if looking for latest
        if link.get("is_new"):
            score += 5
        
        # Penalize generic listing links if we are searching for specific queries
        if link["href"].endswith(".php") and ("notice" in link["href"] or "Result" in link["href"]):
            # If the user literally typed exactly "all notifications", maybe it's fine, 
            # but usually they want the actual notice.
            score -= 1

        return score
    
    all_links.sort(key=enhanced_score_link, reverse=True)
    top_links = all_links[:10]
    
    # Enhanced notification reading with better content matching
    notification_summary = ""
    relevant_links = []
    
    if top_links:
        # Extract content from top links for better summarization
        processed_documents = []
        
        def process_top_link(link):
            title_lower = link['text'].lower()
            relevance_score = 1  # Base score so valid links aren't dropped
            
            # Dynamic relevance based on user query
            for w in query_words:
                if len(w) > 2 and w in title_lower:
                    relevance_score += 2
                    
            if query_intent['query_type'] != 'general' and query_intent['query_type'] in title_lower:
                relevance_score += 2
                
            if link["href"].endswith('.pdf') or "drive.google.com" in link["href"]:
                return {
                    'title': link['text'],
                    'content': f"Document: {link['text']} (Direct link to official notification)",
                    'dates': [],
                    'href': link['href'],
                    'relevance_score': relevance_score + 2  # Boost direct documents
                }
            else:
                doc_data = get_cached_notification(link["href"])
                if not doc_data:
                    doc_data = extract_document_content(link["href"], link["text"])
                    if doc_data:
                        cache_notification(link["href"], doc_data['title'], doc_data['content'], doc_data['dates'])
                
                if doc_data:
                    content_lower = doc_data['content'].lower()
                    for w in query_words:
                        if len(w) > 2 and w in content_lower:
                            relevance_score += 1
                    
                    # Also extract embedded PDF links from this HTML page
                    # and add them as extra high-priority documents
                    page_html_content = fetch_with_retry(link["href"], retries=0, timeout=5)
                    if page_html_content:
                        soup_inner = BeautifulSoup(page_html_content, "html.parser")
                        for a in soup_inner.find_all("a", href=True):
                            pdf_href = urljoin(link["href"], a["href"])
                            pdf_text = a.text.strip()
                            if pdf_href.endswith('.pdf') and pdf_text and len(pdf_text) > 5:
                                pdf_title_lower = pdf_text.lower()
                                pdf_score = relevance_score + 3  # PDFs rank higher than listing pages
                                for w in query_words:
                                    if len(w) > 2 and w in pdf_title_lower:
                                        pdf_score += 2
                                processed_documents.append({
                                    'title': pdf_text,
                                    'content': f"Document: {pdf_text} (Direct PDF notification)",
                                    'dates': [],
                                    'href': pdf_href,
                                    'relevance_score': pdf_score,
                                    'is_listing_page': False
                                })
                    
                    return {
                        'title': doc_data['title'],
                        'content': doc_data['content'],
                        'dates': doc_data['dates'],
                        'href': link['href'],
                        'relevance_score': relevance_score,
                        'is_listing_page': True  # Mark as a listing page, not a direct notification
                    }
                return None

        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            for result in executor.map(process_top_link, top_links[:8]):
                if result:
                    processed_documents.append(result)
        
        # Sort by relevance score first, then by recency
        processed_documents.sort(key=lambda x: (x['relevance_score'], get_recency_score(x)), reverse=True)
        
        # Create a summary of the most relevant notifications
        if processed_documents:
            # Take the most relevant documents
            relevant_docs = [doc for doc in processed_documents if doc['relevance_score'] > 0][:5]
            if relevant_docs:
                notification_summary = "\n".join([f"Content from {doc['title']}: {doc['content']}" for doc in relevant_docs])
                relevant_links = [{"text": doc['title'], "href": doc['href']} for doc in relevant_docs]

    latest_notifications_str = "\n".join([f'- [{lnk["text"]}]({lnk["href"]})' for lnk in relevant_links])

    # Normalize messages to extract text from both 'text' and 'html' fields
    normalized_messages = []
    for msg in messages:
        role = "model" if msg.get("role") == "ai" else "user"
        content = msg.get("text", "")
        if not content and "html" in msg:
            soup = BeautifulSoup(msg.get("html", ""), "html.parser")
            # Remove timestamp div if it exists to avoid cluttering history
            for ts in soup.find_all("div", style=lambda s: s and "text-align:right" in s and "font-size:11px" in s):
                ts.decompose()
            for ts in soup.find_all("div", style=lambda s: s and "text-align: left" in s and "font-size:11px" in s):
                ts.decompose()
            content = soup.get_text(separator=" ").strip()
            
        if content:
            normalized_messages.append({"role": role, "text": content})

    contents = []
    for msg in normalized_messages:
        role = msg["role"]
        text = msg["text"]
        
        # Skip leading model messages (Gemini API requires starting with user)
        if not contents and role == "model":
            continue
            
        if contents and contents[-1]["role"] == role:
            # Merge consecutive messages of the same role
            contents[-1]["parts"][0]["text"] += "\n" + text
        else:
            contents.append({"role": role, "parts": [{"text": text}]})

    # Build the known-URL reference block for the system prompt
    site_directory = JKBOTE_SITE_DIRECTORY

    # Build system instruction with NLP insights
    system_instruction = f"""You are a helpful assistant for JKBOTE (Jammu & Kashmir Board of Technical Education). 
    Your role is to help students find information from official JKBOTE sources.

    JKBOTE OFFICIAL SITE DIRECTORY:
    {site_directory}

    NLP ANALYSIS OF USER QUERY:
    - Original Query: {query_intent['original_query']}
    - Query Type: {query_intent['query_type']} (Confidence: {query_intent['confidence']:.2f})
    - Semester Info: {query_intent['semester_info']}
    - Session Info: {query_intent['session_info']}
    - Key Entities: {query_intent['entities']}

    TASK: Read the latest notifications from JKBOTE, find the most relevant ones for the user's query, 
    extract specific details, and provide direct links to the exact notifications.

    ENHANCED UNDERSTANDING: Use the NLP analysis above to better understand what the user wants.
    - If query_type is 'form', prioritize examination forms and application links
    - If query_type is 'result', prioritize result portals and marksheet links  
    - If semester info is available, prioritize that specific semester
    - If session info is available, prioritize that session (MJ/ND)

    STEPS:
    1. Read the provided notifications with content
    2. Find the MOST RELEVANT notifications that directly answer the user's question
    3. Extract specific details: exact dates, deadlines, fees, requirements
    4. Prioritize recent notifications (2026 > 2025 > older)
    5. Use NLP insights to match user intent more accurately
    6. If multiple relevant notifications exist, list them in order of relevance
    7. Always provide the DIRECT link to the specific notification, not general pages

    ANSWER FORMAT:
    - Start with the most direct answer to the user's question
    - Provide specific details (dates, fees, deadlines) 
    - Include the direct link to the exact notification/document
    - If no exact match found, suggest the closest relevant notifications

    CRITICAL RULES:
    - Find the MOST SPECIFIC notification possible
    - If a link ends with .pdf it is a DIRECT document link — always prefer it over .php listing pages IF it is relevant to the query.
    - DO NOT return syllabus PDFs unless the user explicitly asks for a syllabus, course, or curriculum.
    - If a link ends with .php it may be a LISTING PAGE containing many notifications, NOT a direct link to one specific notice
    - When using a listing page link, explicitly tell the user it is a general page where they can find the notice, not a direct link to it
    - Prioritize PDF links for official forms/notices
    - Always include direct links with descriptions
    - Use the NLP analysis to provide more targeted responses
    """
    
    # Add notification data to system instruction if available
    if notification_summary:
        system_instruction += f"\n\nLATEST NOTIFICATIONS WITH CONTENT:\n{notification_summary}\n\nRELEVANT LINKS FOUND:\n{latest_notifications_str}\n\nIMPORTANT: Always prioritize the most recent notifications and dates. Focus on current/upcoming events rather than old information."
    elif latest_notifications_str:
        system_instruction += f"\n\nRELEVANT LINKS FOUND:\n{latest_notifications_str}\n\nIMPORTANT: Prioritize the most recent notifications and dates."

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    gemini_payload = {
        "contents": contents,
        "systemInstruction": {
            "role": "system",
            "parts": [{"text": system_instruction}]
        }
    }

    # ── Gemini API Call with Exponential-Backoff Retry ───────────────────────
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.post(
                gemini_url,
                json=gemini_payload,
                headers={"Content-Type": "application/json"},
                timeout=20
            )
            response.raise_for_status()  # Raise on 4xx/5xx HTTP errors
            data = response.json()

            if "candidates" in data and len(data["candidates"]) > 0:
                # Extract the generated text from the first candidate
                ai_text = data["candidates"][0]["content"]["parts"][0]["text"]

                # Remove Vertex AI Search redirect links that Gemini sometimes injects
                # via its Search Grounding feature; these are not useful to end-users.
                ai_text = re.sub(r'https?://vertexaisearch\.cloud\.google\.com/[^\s)]+', '', ai_text)
                # Clean up orphaned numeric citation markers left after link removal
                ai_text = re.sub(r'\[\d+\]', '', ai_text)

                # Unescape Markdown's escaped underscores inside URLs (e.g. \_)
                ai_text = ai_text.replace(r'\_', '_')

                # Convert Markdown to sanitised HTML for the frontend
                ai_html = markdown_to_html(ai_text)

                # Cache the response for standalone (non-follow-up) queries to
                # avoid redundant Gemini API calls for repeated questions.
                if not is_follow_up:
                    try:
                        cache_query(normalized_query, ai_html)
                    except Exception as cache_error:
                        print(f"Failed to cache generated response: {cache_error}")

                return jsonify({"html": ai_html})
            else:
                # Gemini returned a response body with no usable candidates
                return jsonify({"text": "I'm sorry, I couldn't generate a response."})

        except requests.exceptions.HTTPError as e:
            # Retry on transient server-side errors using exponential back-off
            if response.status_code in [500, 502, 503, 504] and attempt < max_retries - 1:
                print(f"Gemini API {response.status_code} error, retrying in {2 ** attempt} seconds...")
                time.sleep(2 ** attempt)  # 1s, 2s, 4s ...
                continue
            print("Gemini API Error:", e)
            return jsonify({"error": f"Gemini API Error: {response.status_code}"})
        except Exception as e:
            print("Gemini API Error:", e)
            return jsonify({"error": "Failed to connect to the Gemini API."})

if __name__ == "__main__":
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode, port=5010, threaded=True)
