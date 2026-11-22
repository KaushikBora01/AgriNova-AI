"""
AgriNova AI - Authentication & Farmer Profile Module
Secure password hashing, token validation, and profile management.
"""

import time
import json
import base64
import hmac
import hashlib
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db_connection
from config import SECRET_KEY

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

def create_token(user_id, email):
    """Generate a tamper-proof signed JWT-like token"""
    header = base64.urlsafe_b64encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode()).decode().strip("=")
    payload = base64.urlsafe_b64encode(json.dumps({
        "user_id": user_id,
        "email": email,
        "exp": int(time.time()) + (72 * 3600)
    }).encode()).decode().strip("=")
    signature = hmac.new(SECRET_KEY.encode(), f"{header}.{payload}".encode(), hashlib.sha256).hexdigest()
    return f"{header}.{payload}.{signature}"

def verify_token(token_str):
    """Verify and decode a signed token"""
    if not token_str:
        return None
    try:
        parts = token_str.split(".")
        if len(parts) != 3:
            return None
        header, payload, signature = parts
        expected_sig = hmac.new(SECRET_KEY.encode(), f"{header}.{payload}".encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            return None
        
        # Add padding back if necessary
        padded_payload = payload + "=" * (-len(payload) % 4)
        data = json.loads(base64.urlsafe_b64decode(padded_payload.encode()).decode())
        if data.get("exp", 0) < time.time():
            return None
        return data
    except Exception:
        return None

def get_current_user_from_request():
    """Extract authenticated user from Authorization header"""
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ", 1)[1].strip()
        data = verify_token(token)
        if data:
            conn = get_db_connection()
            user = conn.execute("SELECT id, name, email, phone, state, district, landholding, farmer_category, preferred_language, preferred_crops, created_at FROM users WHERE id = ?", (data["user_id"],)).fetchone()
            conn.close()
            if user:
                return dict(user)
    return None

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    phone = data.get("phone", "").strip()
    state = data.get("state", "Punjab")
    district = data.get("district", "Ludhiana")
    try:
        landholding = float(data.get("landholding", 5.0) or 5.0)
    except (ValueError, TypeError):
        landholding = 5.0
    farmer_category = data.get("farmer_category", "Small & Marginal Farmer")
    preferred_language = data.get("preferred_language", "en")
    preferred_crops = data.get("preferred_crops", "Wheat, Rice")

    if not name or not email or not password:
        return jsonify({"success": False, "error": "Name, email, and password are required"}), 400

    if len(password) < 6:
        return jsonify({"success": False, "error": "Password must be at least 6 characters long"}), 400

    conn = get_db_connection()
    existing = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
    if existing:
        conn.close()
        return jsonify({"success": False, "error": "An account with this email already exists"}), 409

    password_hash = generate_password_hash(password)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO users (name, email, password_hash, phone, state, district, landholding, farmer_category, preferred_language, preferred_crops)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (name, email, password_hash, phone, state, district, landholding, farmer_category, preferred_language, preferred_crops))
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()

    token = create_token(user_id, email)
    return jsonify({
        "success": True,
        "message": "Registration successful",
        "token": token,
        "user": {
            "id": user_id,
            "name": name,
            "email": email,
            "phone": phone,
            "state": state,
            "district": district,
            "landholding": landholding,
            "farmer_category": farmer_category,
            "preferred_language": preferred_language,
            "preferred_crops": preferred_crops
        }
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"success": False, "error": "Email and password are required"}), 400

    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    conn.close()

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"success": False, "error": "Invalid email or password"}), 401

    token = create_token(user["id"], user["email"])
    return jsonify({
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "phone": user["phone"],
            "state": user["state"],
            "district": user["district"],
            "landholding": user["landholding"],
            "farmer_category": user["farmer_category"],
            "preferred_language": user["preferred_language"],
            "preferred_crops": user["preferred_crops"]
        }
    })

@auth_bp.route("/me", methods=["GET"])
def get_me():
    user = get_current_user_from_request()
    if not user:
        return jsonify({"success": False, "error": "Unauthorized"}), 401
    return jsonify({"success": True, "user": user})

@auth_bp.route("/profile", methods=["PUT"])
def update_profile():
    user = get_current_user_from_request()
    if not user:
        return jsonify({"success": False, "error": "Unauthorized"}), 401

    data = request.get_json() or {}
    name = data.get("name", user["name"]).strip()
    phone = data.get("phone", user["phone"]).strip()
    state = data.get("state", user["state"])
    district = data.get("district", user["district"])
    try:
        landholding = float(data.get("landholding", user["landholding"]) or 0.0)
    except (ValueError, TypeError):
        landholding = float(user["landholding"] or 0.0)
    farmer_category = data.get("farmer_category", user["farmer_category"])
    preferred_language = data.get("preferred_language", user["preferred_language"])
    preferred_crops = data.get("preferred_crops", user["preferred_crops"])

    conn = get_db_connection()
    conn.execute("""
        UPDATE users
        SET name = ?, phone = ?, state = ?, district = ?, landholding = ?,
            farmer_category = ?, preferred_language = ?, preferred_crops = ?
        WHERE id = ?
    """, (name, phone, state, district, landholding, farmer_category, preferred_language, preferred_crops, user["id"]))
    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Profile updated successfully",
        "user": {
            "id": user["id"],
            "name": name,
            "email": user["email"],
            "phone": phone,
            "state": state,
            "district": district,
            "landholding": landholding,
            "farmer_category": farmer_category,
            "preferred_language": preferred_language,
            "preferred_crops": preferred_crops
        }
    })
