/**
 * AgriNova AI - Government Agricultural Schemes & Benefits Component
 * Directory of verified Central & State agricultural programs,
 * interactive Eligibility Checker, required documents checklists, and official links.
 * Clean, human-crafted public agronomic welfare directory.
 */

let allSchemesData = [];
let activeCategoryFilter = 'All';

async function renderSchemesPage() {
  let data = null;
  try {
    const res = await fetch('/api/schemes/list');
    data = await res.json();
    allSchemesData = data.schemes || [];
  } catch (e) {
    console.error("Schemes fetch error", e);
  }

  const categories = data ? data.categories : ["All", "Farmer Financial Assistance", "Crop Insurance Schemes", "Agricultural Equipment Subsidies", "Irrigation & Water Conservation", "Farmer Loans & Credit Facilities"];

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HERO & ELIGIBILITY CTA (Clean White Card) -->
      <div class="agri-card p-6 sm:p-10 bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2.5 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 bg-purple-50 text-purple-900 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-purple-200">
            <i data-lucide="landmark" class="w-3.5 h-3.5 text-purple-700"></i>
            <span>Official Government Welfare Directory</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" data-i18n="sch_heading">
            Government Schemes & Subsidies
          </h1>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-medium" data-i18n="sch_subheading">
            Verified Indian agricultural subsidies, PM-KISAN, crop insurance (PMFBY), Kisan Credit Cards (KCC), solar pump grants, and multi-criteria eligibility evaluator.
          </p>
        </div>

        <button onclick="openEligibilityModal()" class="btn-primary-agri text-sm !py-3.5 !px-6 shadow-sm flex items-center gap-2 flex-shrink-0">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-amber-300"></i>
          <span data-i18n="sch_eligibility_btn">Check My Eligibility</span>
        </button>
      </div>

      <!-- SEARCH & CATEGORY FILTERS -->
      <div class="space-y-3.5">
        
        <!-- Search bar -->
        <div class="relative">
          <input 
            type="text" 
            id="scheme-search-input" 
            oninput="handleSchemeSearch(this.value)"
            placeholder="Search schemes by name, keyword (e.g. PM-KISAN, Insurance, Tractor, Solar, Soil)..." 
            class="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm"
          />
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-4 top-4"></i>
        </div>

        <!-- Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          ${categories.map(c => `
            <button 
              onclick="filterSchemesByCategory('${c}')" 
              class="px-3.5 py-2 rounded-xl border font-bold whitespace-nowrap transition shadow-sm ${c === activeCategoryFilter ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}"
            >
              ${c}
            </button>
          `).join('')}
        </div>

      </div>

      <!-- SCHEMES GRID -->
      <div id="schemes-grid-container" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${renderSchemeCards(allSchemesData)}
      </div>

      <!-- INTERACTIVE ELIGIBILITY CHECKER MODAL -->
      <div id="eligibility-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 my-8">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center">
                <i data-lucide="check-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-black text-slate-900">Farmer Eligibility Evaluator</h3>
                <span class="text-xs text-slate-500 font-medium">Find matched government welfare programs tailored to your farm</span>
              </div>
            </div>
            <button onclick="closeEligibilityModal()" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="eligibility-form" onsubmit="evaluateFarmerEligibility(event)" class="space-y-4">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">State</label>
                <select id="el-state" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm">
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Farmer Category</label>
                <select id="el-category" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm">
                  <option value="Small & Marginal Farmer">Small & Marginal Farmer (&lt; 5 Acres)</option>
                  <option value="Medium Farmer">Medium Farmer (5 - 25 Acres)</option>
                  <option value="Large Farmer">Large Farmer (&gt; 25 Acres)</option>
                </select>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Cultivable Landholding (Acres)</label>
                <input type="number" id="el-land" value="4.0" step="0.5" min="0.1" max="100" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm tabular-nums" />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Crop Type</label>
                <select id="el-crop" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm">
                  <option value="Wheat">Wheat</option>
                  <option value="Rice (Paddy)">Rice (Paddy)</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Potato">Potato</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Soybean">Soybean</option>
                </select>
              </div>

              <div class="space-y-1.5 sm:col-span-2">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Water & Irrigation Source</label>
                <select id="el-irrigation" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm">
                  <option value="Tubewell">Electric Tubewell</option>
                  <option value="Borewell">Deep Borewell</option>
                  <option value="Canal Water">Canal Water Network</option>
                  <option value="Rainfed">Rainfed / Dryland (No Assured Irrigation)</option>
                </select>
              </div>

            </div>

            <div class="pt-2 flex justify-end">
              <button type="submit" id="btn-eval-submit" class="btn-primary-agri text-xs !py-3 !px-6 shadow-sm">
                <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i>
                <span>Evaluate My Qualification</span>
              </button>
            </div>

          </form>

          <!-- ELIGIBILITY EVALUATION RESULTS (IN MODAL) -->
          <div id="eligibility-results-box" class="hidden space-y-4 pt-4 border-t border-slate-100 max-h-80 overflow-y-auto"></div>

        </div>
      </div>

    </div>
  `;
}

function renderSchemeCards(schemes) {
  if (!schemes || schemes.length === 0) {
    return `<div class="col-span-2 text-center py-12 text-slate-400 font-semibold">No government schemes found matching criteria.</div>`;
  }

  return schemes.map(s => `
    <div class="agri-card p-6 flex flex-col justify-between space-y-4 bg-white border border-slate-200/90 shadow-sm hover:border-emerald-700 transition group">
      
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-3">
          <span class="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
            ${s.category}
          </span>
          <span class="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            Updated: ${s.last_updated}
          </span>
        </div>

        <h3 class="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-800 transition leading-snug">
          ${s.name}
        </h3>
        
        <p class="text-xs text-slate-500 font-medium leading-tight">
          ${s.ministry}
        </p>

        <!-- Main Financial Benefits Callout -->
        <div class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-1">
          <span class="font-bold uppercase tracking-wider text-[10px] text-emerald-800 flex items-center gap-1">
            <i data-lucide="gift" class="w-3.5 h-3.5"></i>
            <span>Main Financial Benefit</span>
          </span>
          <p class="leading-relaxed font-semibold">${s.benefits}</p>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed font-medium">
          ${s.description}
        </p>

        <!-- Eligibility Criteria Snippet -->
        <div class="space-y-1.5 pt-1">
          <span class="text-[10px] font-bold uppercase text-slate-700 block tracking-wider">Key Eligibility:</span>
          <ul class="text-xs text-slate-600 space-y-1 font-medium">
            ${s.eligibility_criteria.slice(0, 2).map(c => `
              <li class="flex items-start gap-1.5">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5"></i>
                <span>${c}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Action Buttons & Links -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <a 
          href="${s.official_url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-primary-agri text-xs !py-2.5 !px-4 flex-1 text-center shadow-sm"
        >
          <span>Official Portal</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>

        <button 
          onclick="toggleSaveScheme('${s.id}', '${encodeURIComponent(s.name)}')" 
          class="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-emerald-800 transition shadow-sm" 
          title="Bookmark Scheme"
        >
          <i data-lucide="bookmark" class="w-4 h-4"></i>
        </button>
      </div>

    </div>
  `).join('');
}

function handleSchemeSearch(query) {
  const q = query.trim().toLowerCase();
  let filtered = allSchemesData;
  if (activeCategoryFilter !== 'All') {
    filtered = filtered.filter(s => s.category.toLowerCase() === activeCategoryFilter.toLowerCase());
  }
  if (q) {
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.benefits.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q)
    );
  }
  const container = document.getElementById('schemes-grid-container');
  if (container) {
    container.innerHTML = renderSchemeCards(filtered);
    if (window.lucide) window.lucide.createIcons();
  }
}

