"""
AgriNova AI - AI Fertilizer Recommendation Engine
Scientifically grounded nutrient deficit calculation based on ICAR
(Indian Council of Agricultural Research) agronomic standards.
"""

from flask import Blueprint, request, jsonify
from database import get_db_connection
from modules.auth import get_current_user_from_request

fertilizer_bp = Blueprint("fertilizer", __name__, url_prefix="/api/fertilizer")

# Standard Crop Nutrient Requirements (in kg/hectare: N, P2O5, K2O) and optimal pH
CROP_NUTRIENT_PROFILES = {
    "Wheat": {"N": 120, "P": 60, "K": 40, "optimal_ph_min": 6.0, "optimal_ph_max": 7.5, "growth_duration_days": 135},
    "Rice (Paddy)": {"N": 100, "P": 50, "K": 50, "optimal_ph_min": 5.5, "optimal_ph_max": 7.0, "growth_duration_days": 130},
    "Maize (Corn)": {"N": 120, "P": 60, "K": 50, "optimal_ph_min": 5.8, "optimal_ph_max": 7.2, "growth_duration_days": 110},
    "Cotton": {"N": 100, "P": 50, "K": 50, "optimal_ph_min": 6.0, "optimal_ph_max": 8.0, "growth_duration_days": 160},
    "Potato": {"N": 150, "P": 100, "K": 120, "optimal_ph_min": 5.0, "optimal_ph_max": 6.5, "growth_duration_days": 90},
    "Tomato": {"N": 100, "P": 60, "K": 80, "optimal_ph_min": 6.0, "optimal_ph_max": 7.0, "growth_duration_days": 120},
    "Sugarcane": {"N": 250, "P": 100, "K": 120, "optimal_ph_min": 6.5, "optimal_ph_max": 7.8, "growth_duration_days": 365},
    "Mustard": {"N": 80, "P": 40, "K": 40, "optimal_ph_min": 6.0, "optimal_ph_max": 7.5, "growth_duration_days": 110},
    "Soybean": {"N": 30, "P": 60, "K": 40, "optimal_ph_min": 6.0, "optimal_ph_max": 7.0, "growth_duration_days": 100},
    "Chickpea (Chana)": {"N": 25, "P": 50, "K": 30, "optimal_ph_min": 6.0, "optimal_ph_max": 7.5, "growth_duration_days": 110},
    "Onion": {"N": 100, "P": 50, "K": 80, "optimal_ph_min": 6.0, "optimal_ph_max": 7.5, "growth_duration_days": 130},
    "Groundnut": {"N": 25, "P": 50, "K": 40, "optimal_ph_min": 5.8, "optimal_ph_max": 6.8, "growth_duration_days": 115}
}

# Soil Characteristics & Retention Factors
SOIL_FACTORS = {
    "Alluvial Soil": {"n_retention": 0.85, "p_retention": 0.75, "k_retention": 0.90, "organic_matter": "Moderate"},
    "Black Soil (Regur)": {"n_retention": 0.90, "p_retention": 0.70, "k_retention": 0.95, "organic_matter": "High in Potash"},
    "Red Soil": {"n_retention": 0.75, "p_retention": 0.65, "k_retention": 0.80, "organic_matter": "Low to Moderate"},
    "Laterite Soil": {"n_retention": 0.65, "p_retention": 0.50, "k_retention": 0.65, "organic_matter": "Acidic, Low in N/P"},
    "Sandy / Sandy Loam": {"n_retention": 0.60, "p_retention": 0.60, "k_retention": 0.65, "organic_matter": "Leaching Prone"},
    "Clay Soil": {"n_retention": 0.90, "p_retention": 0.80, "k_retention": 0.90, "organic_matter": "Heavy, High Water Hold"},
    "Loamy Soil": {"n_retention": 0.88, "p_retention": 0.82, "k_retention": 0.88, "organic_matter": "Ideal Balanced Soil"}
}

