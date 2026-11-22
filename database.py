"""
AgriNova AI - Database Initialization and Connection Helper
Uses SQLite for robust, zero-configuration local persistence.
"""

import os
import sqlite3
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agrinova.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        phone TEXT,
        state TEXT DEFAULT 'Punjab',
        district TEXT DEFAULT 'Ludhiana',
        landholding REAL DEFAULT 5.0,
        farmer_category TEXT DEFAULT 'Small & Marginal Farmer',
        preferred_language TEXT DEFAULT 'en',
        preferred_crops TEXT DEFAULT 'Wheat,Rice',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Crop Disease Detection History
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS disease_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        crop_name TEXT NOT NULL,
        disease_name TEXT NOT NULL,
        confidence REAL NOT NULL,
        image_path TEXT,
        symptoms TEXT,
        causes TEXT,
        preventive_measures TEXT,
        expert_advice_needed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    # Fertilizer Recommendation History
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS fertilizer_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        crop_type TEXT NOT NULL,
        soil_type TEXT NOT NULL,
        soil_ph REAL,
        nitrogen REAL,
        phosphorus REAL,
        potassium REAL,
        farm_location TEXT,
        recommended_fertilizer TEXT NOT NULL,
        dosage TEXT,
        reason TEXT,
        precautions TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    # Market Price Prediction History
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS market_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        commodity TEXT NOT NULL,
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        mandi TEXT NOT NULL,
        current_price REAL,
        predicted_price REAL,
        prediction_period TEXT,
        trend TEXT,
        confidence REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    # Weather Queries History
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS weather_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        location TEXT NOT NULL,
        temperature REAL,
        humidity REAL,
        condition TEXT,
        advisories TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    # Saved Government Schemes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS saved_schemes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        scheme_id TEXT NOT NULL,
        scheme_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, scheme_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("AgriNova AI SQLite Database initialized successfully.")
