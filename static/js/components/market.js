/**
 * AgriNova AI - Market Price Prediction Component
 * Interactive Mandi selector, Scikit-Learn Polynomial Ridge Regression curve,
 * Chart.js trend visualization with confidence intervals, and Agmarknet data context.
 * Clean, human-crafted agricultural commodity terminal.
 */

let marketChartInstance = null;
let mandiDirectoryData = null;

async function renderMarketPage() {
  let metadata = null;
  try {
    const res = await fetch('/api/market/metadata');
    metadata = await res.json();
    mandiDirectoryData = metadata.mandi_directory;
  } catch (e) {
    console.error("Failed to load market metadata", e);
  }

  const commodities = metadata ? metadata.commodities : [
    "Wheat", "Paddy (Rice)", "Potato", "Onion", "Tomato", "Cotton (Medium Staple)",
    "Mustard (Rapeseed)", "Soybean (Yellow)", "Maize (Corn)", "Gram (Chana)", "Turmeric (Haldi)"
  ];

  const states = mandiDirectoryData ? Object.keys(mandiDirectoryData) : ["Punjab", "Haryana", "Maharashtra", "Madhya Pradesh", "Uttar Pradesh", "Gujarat"];

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-2.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-700"></i>
          <span>Agmarknet & Scikit-Learn Machine Learning Forecasting</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" data-i18n="mkt_heading">
          AI Agricultural Market Price Prediction
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed" data-i18n="mkt_subheading">
          Empower your harvest selling decisions with Ridge Regression price projections and seasonal arrival analysis across Indian APMC Mandis.
        </p>
      </div>

      <!-- SELECTION FORM (Clean White Card) -->
      <div class="agri-card p-6 sm:p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
        <form id="market-predict-form" onsubmit="executeMarketPrediction(event)" class="space-y-6">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <!-- Commodity Selection -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="mkt_commodity">
                Crop / Commodity
              </label>
              <select id="mkt-commodity" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                ${commodities.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <!-- State Selection -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="mkt_state">
                State
              </label>
              <select id="mkt-state" onchange="updateMarketDistricts(this.value)" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                ${states.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>

            <!-- District Selection -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="mkt_district">
                District
              </label>
              <select id="mkt-district" onchange="updateMarketMandis(this.value)" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                <option value="Ludhiana">Ludhiana</option>
                <option value="Amritsar">Amritsar</option>
                <option value="Bathinda">Bathinda</option>
              </select>
            </div>

            <!-- Mandi Selection -->
            <div class="space-y-1.5 sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="mkt_mandi">
                APMC Mandi / Terminal Market
              </label>
              <select id="mkt-mandi" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                <option value="Khanna Mandi (Asia's Largest Grain Market)">Khanna Mandi (Asia's Largest Grain Market)</option>
                <option value="Ludhiana New Dana Mandi">Ludhiana New Dana Mandi</option>
                <option value="Sahnewal Mandi">Sahnewal Mandi</option>
              </select>
            </div>

            <!-- Prediction Horizon -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700" data-i18n="mkt_horizon">
                Prediction Horizon
              </label>
              <select id="mkt-horizon" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none transition shadow-sm">
                <option value="7">Next 7 Days Forecast</option>
                <option value="15" selected>Next 15 Days Forecast (Recommended)</option>
                <option value="30">Next 30 Days Forecast</option>
              </select>
            </div>

          </div>

          <div class="flex items-center justify-end pt-2 border-t border-slate-100">
            <button 
              type="submit" 
              id="btn-predict-price" 
              class="btn-primary-agri w-full sm:w-auto text-sm !py-3 !px-8 shadow-sm"
            >
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i>
              <span data-i18n="mkt_btn">Predict Market Price</span>
            </button>
          </div>

        </form>
      </div>

      <!-- RESULTS CONTAINER (RENDERED AFTER PREDICTION) -->
      <div id="market-result-container" class="space-y-6"></div>

    </div>
  `;
}

function updateMarketDistricts(state) {
  if (!mandiDirectoryData || !mandiDirectoryData[state]) return;
  const districtSelect = document.getElementById('mkt-district');
  const districts = Object.keys(mandiDirectoryData[state]);
  districtSelect.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
  if (districts.length > 0) updateMarketMandis(districts[0]);
}

function updateMarketMandis(district) {
  const state = document.getElementById('mkt-state').value;
  if (!mandiDirectoryData || !mandiDirectoryData[state] || !mandiDirectoryData[state][district]) return;
  const mandiSelect = document.getElementById('mkt-mandi');
  const mandis = mandiDirectoryData[state][district];
  mandiSelect.innerHTML = mandis.map(m => `<option value="${m}">${m}</option>`).join('');
}

async function executeMarketPrediction(e) {
  e.preventDefault();

  const commodity = document.getElementById('mkt-commodity').value;
  const state = document.getElementById('mkt-state').value;
  const district = document.getElementById('mkt-district').value;
  const mandi = document.getElementById('mkt-mandi').value;
  const horizon = parseInt(document.getElementById('mkt-horizon').value);

  const btn = document.getElementById('btn-predict-price');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-amber-300"></i> Running Polynomial Ridge Model...`;
  if (window.lucide) window.lucide.createIcons();

  try {
    const headers = { 'Content-Type': 'application/json' };
    const token = window.authManager.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/market/predict', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        commodity: commodity,
        state: state,
        district: district,
        mandi: mandi,
        horizon_days: horizon
      })
    });

    const data = await res.json();
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i> Predict Market Price`;
    if (window.lucide) window.lucide.createIcons();

    if (data.success) {
      displayMarketResults(data);
    } else {
      alert("Error: " + (data.error || "Prediction failed"));
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i> Predict Market Price`;
    alert("Network error: " + err.message);
  }
}

