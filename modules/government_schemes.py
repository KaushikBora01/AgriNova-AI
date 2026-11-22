"""
AgriNova AI - Government Agricultural Schemes & Farmer Benefits Module
Comprehensive official scheme directory, multi-parameter eligibility evaluator,
and verified application portal integration.
"""

from flask import Blueprint, request, jsonify
from database import get_db_connection
from modules.auth import get_current_user_from_request

schemes_bp = Blueprint("schemes", __name__, url_prefix="/api/schemes")

SCHEMES_DATABASE = [
    {
        "id": "pm_kisan",
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Farmer Financial Assistance",
        "benefits": "Direct income support of ₹6,000 per year transferred in three equal 4-monthly installments of ₹2,000 directly into the bank accounts of all landholding farmer families.",
        "description": "Central Sector Scheme providing supplemental income support to all landholding farmer families across the country to procure agricultural inputs and meet domestic needs.",
        "eligibility_criteria": [
            "All landholding farmer families with cultivable landholding in their names.",
            "Aadhaar-seeded bank account with active eKYC.",
            "Exclusions: Institutional landholders, serving/retired government officers, income-tax payers, professionals (doctors, engineers, lawyers, CAs)."
        ],
        "required_documents": [
            "Aadhaar Card (Mandatory)",
            "Land Ownership Document (Khata / Khatauni / Jamabandi / 7-12 record)",
            "Bank Account Passbook (with Aadhaar NPCI seeding)",
            "Active Mobile Number linked to Aadhaar for OTP"
        ],
        "application_procedure": "Online registration through PM-KISAN Portal (pmkisan.gov.in) -> 'New Farmer Registration' or via Common Service Centres (CSCs) and State Nodal Revenue Officers.",
        "official_url": "https://pmkisan.gov.in/",
        "helpline": "155261 / 011-24300606 (Toll-Free PM-KISAN Helpline)",
        "last_updated": "February 2025",
        "min_land_acres": 0.1,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": True
    },
    {
        "id": "pmfby_insurance",
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Crop Insurance Schemes",
        "benefits": "Comprehensive risk insurance against non-preventable natural perils from pre-sowing to post-harvest. Low subsidized premium: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. Balance premium paid 100% by Central & State Govts.",
        "description": "Yield-based and localized weather risk insurance scheme providing financial protection against drought, flood, inundation, pests, diseases, and unseasonal post-harvest rainfall.",
        "eligibility_criteria": [
            "All farmers growing notified crops in notified areas (both loanee and non-loanee farmers).",
            "Sharecroppers and tenant farmers eligible with valid land tenancy agreement / affidavit."
        ],
        "required_documents": [
            "Land Sowing Certificate / Patwari Report",
            "Land Possession Certificate (RoR / Khasra-Khatauni)",
            "Bank Passbook copy with IFSC",
            "Aadhaar Card"
        ],
        "application_procedure": "Enroll via National Crop Insurance Portal (pmfby.gov.in), nearest CSC, affiliated Primary Agricultural Credit Societies (PACS), or commercial bank branches before cut-off date (31st July for Kharif, 31st Dec for Rabi).",
        "official_url": "https://pmfby.gov.in/",
        "helpline": "1800-180-1551 (Kisan Call Centre) / 14447 (PMFBY Helpdesk)",
        "last_updated": "January 2025",
        "min_land_acres": 0.1,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": True
    },
    {
        "id": "kisan_credit_card",
        "name": "Kisan Credit Card (KCC) & Modified Interest Subvention",
        "ministry": "Department of Agriculture and Farmers Welfare & Reserve Bank of India",
        "category": "Farmer Loans & Credit Facilities",
        "benefits": "Concessional institutional short-term crop loans up to ₹3,00,000 at an effective interest rate of just 4% per annum (7% base minus 3% prompt repayment incentive). No collateral needed up to ₹1,60,000.",
        "description": "Provides timely and adequate institutional credit to farmers for crop cultivation expenses, post-harvest costs, produce marketing, consumption requirements, and maintenance of farm assets.",
        "eligibility_criteria": [
            "Individual farmers, joint borrowers, tenant farmers, oral lessees, sharecroppers, and Self Help Groups (SHGs).",
            "Includes animal husbandry, dairy, and fisheries farmers."
        ],
        "required_documents": [
            "Duly filled KCC application form",
            "Identity Proof (Aadhaar / Voter ID / PAN)",
            "Address Proof",
            "Land records verified by Revenue Patwari showing cropping pattern"
        ],
        "application_procedure": "Apply at any Commercial Bank, Regional Rural Bank (RRB), Cooperative Bank, or via JanSamarth Portal (jansamarth.in).",
        "official_url": "https://www.myscheme.gov.in/schemes/kcc",
        "helpline": "1800-11-5526 / Local Bank Branch",
        "last_updated": "January 2025",
        "min_land_acres": 0.1,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": True
    },
    {
        "id": "smam_mechanization",
        "name": "Sub-Mission on Agricultural Mechanization (SMAM)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Agricultural Equipment Subsidies",
        "benefits": "40% to 50% capital subsidy (up to 80% for Custom Hiring Centres - CHCs) for purchasing tractors, power tillers, rotavators, laser land levelers, seed drills, combine harvesters, and crop residue management machinery.",
        "description": "Promotes modern farm mechanization to reduce labor drudgery, increase cropping intensity, enhance input use efficiency, and foster custom hiring hubs for smallholders.",
        "eligibility_criteria": [
            "Small, marginal, SC/ST, and women farmers are given special priority with higher subsidy percentages (up to 50%).",
            "Farmer must not have availed machinery subsidy for the same equipment in the preceding 5 years."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land Record (7/12 or Jamabandi)",
            "Bank Passbook copy",
            "Quotation from authorized agricultural implement dealer",
            "Caste Certificate (if applicable for priority subsidy)"
        ],
        "application_procedure": "Online application through Direct Benefit Transfer in Agricultural Mechanization portal (agrimachinery.nic.in) or state agriculture portals (e.g., Mahadbt, UP Agriculture).",
        "official_url": "https://agrimachinery.nic.in/",
        "helpline": "011-23382937 (Agricultural Mechanization Division)",
        "last_updated": "December 2024",
        "min_land_acres": 0.5,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer"],
        "is_featured": False
    },
    {
        "id": "pmksy_micro_irrigation",
        "name": "PM Krishi Sinchayee Yojana - Per Drop More Crop (PDMC)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Irrigation & Water Conservation",
        "benefits": "Up to 55% financial assistance for Small & Marginal farmers and 45% for other farmers for installing Drip and Sprinkler micro-irrigation systems. Saves up to 40% water and boosts yield by 20-30%.",
        "description": "Expands cultivable area under assured irrigation, improves on-farm water use efficiency, and adopts precision drip/sprinkler techniques for higher crop productivity.",
        "eligibility_criteria": [
            "All landholder farmers with assured source of irrigation water (well, tubewell, farm pond, or canal).",
            "Priority to water-stressed and drought-prone blocks."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land ownership record (RoR)",
            "Electricity connection receipt / tubewell certificate",
            "Bank passbook copy",
            "Field layout plan from micro-irrigation manufacturer"
        ],
        "application_procedure": "Submit application on State Horticulture or Agriculture portal (e.g., Hortnet, PMKSY State Portals) or contact District Horticulture Officer (DHO).",
        "official_url": "https://pmksy.gov.in/",
        "helpline": "1800-180-1551 (Kisan Call Centre)",
        "last_updated": "November 2024",
        "min_land_acres": 0.5,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": True
    },
    {
        "id": "pm_kusum_solar",
        "name": "PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)",
        "ministry": "Ministry of New and Renewable Energy (MNRE), GoI",
        "category": "Irrigation & Water Conservation",
        "benefits": "Up to 60% subsidy (30% Central + 30% State) for installing standalone solar agriculture pumps (3 HP, 5 HP, 7.5 HP) and solarizing existing grid-connected tubewells. Bank loan available for 30%, farmer pays only 10%.",
        "description": "Provides energy and water security to farmers by powering irrigation pumps with clean solar energy, reducing diesel costs and offering extra income from selling surplus solar electricity to the grid.",
        "eligibility_criteria": [
            "Individual farmers, water user associations, and cooperatives.",
            "Must possess cultivable land and water source without regular electric pump connection for Component-B."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land revenue records",
            "Water source certificate (Borewell / Dugwell certificate)",
            "Bank details"
        ],
        "application_procedure": "Register through designated State Renewable Energy Development Agencies (e.g., MEDA in Maharashtra, PEDA in Punjab, HAREDA in Haryana, UPNEDA in UP).",
        "official_url": "https://pmkusum.mnre.gov.in/",
        "helpline": "1800-180-3333 (MNRE Toll-Free)",
        "last_updated": "January 2025",
        "min_land_acres": 1.0,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": False
    },
    {
        "id": "soil_health_card",
        "name": "Soil Health Card Scheme (SHC)",
        "ministry": "Department of Agriculture & Farmers Welfare, GoI",
        "category": "Soil Health & Fertilizer Assistance",
        "benefits": "Free soil testing and issue of customized Soil Health Cards containing nutrient status (12 parameters: N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) along with customized dosage recommendations for crops.",
        "description": "Promotes integrated nutrient management (INM) based on scientific soil testing to curb indiscriminate chemical fertilizer use, restore soil microbial health, and lower cultivation expenses.",
        "eligibility_criteria": [
            "All farmers across all States and Union Territories. Soil samples collected cycle-wise from farmers' plots."
        ],
        "required_documents": [
            "Farmer basic details (Name, Village, Khasra/Survey number)",
            "Mobile number"
        ],
        "application_procedure": "Soil testing samples collected by Village Level Workers (VLWs) or farmers can deposit soil samples at nearest Soil Testing Laboratories (STLs) or Krishi Vigyan Kendra (KVK). Check status online on portal.",
        "official_url": "https://soilhealth.dac.gov.in/",
        "helpline": "011-23388911 / Kisan Call Centre 1800-180-1551",
        "last_updated": "October 2024",
        "min_land_acres": 0.1,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": False
    },
    {
        "id": "pkvy_organic",
        "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Organic Farming Support",
        "benefits": "Financial assistance of ₹50,000 per hectare over 3 years, of which ₹31,000/ha is directly transferred to farmers for organic inputs (seeds, bio-fertilizers, bio-pesticides, vermicompost), certification, and marketing.",
        "description": "Fosters organic farming through cluster approach and Participatory Guarantee System (PGS) certification, improving soil carbon and delivering premium market prices for chemical-free crops.",
        "eligibility_criteria": [
            "Groups of farmers forming a cluster of minimum 20 hectares (approx 50 farmers).",
            "Commitment to adopt PGS-India organic certification standards without chemical synthetics."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land records for the cluster plot",
            "Group Bank Account details",
            "PGS-India farmer pledge certificate"
        ],
        "application_procedure": "Form a cluster and register through District Agriculture Officer (DAO) or State Organic Certification Agency via Jaivik Kheti Portal (jaivikkheti.in).",
        "official_url": "https://pgsindia-ncof.gov.in/",
        "helpline": "0120-2764906 (National Centre of Organic Farming)",
        "last_updated": "November 2024",
        "min_land_acres": 0.5,
        "max_land_acres": 50.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer"],
        "is_featured": False
    },
    {
        "id": "agri_infra_fund",
        "name": "Agriculture Infrastructure Fund (AIF)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Agricultural Infrastructure Schemes",
        "benefits": "3% per annum interest subvention on term loans up to ₹2 Crores for up to 7 years, along with Credit Guarantee coverage under CGTMSE for setting up post-harvest management and community farm assets.",
        "description": "Medium to long-term debt financing facility for investment in viable projects for post-harvest management infrastructure such as cold stores, warehouses, pack houses, assaying units, and sorting lines.",
        "eligibility_criteria": [
            "Primary Agricultural Credit Societies (PACS), Marketing Cooperative Societies, FPOs, SHGs, Joint Liability Groups, Agri-entrepreneurs, and Start-ups."
        ],
        "required_documents": [
            "Detailed Project Report (DPR)",
            "Land title / Lease deed for minimum 10 years",
            "KYC documents and audited financial statements / IT returns",
            "Bank loan sanction letter"
        ],
        "application_procedure": "Submit online project proposal via National AIF Portal (agriinfra.dac.gov.in) for Ministry and lending bank sanction.",
        "official_url": "https://agriinfra.dac.gov.in/",
        "helpline": "011-23381012 (AIF Division)",
        "last_updated": "December 2024",
        "min_land_acres": 1.0,
        "max_land_acres": 999.0,
        "target_categories": ["Medium Farmer", "Large Farmer"],
        "is_featured": False
    },
    {
        "id": "midh_horticulture",
        "name": "Mission for Integrated Development of Horticulture (MIDH)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Horticulture & Seed Subsidies",
        "benefits": "40% to 50% capital subsidy for polyhouse / shade-net construction, planting material for high-value fruit orchards, mushroom production, bee-keeping, and cold chain logistics.",
        "description": "Holistic growth of the horticulture sector covering fruits, vegetables, root and tuber crops, mushrooms, spices, flowers, aromatic plants, coconut, cashew, and cocoa.",
        "eligibility_criteria": [
            "Individual farmers, farmer groups, and entrepreneurs establishing protected cultivation, orchards, or nursery infrastructure."
        ],
        "required_documents": [
            "Land Records (RoR)",
            "Aadhaar Card",
            "Project estimate from certified agency",
            "Bank details"
        ],
        "application_procedure": "Apply through State Horticulture Mission (SHM) offices or online National Horticulture Board portal (nhb.gov.in).",
        "official_url": "https://midh.gov.in/",
        "helpline": "0124-2342992 (National Horticulture Board)",
        "last_updated": "October 2024",
        "min_land_acres": 0.5,
        "max_land_acres": 999.0,
        "target_categories": ["Small & Marginal Farmer", "Medium Farmer", "Large Farmer"],
        "is_featured": False
    }
]

