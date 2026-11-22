/**
 * AgriNova AI - Fertilizer Recommendation Component
 * Clean, human-crafted soil science & agronomic nutrient engine.
 * Calculates ICAR N-P-K nutrient deficits, pH neutralization,
 * split application timelines, and commercial formulation dosages.
 */

function renderFertilizerPage() {
  const user = window.authManager.getUser() || {};

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-2.5">
        <div class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200">
          <i data-lucide="flask-conical" class="w-3.5 h-3.5 text-amber-700"></i>
          <span>ICAR Agronomic Nutrient Balancing Model</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" data-i18n="fert_heading">
          Intelligent Fertilizer Recommendation Engine
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed" data-i18n="fert_subheading">
          Input your soil test laboratory metrics to compute exact N-P-K deficit requirements, soil amendments, and commercial bag application schedules.
        </p>
      </div>

      <!-- INPUT FORM CARD -->
      <div class="agri-card p-6 sm:p-10 space-y-8 bg-white border border-slate-200/90 shadow-sm">
        <form id="fertilizer-form" onsubmit="calculateFertilizer(event)" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Crop Selection -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="fert_crop">
                Target Crop
              </label>
              <select id="fert-crop" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                <option value="Wheat">Wheat (Kalyan Sona / HD-2967)</option>
                <option value="Rice (Paddy)">Rice / Paddy (Basmati / IR-64)</option>
                <option value="Maize (Corn)">Maize / Corn (Hybrids)</option>
                <option value="Cotton">Cotton (Bt Hybrids)</option>
                <option value="Potato">Potato (Kufri Jyoti / Pukhraj)</option>
                <option value="Tomato">Tomato (Arka / Pusa Series)</option>
                <option value="Sugarcane">Sugarcane (Co-0238 / Co-86032)</option>
                <option value="Mustard">Mustard / Rapeseed (Pusa Jai Kisan)</option>
                <option value="Soybean">Soybean (JS-335 / JS-9560)</option>
                <option value="Chickpea (Chana)">Chickpea / Bengal Gram (Chana)</option>
                <option value="Onion">Onion (Nasik Red / Agrifound)</option>
                <option value="Groundnut">Groundnut (TG-37A / Kadiri)</option>
              </select>
            </div>

            <!-- Soil Type Selection -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="fert_soil">
                Soil Texture Classification
              </label>
              <select id="fert-soil" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                <option value="Alluvial Soil">Alluvial Soil (Gangetic & Indus Plains)</option>
                <option value="Black Soil (Regur)">Black Soil / Regur (Deccan Plateau & Cotton Belt)</option>
                <option value="Red Soil">Red Soil (Peninsular India)</option>
                <option value="Loamy Soil" selected>Loamy Soil (Optimal Agricultural Blend)</option>
                <option value="Sandy / Sandy Loam">Sandy / Sandy Loam Soil</option>
                <option value="Clay Soil">Heavy Clay Soil</option>
                <option value="Laterite Soil">Laterite Soil</option>
              </select>
            </div>

            <!-- Soil pH Slider & Box -->
            <div class="space-y-3 md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5" data-i18n="fert_ph">
                  <i data-lucide="gauge" class="w-4 h-4 text-emerald-800"></i>
                  <span>Soil pH Level</span>
                </label>
                <div class="flex items-center gap-2">
                  <span id="ph-indicator-badge" class="badge-agri-green text-xs font-bold">Neutral (Optimal 6.5 - 7.5)</span>
                  <span id="ph-value-display" class="text-xl font-black text-slate-900 tabular-nums">6.8</span>
                </div>
              </div>
              <input 
                type="range" 
                id="fert-ph" 
                min="4.5" 
                max="9.0" 
                step="0.1" 
                value="6.8" 
                oninput="updatePhDisplay(this.value)" 
                class="w-full accent-emerald-800 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div class="flex justify-between text-[11px] text-slate-500 font-semibold pt-1">
                <span class="text-amber-700">Acidic (&lt; 6.0)</span>
                <span class="text-emerald-800 font-bold">Optimal Neutral Range (6.2 - 7.5)</span>
                <span class="text-blue-700">Alkaline (&gt; 7.8)</span>
              </div>
            </div>

            <!-- N-P-K Levels -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Available Soil Nitrogen (N) — kg/ha
              </label>
              <input 
                type="number" 
                id="fert-n" 
                value="140" 
                min="10" 
                max="500" 
                class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm tabular-nums"
                placeholder="e.g. 140"
              />
              <span class="text-[11px] text-slate-400 block">ICAR medium range: 120 - 180 kg/ha</span>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Available Soil Phosphorus (P) — kg/ha
              </label>
              <input 
                type="number" 
                id="fert-p" 
                value="35" 
                min="5" 
                max="200" 
                class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm tabular-nums"
                placeholder="e.g. 35"
              />
              <span class="text-[11px] text-slate-400 block">ICAR medium range: 25 - 50 kg/ha</span>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Available Soil Potassium (K) — kg/ha
              </label>
              <input 
                type="number" 
                id="fert-k" 
                value="160" 
                min="10" 
                max="600" 
                class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm tabular-nums"
                placeholder="e.g. 160"
              />
              <span class="text-[11px] text-slate-400 block">ICAR medium range: 140 - 280 kg/ha</span>
            </div>

            <!-- Farm Area / Holding -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Farm Cultivation Area (Acres)
              </label>
              <input 
                type="number" 
                id="fert-acres" 
                value="1" 
                min="0.25" 
                step="0.25" 
                max="100" 
                class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm tabular-nums"
                placeholder="1.0"
              />
              <span class="text-[11px] text-slate-400 block">Total land area to calculate total bag counts</span>
            </div>

          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button 
              type="submit" 
              id="btn-calculate-fert" 
              class="btn-primary-agri w-full sm:w-auto text-sm !py-3 !px-8 shadow-sm"
            >
              <i data-lucide="calculator" class="w-4 h-4 text-amber-300"></i>
              <span data-i18n="fert_btn_calc">Calculate Fertilizer Plan</span>
            </button>
          </div>

        </form>
      </div>

      <!-- RESULTS CONTAINER (RENDERED AFTER CALCULATION) -->
      <div id="fertilizer-result-container" class="hidden space-y-6"></div>

    </div>
  `;
}

function updatePhDisplay(val) {
  const num = parseFloat(val);
  const display = document.getElementById('ph-value-display');
  const badge = document.getElementById('ph-indicator-badge');

  if (display) display.innerText = num.toFixed(1);

  if (badge) {
    if (num < 6.0) {
      badge.className = "badge-agri-gold text-xs font-bold";
      badge.innerText = "Acidic (Soil Neutralization Needed)";
    } else if (num > 7.8) {
      badge.className = "badge-agri-blue text-xs font-bold";
      badge.innerText = "Alkaline / Calcareous";
    } else {
      badge.className = "badge-agri-green text-xs font-bold";
      badge.innerText = "Optimal Range (6.2 - 7.5)";
    }
  }
}

async function calculateFertilizer(e) {
  e.preventDefault();

  const btn = document.getElementById('btn-calculate-fert');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-amber-300"></i> Balancing Nutrients...`;
  if (window.lucide) window.lucide.createIcons();

  const payload = {
    crop: document.getElementById('fert-crop').value,
    soil_type: document.getElementById('fert-soil').value,
    soil_ph: parseFloat(document.getElementById('fert-ph').value),
    nitrogen: parseFloat(document.getElementById('fert-n').value),
    phosphorus: parseFloat(document.getElementById('fert-p').value),
    potassium: parseFloat(document.getElementById('fert-k').value),
    acres: parseFloat(document.getElementById('fert-acres').value || 1.0)
  };

  const headers = { 'Content-Type': 'application/json' };
  const token = window.authManager.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch('/api/fertilizer/recommend', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="calculator" class="w-4 h-4 text-amber-300"></i> Calculate Fertilizer Plan`;
    if (window.lucide) window.lucide.createIcons();

    if (data.success) {
      displayFertilizerResults(data);
    } else {
      alert("Error: " + (data.error || "Calculation failed"));
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="calculator" class="w-4 h-4 text-amber-300"></i> Calculate Fertilizer Plan`;
    alert("Network error: " + err.message);
  }
}

