/**
 * AgriNova AI - Farmer Profile & Authentication Manager
 * Handles login, registration, farmer profile updates, and JWT session persistence.
 * Clean, human-crafted farmer settings console.
 */

class AuthManager {
  constructor() {
    this.token = localStorage.getItem('agrinova_token') || null;
    this.user = JSON.parse(localStorage.getItem('agrinova_user') || 'null');
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  setUserSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('agrinova_token', token);
    localStorage.setItem('agrinova_user', JSON.stringify(user));
    if (user.preferred_language) {
      window.i18n.setLanguage(user.preferred_language);
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('agrinova_token');
    localStorage.removeItem('agrinova_user');
    window.router.navigate('home');
  }

  openAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    switchAuthMode(mode);
  }

  closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  }
}

window.authManager = new AuthManager();

function renderProfilePage() {
  const user = window.authManager.getUser();

  if (!user) {
    return `
      <div class="max-w-md mx-auto my-16 p-8 agri-card bg-white border border-slate-200/90 shadow-sm text-center space-y-4">
        <div class="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto">
          <i data-lucide="user-x" class="w-8 h-8"></i>
        </div>
        <h2 class="text-xl font-black text-slate-900">Farmer Login Required</h2>
        <p class="text-xs text-slate-500">Please sign in to your AgriNova account to view and update your farm profile, records, and preferences.</p>
        <button onclick="window.authManager.openAuthModal('login')" class="btn-primary-agri w-full !py-3 shadow-sm">
          <span>Sign In Now</span>
        </button>
      </div>
    `;
  }

  return `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight" data-i18n="nav_profile">
            Farmer Profile & Settings
          </h1>
          <p class="text-xs text-slate-500 font-medium">Manage your farm landholding, regional language, and crop preferences.</p>
        </div>
        <button onclick="window.authManager.logout()" class="text-xs text-red-600 hover:text-red-700 font-bold border border-red-200 px-3.5 py-1.5 rounded-xl bg-red-50/50 shadow-sm transition">
          <i data-lucide="log-out" class="w-3.5 h-3.5 inline mr-1"></i>
          <span data-i18n="nav_logout">Logout</span>
        </button>
      </div>

      <!-- PROFILE FORM CARD -->
      <div class="agri-card p-6 sm:p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
        <form onsubmit="handleProfileUpdate(event)" class="space-y-5">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name</label>
              <input type="text" id="prof-name" value="${user.name}" required class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
              <input type="email" id="prof-email" value="${user.email}" disabled class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-400 cursor-not-allowed shadow-sm" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number</label>
              <input type="tel" id="prof-phone" value="${user.phone || ''}" placeholder="10-digit mobile number" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Cultivable Landholding (Acres)</label>
              <input type="number" id="prof-land" value="${user.landholding || 5.0}" step="0.5" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm tabular-nums" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">State</label>
              <input type="text" id="prof-state" value="${user.state || 'Punjab'}" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">District</label>
              <input type="text" id="prof-district" value="${user.district || 'Ludhiana'}" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Farmer Category</label>
              <select id="prof-category" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm">
                <option value="Small & Marginal Farmer" ${user.farmer_category === 'Small & Marginal Farmer' ? 'selected' : ''}>Small & Marginal Farmer (&lt; 5 Acres)</option>
                <option value="Medium Farmer" ${user.farmer_category === 'Medium Farmer' ? 'selected' : ''}>Medium Farmer (5 - 25 Acres)</option>
                <option value="Large Farmer" ${user.farmer_category === 'Large Farmer' ? 'selected' : ''}>Large Farmer (&gt; 25 Acres)</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Preferred Regional Language</label>
              <select id="prof-lang" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:outline-none shadow-sm">
                ${window.i18n.getLanguages().map(l => `
                  <option value="${l.code}" ${l.code === (user.preferred_language || 'en') ? 'selected' : ''}>${l.native} (${l.name})</option>
                `).join('')}
              </select>
            </div>

            <div class="space-y-1.5 sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Preferred Crops</label>
              <input type="text" id="prof-crops" value="${user.preferred_crops || 'Wheat, Rice'}" placeholder="e.g. Wheat, Rice, Mustard" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm" />
            </div>

          </div>

          <div class="pt-4 border-t border-slate-100 flex justify-end">
            <button type="submit" id="btn-save-profile" class="btn-primary-agri text-xs sm:text-sm !py-2.5 !px-6 shadow-sm">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span data-i18n="btn_save">Save Changes</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  `;
}