def evaluate_eligibility(state, district, category, land_acres, crop_type, irrigation_status):
    """
    Evaluates farmer inputs against all schemes and calculates eligibility probability
    and personalized qualification reasons.
    """
    results = []

    for scheme in SCHEMES_DATABASE:
        score = 80
        reasons = []
        is_eligible = True

        # Check landholding bounds
        if land_acres < scheme["min_land_acres"]:
            score -= 40
            is_eligible = False
            reasons.append(f"Landholding ({land_acres} acres) is below minimum threshold ({scheme['min_land_acres']} acres).")
        elif land_acres > scheme["max_land_acres"]:
            score -= 30
            is_eligible = False
            reasons.append(f"Landholding ({land_acres} acres) exceeds upper threshold for this targeted smallholder scheme.")
        else:
            reasons.append(f"Your landholding of {land_acres} acres fits within the scheme parameters ({scheme['min_land_acres']} - {scheme['max_land_acres']} acres).")

        # Category matching
        if category in scheme["target_categories"]:
            score += 15
            reasons.append(f"Your farmer category '{category}' is an eligible priority beneficiary group.")
        else:
            score -= 20
            reasons.append(f"This scheme primarily targets {', '.join(scheme['target_categories'])}.")

        # Scheme specific bonuses
        if scheme["id"] == "pm_kisan":
            reasons.append("All landowning farmers with valid Aadhaar-seeded land records qualify for ₹6,000/yr.")
            score = 98 if is_eligible else 40

        if scheme["id"] == "pmfby_insurance":
            reasons.append(f"All farmers cultivating notified crops like {crop_type} qualify for subsidized insurance premium.")
            score = 96 if is_eligible else 45

        if scheme["id"] == "pmksy_micro_irrigation":
            if irrigation_status in ["Tubewell", "Borewell", "Canal Water"]:
                score += 10
                reasons.append("Your water source enables high-efficiency drip/sprinkler pipeline subsidy.")
            else:
                reasons.append("Installing micro-irrigation requires an assured or planned water source.")

        if scheme["id"] == "smam_mechanization" and category == "Small & Marginal Farmer":
            score += 10
            reasons.append("Small & Marginal farmers receive an extra 10% preferential subsidy on equipment.")

        final_score = min(98, max(20, score))
        likelihood = "High Likelihood" if final_score >= 80 else "Moderate Likelihood" if final_score >= 50 else "Low Likelihood"

        results.append({
            "scheme_id": scheme["id"],
            "scheme_name": scheme["name"],
            "category": scheme["category"],
            "ministry": scheme["ministry"],
            "benefits": scheme["benefits"],
            "eligibility_score": final_score,
            "likelihood": likelihood,
            "reasons": reasons,
            "required_documents": scheme["required_documents"],
            "official_url": scheme["official_url"],
            "helpline": scheme["helpline"]
        })

    # Sort by eligibility score descending
    results.sort(key=lambda x: x["eligibility_score"], reverse=True)
    return results

