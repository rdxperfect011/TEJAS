"""
Database module for TEJAS chatbot
Handles data persistence, caching, and analytics
"""

import sqlite3
import json
import datetime
from typing import List, Dict, Optional, Tuple
import os

class TEJASDatabase:
    """Database handler for TEJAS chatbot"""
    
    def __init__(self, db_path: str = None):
        if db_path is None:
            self.db_path = "/tmp/tejas_chatbot.db" if os.environ.get("VERCEL") else "tejas_chatbot.db"
        else:
            self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize database with required tables"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # User queries table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_queries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    query_text TEXT NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    session_id TEXT,
                    ip_address TEXT,
                    user_agent TEXT
                )
            ''')
            
            # Chat responses table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS chat_responses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    query_id INTEGER,
                    response_text TEXT NOT NULL,
                    response_html TEXT,
                    links_found TEXT,  -- JSON array of links
                    processing_time REAL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (query_id) REFERENCES user_queries (id)
                )
            ''')
            
            # Notification cache table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS notification_cache (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    url TEXT UNIQUE NOT NULL,
                    title TEXT,
                    content TEXT,
                    extracted_dates TEXT,  -- JSON array
                    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
                    recency_score INTEGER DEFAULT 0
                )
            ''')
            
            # Query Response Cache table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS query_response_cache (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    normalized_query TEXT UNIQUE NOT NULL,
                    response_html TEXT NOT NULL,
                    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Popular queries table for analytics
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS popular_queries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    query_text TEXT NOT NULL,
                    count INTEGER DEFAULT 1,
                    last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Failed queries table for debugging
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS failed_queries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    query_text TEXT NOT NULL,
                    error_message TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create indexes for better performance
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_queries_timestamp ON user_queries(timestamp)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_cache_url ON notification_cache(url)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_query_cache_updated ON query_response_cache(last_updated)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_popular_count ON popular_queries(count DESC)')
            
            conn.commit()
    
    def log_user_query(self, query_text: str, session_id: str = None, 
                      ip_address: str = None, user_agent: str = None) -> int:
        """Log a user query to the database"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO user_queries (query_text, session_id, ip_address, user_agent)
                VALUES (?, ?, ?, ?)
            ''', (query_text, session_id, ip_address, user_agent))
            conn.commit()
            return cursor.lastrowid
    
    def log_chat_response(self, query_id: int, response_text: str, 
                         response_html: str = None, links_found: List[Dict] = None,
                         processing_time: float = None):
        """Log a chat response to the database"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO chat_responses 
                (query_id, response_text, response_html, links_found, processing_time)
                VALUES (?, ?, ?, ?, ?)
            ''', (query_id, response_text, response_html, 
                  json.dumps(links_found) if links_found else None, processing_time))
            conn.commit()
    
    def cache_notification(self, url: str, title: str, content: str, 
                          dates: List[str], recency_score: int = 0):
        """Cache notification data to avoid repeated fetching"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO notification_cache 
                (url, title, content, extracted_dates, recency_score, last_updated)
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ''', (url, title, content, json.dumps(dates), recency_score))
            conn.commit()
    
    def get_cached_notification(self, url: str) -> Optional[Dict]:
        """Get cached notification data if available and recent"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT url, title, content, extracted_dates, recency_score, last_updated
                FROM notification_cache 
                WHERE url = ? AND last_updated > datetime('now', '-1 hour')
            ''', (url,))
            
            row = cursor.fetchone()
            if row:
                return {
                    'url': row[0],
                    'title': row[1],
                    'content': row[2],
                    'dates': json.loads(row[3]) if row[3] else [],
                    'recency_score': row[4],
                    'last_updated': row[5]
                }
        return None
    
    def get_cached_query_response(self, normalized_query: str, max_age_minutes: int = 60) -> Optional[str]:
        """Get cached query response if available and recent (includes fuzzy matching for typos)"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # First, try exact match for speed
            cursor.execute('''
                SELECT response_html
                FROM query_response_cache 
                WHERE normalized_query = ? AND last_updated > datetime('now', ?)
            ''', (normalized_query, f'-{max_age_minutes} minutes'))
            
            row = cursor.fetchone()
            if row:
                return row[0]
                
            # If no exact match, try fuzzy matching for spelling mistakes
            cursor.execute('''
                SELECT normalized_query, response_html
                FROM query_response_cache 
                WHERE last_updated > datetime('now', ?)
            ''', (f'-{max_age_minutes} minutes',))
            
            all_cached = cursor.fetchall()
            if all_cached:
                import difflib
                import re
                
                cached_queries = [r[0] for r in all_cached]
                matches = difflib.get_close_matches(normalized_query, cached_queries, n=1, cutoff=0.85)
                
                if matches:
                    closest_query = matches[0]
                    
                    # SAFETY GUARDS AGAINST SEMANTIC INTERFERENCE
                    # 1. Ensure all numbers (both digits and text) match exactly
                    text_nums = {'first': '1', 'second': '2', 'third': '3', 'fourth': '4', 'fifth': '5', 'sixth': '6'}
                    def get_all_nums(s):
                        nums = set(re.findall(r'\d+', s))
                        words = set(re.findall(r'\b\w+\b', s.lower()))
                        for w in words:
                            if w in text_nums: nums.add(text_nums[w])
                        return nums
                    if get_all_nums(normalized_query) != get_all_nums(closest_query):
                        return None
                        
                    # 2. Ensure JKBOTE session codes match exactly (prevents 'mj' matching 'nd')
                    def get_sessions(s): return set(re.findall(r'(mj|nd)', s.lower()))
                    if get_sessions(normalized_query) != get_sessions(closest_query):
                        return None
                        
                    # 3. Ensure completely opposite/distinct critical keywords don't collapse
                    critical_words = {'pass', 'fail', 'private', 'regular', 'polytechnic', 
                                      'iti', 'result', 'syllabus', 'fee', 'form', 'admission'}
                    def get_critical(s): return set(w for w in re.findall(r'\b\w+\b', s.lower()) if w in critical_words)
                    if get_critical(normalized_query) != get_critical(closest_query):
                        return None
                        
                    # If it passes all safety guards, return the cached result
                    for r in all_cached:
                        if r[0] == closest_query:
                            return r[1]
                            
        return None

    def cache_query_response(self, normalized_query: str, response_html: str):
        """Cache a generated query response"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO query_response_cache 
                (normalized_query, response_html, last_updated)
                VALUES (?, ?, CURRENT_TIMESTAMP)
            ''', (normalized_query, response_html))
            conn.commit()
    
    def increment_popular_query(self, query_text: str):
        """Track popular queries for analytics"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO popular_queries (query_text, count, last_accessed)
                VALUES (?, 1, CURRENT_TIMESTAMP)
                ON CONFLICT(query_text) DO UPDATE SET
                count = count + 1,
                last_accessed = CURRENT_TIMESTAMP
            ''', (query_text,))
            conn.commit()
    
    def log_failed_query(self, query_text: str, error_message: str):
        """Log failed queries for debugging"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO failed_queries (query_text, error_message)
                VALUES (?, ?)
            ''', (query_text, error_message))
            conn.commit()
    
    def get_analytics_data(self) -> Dict:
        """Get analytics data for dashboard"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # Total queries
            cursor.execute('SELECT COUNT(*) FROM user_queries')
            total_queries = cursor.fetchone()[0]
            
            # Queries today
            cursor.execute('''
                SELECT COUNT(*) FROM user_queries 
                WHERE DATE(timestamp) = DATE('now')
            ''')
            today_queries = cursor.fetchone()[0]
            
            # Popular queries
            cursor.execute('''
                SELECT query_text, count FROM popular_queries 
                ORDER BY count DESC LIMIT 10
            ''')
            popular_queries = cursor.fetchall()
            
            # Failed queries
            cursor.execute('SELECT COUNT(*) FROM failed_queries')
            failed_queries = cursor.fetchone()[0]
            
            # Cached notifications
            cursor.execute('SELECT COUNT(*) FROM notification_cache')
            cached_notifications = cursor.fetchone()[0]
            
            return {
                'total_queries': total_queries,
                'today_queries': today_queries,
                'popular_queries': popular_queries,
                'failed_queries': failed_queries,
                'cached_notifications': cached_notifications
            }
    
    def get_recent_queries(self, limit: int = 10) -> List[Dict]:
        """Get recent queries for debugging"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT q.query_text, q.timestamp, r.response_text, r.processing_time
                FROM user_queries q
                LEFT JOIN chat_responses r ON q.id = r.query_id
                ORDER BY q.timestamp DESC
                LIMIT ?
            ''', (limit,))
            
            results = []
            for row in cursor.fetchall():
                results.append({
                    'query': row[0],
                    'timestamp': row[1],
                    'response': row[2],
                    'processing_time': row[3]
                })
            return results
    
    def cleanup_old_data(self, days: int = 30):
        """Clean up old data to prevent database bloat"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # Delete old queries
            cursor.execute('''
                DELETE FROM user_queries 
                WHERE timestamp < datetime('now', '-{} days')
            '''.format(days))
            
            # Delete old query response cache
            cursor.execute('''
                DELETE FROM query_response_cache 
                WHERE last_updated < datetime('now', '-1 day')
            ''')
            
            # Delete old cache entries
            cursor.execute('''
                DELETE FROM notification_cache 
                WHERE last_updated < datetime('now', '-7 days')
            ''')
            
            # Delete old failed queries
            cursor.execute('''
                DELETE FROM failed_queries 
                WHERE timestamp < datetime('now', '-7 days')
            ''')
            
            conn.commit()
    
    def search_query_history(self, search_term: str, limit: int = 20) -> List[Dict]:
        """Search through query history"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT q.query_text, q.timestamp, r.response_text
                FROM user_queries q
                LEFT JOIN chat_responses r ON q.id = r.query_id
                WHERE q.query_text LIKE ?
                ORDER BY q.timestamp DESC
                LIMIT ?
            ''', (f'%{search_term}%', limit))
            
            results = []
            for row in cursor.fetchall():
                results.append({
                    'query': row[0],
                    'timestamp': row[1],
                    'response': row[2]
                })
            return results

# Global database instance
db_instance = None

def get_database() -> TEJASDatabase:
    """Get the global database instance"""
    global db_instance
    if db_instance is None:
        db_instance = TEJASDatabase()
    return db_instance

# Database helper functions for easy integration
def log_query(query_text: str, session_id: str = None, 
              ip_address: str = None, user_agent: str = None) -> int:
    """Helper function to log a query"""
    return get_database().log_user_query(query_text, session_id, ip_address, user_agent)

def log_response(query_id: int, response_text: str, 
                response_html: str = None, links_found: List[Dict] = None,
                processing_time: float = None):
    """Helper function to log a response"""
    get_database().log_chat_response(query_id, response_text, response_html, links_found, processing_time)

def cache_notification(url: str, title: str, content: str, dates: List[str], score: int = 0):
    """Helper function to cache a notification"""
    get_database().cache_notification(url, title, content, dates, score)

def get_cached_notification(url: str) -> Optional[Dict]:
    """Helper function to get cached notification"""
    return get_database().get_cached_notification(url)

def get_cached_query(normalized_query: str, max_age_minutes: int = 60) -> Optional[str]:
    """Helper function to get cached query response"""
    return get_database().get_cached_query_response(normalized_query, max_age_minutes)

def cache_query(normalized_query: str, response_html: str):
    """Helper function to cache a query response"""
    get_database().cache_query_response(normalized_query, response_html)

def track_popular_query(query_text: str):
    """Helper function to track popular queries"""
    get_database().increment_popular_query(query_text)

def log_error(query_text: str, error_message: str):
    """Helper function to log errors"""
    get_database().log_failed_query(query_text, error_message)