function filterSchemesByCategory(cat) {
  activeCategoryFilter = cat;
  const input = document.getElementById('scheme-search-input');
  handleSchemeSearch(input ? input.value : '');
}

// Eligibility Checker
function openEligibilityModal() {
  document.getElementById('eligibility-modal').classList.remove('hidden');
}

function closeEligibilityModal() {
  document.getElementById('eligibility-modal').classList.add('hidden');
}

async function evaluateFarmerEligibility(e) {
  e.preventDefault();

  const state = document.getElementById('el-state').value;
  const category = document.getElementById('el-category').value;
  const land = parseFloat(document.getElementById('el-land').value);
  const crop = document.getElementById('el-crop').value;
  const irrigation = document.getElementById('el-irrigation').value;

  const btn = document.getElementById('btn-eval-submit');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-amber-300"></i> Evaluating Scheme Rules...`;
  if (window.lucide) window.lucide.createIcons();

  try {
    const res = await fetch('/api/schemes/check-eligibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state: state,
        district: "District",
        farmer_category: category,
        landholding_acres: land,
        crop_type: crop,
        irrigation_status: irrigation
      })
    });

    const data = await res.json();
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i> Evaluate My Qualification`;
    if (window.lucide) window.lucide.createIcons();

    if (data.success) {
      displayEligibilityResults(data);
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = `Evaluate My Qualification`;
    alert("Evaluation error: " + err.message);
  }
}

function displayEligibilityResults(data) {
  const box = document.getElementById('eligibility-results-box');
  box.classList.remove('hidden');

  box.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700">Matched Welfare Programs:</h4>
        <span class="badge-agri-green text-xs font-bold">${data.high_match_count} High Match Schemes</span>
      </div>

      <div class="space-y-3">
        ${data.matched_schemes.map(s => `
          <div class="p-4 rounded-2xl border ${s.eligibility_score >= 80 ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'} space-y-2">
            <div class="flex items-center justify-between">
              <h5 class="text-xs sm:text-sm font-extrabold text-slate-900">${s.scheme_name}</h5>
              <span class="text-xs font-extrabold ${s.eligibility_score >= 80 ? 'text-emerald-800' : 'text-amber-800'} tabular-nums">
                ${s.eligibility_score}% (${s.likelihood})
              </span>
            </div>
            
            <ul class="text-xs text-slate-600 space-y-1 font-medium">
              ${s.reasons.map(r => `
                <li class="flex items-start gap-1.5">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5"></i>
                  <span>${r}</span>
                </li>
              `).join('')}
            </ul>

            <div class="pt-2 flex items-center justify-between text-xs border-t border-slate-200/60">
              <span class="text-slate-500">Helpline: <strong class="text-slate-800">${s.helpline}</strong></span>
              <a href="${s.official_url}" target="_blank" rel="noopener" class="text-emerald-800 font-bold underline hover:text-emerald-700">Apply on Official Portal →</a>
            </div>
          </div>
        `).join('')}
      </div>

      <p class="text-[10px] text-slate-400 italic pt-2 border-t border-slate-100 leading-tight">
        ${data.disclaimer}
      </p>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

async function toggleSaveScheme(schemeId, schemeName) {
  const token = window.authManager.getToken();
  if (!token) {
    alert("Please log in to bookmark government schemes to your profile.");
    window.authManager.openAuthModal('login');
    return;
  }

  try {
    const res = await fetch('/api/schemes/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ scheme_id: schemeId, scheme_name: decodeURIComponent(schemeName) })
    });
    const data = await res.json();
    alert(data.message || "Bookmark status updated");
  } catch (err) {
    alert("Error saving scheme: " + err.message);
  }
}

window.renderSchemesPage = renderSchemesPage;
window.handleSchemeSearch = handleSchemeSearch;
window.filterSchemesByCategory = filterSchemesByCategory;
window.openEligibilityModal = openEligibilityModal;
window.closeEligibilityModal = closeEligibilityModal;
window.evaluateFarmerEligibility = evaluateFarmerEligibility;
window.toggleSaveScheme = toggleSaveScheme;