@schemes_bp.route("/list", methods=["GET"])
def get_schemes():
    category = request.args.get("category", "")
    search = request.args.get("search", "").strip().lower()

    filtered = SCHEMES_DATABASE
    if category and category != "All":
        filtered = [s for s in filtered if s["category"].lower() == category.lower()]
    if search:
        filtered = [s for s in filtered if search in s["name"].lower() or search in s["description"].lower() or search in s["benefits"].lower()]

    categories = list(set([s["category"] for s in SCHEMES_DATABASE]))
    categories.sort()

    return jsonify({
        "success": True,
        "count": len(filtered),
        "schemes": filtered,
        "categories": ["All"] + categories,
        "data_sources": [
            {"name": "myScheme National Portal", "url": "https://www.myscheme.gov.in/"},
            {"name": "PM-KISAN Portal", "url": "https://pmkisan.gov.in/"},
            {"name": "PMFBY Portal", "url": "https://pmfby.gov.in/"},
            {"name": "Ministry of Agriculture & Farmers Welfare", "url": "https://agriwelfare.gov.in/"},
            {"name": "Soil Health Card Portal", "url": "https://soilhealth.dac.gov.in/"}
        ]
    })

@schemes_bp.route("/check-eligibility", methods=["POST"])
def check_eligibility():
    data = request.get_json() or {}

    state = data.get("state", "Punjab")
    district = data.get("district", "Ludhiana")
    category = data.get("farmer_category", "Small & Marginal Farmer")
    try:
        land_acres = float(data.get("landholding_acres", 4.0) or 4.0)
    except (ValueError, TypeError):
        land_acres = 4.0
    crop_type = data.get("crop_type", "Wheat")
    irrigation_status = data.get("irrigation_status", "Tubewell")

    evaluations = evaluate_eligibility(state, district, category, land_acres, crop_type, irrigation_status)

    disclaimer = (
        "Important Note: AgriNova AI's Eligibility Checker provides indicative assessments based on published Central and State Government guidelines. "
        "Final eligibility determination, document scrutiny, and subsidy sanction are made solely by the respective Government Department, Nodal Agency, or Bank."
    )

    return jsonify({
        "success": True,
        "farmer_inputs": {
            "state": state,
            "district": district,
            "farmer_category": category,
            "landholding_acres": land_acres,
            "crop_type": crop_type,
            "irrigation_status": irrigation_status
        },
        "matched_schemes": evaluations,
        "high_match_count": len([e for e in evaluations if e["likelihood"] == "High Likelihood"]),
        "disclaimer": disclaimer
    })

