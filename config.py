"""
AgriNova AI - Configuration Settings
"""

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SECRET_KEY = os.environ.get("AGRINOVA_SECRET_KEY", "agrinova-ai-secure-secret-key-2025")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 72

UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max image upload size
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}

# Weather API configuration (Use OPENWEATHER_API_KEY environment variable if available)
OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY", "")

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "static", "css"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "static", "js", "components"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "templates"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "modules"), exist_ok=True)
