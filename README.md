# TEJAS Chatbot API

TEJAS is an intelligent, automated chatbot explicitly built to assist students and professionals regarding Jammu & Kashmir Board of Technical Education (JKBOTE) information. It combines a robust Flask Web API, Natural Language Processing (NLP) integration via NLTK, intelligent web scraping, and Generative AI via Google's Gemini API to deliver accurate, localized, and context-aware responses.

## Key Features

- **JKBOTE Expertise**: Answers detailed queries about examinations, syllabi, datesheets, result portals, forms, fee processes, and administrative structures.
- **Natural Language Processing (NLP)**: Leverages NLTK tokenization, lemma analysis, and named-entity chunking to classify query intent and extract important variables like semester/session codes (e.g., `MJ26`, `ND25`).
- **Real-Time Web Scraping**: Inquires live JKBOTE URLs in parallel using BeautifulSoup to pull the freshest notices and latest results, boosting them based on relevance and recency to the query keywords.
- **Generative AI Responses**: Feeds curated JKBOTE contents and user context into the **Gemini API** for human-readable, detailed, and clear markdown responses.
- **SQLite Support & Caching**: Efficiently stores and caches incoming requests and notification contents to minimize repetitive crawling, with analytics for trending query terms.

## Project Architecture

- **`app.py`**: The core application logic. It routes API requests, processes text data, asynchronously scrapes official sources, and interacts with the Gemini models.
- **`database.py`**: Handles local SQLite (`tejas_chatbot.db`) interactions, logging user queries, caching notifications, storing bot responses, and compiling analytics.
- **`site_directory.py`**: A strict directory of official JKBOTE URLs, category mappings, fee structure snapshots, and contact details passed into prompts as absolute authorities.
- **Frontend Assets (`index.html`, `style.css`, `script.js`)**: A custom sleek chat interface tailored for an intuitive user experience.

## Prerequisites

- Python 3.8+
- Gemini API Key

## Setup & Installation

1. **Clone the project repository.**
2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Environment Setup**:
   Create a `.env` file in the root of the project with your Gemini Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_secret_key_here
   ```

## Running the App Locally

Execute the following command to spin up the local development server:

```bash
python app.py
```
By default, the server runs on `http://127.0.0.1:5010/`. You can navigate directly to this address in your browser to interact with the responsive chatbot interface.

## Production / Deployment

The application gracefully falls back to `/tmp/` paths in a Serverless deployment context (like Vercel) to satisfy ephemeral storage constraints (both for `tejas_chatbot.db` and NLTK downloads). Ensure deployment environment variables (`GEMINI_API_KEY` and `VERCEL=1`) are adequately set.