async function handleProfileUpdate(e) {
  e.preventDefault();
  const token = window.authManager.getToken();
  if (!token) return;

  const name = document.getElementById('prof-name').value.trim();
  const phone = document.getElementById('prof-phone').value.trim();
  const landholding = parseFloat(document.getElementById('prof-land').value);
  const state = document.getElementById('prof-state').value.trim();
  const district = document.getElementById('prof-district').value.trim();
  const category = document.getElementById('prof-category').value;
  const lang = document.getElementById('prof-lang').value;
  const crops = document.getElementById('prof-crops').value.trim();

  const btn = document.getElementById('btn-save-profile');
  btn.disabled = true;

  try {
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name, phone, landholding, state, district,
        farmer_category: category,
        preferred_language: lang,
        preferred_crops: crops
      })
    });

    const data = await res.json();
    btn.disabled = false;

    if (data.success) {
      window.authManager.setUserSession(token, data.user);
      alert("Farmer profile updated successfully!");
      window.router.navigate('profile');
    } else {
      alert("Update failed: " + data.error);
    }
  } catch (err) {
    btn.disabled = false;
    alert("Error: " + err.message);
  }
}

// Authentication Modal Logic (Login & Register)
let currentAuthMode = 'login';

function switchAuthMode(mode) {
  currentAuthMode = mode;
  const loginForm = document.getElementById('auth-login-form');
  const regForm = document.getElementById('auth-register-form');
  const title = document.getElementById('auth-modal-title');
  const tabLogin = document.getElementById('auth-tab-login');
  const tabReg = document.getElementById('auth-tab-reg');

  if (mode === 'login') {
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    title.innerText = "Farmer Login";
    tabLogin.className = "flex-1 py-1.5 rounded-lg bg-white shadow-sm font-bold text-slate-900 text-xs transition";
    tabReg.className = "flex-1 py-1.5 rounded-lg font-medium text-slate-500 hover:text-slate-800 text-xs transition";
  } else {
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    title.innerText = "New Farmer Registration";
    tabReg.className = "flex-1 py-1.5 rounded-lg bg-white shadow-sm font-bold text-slate-900 text-xs transition";
    tabLogin.className = "flex-1 py-1.5 rounded-lg font-medium text-slate-500 hover:text-slate-800 text-xs transition";
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorBox = document.getElementById('login-error');
  errorBox.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      window.authManager.setUserSession(data.token, data.user);
      window.authManager.closeAuthModal();
      window.router.navigate('dashboard');
    } else {
      errorBox.innerText = data.error || "Login failed";
      errorBox.classList.remove('hidden');
    }
  } catch (err) {
    errorBox.innerText = "Network connection failed";
    errorBox.classList.remove('hidden');
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const phone = document.getElementById('reg-phone').value.trim();
  const state = document.getElementById('reg-state').value;
  const district = document.getElementById('reg-district').value.trim();
  const errorBox = document.getElementById('reg-error');
  errorBox.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, password, phone, state, district,
        preferred_language: window.i18n.getLanguage()
      })
    });
    const data = await res.json();

    if (data.success) {
      window.authManager.setUserSession(data.token, data.user);
      window.authManager.closeAuthModal();
      window.router.navigate('dashboard');
    } else {
      errorBox.innerText = data.error || "Registration failed";
      errorBox.classList.remove('hidden');
    }
  } catch (err) {
    errorBox.innerText = "Network connection failed";
    errorBox.classList.remove('hidden');
  }
}

window.renderProfilePage = renderProfilePage;
window.handleProfileUpdate = handleProfileUpdate;
window.switchAuthMode = switchAuthMode;
window.handleLoginSubmit = handleLoginSubmit;
window.handleRegisterSubmit = handleRegisterSubmit;
