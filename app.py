"""
AgriNova AI - Smart Agriculture Assistant
Main Flask Application Server
"""

import os
from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS
from config import BASE_DIR, UPLOAD_FOLDER, MAX_CONTENT_LENGTH, SECRET_KEY
from database import init_db

# Import modular blueprints
from modules.auth import auth_bp
from modules.disease_detection import disease_bp
from modules.fertilizer_engine import fertilizer_bp
from modules.weather_service import weather_bp
from modules.market_prediction import market_bp
from modules.voice_assistant import voice_bp
from modules.government_schemes import schemes_bp
from modules.farming_tips import tips_bp
from modules.history_service import history_bp

app = Flask(__name__, static_folder="static", template_folder="templates")
app.config["SECRET_KEY"] = SECRET_KEY
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH

# Enable CORS for flexible integration
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(disease_bp)
app.register_blueprint(fertilizer_bp)
app.register_blueprint(weather_bp)
app.register_blueprint(market_bp)
app.register_blueprint(voice_bp)
app.register_blueprint(schemes_bp)
app.register_blueprint(tips_bp)
app.register_blueprint(history_bp)

# Initialize Database Schema
init_db()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/static/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/api/health")
def health_check():
    return jsonify({
        "status": "healthy",
        "app": "AgriNova AI – Smart Agriculture Assistant",
        "version": "2.4.0",
        "features": [
            "AI Crop Disease Detection",
            "AI Fertilizer Recommendation",
            "Real-Time Weather Updates & Agro-Advisories",
            "AI Market Price Prediction (Scikit-Learn ML)",
            "Multilingual AI Voice Assistant",
            "Government Agricultural Schemes & Benefits",
            "12 Regional Indian Languages Support"
        ]
    })

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({"success": False, "error": "File size exceeds the 16MB limit. Please upload a smaller image."}), 413

@app.errorhandler(404)
def not_found(error):
    # Support client-side SPA routing
    return render_template("index.html")

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"success": False, "error": "Internal server error occurred. Please try again."}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"============================================================")
    print(f" AgriNova AI Server starting at http://localhost:{port}")
    print(f" Smart Agriculture Assistant for Indian Farmers")
    print(f"============================================================")
    app.run(host="0.0.0.0", port=port, debug=True)
