/**
 * AgriNova AI - Internationalization (i18n) Engine
 * Comprehensive multi-language support for 12 Indian Regional Languages:
 * English, Hindi, Punjabi, Bengali, Marathi, Gujarati, Tamil, Telugu,
 * Kannada, Malayalam, Odia, and Assamese.
 */

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', speechLocale: 'en-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speechLocale: 'pa-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', speechLocale: 'bn-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', speechLocale: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', speechLocale: 'gu-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', speechLocale: 'ml-IN' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', speechLocale: 'or-IN' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', speechLocale: 'as-IN' }
];

const TRANSLATIONS = {
  en: {
    app_title: "AgriNova AI",
    tagline: "Smart Farming Starts with AgriNova AI",
    sub_tagline: "Empowering farmers with AI crop disease detection, personalized fertilizer recommendations, real-time agro-weather alerts, machine learning market price forecasts, and multilingual voice assistance.",
    get_started: "Get Started Free",
    explore_features: "Explore Features",
    nav_home: "Home",
    nav_dashboard: "Farmer Dashboard",
    nav_disease: "Crop Disease AI",
    nav_fertilizer: "Fertilizer Engine",
    nav_weather: "Weather & Advisory",
    nav_market: "Market Price AI",
    nav_voice: "AI Voice Assistant",
    nav_schemes: "Government Schemes",
    nav_tips: "Farming Tips",
    nav_history: "History & Reports",
    nav_about: "About AgriNova",
    nav_profile: "Farmer Profile",
    nav_login: "Login",
    nav_register: "Register",
    nav_logout: "Logout",
    
    // Feature cards
    feat_disease_title: "AI Crop Disease Detection",
    feat_disease_desc: "Upload leaf photos to instantly diagnose 25+ crop diseases, get biological causes, and organic/chemical remedy plans.",
    feat_fertilizer_title: "AI Fertilizer Recommendation",
    feat_fertilizer_desc: "Scientifically compute N-P-K nutrient deficits based on ICAR guidelines for optimal crop growth and soil balance.",
    feat_weather_title: "Real-Time Agro-Weather",
    feat_weather_desc: "Hourly & 7-day agricultural forecasts with custom advisories for irrigation timing, spraying windows, and frost/heat alerts.",
    feat_market_title: "AI Market Price Prediction",
    feat_market_desc: "Scikit-Learn ML regression forecasting commodity modal prices across Indian APMC mandis to maximize farm profits.",
    feat_voice_title: "Multilingual Voice Assistant",
    feat_voice_desc: "Speak naturally in your regional language. AgriNova listens and speaks back real agricultural advice instantly.",
    feat_schemes_title: "Govt Schemes & Benefits",
    feat_schemes_desc: "Discover central & state farmer subsidies (PM-KISAN, PMFBY, KCC, Solar Pumps) with an interactive eligibility checker.",

    // Dashboard
    dash_welcome: "Welcome back, Farmer",
    dash_location: "Farm Location",
    dash_date: "Today's Date",
    dash_quick_access: "Quick Feature Access",
    dash_recent_activity: "Recent Activity",
    dash_alerts: "Active Farming Alerts",
    dash_schemes_preview: "Recommended Government Schemes For You",

    // Disease
    dis_heading: "Detect Crop Diseases Instantly",
    dis_subheading: "Upload or capture a photo of an affected leaf to receive AI diagnostic results and treatment measures within seconds.",
    dis_drag_drop: "Drag & drop your crop leaf image here, or",
    dis_browse: "Browse Files",
    dis_camera: "Use Camera",
    dis_btn_analyze: "Analyze Crop Health",
    dis_analyzing: "Analyzing leaf features & pathology...",
    dis_result_title: "Diagnosis Result",
    dis_crop_name: "Detected Crop",
    dis_disease_name: "Identified Disease / Condition",
    dis_confidence: "Advisory Match",
    dis_symptoms: "Observed Symptoms",
    dis_causes: "Pathogen & Climatic Causes",
    dis_prevention: "Recommended Preventive Measures",
    dis_treatments: "Organic & Chemical Treatments",
    dis_next_steps: "Immediate Action Steps",
    dis_expert_advice: "Expert Consultation Recommended",
    dis_analyze_another: "Analyze Another Leaf",

    // Fertilizer
    fert_heading: "Intelligent Fertilizer Recommendation Engine",
    fert_subheading: "Input your soil test data and crop details to generate customized fertilizer grades and split application schedules.",
    fert_crop: "Crop Type",
    fert_soil: "Soil Type",
    fert_ph: "Soil pH (Gauge)",
    fert_n: "Nitrogen (N) - kg/ha",
    fert_p: "Phosphorus (P) - kg/ha",
    fert_k: "Potassium (K) - kg/ha",
    fert_location: "Farm Location",
    fert_stage: "Current Crop Growth Stage",
    fert_btn: "Calculate Fertilizer Plan",
    fert_results: "Customized Fertilizer Schedule",
    fert_recommended: "Recommended Fertilizer Formulation",
    fert_dosage: "Recommended Dosage per Acre",
    fert_rationale: "Agronomic Rationale",
    fert_schedule: "Split Application Guidance",
    fert_precautions: "Application Precautions",
    fert_disclaimer: "Agricultural Disclaimer",

    // Weather
    weath_heading: "Real-Time Agricultural Weather & Advisories",
    weath_subheading: "Localized weather intelligence tailored for on-farm decision making, spray schedules, and irrigation planning.",
    weath_search: "Search District or Mandi...",
    weath_current_temp: "Current Temperature",
    weath_feels_like: "Feels Like",
    weath_humidity: "Relative Humidity",
    weath_wind: "Wind Speed",
    weath_rain_prob: "Precipitation Probability",
    weath_advisories: "Agro-Meteorological Advisories",
    weath_irrigation_advice: "Irrigation Advisory",
    weath_spraying_window: "Spraying Window",
    weath_7day: "7-Day Farm Weather Forecast",

    // Market
    mkt_heading: "AI Agricultural Market Price Prediction",
    mkt_subheading: "Empower your harvest selling decisions with Machine Learning price projections across Indian APMC Mandis.",
    mkt_commodity: "Select Commodity / Crop",
    mkt_state: "State",
    mkt_district: "District",
    mkt_mandi: "APMC Mandi / Market",
    mkt_horizon: "Prediction Horizon",
    mkt_btn: "Predict Market Price",
    mkt_modal_price: "Current Modal Price",
    mkt_predicted_price: "Predicted Price",
    mkt_trend: "Price Trend",
    mkt_chart_title: "Historical Trends & Machine Learning Forecast",
    mkt_confidence: "Estimated Trend Direction",
    mkt_advice: "Farmer Selling Advisory",

    // Voice
    voice_heading: "AgriNova AI Voice Assistant",
    voice_subheading: "Speak naturally in your preferred language to get answers on weather, crop diseases, fertilizers, market rates, and government benefits.",
    voice_tap_mic: "Tap Microphone to Speak",
    voice_listening: "Listening to your voice...",
    voice_processing: "Processing query & retrieving farm data...",
    voice_stop: "Stop Listening",
    voice_suggested: "Try asking queries like:",
    voice_speak_response: "Listen to Response",

    // Schemes
    sch_heading: "Government Schemes & Farmer Benefits",
    sch_subheading: "Explore verified subsidies, crop insurance programs, credit facilities, and check your personalized eligibility.",
    sch_search: "Search Schemes by Keyword...",
    sch_category_filter: "Filter by Category",
    sch_eligibility_btn: "Check My Eligibility",
    sch_benefits: "Main Benefits",
    sch_eligibility: "Eligibility Criteria",
    sch_documents: "Required Documents Checklist",
    sch_procedure: "Application Procedure",
    sch_official_link: "Apply on Official Portal",
    sch_save_scheme: "Bookmark Scheme",
    sch_saved: "Bookmarked",

    // Common
    btn_save: "Save",
    btn_delete: "Delete",
    btn_cancel: "Cancel",
    btn_close: "Close",
    btn_download: "Download Report",
    status_success: "Success",
    status_error: "Error"
  },

  hi: {
    app_title: "एग्रीनोवा एआई",
    tagline: "स्मार्ट खेती की शुरुआत, एग्रीनोवा एआई के साथ",
    sub_tagline: "फसल रोग पहचान, वैज्ञानिक खाद सलाह, सटीक मौसम अपडेट, मंडी भाव पूर्वानुमान और बहुभाषी वॉयस सहायक के साथ किसानों का सच्चा डिजिटल साथी।",
    get_started: "शुरू करें (निःशुल्क)",
    explore_features: "सभी सुविधाएं देखें",
    nav_home: "होम",
    nav_dashboard: "किसान डैशबोर्ड",
    nav_disease: "फसल रोग पहचान",
    nav_fertilizer: "खाद कैलकुलेटर",
    nav_weather: "मौसम व कृषि सलाह",
    nav_market: "मंडी भाव पूर्वानुमान",
    nav_voice: "वॉयस असिस्टेंट",
    nav_schemes: "सरकारी योजनाएं",
    nav_tips: "कृषि उपयोगी टिप्स",
    nav_history: "इतिहास व रिपोर्ट्स",
    nav_about: "हमारे बारे में",
    nav_profile: "किसान प्रोफाइल",
    nav_login: "लॉगिन करें",
    nav_register: "पंजीकरण करें",
    nav_logout: "लॉगआउट",

    feat_disease_title: "एआई फसल रोग पहचान",
    feat_disease_desc: "पत्ती की तस्वीर अपलोड करके तुरंत 25 से अधिक रोगों की सटीक पहचान, लक्षण व जैविक/रासायनिक उपचार प्राप्त करें।",
    feat_fertilizer_title: "स्मार्ट खाद अनुशंसा",
    feat_fertilizer_desc: "मिट्टी और फसल के अनुसार आवश्यक नाइट्रोजन, फास्फोरस व पोटाश की वैज्ञानिक गणना और सही खुराक।",
    feat_weather_title: "रीयल-टाइम कृषि मौसम",
    feat_weather_desc: "सिंचाई, कीटनाशक छिड़काव और कटाई के लिए 7 दिनों का मौसम पूर्वानुमान व विशेष कृषि चेतावनियां।",
    feat_market_title: "मंडी भाव भविष्यवाणी",
    feat_market_desc: "मशीन लर्निंग मॉडल द्वारा प्रमुख भारतीय मंडियों में आने वाले 15-30 दिनों के अनुमानित भाव और बेचने का सही समय।",
    feat_voice_title: "बहुभाषी वॉयस असिस्टेंट",
    feat_voice_desc: "अपनी मातृभाषा में बोलकर सवाल पूछें और तुरंत सही कृषि सलाह अपनी ही भाषा में सुनें।",
    feat_schemes_title: "सरकारी योजनाएं व सब्सिडी",
    feat_schemes_desc: "पीएम-किसान, फसल बीमा, सोलर पंप और ट्रैक्टर सब्सिडी योजनाओं की पात्रता जांचें और सीधे आवेदन करें।",

    dash_welcome: "स्वागत है, किसान साथी",
    dash_location: "खेत का स्थान",
    dash_date: "आज की तारीख",
    dash_quick_access: "त्वरित सुविधाएं",
    dash_recent_activity: "हाल की गतिविधियां",
    dash_alerts: "कृषि चेतावनियां व अलर्ट",
    dash_schemes_preview: "आपके लिए लाभकारी सरकारी योजनाएं",

    dis_heading: "फसल रोगों की तुरंत पहचान करें",
    dis_subheading: "प्रभावित पत्ती की फोटो अपलोड करें और कुछ ही सेकंड में सटीक रोग निदान व उपचार की जानकारी पाएं।",
    dis_drag_drop: "पत्ती की फोटो यहां खींचकर लाएं, या",
    dis_browse: "गैलरी से चुनें",
    dis_camera: "कैमरा खोलें",
    dis_btn_analyze: "फसल स्वास्थ्य की जांच करें",
    dis_analyzing: "एआई मॉडल द्वारा रोग की जांच जारी है...",
    dis_result_title: "रोग निदान परिणाम",
    dis_crop_name: "पहचानी गई फसल",
    dis_disease_name: "रोग / समस्या का नाम",
    dis_confidence: "रोग पहचान मिलान",
    dis_symptoms: "रोग के लक्षण",
    dis_causes: "रोग के प्रमुख कारण",
    dis_prevention: "बचाव के उपाय",
    dis_treatments: "जैविक व रासायनिक उपचार",
    dis_next_steps: "तत्काल उठाने योग्य कदम",
    dis_expert_advice: "कृषि वैज्ञानिक से परामर्श की सिफारिश",
    dis_analyze_another: "अन्य पत्ती की जांच करें",

    fert_heading: "बुद्धिमान खाद अनुशंसा प्रणाली",
    fert_subheading: "मिट्टी परीक्षण और फसल की जानकारी दर्ज करें और खाद की सही संतुलित मात्रा का विवरण पाएं।",
    fert_crop: "फसल का प्रकार",
    fert_soil: "मिट्टी का प्रकार",
    fert_ph: "मिट्टी का पीएच (pH)",
    fert_n: "नाइट्रोजन (N) स्तर",
    fert_p: "फास्फोरस (P) स्तर",
    fert_k: "पोटेशियम (K) स्तर",
    fert_location: "खेत का स्थान",
    fert_stage: "फसल की वर्तमान अवस्था",
    fert_btn: "खाद योजना प्राप्त करें",
    fert_results: "संतुलित खाद सिफारिश",
    fert_recommended: "अनुशंसित खाद का नाम",
    fert_dosage: "प्रति एकड़ अनुशंसित मात्रा",
    fert_rationale: "वैज्ञानिक कारण",
    fert_schedule: "खाद डालने का सही समय",
    fert_precautions: "आवश्यक सावधानियां",
    fert_disclaimer: "कृषि अस्वीकरण (डिस्क्लेमर)",

    weath_heading: "मौसम पूर्वानुमान व कृषि सलाह",
    weath_subheading: "किसानों के दैनिक कार्यों, सिंचाई और छिड़काव के लिए सटीक मौसम जानकारी।",
    weath_search: "जिला या मंडी खोजें...",
    weath_current_temp: "वर्तमान तापमान",
    weath_feels_like: "महसूस तापमान",
    weath_humidity: "हवा में नमी",
    weath_wind: "हवा की गति",
    weath_rain_prob: "बारिश की संभावना",
    weath_advisories: "मौसम आधारित कृषि सलाह",
    weath_irrigation_advice: "सिंचाई सलाह",
    weath_spraying_window: "छिड़काव का सही समय",
    weath_7day: "7-दिवसीय मौसम पूर्वानुमान",

    mkt_heading: "मंडी भाव पूर्वानुमान (एआई मॉडल)",
    mkt_subheading: "फसल बेचने के सही समय का चुनाव करें और मशीन लर्निंग भाव विश्लेषण से अधिक मुनाफा कमाएं।",
    mkt_commodity: "फसल / जींस चुनें",
    mkt_state: "राज्य",
    mkt_district: "जिला",
    mkt_mandi: "कृषि उपज मंडी (APMC)",
    mkt_horizon: "पूर्वानुमान अवधि",
    mkt_btn: "मंडी भाव की भविष्यवाणी करें",
    mkt_modal_price: "वर्तमान मॉडल भाव",
    mkt_predicted_price: "अनुमानित भविष्य भाव",
    mkt_trend: "भाव की दिशा",
    mkt_chart_title: "ऐतिहासिक भाव और एआई भविष्य चार्ट",
    mkt_confidence: "अनुमानित रुझान",
    mkt_advice: "फसल बेचने की सलाह",

    voice_heading: "एग्रीनोवा एआई वॉयस असिस्टेंट",
    voice_subheading: "अपनी भाषा में बोलें और मौसम, फसल रोग, खाद, मंडी भाव व योजनाओं पर तुरंत कृषि सलाह पाएं।",
    voice_tap_mic: "बोलने के लिए माइक दबाएं",
    voice_listening: "आपकी आवाज़ सुनी जा रही है...",
    voice_processing: "कृषि जानकारी तैयार हो रही है...",
    voice_stop: "सुनना बंद करें",
    voice_suggested: "आप ऐसे सवाल पूछ सकते हैं:",
    voice_speak_response: "आवाज़ में सुनें",

    sch_heading: "सरकारी योजनाएं व किसान लाभ",
    sch_subheading: "केंद्र व राज्य सरकार की सब्सिडी, बीमा, ऋण और सोलर पंप योजनाओं की जानकारी व पात्रता जांचें।",
    sch_search: "योजना का नाम खोजें...",
    sch_category_filter: "श्रेणी अनुसार देखें",
    sch_eligibility_btn: "मेरी पात्रता जांचें",
    sch_benefits: "योजना के मुख्य लाभ",
    sch_eligibility: "पात्रता के नियम",
    sch_documents: "जरूरी दस्तावेजों की सूची",
    sch_procedure: "आवेदन करने की प्रक्रिया",
    sch_official_link: "सरकारी पोर्टल पर आवेदन करें",
    sch_save_scheme: "योजना सुरक्षित करें",
    sch_saved: "सुरक्षित",

    btn_save: "सहेजें",
    btn_delete: "हटाएं",
    btn_cancel: "रद्द करें",
    btn_close: "बंद करें",
    btn_download: "रिपोर्ट डाउनलोड करें",
    status_success: "सफल",
    status_error: "त्रुटि"
  },

  pa: {
    app_title: "ਐਗਰੀਨੋਵਾ ਏਆਈ",
    tagline: "ਸਮਾਰਟ ਖੇਤੀ ਦੀ ਸ਼ੁਰੂਆਤ, ਐਗਰੀਨੋਵਾ ਏਆਈ ਦੇ ਨਾਲ",
    sub_tagline: "ਫ਼ਸਲ ਰੋਗ ਪਛਾਣ, ਖਾਦ ਸਿਫ਼ਾਰਿਸ਼ਾਂ, ਤਾਜ਼ਾ ਮੌਸਮ ਅਲਰਟ, ਮੰਡੀ ਭਾਅ ਭਵਿੱਖਬਾਣੀ ਅਤੇ ਬੋਲ ਕੇ ਸਹਾਇਤਾ ਲਈ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸੇਮੰਦ ਸਾਥੀ।",
    get_started: "ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ",
    explore_features: "ਫੀਚਰ ਵੇਖੋ",
    nav_home: "ਮੁੱਖ ਪੰਨਾ",
    nav_dashboard: "ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
    nav_disease: "ਫ਼ਸਲ ਰੋਗ ਜਾਂਚ",
    nav_fertilizer: "ਖਾਦ ਕੈਲਕੁਲੇਟਰ",
    nav_weather: "ਮੌਸਮ ਤੇ ਸਲਾਹ",
    nav_market: "ਮੰਡੀ ਭਾਅ ਏਆਈ",
    nav_voice: "ਆਵਾਜ਼ ਸਹਾਇਕ",
    nav_schemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
    nav_tips: "ਖੇਤੀ ਨੁਕਤੇ",
    nav_history: "ਰਿਪੋਰਟਾਂ ਤੇ ਇਤਿਹਾਸ",
    nav_about: "ਸਾਡੇ ਬਾਰੇ",
    nav_profile: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
    nav_login: "ਲਾਗਇਨ",
    nav_register: "ਰਜਿਸਟਰ",
    nav_logout: "ਲਾਗਆਉਟ",
    dis_heading: "ਫ਼ਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਤੁਰੰਤ ਪਛਾਣ ਕਰੋ",
    dis_subheading: "ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਸਕਿੰਟਾਂ ਵਿੱਚ ਰੋਗ ਦੀ ਪਛਾਣ ਤੇ ਇਲਾਜ ਜਾਣੋ।",
    dis_browse: "ਤਸਵੀਰ ਚੁਣੋ",
    dis_camera: "ਕੈਮਰਾ ਵਰਤੋ",
    dis_btn_analyze: "ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ",
    fert_heading: "ਸਮਾਰਟ ਖਾਦ ਸਿਫ਼ਾਰਿਸ਼ ਪ੍ਰਣਾਲੀ",
    fert_crop: "ਫ਼ਸਲ ਦੀ ਕਿਸਮ",
    fert_btn: "ਖਾਦ ਦੀ ਮਾਤਰਾ ਜਾਣੋ",
    weath_heading: "ਖੇਤੀ ਮੌਸਮ ਜਾਣਕਾਰੀ",
    mkt_heading: "ਮੰਡੀ ਭਾਅ ਭਵਿੱਖਬਾਣੀ",
    mkt_btn: "ਭਾਅ ਜਾਣੋ",
    voice_heading: "ਐਗਰੀਨੋਵਾ ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
    sch_heading: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਲਾਭ",
    sch_eligibility_btn: "ਯੋਗਤਾ ਚੈੱਕ ਕਰੋ",
    btn_download: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ"
  },

  bn: {
    app_title: "এগ্রিনোভা এআই",
    tagline: "স্মার্ট কৃষির শুরু, এগ্রিনোভা এআই-এর সাথে",
    sub_tagline: "ফসলের রোগ নির্ণয়, উপযুক্ত সার সুপারিশ, আবহাওয়া পূর্বাভাস, বাজার দর বিশ্লেষণ এবং ভয়েস সহায়তার নির্ভরযোগ্য মাধ্যম।",
    get_started: "বিনামূল্যে শুরু করুন",
    explore_features: "বৈশিষ্ট্য দেখুন",
    nav_home: "হোম",
    nav_dashboard: "কৃষক ড্যাশবোর্ড",
    nav_disease: "রোগ নির্ণয়",
    nav_fertilizer: "সার ক্যালকুলেটর",
    nav_weather: "আবহাওয়া ও পরামর্শ",
    nav_market: "বাজার দর পূর্বাভাস",
    nav_voice: "ভয়েস সহকারী",
    nav_schemes: "সরকারি প্রকল্প",
    nav_tips: "কৃষি টিপস",
    nav_history: "ইতিহাস ও রিপোর্ট",
    nav_about: "আমাদের সম্পর্কে",
    nav_profile: "কৃষক প্রোফাইল",
    nav_login: "লগইন",
    nav_register: "নিবন্ধন",
    nav_logout: "লগআউট",
    dis_heading: "ফসলের রোগ তাৎক্ষণিক শনাক্ত করুন",
    dis_subheading: "আক্রান্ত পাতার ছবি আপলোড করুন এবং কয়েক সেকেন্ডে সঠিক প্রতিকার জানুন।",
    dis_browse: "ছবি নির্বাচন করুন",
    dis_btn_analyze: "রোগ নির্ণয় করুন",
    fert_heading: "বুদ্ধিমান সার সুপারিশ ব্যবস্থা",
    fert_crop: "ফসলের নাম",
    fert_btn: "সারের পরিমাণ জানুন",
    weath_heading: "রিয়েল-টাইম কৃষি আবহাওয়া",
    mkt_heading: "বাজার দর পূর্বাভাস",
    voice_heading: "এগ্রিনোভা ভয়েস সহকারী",
    sch_heading: "সরকারি প্রকল্প ও কৃষক সুবিধা",
    sch_eligibility_btn: "যোগ্যতা যাচাই করুন",
    btn_download: "রিপোর্ট ডাউনলোড করুন"
  },

  mr: {
    app_title: "अग्रीनोव्हा एआय",
    tagline: "स्मार्ट शेतीची सुरुवात, अग्रीनोव्हा एआय सोबत",
    sub_tagline: "पीक रोग निदान, अचूक खत शिफारस, थेट हवामान अंदाज, कृषी बाजारभाव आणि व्हॉइस असिस्टंट द्वारे शेतकऱ्यांचे सक्षमीकरण.",
    get_started: "विनामूल्य सुरू करा",
    explore_features: "वैशिष्ट्ये एक्सप्लोर करा",
    nav_home: "मुख्यपृष्ठ",
    nav_dashboard: "शेतकरी डॅशबोर्ड",
    nav_disease: "पीक रोग निदान",
    nav_fertilizer: "खत शिफारस",
    nav_weather: "हवामान व सल्ला",
    nav_market: "बाजारभाव अंदाज",
    nav_voice: "व्हॉइस असिस्टंट",
    nav_schemes: "सरकारी योजना",
    nav_tips: "कृषी सल्ले",
    nav_history: "इतिहास व अहवाल",
    nav_about: "आमच्याबद्दल",
    nav_profile: "शेतकरी प्रोफाईल",
    nav_login: "लॉगिन",
    nav_register: "नोंदणी करा",
    nav_logout: "लॉगआउट",
    dis_heading: "पिकांवरील रोगांचे त्वरित निदान करा",
    dis_subheading: "बाधित पानाचा फोटो अपलोड करा आणि अचूक उपाययोजना जाणून घ्या.",
    dis_browse: "फोटो निवडा",
    dis_btn_analyze: "तपासणी करा",
    fert_heading: "बुद्धिमान खत शिफारस प्रणाली",
    fert_crop: "पिकाचा प्रकार",
    fert_btn: "खताचे प्रमाण जाणून घ्या",
    weath_heading: "शेतीसाठी हवामान अंदाज",
    mkt_heading: "बाजारभाव अंदाज (एआय मॉडेल)",
    voice_heading: "अग्रीनोव्हा व्हॉइस असिस्टंट",
    sch_heading: "सरकारी कृषी योजना आणि लाभ",
    sch_eligibility_btn: "पात्रता तपासा",
    btn_download: "अहवाल डाउनलोड करा"
  },

  gu: {
    app_title: "એગ્રીનોવા AI",
    tagline: "સ્માર્ટ ખેતીની શરૂઆત, એગ્રીનોવા AI સાથે",
    sub_tagline: "પાકના રોગોની ઓળખ, સંતુલિત ખાતર સલાહ, રીઅલ-ટાઇમ હવામાન, બજાર ભાવની આગાહી અને વૉઇસ સહાયક.",
    get_started: "મફત શરૂ કરો",
    explore_features: "વિશેષતાઓ જુઓ",
    nav_home: "હોમ",
    nav_dashboard: "ખેડૂત ડેશબોર્ડ",
    nav_disease: "પાક રોગ ઓળખ",
    nav_fertilizer: "ખાતર માર્ગદર્શિકા",
    nav_weather: "હવામાન અને સલાહ",
    nav_market: "બજાર ભાવ AI",
    nav_voice: "વૉઇસ આસિસ્ટન્ટ",
    nav_schemes: "સરકારી યોજનાઓ",
    nav_tips: "ખેતી ટિપ્સ",
    nav_history: "રિપોર્ટ્સ",
    nav_about: "અમારા વિશે",
    nav_profile: "પ્રોફાઇલ",
    nav_login: "લૉગિન",
    nav_register: "નોંધણી",
    nav_logout: "લૉગઆઉટ",
    dis_heading: "પાકના રોગની તાત્કાલિક ઓળખ",
    dis_btn_analyze: "તપાસ કરો",
    fert_heading: "ખાતર ભલામણ પ્રણાલી",
    weath_heading: "રીઅલ-ટાઇમ કૃષિ હવામાન",
    mkt_heading: "બજાર ભાવ આગાહી",
    voice_heading: "એગ્રીનોવા વૉઇસ સહાયક",
    sch_heading: "સરકારી યોજનાઓ અને લાભો",
    sch_eligibility_btn: "પાત્રતા ચકાસો",
    btn_download: "રિપોર્ટ ડાઉનલોડ કરો"
  },

  ta: {
    app_title: "அக்ரிநோவா AI",
    tagline: "ஸ்மார்ட் விவசாயம் அக்ரிநோவா AI உடன் தொடங்குகிறது",
    sub_tagline: "பயிர் நோய் கண்டறிதல், சரியான உர பரிந்துரை, வானிலை தகவல்கள், சந்தை விலை கணிப்பு மற்றும் குரல் உதவியாளர்.",
    get_started: "இலவசமாக தொடங்குக",
    explore_features: "அம்சங்களை காண்க",
    nav_home: "முகப்பு",
    nav_dashboard: "விவசாயி டாஷ்போர்டு",
    nav_disease: "பயிர் நோய் கண்டறிதல்",
    nav_fertilizer: "உர பரிந்துரை",
    nav_weather: "வானிலை & ஆலோசனை",
    nav_market: "சந்தை விலை கணிப்பு",
    nav_voice: "குரல் உதவியாளர்",
    nav_schemes: "அரசு திட்டங்கள்",
    nav_tips: "விவசாய குறிப்புகள்",
    nav_history: "வரலாறு & அறிக்கைகள்",
    nav_about: "எங்களை பற்றி",
    nav_profile: "விவரக்குறிப்பு",
    nav_login: "உள்நுழைக",
    nav_register: "பதிவு செய்க",
    nav_logout: "வெளியேறுக",
    dis_heading: "பயிர் நோய்களை உடனடியாக கண்டறியவும்",
    dis_btn_analyze: "ஆராய்ச்சி செய்க",
    fert_heading: "அறிவுசார் உர பரிந்துரை அமைப்பு",
    weath_heading: "நேரலை வானிலை தகவல்",
    mkt_heading: "சந்தை விலை கணிப்பு",
    voice_heading: "அக்ரிநோவா குரல் உதவியாளர்",
    sch_heading: "அரசு திட்டங்கள் மற்றும் நன்மைகள்",
    sch_eligibility_btn: "தகுதியை சரிபார்க்கவும்",
    btn_download: "அறிக்கையை பதிவிறக்குக"
  },

  te: {
    app_title: "అగ్రినోవా AI",
    tagline: "స్మార్ట్ వ్యవసాయం అగ్రినోవా AI తో మొదలవుతుంది",
    sub_tagline: "పంట తెగుళ్ల గుర్తింపు, ఎరువుల సిఫార్సులు, రియల్-టైమ్ వాతావరణం, మార్కెట్ ధర అంచనాలు మరియు వాయిస్ అసిస్టెంట్.",
    get_started: "ఉచితంగా ప్రారంభించండి",
    explore_features: "ఫీచర్లు చూడండి",
    nav_home: "హోమ్",
    nav_dashboard: "రైతు డాష్‌బోర్డ్",
    nav_disease: "పంట తెగులు గుర్తింపు",
    nav_fertilizer: "ఎరువుల సలహా",
    nav_weather: "వాతావరణం & సూచనలు",
    nav_market: "మార్కెట్ ధర అంచనా",
    nav_voice: "వాయిస్ అసిస్టెంట్",
    nav_schemes: "ప్రభుత్వ పథకాలు",
    nav_tips: "వ్యవసాయ చిట్కాలు",
    nav_history: "చరిత్ర & నివేదికలు",
    nav_about: "మా గురించి",
    nav_profile: "రైతు ప్రొఫైల్",
    nav_login: "లాగిన్",
    nav_register: "రిజిస్టర్",
    nav_logout: "లాగ్అవుట్",
    dis_heading: "పంట తెగుళ్లను తక్షణమే గుర్తించండి",
    dis_btn_analyze: "విశ్లేషించండి",
    fert_heading: "తెలివైన ఎరువుల సిఫార్సు వ్యవస్థ",
    weath_heading: "వ్యవసాయ వాతావరణ సమాచారం",
    mkt_heading: "మార్కెట్ ధర అంచనా",
    voice_heading: "అగ్రినోవా వాయిస్ అసిస్టెంట్",
    sch_heading: "ప్రభుత్వ పథకాలు & ప్రయోజనాలు",
    sch_eligibility_btn: "అర్హతను తనిఖీ చేయండి",
    btn_download: "రిపోర్ట్ డౌన్‌లోడ్ చేయండి"
  },

  kn: {
    app_title: "ಅಗ್ರಿನೋವಾ ಎಐ",
    tagline: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಆರಂಭ, ಅಗ್ರಿನೋವಾ ಎಐ ಜೊತೆ",
    sub_tagline: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ, ವೈಜ್ಞಾನಿಕ ಗೊಬ್ಬರ ಶಿಫಾರಸು, ನೈಜ-ಸಮಯದ ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಧ್ವನಿ ಸಹಾಯಕ.",
    get_started: "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ",
    explore_features: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ",
    nav_home: "ಮುಖಪುಟ",
    nav_dashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    nav_disease: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
    nav_fertilizer: "ಗೊಬ್ಬರ ಶಿಫಾರಸು",
    nav_weather: "ಹವಾಮಾನ ಮಾಹಿತಿ",
    nav_market: "ಮಾರುಕಟ್ಟೆ ದರ ಎಐ",
    nav_voice: "ಧ್ವನಿ ಸಹಾಯಕ",
    nav_schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    nav_tips: "ಕೃಷಿ ಸಲಹೆಗಳು",
    nav_history: "ವರದಿಗಳು",
    nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
    nav_profile: "ಪ್ರೊಫೈಲ್",
    nav_login: "ಲಾಗಿನ್",
    nav_register: "ನೋಂದಣಿ",
    nav_logout: "ಲಾಗ್ ಔಟ್",
    dis_heading: "ಬೆಳೆ ರೋಗಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಿ",
    dis_btn_analyze: "ಪರೀಕ್ಷಿಸಿ",
    fert_heading: "ಗೊಬ್ಬರ ಶಿಫಾರಸು ವ್ಯವಸ್ಥೆ",
    weath_heading: "ನೈಜ-ಸಮಯದ ಕೃಷಿ ಹವಾಮಾನ",
    mkt_heading: "ಮಾರುಕಟ್ಟೆ ದರ ಮುನ್ಸೂಚನೆ",
    voice_heading: "ಅಗ್ರಿನೋವಾ ಧ್ವನಿ ಸಹಾಯಕ",
    sch_heading: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳು",
    sch_eligibility_btn: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
    btn_download: "ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"
  },

  ml: {
    app_title: "അഗ്രിനോവ AI",
    tagline: "സ്മാർട്ട് കൃഷി ആരംഭിക്കുന്നു അഗ്രിനോവ AI-ലൂടെ",
    sub_tagline: "വിള രോഗനിർണ്ണയം, വളം ശുപാർശ, കൃഷി കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, വിപണി വില പ്രവചനം, വോയ്സ് അസിസ്റ്റന്റ്.",
    get_started: "സൗജന്യമായി ആരംഭിക്കുക",
    explore_features: "സവിശേഷതകൾ കാണുക",
    nav_home: "ഹോം",
    nav_dashboard: "കർഷക ഡാഷ്‌ബോർഡ്",
    nav_disease: "വിള രോഗനിർണ്ണയം",
    nav_fertilizer: "വള പ്രയോഗം",
    nav_weather: "കാലാവസ്ഥ & നിർദ്ദേശങ്ങൾ",
    nav_market: "വിപണി വില AI",
    nav_voice: "വോയ്സ് അസിസ്റ്റന്റ്",
    nav_schemes: "സർക്കാർ പദ്ധതികൾ",
    nav_tips: "കൃഷി ടിപ്പുകൾ",
    nav_history: "റിപ്പോർട്ടുകൾ",
    nav_about: "ഞങ്ങളെക്കുറിച്ച്",
    nav_profile: "പ്രൊഫൈൽ",
    nav_login: "ലോഗിൻ",
    nav_register: "രജിസ്റ്റർ",
    nav_logout: "ലോഗൗട്ട്",
    dis_heading: "വിള രോഗങ്ങൾ തത്സമയം കണ്ടെത്തുക",
    dis_btn_analyze: "പരിശോധിക്കുക",
    fert_heading: "ശാസ്ത്രീയ വള ശുപാർശ",
    weath_heading: "കൃഷി കാലാവസ്ഥ",
    mkt_heading: "വിപണി വില പ്രവചനം",
    voice_heading: "അഗ്രിനോവ വോയ്സ് അസിസ്റ്റന്റ്",
    sch_heading: "സർക്കാർ പദ്ധതികളും ആനുകൂല്യങ്ങളും",
    sch_eligibility_btn: "അർഹത പരിശോധിക്കുക",
    btn_download: "റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക"
  },

  or: {
    app_title: "ଏଗ୍ରିନୋଭା AI",
    tagline: "ସ୍ମାର୍ଟ କୃଷିର ଆରମ୍ଭ, ଏଗ୍ରିନୋଭା AI ସହିତ",
    sub_tagline: "ଫସଲ ରୋଗ ନିରୂପଣ, ସାର ପ୍ରୟୋଗ ସୁପାରିଶ, ପାଣିପାଗ ସୂଚନା, ବଜାର ଦର ଆକଳନ ଏବଂ ଭଏସ୍ ସହାୟତା।",
    get_started: "ମାଗଣାରେ ଆରମ୍ଭ କରନ୍ତୁ",
    explore_features: "ସୁବିଧାଗୁଡ଼ିକ ଦେଖନ୍ତୁ",
    nav_home: "ମୁଖ୍ୟପୃଷ୍ଠା",
    nav_dashboard: "କୃଷକ ଡ୍ୟାସବୋର୍ଡ",
    nav_disease: "ରୋଗ ଚିହ୍ନଟ",
    nav_fertilizer: "ସାର ସୁପାରିଶ",
    nav_weather: "ପାଣିପାଗ ଓ ପରାମର୍ଶ",
    nav_market: "ବଜାର ଦର AI",
    nav_voice: "ଭଏସ୍ ସହାୟକ",
    nav_schemes: "ସରକାରୀ ଯୋଜନା",
    nav_tips: "କୃଷି ଟିପ୍ସ",
    nav_history: "ରିପୋର୍ଟ",
    nav_about: "ଆମ ବିଷୟରେ",
    nav_profile: "ପ୍ରୋଫାଇଲ୍",
    nav_login: "ଲଗଇନ୍",
    nav_register: "ପଞ୍ଜୀକରଣ",
    nav_logout: "ଲଗଆଉଟ୍",
    dis_heading: "ଫସଲ ରୋଗ ଶୀଘ୍ର ଚିହ୍ନଟ କରନ୍ତୁ",
    dis_btn_analyze: "ପରୀକ୍ଷା କରନ୍ତୁ",
    fert_heading: "ବୈଜ୍ଞାନିକ ସାର ସୁପାରିଶ",
    weath_heading: "କୃଷି ପାଣିପାଗ ସୂଚନା",
    mkt_heading: "ବଜାର ଦର ଆକଳନ",
    voice_heading: "ଏଗ୍ରିନୋଭା ଭଏସ୍ ସହାୟକ",
    sch_heading: "ସରକାରୀ ଯୋଜନା ଓ ସୁବିଧା",
    sch_eligibility_btn: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ",
    btn_download: "ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ"
  },

  as: {
    app_title: "এগ্ৰিনোভা এআই",
    tagline: "স্মাৰ্ট কৃষিৰ আৰম্ভণি, এগ্ৰিনোভা এআইৰ সৈতে",
    sub_tagline: "শস্যৰ ৰোগ চিনাক্তকৰণ, সঠিক সাৰ প্ৰয়োগ পৰামৰ্শ, বতৰৰ আগজাননী, বজাৰ মূল্য নিৰ্ধাৰণ আৰু ভইচ সহায়ক।",
    get_started: "বিনামূলীয়াকৈ আৰম্ভ কৰক",
    explore_features: "সুবিধাসমূহ চাওক",
    nav_home: "গৃহপৃষ্ঠা",
    nav_dashboard: "কৃষক ডেচবৰ্ড",
    nav_disease: "ৰোগ চিনাক্তকৰণ",
    nav_fertilizer: "সাৰ পৰামৰ্শ",
    nav_weather: "বতৰ আৰু পৰামৰ্শ",
    nav_market: "বজাৰ মূল্য এআই",
    nav_voice: "ভইচ সহায়ক",
    nav_schemes: "চৰকাৰী আঁচনি",
    nav_tips: "কৃষি পৰামৰ্শ",
    nav_history: "ইতিহাস আৰু প্ৰতিবেদন",
    nav_about: "আমাৰ বিষয়ে",
    nav_profile: "কৃষক প্ৰফাইল",
    nav_login: "লগইন",
    nav_register: "পঞ্জীয়ন",
    nav_logout: "লগআউট",
    dis_heading: "শস্যৰ ৰোগ ক্ষিপ্ৰভাৱে চিনাক্ত কৰক",
    dis_btn_analyze: "পৰীক্ষা কৰক",
    fert_heading: "স্মাৰ্ট সাৰ পৰামৰ্শ প্ৰণালী",
    weath_heading: "কৃষি বতৰৰ তথ্য",
    mkt_heading: "বজাৰ মূল্যৰ আগজাননী",
    voice_heading: "এগ্ৰিনোভা ভইচ সহায়ক",
    sch_heading: "চৰকাৰী আঁচনি আৰু কৃষক সুবিধা",
    sch_eligibility_btn: "যোগ্যতা পৰীক্ষা কৰক",
    btn_download: "প্ৰতিবেদন ডাউনলোড কৰক"
  }
};

