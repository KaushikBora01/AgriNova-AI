"""
AgriNova AI - Consolidated History & Farmer Records Service
Provides aggregated user history, statistics, and record deletion.
"""

from flask import Blueprint, request, jsonify
from database import get_db_connection
from modules.auth import get_current_user_from_request

history_bp = Blueprint("history", __name__, url_prefix="/api/history")

@history_bp.route("/all", methods=["GET"])
def get_all_history():
    user = get_current_user_from_request()
    user_id = user["id"] if user else None

    conn = get_db_connection()

    if user_id:
        disease_rows = conn.execute("SELECT * FROM disease_history WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
        fertilizer_rows = conn.execute("SELECT * FROM fertilizer_history WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
        market_rows = conn.execute("SELECT * FROM market_history WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
        weather_rows = conn.execute("SELECT * FROM weather_history WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
    else:
        # For non-authenticated demo exploration, show latest records
        disease_rows = conn.execute("SELECT * FROM disease_history ORDER BY created_at DESC LIMIT 10").fetchall()
        fertilizer_rows = conn.execute("SELECT * FROM fertilizer_history ORDER BY created_at DESC LIMIT 10").fetchall()
        market_rows = conn.execute("SELECT * FROM market_history ORDER BY created_at DESC LIMIT 10").fetchall()
        weather_rows = conn.execute("SELECT * FROM weather_history ORDER BY created_at DESC LIMIT 10").fetchall()

    conn.close()

    return jsonify({
        "success": True,
        "disease_records": [dict(r) for r in disease_rows],
        "fertilizer_records": [dict(r) for r in fertilizer_rows],
        "market_records": [dict(r) for r in market_rows],
        "weather_records": [dict(r) for r in weather_rows],
        "summary": {
            "total_disease_scans": len(disease_rows),
            "total_fertilizer_plans": len(fertilizer_rows),
            "total_market_checks": len(market_rows),
            "total_weather_checks": len(weather_rows)
        }
    })

@history_bp.route("/delete", methods=["DELETE"])
def delete_record():
    user = get_current_user_from_request()
    record_type = request.args.get("type", "").strip() # disease, fertilizer, market, weather
    record_id = request.args.get("id", type=int)

    if not record_type or not record_id:
        return jsonify({"success": False, "error": "Both type and id parameters are required"}), 400

    table_map = {
        "disease": "disease_history",
        "fertilizer": "fertilizer_history",
        "market": "market_history",
        "weather": "weather_history"
    }

    table_name = table_map.get(record_type)
    if not table_name:
        return jsonify({"success": False, "error": "Invalid record type"}), 400

    conn = get_db_connection()
    if user:
        conn.execute(f"DELETE FROM {table_name} WHERE id = ? AND user_id = ?", (record_id, user["id"]))
    else:
        conn.execute(f"DELETE FROM {table_name} WHERE id = ?", (record_id,))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": f"{record_type.title()} record deleted successfully"})
