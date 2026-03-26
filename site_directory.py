"""
JKBOTE Site Directory and Configuration
Contains all JKBOTE site structure information, URLs, and mappings
"""

# JKBOTE Site Structure (March 2026 crawl)
JKBOTE_SITE_DIRECTORY = """
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

# Updated keyword mapping based on actual JKBOTE site structure analysis
KEYWORD_MAP = {
    # Results - Based on homepage "What's New" section
    "result":           ["https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/"],
    "gazette":          ["https://jkbote.ac.in/noticeResult.php"],
    "reevaluation":     ["https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeExam.php"],
    "revaluation":      ["https://jkbote.ac.in/noticeResult.php"],
    "marks":            ["https://jkbote.ac.in/noticeResult.php"],
    "pass":             ["https://jkbote.ac.in/noticeResult.php"],
    "fail":             ["https://jkbote.ac.in/noticeResult.php"],
    "declared":         ["https://jkbote.ac.in/noticeResult.php"],
    "nd25":             ["https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/"],
    "mj26":             ["https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/"],
    
    # Exams - Priority to homepage for latest notices
    "exam":             ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "examination":      ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "registration":     ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "form":             ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "online":           ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "filling":          ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "lateral":          ["https://jkbote.ac.in/noticeExam.php"],
    "practical":        ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    "theory":           ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    
    # Datesheets / Schedules
    "datesheet":        ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    "date sheet":       ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    "datesheets":       ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    "schedule":         ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    "timetable":        ["https://jkbote.ac.in/noticeDatesheet.php"],
    "time table":       ["https://jkbote.ac.in/noticeDatesheet.php"],
    "calendar":         ["https://jkbote.ac.in/AC.pdf", "https://jkbote.ac.in/"],
    "academic calendar":["https://jkbote.ac.in/AC.pdf", "https://jkbote.ac.in/noticeDatesheet.php"],
    "timeline":         ["https://jkbote.ac.in/noticeDatesheet.php"],
    "ac.pdf":           ["https://jkbote.ac.in/AC.pdf"],
    
    # Semester-specific - Include homepage for latest semester notices
    "semester":         ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    "1st":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    "2nd":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    "3rd":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    "4th":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    "5th":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    "6th":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/noticeDatesheet.php"],
    
    # Academics / Syllabus
    "syllabus":         ["https://jkbote.ac.in/Diploma.php", "https://jkbote.ac.in/about.php"],
    "curriculum":       ["https://jkbote.ac.in/Diploma.php"],
    "course":           ["https://jkbote.ac.in/Diploma.php"],
    "diploma":          ["https://jkbote.ac.in/Diploma.php", "https://jkbote.ac.in/colleges.php"],
    "nep":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/Diploma.php"],
    "new scheme":       ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php"],
    "scheme":           ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/noticeResult.php", "https://jkbote.ac.in/Diploma.php"],
    
    # Admission
    "admission":        ["https://jkbote.ac.in/notice.php", "https://jkbote.ac.in/prereg/"],
    "pre-registration": ["https://jkbote.ac.in/prereg/"],
    "pre registration": ["https://jkbote.ac.in/prereg/"],
    "2026":             ["https://jkbote.ac.in/notice.php", "https://jkbote.ac.in/prereg/", "https://jkbote.ac.in/"],
    "readmission":      ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
    "re-admission":     ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
    
    # Colleges / Institutes
    "college":          ["https://jkbote.ac.in/colleges.php"],
    "polytechnic":      ["https://jkbote.ac.in/colleges.php", "https://jkbote.ac.in/"],
    "institute":        ["https://jkbote.ac.in/colleges.php"],
    "iti":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
    "scvt":             ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
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
    
    # General/Latest - Homepage priority for most recent notices
    "notice":           ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
    "notification":     ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
    "latest":           ["https://jkbote.ac.in/"],
    "new":              ["https://jkbote.ac.in/"],
    "update":           ["https://jkbote.ac.in/", "https://jkbote.ac.in/notice.php"],
    "what's new":       ["https://jkbote.ac.in/"],
    "academic":         ["https://jkbote.ac.in/noticeDatesheet.php", "https://jkbote.ac.in/"],
    
    # Passing marks / grading / examination rules
    "passing":          ["https://jkbote.ac.in/about.php"],
    "grade":            ["https://jkbote.ac.in/about.php"],
    "grading":          ["https://jkbote.ac.in/about.php"],
    "marksheet":        ["https://examination.jkbote.ac.in/resulthomenep.php", "https://examination.jkbote.ac.in/resulthome.php"],
    "mark sheet":       ["https://examination.jkbote.ac.in/resulthomenep.php", "https://examination.jkbote.ac.in/resulthome.php"],
    "backlog":          ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "document":         ["https://jkbote.ac.in/prereg/", "https://jkbote.ac.in/notice.php"],
    "certificate":      ["https://jkbote.ac.in/about.php", "https://jkbote.ac.in/notice.php"],
    "merit":            ["https://jkbote.ac.in/notice.php", "https://jkbote.ac.in/prereg/"],
    "branch change":    ["https://jkbote.ac.in/notice.php"],
    "branch":           ["https://jkbote.ac.in/colleges.php"],
    
    # Forms and examination form related terms
    "form":             ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "forms":            ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "online form":      ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "examination form": ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "exam form":        ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "sem form":         ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "semester form":    ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "6th form":         ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    "6th sem form":     ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php", "https://jkbote.ac.in/notice.php"],
    
    # Session-specific terms found in actual notices
    "session":          ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeExam.php"],
    "kashmir":          ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeDatesheet.php"],
    "jammu":            ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeDatesheet.php"],
    "leh":              ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeDatesheet.php"],
    "kargil":           ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeDatesheet.php"],
    "division":         ["https://jkbote.ac.in/", "https://jkbote.ac.in/noticeDatesheet.php"],
}

# JKBOTE office information
OFFICE_INFO = {
    "central": "Old Secretariat Block A 1st Floor / Block C 2nd Floor, Srinagar 190001",
    "kashmir": "Old Secretariat Block B Ground Floor, Srinagar 190001", 
    "jammu": "Govt Polytechnic College premises, Bikram Chowk, Jammu 180004",
    "phone": "0191-2430650",
    "email": "jkbote2002@gmail.com"
}

# Helper functions
def get_target_urls(query: str) -> set:
    """Get target URLs based on query keywords"""
    target_urls = set()
    query_lower = query.lower()
    
    for key, urls in KEYWORD_MAP.items():
        if key in query_lower:
            target_urls.update(urls)
    
    # Default to notice page if no matches
    if not target_urls:
        target_urls.add("https://jkbote.ac.in/notice.php")
    
    return target_urls
