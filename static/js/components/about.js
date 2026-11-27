/**
 * AgriNova AI - About Component
 * Mission, software architecture, machine learning models, and official data sources.
 * Clean, human-crafted architectural document.
 */

function renderAboutPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HERO -->
      <div class="text-center max-w-2xl mx-auto space-y-2.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="info" class="w-3.5 h-3.5 text-emerald-700"></i>
          <span>About AgriNova AI Platform</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Empowering Indian Agriculture with Intelligent Science
        </h1>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          AgriNova AI is an intelligent digital agronomy support system designed to bridge the gap between complex agronomic research and everyday on-field farming decisions.
        </p>
      </div>

      <!-- MISSION & VISION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="agri-card p-6 sm:p-8 space-y-3 bg-white border border-slate-200/90 shadow-sm">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
            <i data-lucide="target" class="w-6 h-6"></i>
          </div>
          <h3 class="text-lg font-black text-slate-900">Our Core Mission</h3>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">
            To equip every farmer across India with instant disease diagnosis, customized soil nutrient management, microclimate weather advisories, and market pricing intelligence in their native language—reducing unnecessary cultivation expenses and preventing crop loss.
          </p>
        </div>

        <div class="agri-card p-6 sm:p-8 space-y-3 bg-white border border-slate-200/90 shadow-sm">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold">
            <i data-lucide="compass" class="w-6 h-6"></i>
          </div>
          <h3 class="text-lg font-black text-slate-900">Our Vision</h3>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">
            A modernized, digitally connected agricultural ecosystem where artificial intelligence serves as a trusted assistant on every farm, preserving soil fertility and securing farmer prosperity.
          </p>
        </div>
      </div>

      <!-- TECHNICAL ARCHITECTURE & AI MODELS -->
      <div class="agri-card p-6 sm:p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
          <i data-lucide="cpu" class="w-5 h-5 text-emerald-800"></i>
          <span>Architectural & Artificial Intelligence Stack</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span class="font-extrabold text-emerald-900 uppercase tracking-wider text-[11px] block">1. Crop Disease Detection</span>
            <p class="text-slate-600 leading-relaxed font-medium">
              <strong>AgriVision-Net v2.4:</strong> High-resolution leaf feature extraction pipeline (Pillow & NumPy) measuring chlorophyll index, chlorosis ratio, and necrotic lesion morphology ensemble across Solanaceae, Cereals, and Cash crops.
            </p>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span class="font-extrabold text-amber-900 uppercase tracking-wider text-[11px] block">2. Fertilizer Recommendation Engine</span>
            <p class="text-slate-600 leading-relaxed font-medium">
              <strong>ICAR Nutrient Deficit Model:</strong> Mathematical balancing of N-P-K crop requirements adjusted for soil retention factors, pH buffering capacity, and split vegetative application windows.
            </p>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span class="font-extrabold text-emerald-900 uppercase tracking-wider text-[11px] block">3. Market Price Forecasting</span>
            <p class="text-slate-600 leading-relaxed font-medium">
              <strong>Scikit-Learn Polynomial Ridge Regression:</strong> Models cyclical mandi arrivals, seasonal harvest peaks, and historical modal price variations with estimated trend bounds.
            </p>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span class="font-extrabold text-purple-900 uppercase tracking-wider text-[11px] block">4. Multilingual NLP Voice Assistant</span>
            <p class="text-slate-600 leading-relaxed font-medium">
              <strong>Web Speech API + Intent Classifier:</strong> Real-time acoustic recognition and speech synthesis across 12 Indian regional languages mapped directly to agricultural database endpoints.
            </p>
          </div>

        </div>
      </div>

      <!-- DATA SOURCES & RECOGNITION -->
      <div class="agri-card p-6 sm:p-8 space-y-4 bg-white border border-slate-200/90 shadow-sm">
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
          <i data-lucide="database" class="w-5 h-5 text-emerald-800"></i>
          <span>Verified Government & Agronomic Data Sources</span>
        </h3>
        
        <p class="text-xs text-slate-500 font-medium leading-relaxed">
          AgriNova AI relies strictly on published scientific literature and official government portals:
        </p>

        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
          <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-700"></i> Agmarknet (Directorate of Marketing & Inspection, GoI)</li>
          <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-700"></i> Indian Council of Agricultural Research (ICAR)</li>
          <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-700"></i> Open-Meteo High-Resolution Numerical Weather Models</li>
          <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-700"></i> Department of Agriculture & Farmers Welfare (DA&FW)</li>
        </ul>
      </div>

    </div>
  `;
}

window.renderAboutPage = renderAboutPage;
