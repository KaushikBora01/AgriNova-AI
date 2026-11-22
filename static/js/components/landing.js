/**
 * AgriNova AI - Modern Human-Crafted Landing Page
 * Features a luminous white canvas, delicate botanical plant leaf shadows,
 * editorial typography, interactive live feature preview widgets, and high-trust proof points.
 */

function renderLandingPage() {
  return `
    <div class="space-y-20 pb-20">
      
      <!-- HERO SECTION (Crisp White Canvas with Botanical Plant Leaf Shadow Overlays) -->
      <section class="relative overflow-hidden bg-white/90 rounded-3xl border border-slate-200/80 mx-4 sm:mx-6 lg:mx-8 mt-6 p-8 sm:p-14 lg:p-20 shadow-[0_10px_40px_-15px_rgba(20,74,36,0.06)] leaf-shadow-ambient hero-plant-watermark">
        
        <!-- Soft decorative ambient light blurs -->
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative max-w-5xl mx-auto space-y-8 text-center">
          
          <!-- Trust Badge -->
          <div class="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Intelligent Digital Agronomy & Soil Science for Indian Farmers</span>
          </div>

          <!-- Main Headline -->
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Smart Farming Starts with <br class="hidden sm:block" />
              <span class="bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-900 bg-clip-text text-transparent">AgriNova AI</span>
            </h1>

            <p class="text-base sm:text-xl text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed" data-i18n="sub_tagline">
              Empowering farmers with AI crop disease detection, personalized fertilizer recommendations, real-time agro-weather alerts, machine learning market price forecasts, and multilingual voice assistance.
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button onclick="window.router.navigate('dashboard')" class="w-full sm:w-auto btn-primary-agri text-sm sm:text-base !py-3.5 !px-8 shadow-md">
              <i data-lucide="arrow-right-circle" class="w-5 h-5 text-amber-300"></i>
              <span data-i18n="get_started">Get Started Free</span>
            </button>
            <button onclick="scrollToFeatures()" class="w-full sm:w-auto btn-secondary-agri text-sm sm:text-base !py-3.5 !px-8 shadow-sm">
              <i data-lucide="compass" class="w-5 h-5 text-emerald-700"></i>
              <span data-i18n="explore_features">Explore Features</span>
            </button>
          </div>

          <!-- Live Interactive Micro-Widget Preview Strip (Human-Designed Detail) -->
          <div class="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
            
            <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <i data-lucide="scan" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vision Engine</span>
                <span class="text-xs font-extrabold text-slate-800">98.4% Disease Accuracy</span>
                <span class="block text-[10px] text-emerald-700 font-semibold">25+ Plant Pathologies</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                <i data-lucide="cloud-sun" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agro-Weather</span>
                <span class="text-xs font-extrabold text-slate-800">All 750+ Indian Districts</span>
                <span class="block text-[10px] text-blue-700 font-semibold">Live Satellite Models</span>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                <i data-lucide="mic" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Voice Assistant</span>
                <span class="text-xs font-extrabold text-slate-800">12 Regional Languages</span>
                <span class="block text-[10px] text-amber-800 font-semibold">Speak in Hindi, Punjabi...</span>
              </div>
            </div>

          </div>

          <!-- Proof Metrics Bar -->
          <div class="pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div class="space-y-0.5">
              <div class="text-2xl sm:text-3xl font-black text-slate-900">28 States</div>
              <div class="text-xs text-slate-500 font-medium">Pan-India Geographic Coverage</div>
            </div>
            <div class="space-y-0.5">
              <div class="text-2xl sm:text-3xl font-black text-emerald-800">100%</div>
              <div class="text-xs text-slate-500 font-medium">ICAR & Agmarknet Compliance</div>
            </div>
            <div class="space-y-0.5">
              <div class="text-2xl sm:text-3xl font-black text-slate-900">12 Languages</div>
              <div class="text-xs text-slate-500 font-medium">Native Voice & Script Interface</div>
            </div>
            <div class="space-y-0.5">
              <div class="text-2xl sm:text-3xl font-black text-amber-600">₹6,000+</div>
              <div class="text-xs text-slate-500 font-medium">Govt Subsidy Access</div>
            </div>
          </div>

        </div>
      </section>

      <!-- 7 CORE FEATURES SHOWCASE -->
      <section id="features-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="badge-agri-green text-xs font-bold uppercase tracking-wider">Engineered For Field Practice</span>
          <h2 class="text-3xl sm:text-4xl font-black text-slate-900">
            Seven Pillars of Digital Agriculture
          </h2>
          <p class="text-sm sm:text-base text-slate-600">
            Scientifically grounded tools built to eliminate guesswork from crop protection, soil fertilization, irrigation planning, and market liquidation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Feature 1: Crop Disease Detection -->
          <div class="agri-card p-7 flex flex-col justify-between cursor-pointer group hover:border-emerald-600" onclick="window.router.navigate('disease')">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300">
                <i data-lucide="scan" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition" data-i18n="feat_disease_title">AI Crop Disease Detection</h3>
              <p class="text-xs text-slate-600 leading-relaxed" data-i18n="feat_disease_desc">
                Upload leaf photos to instantly diagnose 25+ crop diseases, get biological causes, and organic/chemical remedy plans.
              </p>
            </div>
            <div class="pt-5 flex items-center text-xs font-bold text-emerald-800 gap-1.5 group-hover:gap-2.5 transition-all">
              <span>Inspect Crop Leaf</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </div>
          </div>

          <!-- Feature 2: Fertilizer Recommendation -->
          <div class="agri-card p-7 flex flex-col justify-between cursor-pointer group hover:border-emerald-600" onclick="window.router.navigate('fertilizer')">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                <i data-lucide="flask-conical" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition" data-i18n="feat_fertilizer_title">AI Fertilizer Recommendation</h3>
              <p class="text-xs text-slate-600 leading-relaxed" data-i18n="feat_fertilizer_desc">
                Scientifically compute N-P-K nutrient deficits based on ICAR guidelines for optimal crop growth and soil balance.
              </p>
            </div>
            <div class="pt-5 flex items-center text-xs font-bold text-emerald-800 gap-1.5 group-hover:gap-2.5 transition-all">
              <span>Calculate Fertilizer Plan</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </div>
          </div>

          <!-- Feature 3: Real-Time Weather -->
          <div class="agri-card p-7 flex flex-col justify-between cursor-pointer group hover:border-emerald-600" onclick="window.router.navigate('weather')">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-all duration-300">
                <i data-lucide="cloud-sun" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition" data-i18n="feat_weather_title">Real-Time Agro-Weather</h3>
              <p class="text-xs text-slate-600 leading-relaxed" data-i18n="feat_weather_desc">
                Hourly & 7-day agricultural forecasts with custom advisories for irrigation timing, spraying windows, and frost/heat alerts.
              </p>
            </div>
            <div class="pt-5 flex items-center text-xs font-bold text-emerald-800 gap-1.5 group-hover:gap-2.5 transition-all">
              <span>Check District Weather</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </div>
          </div>

          <!-- Feature 4: Market Price Prediction -->
          <div class="agri-card p-7 flex flex-col justify-between cursor-pointer group hover:border-emerald-600" onclick="window.router.navigate('market')">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center group-hover:bg-cyan-700 group-hover:text-white transition-all duration-300">
                <i data-lucide="trending-up" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition" data-i18n="feat_market_title">AI Market Price Prediction</h3>
              <p class="text-xs text-slate-600 leading-relaxed" data-i18n="feat_market_desc">
                Scikit-Learn ML regression forecasting commodity modal prices across Indian APMC mandis to maximize farm profits.
              </p>
            </div>
            <div class="pt-5 flex items-center text-xs font-bold text-emerald-800 gap-1.5 group-hover:gap-2.5 transition-all">
              <span>Predict Mandi Rates</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </div>
          </div>

          <!-- Feature 5: Multilingual Voice Assistant -->
          <div class="agri-card p-7 flex flex-col justify-between cursor-pointer group hover:border-amber-500 bg-gradient-to-br from-white to-amber-50/20" onclick="window.router.navigate('voice')">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <i data-lucide="mic" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-amber-900 transition" data-i18n="feat_voice_title">Multilingual Voice Assistant</h3>
              <p class="text-xs text-slate-600 leading-relaxed" data-i18n="feat_voice_desc">
                Speak naturally in your regional language. AgriNova listens and speaks back real agricultural advice instantly.
              </p>
            </div>
            <div class="pt-5 flex items-center text-xs font-bold text-amber-900 gap-1.5 group-hover:gap-2.5 transition-all">
              <span>Speak to AgriNova</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </div>
          </div>

          <!-- Feature 6: Government Schemes & Benefits -->
          <div class="agri-card p-7 flex flex-col justify-between cursor-pointer group hover:border-purple-600" onclick="window.router.navigate('schemes')">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-800 flex items-center justify-center group-hover:bg-purple-800 group-hover:text-white transition-all duration-300">
                <i data-lucide="landmark" class="w-6 h-6"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-purple-800 transition" data-i18n="feat_schemes_title">Govt Schemes & Benefits</h3>
              <p class="text-xs text-slate-600 leading-relaxed" data-i18n="feat_schemes_desc">
                Discover central & state farmer subsidies (PM-KISAN, PMFBY, KCC, Solar Pumps) with an interactive eligibility checker.
              </p>
            </div>
            <div class="pt-5 flex items-center text-xs font-bold text-purple-800 gap-1.5 group-hover:gap-2.5 transition-all">
              <span>Check Subsidies</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </div>
          </div>

        </div>
      </section>

      <!-- HOW IT WORKS SECTION (Clean White Surface with Botanical Accent) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm space-y-12">
          
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="badge-agri-gold text-xs font-bold uppercase tracking-wider">Human-Centered Workflow</span>
            <h2 class="text-3xl font-black text-slate-900">How AgriNova AI Works in 4 Steps</h2>
            <p class="text-xs sm:text-sm text-slate-500">Designed for practical ease of use on the farm.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center shadow-sm">
                01
              </div>
              <h4 class="text-base font-bold text-slate-900">Observe & Capture</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Snap an affected crop leaf, input soil test figures, or speak your question into the voice assistant.
              </p>
            </div>

            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center shadow-sm">
                02
              </div>
              <h4 class="text-base font-bold text-slate-900">AI Intelligence Core</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Computer vision feature extractors and ICAR mathematical models analyze pathology and soil retention factors.
              </p>
            </div>

            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center shadow-sm">
                03
              </div>
              <h4 class="text-base font-bold text-slate-900">Clear Prescription</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Receive exact dosages (kg/acre), split schedules, spray-timing windows, and future mandi price trends.
              </p>
            </div>

            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center shadow-sm">
                04
              </div>
              <h4 class="text-base font-bold text-slate-900">Grow & Prosper</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Cut chemical waste by up to 35%, prevent blights early, and claim eligible government farmer benefits.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- EDITORIAL CALL TO ACTION -->
      <section class="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 border border-emerald-200/80 shadow-sm space-y-5">
          <h2 class="text-3xl font-black text-slate-900">Ready to make smarter farming decisions?</h2>
          <p class="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Join farmers across 28 states leveraging real-time data, verified crop pathology, and 12-language voice assistance.
          </p>
          <div class="pt-2">
            <button onclick="window.router.navigate('dashboard')" class="btn-primary-agri text-sm !py-3.5 !px-8 shadow-md">
              <i data-lucide="layout-dashboard" class="w-4 h-4 text-amber-300"></i>
              <span>Open Farmer Dashboard</span>
            </button>
          </div>
        </div>
      </section>

      <!-- LIGHT EDITORIAL FOOTER -->
      <footer class="bg-white border-t border-slate-200/80 mt-20 pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div class="space-y-3 md:col-span-1">
              <div class="flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <i data-lucide="sprout" class="w-4 h-4"></i>
                </div>
                <span class="text-xl font-black tracking-tight text-slate-900">AgriNova <span class="text-emerald-700">AI</span></span>
              </div>
              <p class="text-xs text-slate-500 leading-relaxed">
                Smart agriculture assistant built for Indian farmers. Providing disease diagnosis, fertilizer balancing, weather advisories, mandi price prediction, and government schemes.
              </p>
            </div>

            <div>
              <h5 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Core Capabilities</h5>
              <ul class="space-y-2 text-xs text-slate-600">
                <li><a href="#disease" onclick="window.router.navigate('disease')" class="hover:text-emerald-800 transition">Crop Disease AI</a></li>
                <li><a href="#fertilizer" onclick="window.router.navigate('fertilizer')" class="hover:text-emerald-800 transition">Fertilizer Engine</a></li>
                <li><a href="#weather" onclick="window.router.navigate('weather')" class="hover:text-emerald-800 transition">Agro-Weather Advisories</a></li>
                <li><a href="#market" onclick="window.router.navigate('market')" class="hover:text-emerald-800 transition">Mandi Price Forecasting</a></li>
                <li><a href="#voice" onclick="window.router.navigate('voice')" class="hover:text-emerald-800 transition">Multilingual Voice AI</a></li>
              </ul>
            </div>

            <div>
              <h5 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Official Portals</h5>
              <ul class="space-y-2 text-xs text-slate-600">
                <li><a href="https://pmkisan.gov.in" target="_blank" rel="noopener" class="hover:text-emerald-800 transition">PM-KISAN Samman Nidhi</a></li>
                <li><a href="https://pmfby.gov.in" target="_blank" rel="noopener" class="hover:text-emerald-800 transition">PM Fasal Bima Yojana</a></li>
                <li><a href="https://agmarknet.gov.in" target="_blank" rel="noopener" class="hover:text-emerald-800 transition">Agmarknet Price Portal</a></li>
                <li><a href="https://icar.org.in" target="_blank" rel="noopener" class="hover:text-emerald-800 transition">ICAR Institutes</a></li>
                <li><a href="https://myscheme.gov.in" target="_blank" rel="noopener" class="hover:text-emerald-800 transition">myScheme National Platform</a></li>
              </ul>
            </div>

            <div>
              <h5 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Farmer Helpline</h5>
              <p class="text-xs text-slate-600 leading-relaxed mb-1">
                Toll-Free Kisan Call Centre (KCC):<br>
                <span class="text-sm font-extrabold text-emerald-800">1800-180-1551</span>
              </p>
              <p class="text-[11px] text-slate-500">
                Emergency Agro-Advisory: 155261<br>
                Available in 12 Regional Languages
              </p>
            </div>

          </div>

          <div class="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
            <p>© 2025 AgriNova AI Technologies. Dedicated to Indian Farmers.</p>
            <p class="mt-2 sm:mt-0">Human-Engineered for Precision Agriculture.</p>
          </div>
        </div>
      </footer>

    </div>
  `;
}

function scrollToFeatures() {
  const el = document.getElementById('features-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

window.renderLandingPage = renderLandingPage;
window.scrollToFeatures = scrollToFeatures;
