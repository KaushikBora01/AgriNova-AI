# 🌾 AgriNova AI – Smart Agriculture Assistant

> **A modern, intelligent, responsive, and multilingual agriculture decision support web platform for Indian farmers.**

AgriNova AI bridges the gap between state-of-the-art agronomic research and day-to-day farm operations. It combines **Computer Vision, Machine Learning, Agro-Meteorology, ICAR soil science standards, and Natural Language Voice Processing** across **12 Indian regional languages** into a clean, human-friendly interface.

---

## 🌟 Visual Identity & UX Design

- **Primary Forest Green**: `#1B5E20`
- **Secondary Fresh Green**: `#4CAF50`
- **Soft Cream Background**: `#F7F8F2`
- **Golden Harvest Accent**: `#F4C542`
- **Dark Charcoal Text**: `#263238`
- **Cards**: Clean White `#FFFFFF` with soft organic drop-shadows

Designed to feel like a high-end commercial agriculture technology startup product, fully responsive across desktop, tablet, and mobile devices.

---

## 🚀 The Seven Core Functional Modules

### 1. 🔍 AI Crop Disease Detection (`/api/disease`)
- **Drag-and-Drop & File Browser**: Upload clear photos of crop leaves.
- **Device Camera Support**: Snap live photos directly from smartphone/tablet webcams.
- **AgriVision-Net v2.4 Feature Extractor**: Analyzes leaf chlorophyll distribution, chlorosis yellowing index, necrotic lesion ratios, and spore texture variance.
- **Comprehensive Pathology Database**: 25+ real plant diseases covered across Solanaceous crops (Tomato Early/Late Blight, Bacterial Spot, Leaf Mold), Cereals (Rice Blast, Brown Spot, Wheat Stripe/Yellow Rust, Powdery Mildew, Corn Blight), and Cash crops (Cotton Bacterial Blight, Potato Early/Late Blight).
- **Prescription Results**: Disease name, scientific pathogen name, confidence score (e.g., 96.4%), observed symptoms, biological causes, chemical fungicides & bio-control agents (Trichoderma, Mancozeb, Copper Hydroxide), and immediate containment steps.
- **Agronomic Alert**: Warns when immediate expert consultation with the local Krishi Vigyan Kendra (KVK) is required.
- **Printable Diagnostics**: One-click print/download summary report.

### 2. 🧪 AI Fertilizer Recommendation Engine (`/api/fertilizer`)
- **Soil & Crop Input**: Crop selection (Wheat, Rice, Maize, Potato, Tomato, Cotton, Sugarcane, Mustard, Soybean, Chana, Onion, Groundnut), Soil types (Alluvial, Black, Red, Sandy, Clay, Loamy), and current growth stage.
- **Interactive Soil pH Gauge**: Color-coded acidic, neutral, and alkaline scale with automatic liming or gypsum neutralization advisories.
- **ICAR Standard Balancing**: Calculates exact N-P-K nutrient deficits based on soil retention indexes.
- **Commercial Formulation Prescription**: Tailored mixes (DAP, Urea, Muriate of Potash, NPK 12:32:16, NPK 19:19:19) with per-acre and farm-total quantities.
- **3-Stage Split Application Guidance**: Basal application, vegetative tillering top-dressing, and flowering stage.
- **Precautions Checklist & Disclaimer**: Crucial safety guidance to prevent chemical root burn and volatile ammonia loss.