function displayMarketResults(data) {
  const container = document.getElementById('market-result-container');
  const isBullish = data.trend_direction.includes('Bullish');
  const isBearish = data.trend_direction.includes('Bearish');

  container.innerHTML = `
    <div class="agri-card p-6 sm:p-10 space-y-8 bg-white border border-slate-200 shadow-sm">
      
      <!-- TOP SUMMARY CARDS -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div class="space-y-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="badge-agri-green text-xs font-bold">${data.commodity}</span>
            <span class="text-xs text-slate-500 font-medium">${data.mandi}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight tabular-nums">
            ₹${data.current_modal_price} <span class="text-xs font-medium text-slate-400">/ Quintal (Current Modal Price)</span>
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            Daily Estimated Arrivals: <strong class="text-slate-800">${data.daily_arrivals_est}</strong> • Historical 30-Day Range: <strong class="text-slate-800">₹${data.min_historical_price} - ₹${data.max_historical_price}</strong>
          </p>
        </div>

        <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left sm:text-right shadow-sm">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block" data-i18n="mkt_predicted_price">Forecasted Modal Price (${data.horizon_days} Days)</span>
          <div class="flex items-baseline gap-2 justify-end">
            <span class="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">₹${data.predicted_future_price}</span>
            <span class="text-xs font-bold ${isBullish ? 'text-emerald-700' : isBearish ? 'text-red-700' : 'text-slate-700'}">
              ${data.percentage_change >= 0 ? '+' : ''}${data.percentage_change}%
            </span>
          </div>
          <span class="inline-block mt-1 text-[11px] font-bold ${isBullish ? 'badge-agri-green' : isBearish ? 'badge-agri-red' : 'badge-agri-gold'}">
            ${data.trend_direction}
          </span>
        </div>
      </div>

      <!-- INTERACTIVE PRICE TREND CHART (PAST 30 DAYS + FORECAST) -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5" data-i18n="mkt_chart_title">
            <i data-lucide="line-chart" class="w-4 h-4 text-emerald-800"></i>
            <span>Historical Mandi Trajectory & Machine Learning Projections</span>
          </h4>
          <span class="text-xs font-semibold text-slate-500">Regression Confidence: <strong class="text-slate-900">${data.confidence_score}%</strong></span>
        </div>
        <div class="relative h-72 sm:h-80 w-full bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <canvas id="market-forecast-chart"></canvas>
        </div>
      </div>

      <!-- FARMER ACTION ADVISORY & DATA GOV CONTEXT -->
      <div class="space-y-4">
        
        <div class="p-4 rounded-2xl ${isBullish ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-amber-50/60 border-amber-200 text-amber-950'} border space-y-1">
          <h4 class="text-xs font-bold uppercase tracking-wider ${isBullish ? 'text-emerald-900' : 'text-amber-900'} flex items-center gap-1.5" data-i18n="mkt_advice">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span>Agronomic & Harvest Sale Timing Advisory</span>
          </h4>
          <p class="text-xs sm:text-sm leading-relaxed font-medium">
            ${data.market_advice}
          </p>
        </div>

        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed space-y-1">
          <p><strong>Official Data Source:</strong> ${data.data_source}</p>
          <p><strong>Disclaimer:</strong> ${data.disclaimer}</p>
        </div>

      </div>

    </div>
  `;

  container.scrollIntoView({ behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();

  // Render Chart.js
  setTimeout(() => {
    renderMarketChart(data.history_points, data.forecast_points);
  }, 100);
}

function renderMarketChart(history, forecast) {
  const canvas = document.getElementById('market-forecast-chart');
  if (!canvas || !window.Chart) return;

  if (marketChartInstance) {
    marketChartInstance.destroy();
    marketChartInstance = null;
  }

  // Combine dates
  const allLabels = [...history.map(h => h.date), ...forecast.map(f => f.date)];
  
  // History series (null for forecast segment)
  const historyPrices = [...history.map(h => h.price), ...forecast.map(() => null)];
  // Forecast series (overlap on last history point)
  const lastHistPrice = history[history.length - 1].price;
  const forecastPrices = [...history.slice(0, -1).map(() => null), lastHistPrice, ...forecast.map(f => f.predicted_price)];
  const upperBounds = [...history.slice(0, -1).map(() => null), lastHistPrice, ...forecast.map(f => f.upper_bound)];
  const lowerBounds = [...history.slice(0, -1).map(() => null), lastHistPrice, ...forecast.map(f => f.lower_bound)];

  const ctx = canvas.getContext('2d');
  marketChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: allLabels,
      datasets: [
        {
          label: 'Historical Actual Mandi Price (₹)',
          data: historyPrices,
          borderColor: '#144A24',
          backgroundColor: 'rgba(20, 74, 36, 0.08)',
          fill: true,
          tension: 0.25,
          pointRadius: 3,
          pointBackgroundColor: '#144A24'
        },
        {
          label: 'ML Projected Price Trend (₹)',
          data: forecastPrices,
          borderColor: '#E5A919',
          borderDash: [6, 4],
          backgroundColor: 'transparent',
          tension: 0.25,
          pointRadius: 4,
          pointBackgroundColor: '#E5A919'
        },
        {
          label: 'Upper Confidence Limit',
          data: upperBounds,
          borderColor: 'rgba(229, 169, 25, 0.35)',
          borderDash: [2, 2],
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Lower Confidence Limit',
          data: lowerBounds,
          borderColor: 'rgba(229, 169, 25, 0.35)',
          borderDash: [2, 2],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, family: 'Plus Jakarta Sans' } } },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ₹${context.raw}`;
            }
          }
        }
      },
      scales: {
        y: {
          title: { display: true, text: 'Modal Price in ₹ / Quintal', font: { size: 11 } }
        }
      }
    }
  });
}

window.renderMarketPage = renderMarketPage;
window.updateMarketDistricts = updateMarketDistricts;
window.updateMarketMandis = updateMarketMandis;
window.executeMarketPrediction = executeMarketPrediction;
