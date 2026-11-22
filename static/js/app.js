/**
 * AgriNova AI - Main Application Router & Coordinator
 * Handles SPA navigation, hash-based routing, component lifecycle,
 * and reactive multi-language re-rendering.
 */

class AgriRouter {
  constructor() {
    this.routes = {
      'home': window.renderLandingPage,
      'dashboard': window.renderDashboard,
      'disease': window.renderDiseasePage,
      'fertilizer': window.renderFertilizerPage,
      'weather': window.renderWeatherPage,
      'market': window.renderMarketPage,
      'voice': window.renderVoicePage,
      'schemes': window.renderSchemesPage,
      'tips': window.renderTipsPage,
      'history': window.renderHistoryPage,
      'profile': window.renderProfilePage,
      'about': window.renderAboutPage
    };

    this.currentPage = 'home';

    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('load', () => this.init());

    // Reactive language change listener
    window.i18n.onLanguageChange(() => {
      this.reRenderCurrentPage();
    });
  }

  init() {
    this.renderHeader();
    this.handleHashChange();
  }

  renderHeader() {
    const navContainer = document.getElementById('navbar-container');
    if (navContainer && window.renderNavbar) {
      navContainer.innerHTML = window.renderNavbar();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  navigate(page) {
    if (!this.routes[page]) page = 'home';
    window.location.hash = `#${page}`;
  }

  async handleHashChange() {
    const rawHash = window.location.hash.replace('#', '').trim();
    const page = this.routes[rawHash] ? rawHash : 'home';
    this.currentPage = page;

    // Update active nav styling
    document.querySelectorAll('.nav-link').forEach(el => {
      if (el.getAttribute('data-page') === page) {
        el.classList.add('bg-forest-dark', 'text-accent-gold');
      } else {
        el.classList.remove('bg-forest-dark', 'text-accent-gold');
      }
    });

    const content = document.getElementById('app-content');
    if (content) {
      // Scroll to top
      window.scrollTo(0, 0);

      // Render view component
      const viewFn = this.routes[page];
      if (typeof viewFn === 'function') {
        content.innerHTML = `<div class="p-16 text-center text-forest font-bold text-lg"><i data-lucide="loader-2" class="w-8 h-8 animate-spin mx-auto mb-2"></i>Loading...</div>`;
        if (window.lucide) window.lucide.createIcons();

        try {
          const html = await viewFn();
          content.innerHTML = html;
        } catch (err) {
          console.error("View rendering error", err);
          content.innerHTML = `<div class="p-12 text-center text-red-600 font-bold">Error loading module. Please refresh.</div>`;
        }

        // Translate DOM elements and render icons
        window.i18n.translateDOM();
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  reRenderCurrentPage() {
    this.renderHeader();
    this.handleHashChange();
  }
}

// Global router singleton
window.router = new AgriRouter();
