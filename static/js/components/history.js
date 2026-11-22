/**
 * AgriNova AI - History & Reports Component
 * Tabbed activity history, record details inspection, and record deletion.
 * Clean, human-crafted audit console.
 */

let activeHistoryTab = 'disease';

async function renderHistoryPage() {
  let historyData = null;
  try {
    const headers = {};
    const token = window.authManager.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/history/all', { headers });
    historyData = await res.json();
  } catch (e) {
    console.error("History fetch error", e);
  }

  const disease = historyData ? historyData.disease_records : [];
  const fertilizer = historyData ? historyData.fertilizer_records : [];
  const market = historyData ? historyData.market_records : [];
  const weather = historyData ? historyData.weather_records : [];
  const summary = historyData ? historyData.summary : { total_disease_scans: 0, total_fertilizer_plans: 0, total_market_checks: 0, total_weather_checks: 0 };

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200 mb-1.5">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-emerald-700"></i>
            <span>Farmer Audit Trail & Activity Logs</span>
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight" data-i18n="nav_history">
            Diagnostic & Agronomic History
          </h1>
        </div>

        <button onclick="window.print()" class="btn-secondary-agri text-xs !py-2.5 !px-4 shadow-sm">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print All Records</span>
        </button>
      </div>

      <!-- SUMMARY COUNTERS -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="agri-card p-5 text-center space-y-1 bg-white border border-slate-200/90 shadow-sm">
          <span class="text-2xl font-black text-slate-900 tabular-nums">${summary.total_disease_scans}</span>
          <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Disease Scans</span>
        </div>
        <div class="agri-card p-5 text-center space-y-1 bg-white border border-slate-200/90 shadow-sm">
          <span class="text-2xl font-black text-slate-900 tabular-nums">${summary.total_fertilizer_plans}</span>
          <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Fertilizer Plans</span>
        </div>
        <div class="agri-card p-5 text-center space-y-1 bg-white border border-slate-200/90 shadow-sm">
          <span class="text-2xl font-black text-slate-900 tabular-nums">${summary.total_market_checks}</span>
          <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Market Forecasts</span>
        </div>
        <div class="agri-card p-5 text-center space-y-1 bg-white border border-slate-200/90 shadow-sm">
          <span class="text-2xl font-black text-slate-900 tabular-nums">${summary.total_weather_checks}</span>
          <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Weather Queries</span>
        </div>
      </div>

      <!-- TABS -->
      <div class="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto text-xs font-bold">
        <button 
          onclick="switchHistoryTab('disease')" 
          class="px-4 py-2.5 rounded-xl transition ${activeHistoryTab === 'disease' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'}"
        >
          Crop Disease History (${disease.length})
        </button>
        <button 
          onclick="switchHistoryTab('fertilizer')" 
          class="px-4 py-2.5 rounded-xl transition ${activeHistoryTab === 'fertilizer' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'}"
        >
          Fertilizer Plans (${fertilizer.length})
        </button>
        <button 
          onclick="switchHistoryTab('market')" 
          class="px-4 py-2.5 rounded-xl transition ${activeHistoryTab === 'market' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'}"
        >
          Market Forecasts (${market.length})
        </button>
      </div>

      <!-- TAB CONTENT CONTAINER -->
      <div id="history-content-container" class="space-y-4">
        ${renderActiveHistoryTab(activeHistoryTab, { disease, fertilizer, market })}
      </div>

    </div>
  `;
}

function switchHistoryTab(tab) {
  activeHistoryTab = tab;
  window.router.navigate('history');
}

function renderActiveHistoryTab(tab, records) {
  if (tab === 'disease') {
    if (!records.disease || records.disease.length === 0) {
      return `<div class="agri-card p-12 text-center text-slate-400 text-sm font-semibold bg-white border border-slate-200">No crop disease detections recorded yet. Upload a leaf to get started!</div>`;
    }
    return records.disease.map(r => `
      <div class="agri-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/90 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
            ${r.image_path ? `<img src="${r.image_path}" class="w-full h-full object-cover" />` : `<div class="w-full h-full flex items-center justify-center text-emerald-800"><i data-lucide="leaf" class="w-6 h-6"></i></div>`}
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="badge-agri-green text-[10px] font-bold">${r.crop_name}</span>
              <span class="text-xs text-slate-400 font-medium">${r.created_at}</span>
            </div>
            <h4 class="text-base font-extrabold text-slate-900">${r.disease_name}</h4>
            <span class="text-xs font-semibold text-emerald-800">Confidence: ${r.confidence}%</span>
          </div>
        </div>

        <div class="flex items-center gap-2 self-end sm:self-center">
          <button onclick="deleteHistoryItem('disease', ${r.id})" class="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition" title="Delete record">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  if (tab === 'fertilizer') {
    if (!records.fertilizer || records.fertilizer.length === 0) {
      return `<div class="agri-card p-12 text-center text-slate-400 text-sm font-semibold bg-white border border-slate-200">No fertilizer recommendations saved yet.</div>`;
    }
    return records.fertilizer.map(r => `
      <div class="agri-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/90 shadow-sm">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="badge-agri-gold text-[10px] font-bold">${r.crop_type}</span>
            <span class="text-xs text-slate-400 font-medium">${r.soil_type} (pH: ${r.soil_ph})</span>
            <span class="text-xs text-slate-400 font-medium">• ${r.created_at}</span>
          </div>
          <h4 class="text-base font-extrabold text-slate-900">${r.recommended_fertilizer}</h4>
          <p class="text-xs text-emerald-800 font-semibold">${r.dosage}</p>
        </div>

        <button onclick="deleteHistoryItem('fertilizer', ${r.id})" class="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition" title="Delete record">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');
  }

  if (tab === 'market') {
    if (!records.market || records.market.length === 0) {
      return `<div class="agri-card p-12 text-center text-slate-400 text-sm font-semibold bg-white border border-slate-200">No market price predictions saved yet.</div>`;
    }
    return records.market.map(r => `
      <div class="agri-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/90 shadow-sm">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="badge-agri-green text-[10px] font-bold">${r.commodity}</span>
            <span class="text-xs text-slate-400 font-medium">${r.mandi}</span>
            <span class="text-xs text-slate-400 font-medium">• ${r.created_at}</span>
          </div>
          <h4 class="text-base font-extrabold text-slate-900">Current: ₹${r.current_price} → Forecasted: ₹${r.predicted_price}</h4>
          <span class="text-xs font-semibold text-emerald-800">${r.trend} (${r.prediction_period})</span>
        </div>

        <button onclick="deleteHistoryItem('market', ${r.id})" class="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition" title="Delete record">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');
  }
}

async function deleteHistoryItem(type, id) {
  if (!confirm(`Are you sure you want to delete this ${type} record?`)) return;

  const token = window.authManager.getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`/api/history/delete?type=${type}&id=${id}`, {
      method: 'DELETE',
      headers: headers
    });
    const data = await res.json();
    if (data.success) {
      window.router.navigate('history');
    } else {
      alert("Delete failed: " + data.error);
    }
  } catch (e) {
    alert("Error deleting record: " + e.message);
  }
}

window.renderHistoryPage = renderHistoryPage;
window.switchHistoryTab = switchHistoryTab;
window.deleteHistoryItem = deleteHistoryItem;
