"""
AgriNova AI - Smart Agriculture & Agronomic Best Practices
Categorized actionable farming tips with visual tags and seasonal relevance.
"""

from flask import Blueprint, jsonify

tips_bp = Blueprint("tips", __name__, url_prefix="/api/tips")

FARMING_TIPS = [
    {
        "id": "tip_1",
        "category": "Water Management",
        "title": "Adopt Drip Irrigation for Precision Water & Nutrient Delivery",
        "summary": "Switching from flood irrigation to drip systems cuts water consumption by up to 50% while improving fertilizer efficiency by 30%.",
        "details": "Drip fertigation delivers soluble fertilizers directly to the active root zone, preventing nutrient leaching below the root depth and curbing weed growth between crop rows.",
        "seasonal_tag": "All Seasons",
        "icon": "droplet"
    },
    {
        "id": "tip_2",
        "category": "Soil Health",
        "title": "Incorporate Green Manuring with Dhaincha (Sesbania) or Sunhemp",
        "summary": "Ploughing in 45-day-old green manure crops fixes 60-80 kg atmospheric nitrogen per hectare and revitalizes organic carbon.",
        "details": "Improves soil physical structure, enhances water retention capacity, encourages beneficial earthworm populations, and suppresses root-knot nematodes naturally.",
        "seasonal_tag": "Pre-Kharif (May - June)",
        "icon": "sprout"
    },
    {
        "id": "tip_3",
        "category": "Disease Prevention",
        "title": "Biological Seed Treatment with Trichoderma viride",
        "summary": "Treating seeds with Trichoderma @ 4-5 g/kg seed before sowing shields crops against seed-borne and soil-borne damping-off fungi.",
        "details": "Trichoderma creates a living protective fungal shield around the emerging radical and root tips, secretes lytic enzymes that destroy pathogenic spores, and stimulates root growth.",
        "seasonal_tag": "Sowing Time",
        "icon": "shield-check"
    },
    {
        "id": "tip_4",
        "category": "Fertilizer Management",
        "title": "Neem-Coated Urea with Split Applications",
        "summary": "Applying urea in 3 equal splits (Basal, Active Tillering, Boot Stage) prevents up to 40% nitrogen loss through ammonia volatilization.",
        "details": "Neem oil coating naturally slows the conversion of ammonium to nitrate (nitrification inhibition), matching soil nitrogen release with peak crop uptake curves.",
        "seasonal_tag": "Vegetative Growth",
        "icon": "zap"
    },
    {
        "id": "tip_5",
        "category": "Harvesting Practices",
        "title": "Harvest Grains at Optimal Moisture Content (14-16%)",
        "summary": "Harvesting at proper physiological maturity prevents shattering losses in the field and minimizes post-harvest storage fungal rot.",
        "details": "Dry harvested grains on clean polythene sheets under sunlight until moisture drops to 12% before bagging into hermetic PICS bags to prevent weevil infestation.",
        "seasonal_tag": "Harvest Season",
        "icon": "sun"
    },
    {
        "id": "tip_6",
        "category": "Seasonal Crop Care",
        "title": "Protect Winter Crops from Sudden Frost (Pala)",
        "summary": "Give light evening irrigation to winter vegetables and wheat during frosty nights to raise soil thermal capacity.",
        "details": "Water has high specific heat capacity; as it cools slowly during midnight, it releases latent heat into the crop canopy, keeping microclimate temperatures 1-2°C above freezing point.",
        "seasonal_tag": "Rabi Winter (Dec - Jan)",
        "icon": "cloud-snow"
    }
]

@tips_bp.route("/list", methods=["GET"])
def get_tips():
    return jsonify({"success": True, "tips": FARMING_TIPS})