function displayFertilizerResults(data) {
  const container = document.getElementById('fertilizer-result-container');

  container.innerHTML = `
    <div class="agri-card p-6 sm:p-10 space-y-8 bg-white border border-slate-200 shadow-sm">
      
      <!-- TOP HIGHLIGHT -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div class="space-y-1">
          <span class="badge-agri-green text-xs font-bold mb-1">Prescription for ${data.crop}</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ${data.recommended_fertilizer}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            Soil Type: <strong class="text-slate-800">${data.soil_type}</strong> • Soil pH: <strong class="text-slate-800">${data.soil_ph}</strong> (${data.ph_status})
          </p>
        </div>

        <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left sm:text-right shadow-sm">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Dosage Estimation</span>
          <span class="text-sm font-black text-slate-900">${data.dosage}</span>
        </div>
      </div>

      <!-- NUTRIENT BALANCE GAUGES -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <i data-lucide="bar-chart-2" class="w-4 h-4 text-emerald-800"></i>
          <span>Nutrient Balance Deficit per Acre</span>
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="font-bold text-slate-700">Nitrogen (N)</span>
              <span class="${data.nutrient_status.nitrogen.status === 'Low' ? 'text-red-700' : 'text-emerald-800'} font-bold">
                ${data.nutrient_status.nitrogen.status}
              </span>
            </div>
            <div class="text-xl font-black text-slate-900 tabular-nums">
              ${data.nutrient_status.nitrogen.deficit_kg_acre} <span class="text-xs font-medium text-slate-500">kg/acre deficit</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="font-bold text-slate-700">Phosphorus (P)</span>
              <span class="${data.nutrient_status.phosphorus.status === 'Low' ? 'text-red-700' : 'text-emerald-800'} font-bold">
                ${data.nutrient_status.phosphorus.status}
              </span>
            </div>
            <div class="text-xl font-black text-slate-900 tabular-nums">
              ${data.nutrient_status.phosphorus.deficit_kg_acre} <span class="text-xs font-medium text-slate-500">kg/acre deficit</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div class="flex justify-between items-center text-xs">
              <span class="font-bold text-slate-700">Potassium (K)</span>
              <span class="${data.nutrient_status.potassium.status === 'Low' ? 'text-red-700' : 'text-emerald-800'} font-bold">
                ${data.nutrient_status.potassium.status}
              </span>
            </div>
            <div class="text-xl font-black text-slate-900 tabular-nums">
              ${data.nutrient_status.potassium.deficit_kg_acre} <span class="text-xs font-medium text-slate-500">kg/acre deficit</span>
            </div>
          </div>

        </div>
      </div>

      <!-- SCIENTIFIC RATIONALE & pH CORRECTION -->
      <div class="space-y-4">
        <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5" data-i18n="fert_rationale">
            <i data-lucide="info" class="w-4 h-4"></i>
            <span>Agronomic Recommendation Rationale</span>
          </h4>
          <p class="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">${data.reason}</p>
        </div>

        ${data.ph_remedy ? `
          <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-700"></i>
              <span>Soil pH Amendment Required</span>
            </h4>
            <p class="text-xs leading-relaxed font-medium">${data.ph_remedy}</p>
          </div>
        ` : ''}
      </div>

      <!-- 3-STAGE APPLICATION SCHEDULE -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5" data-i18n="fert_schedule">
          <i data-lucide="calendar" class="w-4 h-4 text-emerald-800"></i>
          <span>Split Application Guidance</span>
        </h4>

        <div class="space-y-2.5">
          ${data.application_schedule.map((step, idx) => `
            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
              <div class="w-7 h-7 rounded-lg bg-emerald-800 text-amber-300 font-extrabold flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-sm">
                ${idx + 1}
              </div>
              <div class="space-y-0.5">
                <h5 class="text-xs sm:text-sm font-extrabold text-slate-900">${step.stage}</h5>
                <p class="text-xs text-slate-600 leading-relaxed">${step.guidance}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECONDARY SUPPLEMENTS & MICRONUTRIENTS -->
      ${data.secondary_supplements && data.secondary_supplements.length > 0 ? `
        <div class="space-y-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-4 h-4 text-amber-600"></i>
            <span>Recommended Micronutrients & Bio-Fertilizers</span>
          </h4>
          <ul class="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700">
            ${data.secondary_supplements.map(sup => `
              <li class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5"></i>
                <span class="font-medium">${sup}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- PRECAUTIONS -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5" data-i18n="fert_precautions">
          <i data-lucide="shield-alert" class="w-4 h-4 text-red-600"></i>
          <span>Application Safety Precautions</span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${data.precautions.map(p => `
            <div class="p-3.5 rounded-2xl bg-red-50/50 border border-red-200/80 text-xs text-red-950 flex items-start gap-2.5">
              <i data-lucide="alert-circle" class="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"></i>
              <span class="font-medium">${p}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- DISCLAIMER -->
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
        <strong>${data.disclaimer}</strong>
      </div>

      <!-- ACTIONS -->
      <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <button onclick="window.print()" class="btn-secondary-agri text-xs !py-2.5 !px-5 shadow-sm">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print Fertilizer Schedule</span>
        </button>
        <button onclick="document.getElementById('fertilizer-form').scrollIntoView({behavior: 'smooth'})" class="btn-primary-agri text-xs !py-2.5 !px-5 shadow-sm">
          <span>Recalculate with New Values</span>
        </button>
      </div>

    </div>
  `;

  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

window.renderFertilizerPage = renderFertilizerPage;
window.updatePhDisplay = updatePhDisplay;
window.calculateFertilizer = calculateFertilizer;