### 3. 🌦️ Real-Time Agricultural Weather & Advisories (`/api/weather`)
- **Pan-India Geographic Coverage**: Full coverage across **all 28 States, 8 Union Territories, and all 750+ Districts of India** with exact geographical centroid coordinates (latitude & longitude) and agro-climatic zone classifications.
- **Cascading State & District Selector**: Select any State/UT in India to immediately populate and view weather for all constituent districts, plus a live universal search bar and GPS auto-detection.
- **Accurate Live Satellite Feed (Open-Meteo)**: Connects directly to global ECMWF/GFS weather satellite models (via Open-Meteo API) with sub-degree temperature precision (0.1°C), live cloud cover, exact wind velocity, relative humidity, precipitation probability, sunrise/sunset, and solar UV radiation.
- **Actionable Farming Advisories**:
  - **Irrigation Timing**: Conserves water when rainfall probability exceeds 45%; alerts on rapid evapotranspiration during dry heatwaves.
  - **Pesticide Spray Window**: Warns against wind drift loss (>12 km/h) and chemical washout before rain; pinpoints optimal morning spraying hours (7:00 AM - 10:30 AM).
  - **Pathogen Alerts**: Flags high fungal blight and rust risk when relative humidity exceeds 75% under moderate temperatures.
  - **Harvesting Safety**: Recommends grain drying and threshing windows.
- **Interactive 24-Hour Forecast**: Temperature & precipitation probability curves powered by Chart.js.
- **7-Day Extended Weather Cards**: Visual day-by-day temperature trends.

### 4. 📈 AI Market Price Prediction (`/api/market`)
- **APMC Mandi Intelligence**: Track commodity spot rates across India's premier markets (Khanna Mandi, Lasalgaon APMC, Azadpur Mandi, Karnal Mandi, Rajkot APMC, Devi Ahilya Mandi, etc.).
- **Scikit-Learn Machine Learning**: 2nd-order Polynomial Ridge Regression modeling 30-day historical trading, seasonal arrival peaks, and stochastic price cycles.
- **Forecast Horizons**: 7-day, 15-day, and 30-day future modal price trajectories with upper & lower 95% confidence bands.
- **Farmer Selling Advice**: Bullish, bearish, or stable market advice indicating whether to hold stock in dry storage or liquidize immediately.
- **Agmarknet Benchmarks**: Governed by official Directorate of Marketing & Inspection (GoI) commodity standards.

### 5. 🎙️ Multilingual AI Voice Assistant (`/api/voice`)
- **Natural Spoken Interaction**: Prominent animated microphone button with pulsing sound wave visualizer.
- **12 Indian Regional Languages**: Natural Speech-to-Text and Text-to-Speech synthesis in:
  - English (`en-IN`)
  - हिन्दी (Hindi - `hi-IN`)
  - ਪੰਜਾਬੀ (Punjabi - `pa-IN`)
  - বাংলা (Bengali - `bn-IN`)
  - मराठी (Marathi - `mr-IN`)
  - ગુજરાતી (Gujarati - `gu-IN`)
  - தமிழ் (Tamil - `ta-IN`)
  - తెలుగు (Telugu - `te-IN`)
  - ಕನ್ನಡ (Kannada - `kn-IN`)
  - മലയാളം (Malayalam - `ml-IN`)
  - ଓଡ଼ିଆ (Odia - `or-IN`)
  - অসমীয়া (Assamese - `as-IN`)
- **Real Backend Data Synthesis**: Understands intents and fetches live data for weather, crop diseases, fertilizers, market prices, and government schemes.
- **Keyboard Fallback**: Text input box for devices without microphone permissions.

### 6. 🏛️ Government Agricultural Schemes & Benefits (`/api/schemes`)
- **Comprehensive Scheme Directory**:
  - *PM-KISAN Samman Nidhi* (₹6,000/yr direct income support)
  - *PM Fasal Bima Yojana (PMFBY)* (1.5% - 2% subsidized crop insurance)
  - *Kisan Credit Card (KCC)* (4% subsidized institutional credit)
  - *Sub-Mission on Agricultural Mechanization (SMAM)* (40-50% subsidy on tractors & implements)
  - *PMKSY Per Drop More Crop* (55% drip & sprinkler irrigation subsidy)
  - *PM-KUSUM* (60% standalone solar agricultural pump subsidy)
  - *Soil Health Card Scheme* (Free micronutrient testing)
  - *Paramparagat Krishi Vikas Yojana (PKVY)* (₹50,000/ha organic farming assistance)
  - *Agriculture Infrastructure Fund (AIF)* (3% interest subvention for post-harvest assets)
  - *Mission for Integrated Development of Horticulture (MIDH)* (Polyhouse & nursery subsidies)
