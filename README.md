# TEJAS — Technical Education Joint AI Assistant

> An AI-powered virtual assistant for the **J&K Board of Technical Education (JKBOTE)**, helping students instantly find results, examination notices, forms, datesheets, and more.

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.x-black?logo=flask)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-orange?logo=google)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

TEJAS combines a **Flask REST API**, **NLTK-powered NLP**, **parallel web-scraping**, and **Google Gemini generative AI** to deliver accurate, context-aware answers about JKBOTE examinations, results, admissions, fee structures, and administrative information — all in real time.

---

## Features

| Feature | Description |
|---|---|
| 🎓 **JKBOTE Expertise** | Answers queries on exams, datesheets, results, forms, fees, syllabi, and administration |
| 🧠 **NLP Pipeline** | NLTK tokenisation, lemmatisation, POS tagging, NER, and intent classification |
| 🌐 **Parallel Web Scraping** | Fetches live JKBOTE pages concurrently (ThreadPoolExecutor) and ranks results by relevance + recency |
| 🤖 **Gemini AI Responses** | Curated context is injected into `gemini-2.5-flash` for precise, markdown-formatted answers |
| ⚡ **Smart Caching** | SQLite-backed query-response cache with 24-hour TTL and fuzzy-match collision guards |
| 🔒 **Production Security** | Rate limiting, CSP, HSTS, `X-Frame-Options`, input sanitisation, and XSS-safe HTML rendering |
| 📊 **Analytics** | Logs queries, responses, popular terms, and errors for ongoing debugging and insight |

---

## Project Architecture

```
TEJAS/
├── app.py               # Core Flask app — routing, NLP, scraping, Gemini API
├── database.py          # SQLite data layer — caching, logging, analytics
├── site_directory.py    # JKBOTE URL map, keyword→URL routing, office info
├── index.html           # Landing page + chat widget host
├── style.css            # JKBOTE blue-white design system + animations
├── script.js            # <tejas-chat> Web Component configuration & toggle logic
├── tejas.js             # Compiled Web Component bundle (do not edit)
├── requirements.txt     # Python dependencies
├── vercel.json          # Vercel serverless deployment config
└── .env.example         # Environment variable template
```

### Module Responsibilities

#### `app.py`
- Registers Flask routes (`/`, `/<filename>`, `/api/chat`)
- Enforces in-memory sliding-window rate limiting (60 req / 60 s per IP)
- Attaches security headers to every response via `@after_request`
- Runs the **NLP pipeline** (`NLPProcessor`) on every incoming query
- Resolves target JKBOTE URLs via `site_directory.get_target_urls()`
- Scrapes up to 3 pages in parallel and scores/ranks resulting links
- Extracts embedded PDF links from HTML listing pages for direct citations
- Builds the Gemini system prompt with NLP insights + scraped context
- Calls `gemini-2.5-flash` with exponential-backoff retry (max 3 attempts)
- Post-processes AI output (strips Vertex AI links, converts Markdown → safe HTML)
- Caches responses to SQLite for repeat queries

#### `database.py`
- Singleton `TEJASDatabase` class wrapping all SQLite operations
- **Tables**: `user_queries`, `chat_responses`, `notification_cache`, `query_response_cache`, `popular_queries`, `failed_queries`
- Fuzzy-match cache lookup with safety guards (numeric/session/critical-keyword equality checks)
- Module-level helper functions (`log_query`, `cache_notification`, `get_cached_query`, …) used throughout `app.py`

#### `site_directory.py`
- `JKBOTE_SITE_DIRECTORY` — human-readable site map injected verbatim into the Gemini system prompt
- `KEYWORD_MAP` — 80+ keyword → URL list mappings for focused scraping
- `OFFICE_INFO` — structured office addresses and contact details
- `get_target_urls(query)` — resolves a processed query into a set of URLs to scrape

---

## Database Schema

The local SQLite database (`tejas_chatbot.db`) consists of the following core tables for persistence and caching:

- **`user_queries`**: Logs raw user inputs, timestamps, and request origins (IP/User-Agent) for analytics.
- **`chat_responses`**: Stores the AI's generated response, processing time, and the scraped links used as context.
- **`notification_cache`**: Caches the parsed text content and extracted dates of JKBOTE notification pages to prevent redundant scraping (TTL: 7 days).
- **`query_response_cache`**: Stores the final HTML output of a query to serve identical or semantically similar future requests instantly (TTL: 24 hours).
- **`popular_queries`**: Aggregates trending search terms.
- **`failed_queries`**: Logs errors and exceptions for debugging.

---

## NLP Pipeline

Every user message is processed by `NLPProcessor` before the scraper runs:

1. **Preprocessing** — lowercase, remove punctuation, tokenise, strip stopwords (preserving JKBOTE-specific terms like `semester`, `nep`, `mj`), lemmatise
2. **Entity Extraction** — NLTK NER chunking with regex fallback for numbers
3. **Semester / Session Detection** — pattern matching for `1st–6th sem` and `MJ26`/`ND25` codes
4. **Intent Classification** — classifies query into `result | admission | examination | form | notification | syllabus | contact | fee | general`
5. **Query Enhancement** — expands tokens with domain synonyms (e.g., `exam → examination, test, assessment`)
6. **Confidence Scoring** — keyword match ratio for the detected intent

