/**
 * AgriNova AI - Smart Agriculture Tips Component
 * Actionable farming best practices for soil health, water conservation, disease prevention, and post-harvest care.
 * Clean, human-crafted agronomic library.
 */

async function renderTipsPage() {
  let tips = [];
  try {
    const res = await fetch('/api/tips/list');
    const data = await res.json();
    tips = data.tips || [];
  } catch (e) {
    console.error("Tips error", e);
  }

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="text-center max-w-2xl mx-auto space-y-2.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-emerald-700"></i>
          <span>Agronomic Science & Field Knowledge</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Smart Agriculture Best Practices
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Proven agronomic techniques to enhance soil biological activity, cut irrigation costs, and protect crops against climatic fluctuations.
        </p>
      </div>

      <!-- TIPS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${tips.map(tip => `
          <div class="agri-card p-6 space-y-4 bg-white border border-slate-200/90 shadow-sm hover:border-emerald-700 transition flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="badge-agri-green text-xs font-bold">
                  ${tip.category}
                </span>
                <span class="text-xs text-slate-500 font-semibold">
                  ${tip.seasonal_tag}
                </span>
              </div>

              <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">
                ${tip.title}
              </h3>

              <p class="text-xs sm:text-sm text-slate-800 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed">
                ${tip.summary}
              </p>

              <p class="text-xs text-slate-600 leading-relaxed font-medium">
                ${tip.details}
              </p>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-extrabold">
              <span>Verified by ICAR Extension</span>
              <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

window.renderTipsPage = renderTipsPage;