- **Interactive Eligibility Checker**: Evaluates farmer category, landholding acreage, crop type, and water source to generate a personalized qualification score and match rationale.
- **Document Checklists & Direct Application Links**: Connects directly to verified government portals (`pmkisan.gov.in`, `pmfby.gov.in`, `myscheme.gov.in`).

### 7. 🌐 Complete Regional Language Support (i18n Engine)
- Dedicated localization system translating navigation, dashboard widgets, disease diagnoses, fertilizer schedules, weather advisories, market projections, schemes, and tips.
- Native script language switcher on every page and in farmer profile settings.

---

## 🛠️ Architecture & Technologies

```
e:\pbl\
├── app.py                     # Main Flask server & Blueprint coordinator
├── config.py                  # Configurations, secrets, upload folders
├── database.py                # SQLite schema (users, history, schemes)
├── test_app.py                # Automated 10-point functional verification suite
├── modules/
│   ├── auth.py                # JWT authentication & farmer profile
│   ├── disease_detection.py   # AI computer vision & plant pathology
│   ├── fertilizer_engine.py   # ICAR N-P-K nutrient deficiency calculator
│   ├── weather_service.py     # Agro-meteorology & operational advisories
│   ├── market_prediction.py   # Scikit-learn polynomial regression forecasting
│   ├── voice_assistant.py     # Multilingual intent parser & TTS
│   ├── government_schemes.py  # 10+ Central & State scheme database & eligibility engine
│   ├── farming_tips.py        # Curated seasonal crop best practices
│   └── history_service.py     # Farmer audit trail & record deletion
├── static/
│   ├── css/styles.css         # Nature-inspired palette, animations, card styling
│   ├── js/
│   │   ├── i18n.js            # 12-language dictionary & translation engine
│   │   ├── app.js             # SPA Router & app lifecycle coordinator
│   │   └── components/
│   │       ├── navbar.js      # Responsive header with native language picker
│   │       ├── landing.js     # Hero, features, process, benefits, footer
│   │       ├── dashboard.js   # Personalized farmer overview & tickers
│   │       ├── disease.js     # Drag-and-drop upload, camera, diagnosis card
│   │       ├── fertilizer.js  # Soil input form, NPK sliders, dosage plan
│   │       ├── weather.js     # Current weather, Chart.js hourly chart, advisories
│   │       ├── market.js      # Mandi picker, ML projection curve, Chart.js
│   │       ├── voice.js       # Mic visualizer, Web Speech API, chat bubbles
│   │       ├── schemes.js     # Scheme cards, modal eligibility evaluator
│   │       ├── tips.js        # Actionable farming tips cards
│   │       ├── history.js     # Tabbed history log & deletion
│   │       ├── profile.js     # User registration, login, farm profile
│   │       └── about.js       # Architecture, mission, data sources
│   └── uploads/               # Leaf image storage
└── templates/
    └── index.html             # Responsive SPA container (Tailwind, Lucide, Chart.js)
```

---

## ⚡ Quick Start & Execution

### 1. Prerequisites
- Python 3.10+ (Pre-installed with Flask, Scikit-Learn, Pillow, NumPy, Requests)
- Modern Web Browser (Chrome, Edge, Firefox, or Safari)

### 2. Run the Verification Suite
To verify all AI models, database operations, and multilingual endpoints:
```bash
python test_app.py
```
*(All 10 tests run in < 2 seconds and will confirm full system readiness).*

### 3. Start the AgriNova AI Application
```bash
python app.py
```
Open your browser and navigate to:
```
http://localhost:5000
```

---

## 🌾 Verified Agricultural Benchmarks & Compliance
- **ICAR**: Indian Council of Agricultural Research agronomic dosage standards.
- **Agmarknet**: Directorate of Marketing and Inspection, Ministry of Agriculture & Farmers Welfare, GoI.
- **Kisan Call Centre (KCC)**: Toll-Free 1800-180-1551 integrated into helpline references.
- **Digital India**: Strict privacy compliance; sensitive credentials and passwords are cryptographic hashes using PBKDF2/SHA-256.
