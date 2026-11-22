/**
 * AgriNova AI - Refined Human-Crafted Navbar Component
 * Luminous frosted glass header, crisp emerald typography, organic logo badge,
 * and elegant 12-language switcher.
 */

function renderNavbar() {
  const currentLang = window.i18n.getLanguage();
  const languages = window.i18n.getLanguages();
  const currentUser = window.authManager.getUser();

  return `
    <header class="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo & Brand Identity -->
          <div class="flex items-center space-x-3 cursor-pointer group" onclick="window.router.navigate('home')">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <i data-lucide="sprout" class="w-6 h-6 stroke-[2.2]"></i>
            </div>
            <div>
              <span class="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                AgriNova <span class="text-emerald-700 font-extrabold">AI</span>
              </span>
              <span class="block text-[10px] font-bold text-emerald-800/80 tracking-widest uppercase">Smart Agriculture Assistant</span>
            </div>
          </div>

          <!-- Desktop Navigation Links (Human-crafted clean pills) -->
          <nav class="hidden lg:flex items-center space-x-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button onclick="window.router.navigate('home')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="home">
              <span data-i18n="nav_home">Home</span>
            </button>
            <button onclick="window.router.navigate('dashboard')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="dashboard">
              <span data-i18n="nav_dashboard">Dashboard</span>
            </button>
            <button onclick="window.router.navigate('disease')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="disease">
              <span data-i18n="nav_disease">Crop Disease</span>
            </button>
            <button onclick="window.router.navigate('fertilizer')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="fertilizer">
              <span data-i18n="nav_fertilizer">Fertilizer</span>
            </button>
            <button onclick="window.router.navigate('weather')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="weather">
              <span data-i18n="nav_weather">Weather</span>
            </button>
            <button onclick="window.router.navigate('market')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="market">
              <span data-i18n="nav_market">Mandi Prices</span>
            </button>
            <button onclick="window.router.navigate('voice')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white flex items-center gap-1.5" data-page="voice">
              <i data-lucide="mic" class="w-3.5 h-3.5 text-amber-500"></i>
              <span data-i18n="nav_voice">AI Voice</span>
            </button>
            <button onclick="window.router.navigate('schemes')" class="nav-link px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 transition hover:text-emerald-800 hover:bg-white" data-page="schemes">
              <span data-i18n="nav_schemes">Govt Schemes</span>
            </button>
          </nav>

          <!-- Right Action Area: 12-Language Selector & User Profile -->
          <div class="flex items-center space-x-3">
            
            <!-- 12 Regional Languages Dropdown -->
            <div class="relative inline-block text-left">
              <div class="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm hover:border-emerald-600 transition">
                <i data-lucide="globe" class="w-4 h-4 text-emerald-700 mr-1.5 flex-shrink-0"></i>
                <select 
                  id="language-select" 
                  data-lang-picker
                  onchange="window.i18n.setLanguage(this.value)"
                  class="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
                >
                  ${languages.map(l => `
                    <option value="${l.code}" ${l.code === currentLang ? 'selected' : ''} class="text-slate-800 bg-white font-medium py-1">
                      ${l.native} (${l.name})
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- User Auth / Profile Badge -->
            <div id="nav-user-area" class="hidden sm:flex items-center">
              ${currentUser ? `
                <div class="flex items-center space-x-2 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl px-3.5 py-1.5 cursor-pointer hover:bg-emerald-100/60 transition" onclick="window.router.navigate('profile')">
                  <div class="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 font-extrabold flex items-center justify-center text-xs shadow-sm">
                    ${currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div class="text-left hidden md:block">
                    <span class="block text-xs font-bold text-slate-800 leading-tight">${currentUser.name}</span>
                    <span class="block text-[10px] text-emerald-700 font-semibold leading-tight">${currentUser.district || 'Farmer'}</span>
                  </div>
                </div>
              ` : `
                <button onclick="window.authManager.openAuthModal('login')" class="btn-primary-agri text-xs !py-2.5 !px-5 shadow-sm">
                  <i data-lucide="log-in" class="w-4 h-4"></i>
                  <span data-i18n="nav_login">Login</span>
                </button>
              `}
            </div>

            <!-- Mobile Hamburger Toggle -->
            <button 
              id="mobile-menu-btn" 
              onclick="toggleMobileMenu()" 
              class="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-emerald-800 hover:bg-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <i data-lucide="menu" class="w-5 h-5"></i>
            </button>

          </div>

        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu" class="hidden lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl">
        <button onclick="window.router.navigate('home'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="home" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_home">Home</span>
        </button>
        <button onclick="window.router.navigate('dashboard'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="layout-dashboard" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_dashboard">Dashboard</span>
        </button>
        <button onclick="window.router.navigate('disease'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="leaf" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_disease">Crop Disease AI</span>
        </button>
        <button onclick="window.router.navigate('fertilizer'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="flask-conical" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_fertilizer">Fertilizer Engine</span>
        </button>
        <button onclick="window.router.navigate('weather'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="cloud-sun" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_weather">Weather & Advisories</span>
        </button>
        <button onclick="window.router.navigate('market'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="trending-up" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_market">Mandi Price AI</span>
        </button>
        <button onclick="window.router.navigate('voice'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="mic" class="w-4 h-4 text-amber-500"></i>
          <span data-i18n="nav_voice">AI Voice Assistant</span>
        </button>
        <button onclick="window.router.navigate('schemes'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="landmark" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_schemes">Govt Schemes</span>
        </button>
        <button onclick="window.router.navigate('tips'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="lightbulb" class="w-4 h-4 text-amber-500"></i>
          <span data-i18n="nav_tips">Farming Tips</span>
        </button>
        <button onclick="window.router.navigate('history'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 flex items-center gap-2.5">
          <i data-lucide="clock" class="w-4 h-4 text-emerald-700"></i>
          <span data-i18n="nav_history">History & Reports</span>
        </button>
        <div class="pt-3 border-t border-slate-100">
          ${currentUser ? `
            <button onclick="window.router.navigate('profile'); toggleMobileMenu();" class="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4"></i>
              <span>${currentUser.name} (Profile)</span>
            </button>
            <button onclick="window.authManager.logout(); toggleMobileMenu();" class="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
              <i data-lucide="log-out" class="w-4 h-4"></i>
              <span data-i18n="nav_logout">Logout</span>
            </button>
          ` : `
            <button onclick="window.authManager.openAuthModal('login'); toggleMobileMenu();" class="w-full btn-primary-agri text-xs !py-3">
              <i data-lucide="log-in" class="w-4 h-4"></i>
              <span data-i18n="nav_login">Login / Register</span>
            </button>
          `}
        </div>
      </div>
    </header>
  `;
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

window.renderNavbar = renderNavbar;
window.toggleMobileMenu = toggleMobileMenu;