class I18nManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('agrinova_lang') || 'en';
    this.listeners = [];
  }

  getLanguage() {
    return this.currentLanguage;
  }

  getLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  getSpeechLocale() {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === this.currentLanguage);
    return lang ? lang.speechLocale : 'en-IN';
  }

  setLanguage(langCode) {
    if (!TRANSLATIONS[langCode]) {
      console.warn(`Language ${langCode} not found, defaulting to en`);
      langCode = 'en';
    }
    this.currentLanguage = langCode;
    localStorage.setItem('agrinova_lang', langCode);
    
    // Update active class/selected in UI
    document.querySelectorAll('[data-lang-picker]').forEach(el => {
      el.value = langCode;
    });

    this.translateDOM();
    this.notifyListeners(langCode);
  }

  t(key, fallback = '') {
    const dict = TRANSLATIONS[this.currentLanguage] || TRANSLATIONS['en'];
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to English
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    return fallback || key;
  }

  translateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.getAttribute('placeholder')) {
            el.setAttribute('placeholder', translation);
          }
        } else {
          el.innerText = translation;
        }
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation) el.setAttribute('title', translation);
    });
  }

  onLanguageChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners(langCode) {
    this.listeners.forEach(cb => {
      try { cb(langCode); } catch (e) { console.error("i18n callback error:", e); }
    });
  }
}

// Global singleton instance
window.i18n = new I18nManager();