---

## Security

| Mechanism | Implementation |
|---|---|
| Rate limiting | Sliding-window (60 req/60 s per IP), thread-safe with `threading.Lock` |
| Input sanitisation | Regex HTML tag stripping, 500-char truncation, `html.escape()` |
| Content Security Policy | Restricts scripts, styles, fonts, and images to trusted origins |
| HSTS | Enabled on HTTPS / Vercel deployments |
| XSS prevention | `markdown_to_html()` escapes `<`, `>`, `&` before emitting any tags |
| Clickjacking | `X-Frame-Options: DENY` + `frame-ancestors 'none'` in CSP |

---

## API Reference

### `POST /api/chat`

**Request** (`application/json`)
```json
{
  "messages": [
    { "role": "user", "text": "What is the result for 4th semester MJ26?" }
  ]
}
```

**Success Response** (`200 OK`)
```json
{ "html": "<p>The 4th Semester MJ26 results are available at ...</p>" }
```

**Error Responses**

| Status | Meaning |
|---|---|
| `415` | `Content-Type` is not `application/json` |
| `429` | Rate limit exceeded |
| `5xx` | Gemini API error (auto-retried up to 3 times) |

---

## Prerequisites

- Python **3.8+**
- A **Google Gemini API Key** (free tier works)

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rdxperfect011/TEJAS.git
   cd TEJAS
   ```

2. **Create & activate a virtual environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate        # macOS / Linux
   .venv\Scripts\activate           # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**

   Copy the template and fill in your key:
   ```bash
   cp .env.example .env
   ```
   `.env` contents:
   ```env
   GEMINI_API_KEY=your_gemini_api_secret_key_here
   ```

   | Variable | Required | Description |
   |---|---|---|
   | `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key |
   | `FLASK_DEBUG` | No | Set to `true` to enable debug logging |
   | `VERCEL` | No | Set to `1` automatically by Vercel; switches DB & NLTK paths to `/tmp/` |

---

## Running Locally

1. **Get a Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Sign in with your Google account and click **Create API key**.
   - Copy the generated key.

2. **Add the Key to your `.env` file**:
   - Open the `.env` file you created in the setup step.
   - Replace the placeholder with your actual key:
     ```env
     GEMINI_API_KEY=your_actual_key_here
     ```

3. **Start the server**:
   ```bash
   python app.py
   ```

4. **Open the App**:
   - The server starts on **`http://127.0.0.1:5010/`**.
   - Open that URL in your browser to use the TEJAS chatbot.

> **Tip:** Set `FLASK_DEBUG=true` in your `.env` to enable verbose debug logging during development.

---

## Deployment (Vercel)

The app is pre-configured for Vercel serverless deployment via `vercel.json`.

1. **Push to GitHub** and connect the repo to Vercel.
2. **Set environment variables** in the Vercel dashboard:
   - `GEMINI_API_KEY` — your Gemini key
   - `VERCEL` — `1` (tells the app to use `/tmp/` for SQLite & NLTK data)
3. **Deploy** — Vercel will detect the Python runtime automatically.

> ℹ️ SQLite data written to `/tmp/` on Vercel is ephemeral (per-invocation). For persistent analytics, swap the database backend to a managed service like PlanetScale or Supabase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Flask |
| NLP | NLTK (tokeniser, lemmatiser, POS tagger, NER chunker) |
| Web Scraping | Requests, BeautifulSoup4, concurrent.futures |
| Generative AI | Google Gemini 2.5 Flash |
| Database | SQLite (via `sqlite3` stdlib) |
| Frontend | Vanilla HTML/CSS/JS + `<tejas-chat>` Web Component |
| Deployment | Vercel (serverless Python) |

---

## Frontend & UI Features

The frontend is built using standard web technologies enhanced with a custom Web Component (`<tejas-chat>`) to provide a seamless user experience.

- **Floating Widget**: A collapsible, floating chat interface that persists across page interactions without disrupting the main view.
- **Typing Indicators & Timestamps**: Real-time feedback with dynamic timestamps automatically injected into message bubbles via Shadow DOM MutationObservers.
- **Markdown Rendering**: Intercepts Gemini's raw markdown responses to convert bold, italic, and list syntax into safe HTML, explicitly rendering external URLs as clickable links.
- **Glassmorphism Design**: Adheres to JKBOTE's official blue-and-white theme, enhanced with modern, CSS-driven background animations and frosted glass UI elements.
- **Premium Animations**: Hover states, smooth widget toggle transitions, and pulsing status indicators to ensure the application feels alive and responsive.

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push and open a Pull Request

---

## Team

Built with ❤️ by **Tanmay Jamwal**

| Name | Role |
|---|---|
| Tanmay Jamwal | Backend, NLP, Deployment, Frontend, UI/UX, Research, Content & QA |

---

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.
