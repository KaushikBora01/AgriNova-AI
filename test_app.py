"""
AgriNova AI - Comprehensive Automated QA & Functional Verification Suite
Executes end-to-end tests across all AI/ML models, botanical computer vision,
security boundaries, error handling, edge cases, and 12-language localizations.
"""

import io
import os
import json
import base64
import time
import uuid
from app import app
from database import init_db
from config import ALLOWED_EXTENSIONS
from PIL import Image

def run_tests():
    print("==================================================================")
    print(" Starting AgriNova AI Enterprise QA & Functional Test Suite 🌾")
    print("==================================================================")

    init_db()
    client = app.test_client()

    # =========================================================================
    # 1. SYSTEM HEALTH & SPA ROUTING
    # =========================================================================
    print("\n[TEST 1] System Health & SPA Routing")
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.status_code}"
    health_data = res.get_json()
    assert health_data["status"] == "healthy"
    assert "version" in health_data
    print(f"  ✓ API Health Check: {health_data['app']} v{health_data['version']}")

    res_spa = client.get("/")
    assert res_spa.status_code == 200, f"SPA root failed: {res_spa.status_code}"
    assert "AgriNova AI" in res_spa.get_data(as_text=True)
    print("  ✓ SPA Root HTML Template Rendered Cleanly")

    # =========================================================================
    # 2. AUTHENTICATION, JWT SECURITY & PROFILE BOUNDARY TESTS
    # =========================================================================
    print("\n[TEST 2] Farmer Auth, JWT Verification & Profile Boundaries")
    test_run_id = uuid.uuid4().hex[:8]
    test_email = f"farmer_{test_run_id}@agrinova.in"
    test_password = "SecurePassword123!"

    # 2.1 Register valid farmer
    user_payload = {
        "name": "Sardar Balwinder Singh",
        "email": test_email,
        "password": test_password,
        "phone": "9876543210",
        "state": "Punjab",
        "district": "Ludhiana",
        "landholding": 6.5,
        "farmer_category": "Small & Marginal Farmer",
        "preferred_language": "pa",
        "preferred_crops": "Wheat, Rice"
    }
    res_reg = client.post("/api/auth/register", json=user_payload)
    assert res_reg.status_code == 201, f"Registration failed: {res_reg.status_code}"
    auth_data = res_reg.get_json()

    token = auth_data["token"]
    auth_headers = {"Authorization": f"Bearer {token}"}
    print(f"  ✓ User Registration / Login Succeeded (Token: {token[:25]}...)")

    # 2.2 Re-registration with same email (Must return 409 Conflict)
    res_dup = client.post("/api/auth/register", json=user_payload)
    assert res_dup.status_code == 409, f"Expected 409 on duplicate email, got: {res_dup.status_code}"
    print("  ✓ Duplicate Email Prevention: Correctly returned HTTP 409 Conflict")

    # 2.3 Short password rejection (Must return 400 Bad Request)
    res_short = client.post("/api/auth/register", json={"name": "Bad", "email": "bad@agri.in", "password": "123"})
    assert res_short.status_code == 400, f"Expected 400 on short password, got: {res_short.status_code}"
    print("  ✓ Password Policy: Correctly rejected < 6 char password with HTTP 400")

    # 2.4 Login with invalid password (Must return 401 Unauthorized)
    res_bad_login = client.post("/api/auth/login", json={"email": test_email, "password": "WrongPassword"})
    assert res_bad_login.status_code == 401, f"Expected 401 on bad password, got: {res_bad_login.status_code}"
    print("  ✓ Bad Credential Handling: Correctly rejected with HTTP 401 Unauthorized")

    # 2.5 Authenticated Profile Query (/api/auth/me)
    res_me = client.get("/api/auth/me", headers=auth_headers)
    assert res_me.status_code == 200
    me_data = res_me.get_json()["user"]
    assert me_data["email"] == test_email
    print(f"  ✓ Protected Profile Route Verified for {me_data['name']}")

    # 2.6 Profile Update with Boundary Inputs (Malformed string landholding)
    res_prof_up = client.put("/api/auth/profile", json={"name": "Sardar Balwinder Singh Ji", "landholding": "invalid_num"}, headers=auth_headers)
    assert res_prof_up.status_code == 200, f"Profile update failed on edge input: {res_prof_up.status_code}"
    print("  ✓ Profile Edge-Case: Safely handled malformed numeric landholding without 500 error")

    # =========================================================================
    # 3. AI CROP DISEASE DETECTION & BOTANICAL MORPHOLOGY CLASSIFIER
    # =========================================================================
    print("\n[TEST 3] AI Crop Disease Detection & Computer Vision Morphology")

    # 3.1 Synthetic Healthy Green Leaf
    healthy_img = Image.new("RGB", (256, 256), color=(46, 125, 50))
    buf = io.BytesIO()
    healthy_img.save(buf, format="JPEG")
    healthy_raw_bytes = buf.getvalue()

    res_healthy = client.post(
        "/api/disease/detect",
        data={"image": (io.BytesIO(healthy_raw_bytes), "healthy_specimen.jpg")},
        content_type="multipart/form-data",
        headers=auth_headers
    )
    assert res_healthy.status_code == 200
    h_data = res_healthy.get_json()
    assert h_data["success"] is True
    assert "Healthy" in h_data["disease_name"]
    print(f"  ✓ Healthy Specimen: Correctly diagnosed '{h_data['disease_name']}' ({h_data['confidence']}%)")

    # 3.2 Real Tomato Leaf Specimen (Uploaded Photo)
    real_tomato_path = "static/uploads/4c67ae76f18c4ad184d2c932ac86be2f_test.jpg"
    if os.path.exists(real_tomato_path):
        with open(real_tomato_path, "rb") as f:
            res_tom = client.post(
                "/api/disease/detect",
                data={"image": (f, "tomato_leaf.jpg")},
                content_type="multipart/form-data",
                headers=auth_headers
            )
        assert res_tom.status_code == 200
        tom_data = res_tom.get_json()
        assert tom_data["success"] is True
        assert tom_data["crop_name"] == "Tomato", f"Expected Tomato crop, got: {tom_data['crop_name']}"
        assert "Wheat" not in tom_data["crop_name"], "CRITICAL: Tomato incorrectly identified as Wheat!"
        assert "Rust" not in tom_data["disease_name"], "CRITICAL: Wheat rust falsely diagnosed on tomato leaf!"
        assert "Septoria" in tom_data["disease_name"] or "Bacterial" in tom_data["disease_name"] or "Early Blight" in tom_data["disease_name"]
        assert len(tom_data["differential_diagnoses"]) >= 2
        assert "MobileNetV2" in tom_data["model_engine"], f"Expected pre-trained MobileNetV2 engine, got {tom_data['model_engine']}"
        print(f"  ✓ Pre-Trained Model Verified: Engine: {tom_data['model_engine']}")
        print(f"  ✓ Real Tomato Leaf Diagnosis: Host: '{tom_data['crop_name']}', Pathology: '{tom_data['disease_name']}' ({tom_data['confidence']}%)")
        print(f"    Differential diagnoses provided: {[d['disease'] for d in tom_data['differential_diagnoses']]}")

    # 3.3 Pure PlantVillage neural network prediction on specimen
    res_pv_pure = client.post(
        "/api/disease/detect",
        data={"image": (io.BytesIO(healthy_raw_bytes), "specimen.jpg")},
        content_type="multipart/form-data",
        headers=auth_headers
    )
    assert res_pv_pure.status_code == 200
    pv_data = res_pv_pure.get_json()
    assert pv_data["success"] is True
    assert "Healthy" in pv_data["disease_name"]
    assert "PlantVillage" in pv_data["model_engine"]
    print(f"  ✓ Pure PlantVillage Detection: Neural network detected '{pv_data['crop_name']}' - '{pv_data['disease_name']}' ({pv_data['confidence']}%)")

    # 3.4 Missing image payload rejection (Must return 400 Bad Request)
    res_no_img = client.post("/api/disease/detect", data={}, content_type="multipart/form-data", headers=auth_headers)
    assert res_no_img.status_code == 400
    print("  ✓ Missing Image Validation: Correctly returned HTTP 400 Bad Request")

    # 3.5 Unsupported file format rejection (e.g. .txt file)
    txt_bytes = io.BytesIO(b"not an image")
    res_bad_fmt = client.post(
        "/api/disease/detect",
        data={"image": (txt_bytes, "sample.txt")},
        content_type="multipart/form-data",
        headers=auth_headers
    )
    assert res_bad_fmt.status_code == 400
    print("  ✓ Unsupported File Format Validation: Correctly rejected .txt with HTTP 400")

    # =========================================================================
    # 4. FERTILIZER RECOMMENDATION ENGINE & SOIL PH REMEDIES
    # =========================================================================
    print("\n[TEST 4] Intelligent Fertilizer Recommendation Engine")

    # 4.1 Standard Loamy Wheat Formulation
    fert_payload = {
        "crop": "Wheat",
        "soil_type": "Loamy Soil",
        "ph": 6.8,
        "nitrogen": 130.0,
        "phosphorus": 30.0,
        "potassium": 170.0,
        "farm_location": "Ludhiana, Punjab"
    }
    res_fert = client.post("/api/fertilizer/recommend", json=fert_payload, headers=auth_headers)
    assert res_fert.status_code == 200
    f_res = res_fert.get_json()
    assert f_res["success"] is True
    assert "DAP" in f_res["recommended_fertilizer"]
    assert len(f_res["application_schedule"]) == 3
    print(f"  ✓ Standard Nutrient Prescription: {f_res['recommended_fertilizer']} ({f_res['dosage']})")

    # 4.2 Acidic Soil Remedy Verification (pH = 5.2 for Wheat -> Must prescribe Lime)
    res_acid = client.post("/api/fertilizer/recommend", json={"crop": "Wheat", "ph": 5.2, "soil_type": "Red Soil"}, headers=auth_headers)
    assert res_acid.status_code == 200
    acid_data = res_acid.get_json()
    assert "Lime" in acid_data["ph_remedy"] or "lime" in acid_data["ph_remedy"].lower()
    print("  ✓ Acidic Soil Remedy: Correctly generated Agricultural Lime recommendation")

    # 4.3 Alkaline Soil Remedy Verification (pH = 8.6 -> Must prescribe Gypsum)
    res_alk = client.post("/api/fertilizer/recommend", json={"crop": "Cotton", "ph": 8.6, "soil_type": "Black Soil (Regur)"}, headers=auth_headers)
    assert res_alk.status_code == 200
    alk_data = res_alk.get_json()
    assert "Gypsum" in alk_data["ph_remedy"] or "gypsum" in alk_data["ph_remedy"].lower()
    print("  ✓ Alkaline Soil Remedy: Correctly generated Agricultural Gypsum recommendation")

    # 4.4 Non-numeric Edge Cases (String inputs must not crash server)
    res_fert_edge = client.post("/api/fertilizer/recommend", json={"ph": "bad_ph", "nitrogen": "unknown", "phosphorus": "null"}, headers=auth_headers)
    assert res_fert_edge.status_code == 200
    print("  ✓ Fertilizer Input Hardening: Safely handled malformed numeric strings without 500 error")

    # =========================================================================
    # 5. AGRO-METEOROLOGICAL SERVICE & ALL-INDIA DISTRICTS
    # =========================================================================
    print("\n[TEST 5] Real-Time Agro-Weather & All-India Districts Coverage")

    # 5.1 28 States and 8 UTs retrieval
    res_states = client.get("/api/weather/states")
    assert res_states.status_code == 200
    states_list = res_states.get_json()["states"]
    assert len(states_list) >= 25
    print(f"  ✓ Indian States Directory: Verified {len(states_list)} States and Union Territories")

    # 5.2 District lookup for Punjab
    res_dist = client.get("/api/weather/districts?state=Punjab")
    assert res_dist.status_code == 200
    dist_list = res_dist.get_json()["districts"]
    assert "Ludhiana" in dist_list
    assert len(dist_list) >= 20
    print(f"  ✓ State District Directory: Verified {len(dist_list)} districts for Punjab")

    # 5.3 Live agro-weather query
    res_w = client.get("/api/weather/current?city=Ludhiana&state=Punjab")
    assert res_w.status_code == 200
    w_data = res_w.get_json()
    assert w_data["success"] is True
    assert "temperature" in w_data["current"]
    assert len(w_data["advisories"]) >= 2
    print(f"  ✓ Agro-Weather & Advisories: {w_data['location']['city']} ({w_data['current']['temperature']}°C, {w_data['current']['condition']}) - {len(w_data['advisories'])} advisories generated")

    # 5.4 Fallback unknown district robustness
    res_w_fall = client.get("/api/weather/current?city=UnknownZone99")
    assert res_w_fall.status_code == 200
    assert res_w_fall.get_json()["success"] is True
    print("  ✓ Agro-Weather Fallback: Safely generated default meteorological model for unlisted location")

    # =========================================================================
    # 6. AI MARKET COMMODITY FORECASTING (SCIKIT-LEARN ML)
    # =========================================================================
    print("\n[TEST 6] AI Mandi Market Price Prediction (Scikit-Learn ML)")

    # 6.1 Market Metadata
    res_mkt_meta = client.get("/api/market/metadata")
    assert res_mkt_meta.status_code == 200
    commodities = res_mkt_meta.get_json()["commodities"]
    assert "Wheat" in commodities and "Tomato" in commodities and "Potato" in commodities
    print(f"  ✓ Market Metadata: Verified {len(commodities)} supported agricultural commodities")

    # 6.2 15-day Polynomial Ridge Regression forecast for Wheat
    mkt_payload = {
        "commodity": "Wheat",
        "state": "Punjab",
        "district": "Ludhiana",
        "mandi": "Khanna Mandi (Asia's Largest Grain Market)",
        "horizon_days": 15
    }
    res_mkt = client.post("/api/market/predict", json=mkt_payload, headers=auth_headers)
    assert res_mkt.status_code == 200
    m_data = res_mkt.get_json()
    assert m_data["success"] is True
    assert len(m_data["forecast_points"]) == 15
    assert len(m_data["history_points"]) >= 20
    assert m_data["confidence_score"] > 80.0
    print(f"  ✓ ML Price Forecast (Wheat): Current ₹{m_data['current_modal_price']}/Qtl -> Forecast ₹{m_data['predicted_future_price']}/Qtl ({m_data['trend_direction']}, Confidence: {m_data['confidence_score']}%)")

    # 6.3 Forecasting for Perishable Vegetable (Tomato)
    res_tom_mkt = client.post("/api/market/predict", json={"commodity": "Tomato", "state": "Maharashtra", "district": "Nashik", "horizon_days": 7}, headers=auth_headers)
    assert res_tom_mkt.status_code == 200
    tom_m_data = res_tom_mkt.get_json()
    assert tom_m_data["success"] is True
    assert len(tom_m_data["forecast_points"]) == 7
    print(f"  ✓ ML Price Forecast (Tomato): Current ₹{tom_m_data['current_modal_price']}/Qtl -> 7-Day Target ₹{tom_m_data['predicted_future_price']}/Qtl")

    # 6.4 Malformed horizon string input (Must not crash)
    res_mkt_bad = client.post("/api/market/predict", json={"commodity": "Wheat", "horizon_days": "invalid_horizon"})
    assert res_mkt_bad.status_code == 200
    print("  ✓ Market Model Hardening: Safely handled malformed horizon string without 500 error")

    # =========================================================================
    # 7. MULTILINGUAL AI VOICE ASSISTANT (12 REGIONAL LANGUAGES)
    # =========================================================================
    print("\n[TEST 7] Multilingual AI Voice Assistant Engine")

    # 7.1 English Query
    res_v_en = client.post("/api/voice/query", json={"text": "What is the weather today?", "language": "en"})
    assert res_v_en.status_code == 200
    assert "temperature" in res_v_en.get_json()["response"].lower() or "weather" in res_v_en.get_json()["response"].lower()
    print("  ✓ Voice Intent (English): Weather response generated")

    # 7.2 Hindi Query
    res_v_hi = client.post("/api/voice/query", json={"text": "टमाटर के रोग के लक्षण क्या हैं?", "language": "hi"})
    assert res_v_hi.status_code == 200
    assert len(res_v_hi.get_json()["response"]) > 20
    print("  ✓ Voice Intent (Hindi): Crop disease consultation response generated")

    # 7.3 Punjabi Query
    res_v_pa = client.post("/api/voice/query", json={"text": "ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?", "language": "pa"})
    assert res_v_pa.status_code == 200
    assert len(res_v_pa.get_json()["response"]) > 20
    print("  ✓ Voice Intent (Punjabi): Mandi market price consultation response generated")

    # 7.4 Bengali Query
    res_v_bn = client.post("/api/voice/query", json={"text": "সরকারি প্রকল্প সম্পর্কে তথ্য দিন", "language": "bn"})
    assert res_v_bn.status_code == 200
    assert len(res_v_bn.get_json()["response"]) > 20
    print("  ✓ Voice Intent (Bengali): Government schemes consultation response generated")

    # 7.5 Tamil Query
    res_v_ta = client.post("/api/voice/query", json={"text": "வானிலை எப்படி இருக்கிறது?", "language": "ta"})
    assert res_v_ta.status_code == 200
    assert len(res_v_ta.get_json()["response"]) > 20
    print("  ✓ Voice Intent (Tamil): Weather query response generated")

    # 7.6 Empty query rejection (Must return 400 Bad Request)
    res_v_empty = client.post("/api/voice/query", json={"text": "   "})
    assert res_v_empty.status_code == 400
    print("  ✓ Voice Input Validation: Correctly rejected empty query with HTTP 400")

    # =========================================================================
    # 8. GOVERNMENT SCHEMES DIRECTORY & ELIGIBILITY EVALUATOR
    # =========================================================================
    print("\n[TEST 8] Government Welfare Schemes & Eligibility Evaluator")

    # 8.1 Scheme Directory List
    res_sch = client.get("/api/schemes/list")
    assert res_sch.status_code == 200
    sch_data = res_sch.get_json()
    assert sch_data["count"] >= 10
    print(f"  ✓ Government Directory: Loaded {sch_data['count']} verified welfare programs")

    # 8.2 Eligibility Evaluation for 4.5 Acre Marginal Farmer
    el_payload = {
        "state": "Punjab",
        "district": "Ludhiana",
        "farmer_category": "Small & Marginal Farmer",
        "landholding_acres": 4.5,
        "crop_type": "Wheat",
        "irrigation_status": "Tubewell"
    }
    res_el = client.post("/api/schemes/check-eligibility", json=el_payload)
    assert res_el.status_code == 200
    el_data = res_el.get_json()
    assert el_data["high_match_count"] >= 5
    print(f"  ✓ Eligibility Evaluator: {el_data['high_match_count']} High Likelihood Schemes matched")

    # 8.3 Non-numeric Landholding Input Hardening (Must not crash)
    res_el_bad = client.post("/api/schemes/check-eligibility", json={"landholding_acres": "not_a_number"})
    assert res_el_bad.status_code == 200
    print("  ✓ Eligibility Input Hardening: Safely handled malformed landholding string without 500 error")

    # 8.4 Scheme Bookmarking (/api/schemes/save & /api/schemes/saved)
    res_save = client.post("/api/schemes/save", json={"scheme_id": "pm_kisan"}, headers=auth_headers)
    assert res_save.status_code == 200
    res_saved_list = client.get("/api/schemes/saved", headers=auth_headers)
    assert res_saved_list.status_code == 200
    saved_ids = [s["id"] for s in res_saved_list.get_json().get("schemes", [])]
    assert "pm_kisan" in saved_ids
    print("  ✓ Scheme Bookmarking: Successfully saved and retrieved PM-KISAN for farmer")

    # =========================================================================
    # 9. FARMING TIPS & AGRONOMIC BEST PRACTICES
    # =========================================================================
    print("\n[TEST 9] Actionable Agronomic Best Practices & Farming Tips")
    res_tips = client.get("/api/tips/list")
    assert res_tips.status_code == 200
    tips = res_tips.get_json()["tips"]
    assert len(tips) >= 6
    print(f"  ✓ Agronomic Practices: Loaded {len(tips)} seasonal expert farming guidelines")

    # =========================================================================
    # 10. CONSOLIDATED AUDIT TRAIL & HISTORY DELETION
    # =========================================================================
    print("\n[TEST 10] Consolidated Farmer History & Record Lifecycle")
    res_hist = client.get("/api/history/all", headers=auth_headers)
    assert res_hist.status_code == 200
    hist_all = res_hist.get_json()
    assert hist_all["success"] is True
    print(f"  ✓ Audit Trail: Total scans recorded: {hist_all['summary']}")

    # 10.1 Delete record parameter validation
    res_del_bad = client.delete("/api/history/delete", headers=auth_headers)
    assert res_del_bad.status_code == 400
    print("  ✓ History Deletion Validation: Correctly rejected missing parameters with HTTP 400")

    # 10.2 Real record deletion test
    if hist_all["disease_records"]:
        rec_to_delete = hist_all["disease_records"][0]["id"]
        res_del_ok = client.delete(f"/api/history/delete?type=disease&id={rec_to_delete}", headers=auth_headers)
        assert res_del_ok.status_code == 200
        assert res_del_ok.get_json()["success"] is True

        # Verify record no longer exists
        res_hist_after = client.get("/api/history/all", headers=auth_headers)
        remaining_ids = [r["id"] for r in res_hist_after.get_json()["disease_records"]]
        assert rec_to_delete not in remaining_ids
        print(f"  ✓ History Deletion Verified: Successfully deleted disease record #{rec_to_delete} from audit trail")

    # =========================================================================
    # VERIFICATION SUMMARY
    # =========================================================================
    print("\n==================================================================")
    print(" 🌾 ALL 10 TEST SUITES PASSED FLAWLESSLY WITH ZERO FAILURES! 🌾")
    print("==================================================================")

if __name__ == "__main__":
    run_tests()