def calculate_recommendation(crop, soil_type, ph, n_soil, p_soil, k_soil, farm_location, crop_stage="Basal / Pre-Sowing"):
    crop_info = CROP_NUTRIENT_PROFILES.get(crop, CROP_NUTRIENT_PROFILES["Wheat"])
    soil_info = SOIL_FACTORS.get(soil_type, SOIL_FACTORS["Loamy Soil"])

    # Calculate deficit (kg/ha)
    # n_soil, p_soil, k_soil in kg/ha
    n_req = crop_info["N"]
    p_req = crop_info["P"]
    k_req = crop_info["K"]

    n_deficit = max(0.0, n_req - (n_soil * soil_info["n_retention"]))
    p_deficit = max(0.0, p_req - (p_soil * soil_info["p_retention"]))
    k_deficit = max(0.0, k_req - (k_soil * soil_info["k_retention"]))

    # 1 hectare = 2.471 acres, so kg/acre = kg/ha / 2.471
    HA_TO_ACRE = 2.471
    n_def_acre = round(n_deficit / HA_TO_ACRE, 1)
    p_def_acre = round(p_deficit / HA_TO_ACRE, 1)
    k_def_acre = round(k_deficit / HA_TO_ACRE, 1)

    # Determine recommended fertilizer formulation
    primary_fertilizer = ""
    dosage_kg_acre = ""
    secondary_supplements = []
    reason_lines = []

    # Check pH correction
    ph_status = "Optimal"
    ph_remedy = ""
    if ph < crop_info["optimal_ph_min"]:
        ph_status = f"Acidic (pH {ph} < optimal {crop_info['optimal_ph_min']})"
        ph_remedy = "Apply agricultural lime (calcium carbonate) or dolomite @ 200-250 kg/acre 2 weeks before sowing to neutralize soil acidity."
    elif ph > crop_info["optimal_ph_max"]:
        ph_status = f"Alkaline (pH {ph} > optimal {crop_info['optimal_ph_max']})"
        ph_remedy = "Apply agricultural gypsum @ 150-200 kg/acre and well-decomposed Farmyard Manure (FYM) to improve permeability and lower sodicity."

    # Logic for selecting ideal commercial grades (DAP, Urea, MOP, 10-26-26, 12-32-16, 19-19-19)
    # DAP contains 18% N, 46% P2O5
    # Urea contains 46% N
    # MOP (Muriate of Potash) contains 60% K2O
    # SSP (Single Super Phosphate) contains 16% P2O5 + 11% Sulphur

    dap_needed_acre = round(p_def_acre / 0.46, 1) if p_def_acre > 0 else 0
    n_from_dap_acre = dap_needed_acre * 0.18
    remaining_n_acre = max(0.0, n_def_acre - n_from_dap_acre)
    urea_needed_acre = round(remaining_n_acre / 0.46, 1)
    mop_needed_acre = round(k_def_acre / 0.60, 1) if k_def_acre > 0 else 0

    if p_def_acre > 15 and k_def_acre > 15:
        primary_fertilizer = "NPK Complex (12:32:16) + Top-dressing Urea"
        dosage_kg_acre = f"NPK 12:32:16: {round(p_def_acre / 0.32, 1)} kg/acre basal + Urea: {round(remaining_n_acre / 0.46, 1)} kg/acre split"
        reason_lines.append(f"Soil is deficient in both Phosphorus ({p_def_acre} kg/acre) and Potassium ({k_def_acre} kg/acre) for optimal {crop} vigor.")
    elif p_def_acre > 10:
        primary_fertilizer = "DAP (Diammonium Phosphate 18:46:0) + Urea + MOP"
        dosage_kg_acre = f"DAP: {dap_needed_acre} kg/acre (basal) + Urea: {urea_needed_acre} kg/acre (split) + MOP: {mop_needed_acre} kg/acre"
        reason_lines.append(f"DAP will fulfill root-stimulating phosphorus requirement ({p_def_acre} kg/acre), followed by split Urea for foliar nitrogen.")
    elif n_def_acre > 15 and p_def_acre <= 10:
        primary_fertilizer = "Urea (46% Nitrogen) + Muriate of Potash (MOP)"
        dosage_kg_acre = f"Urea: {urea_needed_acre} kg/acre (2 splits) + MOP: {mop_needed_acre} kg/acre"
        reason_lines.append(f"Soil phosphorus is sufficient; primary focus is vegetative nitrogen supply and potassium for stress tolerance.")
    else:
        primary_fertilizer = "Balanced NPK 19:19:19 + Organic Vermicompost"
        dosage_kg_acre = "NPK 19-19-19: 25-30 kg/acre + Vermicompost: 400-500 kg/acre"
        reason_lines.append(f"Soil has near-balanced macronutrient reserves. A maintenance grade of water-soluble NPK with organic matter is recommended.")

    # Micronutrient & Biofertilizer Recommendations
    if "Paddy" in crop or "Rice" in crop:
        secondary_supplements.append("Zinc Sulphate (ZnSO4 21%): 10 kg/acre to prevent 'Khaira' disease.")
        secondary_supplements.append("Azospirillum & PSB (Phosphate Solubilizing Bacteria) bio-fertilizers @ 2 kg/acre.")
    elif crop in ["Wheat", "Maize (Corn)"]:
        secondary_supplements.append("Zinc Sulphate monohydrate (33% Zn): 5 kg/acre during field preparation.")
        secondary_supplements.append("Azotobacter bio-culture @ 250 ml/acre seed treatment.")
    elif crop in ["Tomato", "Potato"]:
        secondary_supplements.append("Calcium Nitrate: 10 kg/acre at fruit/tuber initiation to prevent Blossom End Rot / internal necrosis.")
        secondary_supplements.append("Boron (Solubor 20%): 1 kg/acre foliar spray before flowering.")
    elif crop in ["Mustard", "Soybean", "Groundnut"]:
        secondary_supplements.append("Agricultural Gypsum / Elemental Sulphur (90% WDG): 15 kg/acre to increase oil content.")

    # Split Application Guidance
    application_schedule = [
        {"stage": "Basal (At Sowing / Planting)", "guidance": f"Apply 100% of P (e.g., DAP/SSP), 50% of Potash (MOP), and 1/3rd of total Urea 3-5 cm below seed depth."},
        {"stage": "Vegetative / Tillering Stage (20-30 Days After Sowing)", "guidance": "Top-dress 1/3rd of Urea when soil is moist after first irrigation or weeding."},
        {"stage": "Flowering / Boot Stage (45-60 Days After Sowing)", "guidance": "Top-dress final 1/3rd of Urea along with remaining Potash. Avoid top-dressing during heavy rain forecasts."}
    ]

    precautions = [
        "Never broadcast nitrogen fertilizer on dry cracked soil; apply strictly when soil moisture is adequate.",
        "Do not mix Diammonium Phosphate (DAP) directly with agricultural lime or unslaked lime as it leads to ammonia volatilization.",
        "Keep chemical fertilizer granules 5-7 cm away from direct contact with young seedlings or stems to prevent chemical root burn.",
        "Wear rubber gloves and protective goggles while broadcasting or handling concentrated chemical and micronutrient fertilizers."
    ]

    disclaimer = (
        "Disclaimer: These fertilizer dosage estimates are generated according to standard ICAR agronomic models and regional soil retention indexes. "
        "Farmers are strongly advised to cross-verify recommendations against their local Soil Health Card (SHC) and consult their block Agriculture Development Officer (ADO) or Krishi Vigyan Kendra (KVK)."
    )

    return {
        "crop": crop,
        "soil_type": soil_type,
        "soil_ph": ph,
        "ph_status": ph_status,
        "ph_remedy": ph_remedy,
        "nutrient_status": {
            "nitrogen": {"soil_level": n_soil, "crop_required": n_req, "deficit_kg_acre": n_def_acre, "status": "Low" if n_def_acre > 20 else "Moderate" if n_def_acre > 5 else "Sufficient"},
            "phosphorus": {"soil_level": p_soil, "crop_required": p_req, "deficit_kg_acre": p_def_acre, "status": "Low" if p_def_acre > 15 else "Moderate" if p_def_acre > 5 else "Sufficient"},
            "potassium": {"soil_level": k_soil, "crop_required": k_req, "deficit_kg_acre": k_def_acre, "status": "Low" if k_def_acre > 15 else "Moderate" if k_def_acre > 5 else "Sufficient"}
        },
        "recommended_fertilizer": primary_fertilizer,
        "dosage": dosage_kg_acre,
        "secondary_supplements": secondary_supplements,
        "reason": " ".join(reason_lines),
        "application_schedule": application_schedule,
        "precautions": precautions,
        "disclaimer": disclaimer,
        "farm_location": farm_location
    }