@schemes_bp.route("/save", methods=["POST"])
def toggle_save_scheme():
    user = get_current_user_from_request()
    if not user:
        return jsonify({"success": False, "error": "Login required to bookmark schemes"}), 401

    data = request.get_json() or {}
    scheme_id = data.get("scheme_id")
    scheme_name = data.get("scheme_name", "")

    if not scheme_id:
        return jsonify({"success": False, "error": "scheme_id is required"}), 400

    conn = get_db_connection()
    existing = conn.execute("SELECT id FROM saved_schemes WHERE user_id = ? AND scheme_id = ?", (user["id"], scheme_id)).fetchone()

    if existing:
        conn.execute("DELETE FROM saved_schemes WHERE id = ?", (existing["id"],))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "saved": False, "message": "Scheme removed from saved list"})
    else:
        conn.execute("INSERT INTO saved_schemes (user_id, scheme_id, scheme_name) VALUES (?, ?, ?)", (user["id"], scheme_id, scheme_name))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "saved": True, "message": "Scheme saved successfully"})

@schemes_bp.route("/saved", methods=["GET"])
def get_saved_schemes():
    user = get_current_user_from_request()
    if not user:
        return jsonify({"success": False, "error": "Unauthorized"}), 401

    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM saved_schemes WHERE user_id = ? ORDER BY created_at DESC", (user["id"],)).fetchall()
    conn.close()

    saved_ids = [r["scheme_id"] for r in rows]
    schemes = [s for s in SCHEMES_DATABASE if s["id"] in saved_ids]

    return jsonify({"success": True, "schemes": schemes})