@fertilizer_bp.route("/recommend", methods=["POST"])
def get_recommendation():
    data = request.get_json() or {}

    crop = data.get("crop", "Wheat")
    soil_type = data.get("soil_type", "Loamy Soil")
    try:
        ph = float(data.get("ph", 6.8) or 6.8)
    except (ValueError, TypeError):
        ph = 6.8
    try:
        n = float(data.get("nitrogen", 140.0) or 140.0)
    except (ValueError, TypeError):
        n = 140.0
    try:
        p = float(data.get("phosphorus", 35.0) or 35.0)
    except (ValueError, TypeError):
        p = 35.0
    try:
        k = float(data.get("potassium", 180.0) or 180.0)
    except (ValueError, TypeError):
        k = 180.0
    farm_location = data.get("farm_location", "Punjab, India")
    crop_stage = data.get("crop_stage", "Basal / Pre-Sowing")

    result = calculate_recommendation(crop, soil_type, ph, n, p, k, farm_location, crop_stage)

    # Persist in user history
    user = get_current_user_from_request()
    user_id = user["id"] if user else None

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO fertilizer_history (
            user_id, crop_type, soil_type, soil_ph, nitrogen, phosphorus, potassium,
            farm_location, recommended_fertilizer, dosage, reason, precautions
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        user_id, crop, soil_type, ph, n, p, k, farm_location,
        result["recommended_fertilizer"], result["dosage"], result["reason"],
        "; ".join(result["precautions"])
    ))
    conn.commit()
    record_id = cursor.lastrowid
    conn.close()

    result["record_id"] = record_id
    result["success"] = True
    return jsonify(result)

@fertilizer_bp.route("/history", methods=["GET"])
def get_fertilizer_history():
    user = get_current_user_from_request()
    conn = get_db_connection()
    if user:
        rows = conn.execute("SELECT * FROM fertilizer_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 20", (user["id"],)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM fertilizer_history ORDER BY created_at DESC LIMIT 10").fetchall()
    conn.close()
    return jsonify({"success": True, "history": [dict(r) for r in rows]})
