/**
 * AgriNova AI - Multilingual AI Voice Assistant Component
 * Web Speech Recognition & Speech Synthesis across 12 Indian languages,
 * sound wave visualizer, conversational bubbles, and real-time backend query execution.
 * Clean, human-crafted voice studio.
 */

let speechRecognition = null;
let isListening = false;
let currentSynthUtterance = null;
let conversationHistory = [];

function renderVoicePage() {
  const currentLang = window.i18n.getLanguage();
  const languages = window.i18n.getLanguages();

  // Initialize conversation with welcome prompt if empty
  if (conversationHistory.length === 0) {
    conversationHistory.push({
      sender: 'assistant',
      text: window.i18n.t('voice_subheading', "Welcome to AgriNova Voice Assistant! Ask me any farming question in your native language."),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action_link: null
    });
  }

  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <!-- HEADER -->
      <div class="text-center max-w-2xl mx-auto space-y-2.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="mic" class="w-3.5 h-3.5 text-emerald-700"></i>
          <span>Multilingual Natural Language Voice Interface</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" data-i18n="voice_heading">
          AgriNova AI Voice Assistant
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed" data-i18n="voice_subheading">
          Speak naturally in your preferred language to get answers on weather, crop diseases, fertilizers, market rates, and government benefits.
        </p>
      </div>

      <!-- INTERACTIVE VOICE CONTROL STATION (Clean White Surface with Ambient Glow) -->
      <div class="agri-card p-6 sm:p-10 text-center space-y-6 bg-white border border-slate-200/90 shadow-sm">
        
        <!-- Language Selector for Voice Assistant -->
        <div class="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-700">
          <i data-lucide="globe" class="w-4 h-4 text-emerald-800"></i>
          <span>Voice Language:</span>
          <select 
            id="voice-language-select" 
            onchange="handleVoiceLangChange(this.value)"
            class="bg-transparent font-extrabold text-emerald-800 focus:outline-none cursor-pointer"
          >
            ${languages.map(l => `
              <option value="${l.code}" ${l.code === currentLang ? 'selected' : ''}>
                ${l.native} (${l.name})
              </option>
            `).join('')}
          </select>
        </div>

        <!-- SOUND WAVE ANIMATION (VISIBLE WHEN LISTENING) -->
        <div id="sound-wave-container" class="h-10 flex items-center justify-center gap-1.5 opacity-30 transition-all duration-300">
          <span class="sound-wave-bar"></span>
          <span class="sound-wave-bar"></span>
          <span class="sound-wave-bar"></span>
          <span class="sound-wave-bar"></span>
          <span class="sound-wave-bar"></span>
        </div>

        <!-- LARGE MICROPHONE BUTTON -->
        <div class="flex items-center justify-center">
          <button 
            id="mic-main-btn" 
            onclick="toggleVoiceRecognition()" 
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center shadow-lg hover:bg-emerald-900 transition-all transform active:scale-95 focus:outline-none border-4 border-emerald-700/20"
            aria-label="Toggle voice listening"
          >
            <i id="mic-icon" data-lucide="mic" class="w-11 h-11 stroke-[2]"></i>
          </button>
        </div>

        <!-- LISTENING STATUS LABEL -->
        <div class="space-y-1">
          <h4 id="voice-status-text" class="text-base font-extrabold text-slate-900" data-i18n="voice_tap_mic">
            Tap Microphone to Speak
          </h4>
          <p id="voice-interim-text" class="text-xs text-slate-500 italic min-h-[1.25rem]">
            Supports spoken English, Hindi, Punjabi, Bengali, Marathi, Gujarati, Tamil, Telugu, etc.
          </p>
        </div>

        <!-- SUGGESTED QUERIES PILLS -->
        <div class="pt-4 border-t border-slate-100 space-y-2.5">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block" data-i18n="voice_suggested">
            Try asking questions like:
          </span>
          <div class="flex flex-wrap justify-center gap-2">
            <button onclick="submitTextQuery('What is today weather in Ludhiana?')" class="text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-xl transition font-medium shadow-sm">
              "What is today's weather in Ludhiana?"
            </button>
            <button onclick="submitTextQuery('What is the current market price of wheat?')" class="text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-xl transition font-medium shadow-sm">
              "Current price of Wheat"
            </button>
            <button onclick="submitTextQuery('Which fertilizer is suitable for wheat crop?')" class="text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-xl transition font-medium shadow-sm">
              "Which fertilizer for wheat in loamy soil?"
            </button>
            <button onclick="submitTextQuery('How can I detect disease in my tomato crop?')" class="text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-xl transition font-medium shadow-sm">
              "Tomato early blight treatment"
            </button>
            <button onclick="submitTextQuery('What government schemes are available for farmers?')" class="text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-xl transition font-medium shadow-sm">
              "Government subsidy schemes"
            </button>
          </div>
        </div>

      </div>

      <!-- CONVERSATION HISTORY CHAT -->
      <div class="agri-card p-6 space-y-4 bg-white border border-slate-200/90 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <i data-lucide="message-square" class="w-4 h-4 text-emerald-800"></i>
            <span>Conversation Transcript</span>
          </h3>
          <button onclick="clearVoiceChat()" class="text-xs text-slate-400 hover:text-red-600 font-semibold transition">
            Clear Chat
          </button>
        </div>

        <div id="voice-chat-stream" class="space-y-4 max-h-96 overflow-y-auto pr-1">
          ${renderConversationBubbles()}
        </div>

        <!-- KEYBOARD INPUT FALLBACK -->
        <form onsubmit="handleManualVoiceQuery(event)" class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <input 
            type="text" 
            id="voice-manual-input" 
            placeholder="Or type your farming query here..." 
            class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none shadow-sm"
          />
          <button type="submit" class="btn-primary-agri text-xs sm:text-sm !py-2.5 !px-5 shadow-sm">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Ask</span>
          </button>
        </form>
      </div>

    </div>
  `;
}

function renderConversationBubbles() {
  return conversationHistory.map((item, idx) => {
    const isUser = item.sender === 'user';
    return `
      <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm space-y-2 ${isUser ? 'bg-emerald-800 text-white rounded-br-none' : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'}">
          <div class="flex items-center justify-between gap-3 text-[10px] ${isUser ? 'text-emerald-200' : 'text-slate-400'}">
            <span class="font-extrabold uppercase tracking-wider">${isUser ? 'You' : 'AgriNova AI Assistant'}</span>
            <span class="tabular-nums">${item.timestamp}</span>
          </div>
          <p class="text-xs sm:text-sm leading-relaxed font-medium">${item.text}</p>
          ${!isUser ? `
            <div class="flex items-center justify-between pt-1 border-t border-slate-200/80">
              <button onclick="speakText('${encodeURIComponent(item.text)}')" class="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 transition" title="Read Aloud">
                <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                <span data-i18n="voice_speak_response">Listen</span>
              </button>
              ${item.action_link ? `
                <button onclick="window.router.navigate('${item.action_link.replace('#', '')}')" class="text-xs font-bold text-emerald-800 underline hover:text-emerald-700 flex items-center gap-1">
                  <span>Open ${item.action_link.replace('#', '').toUpperCase()} →</span>
                </button>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function handleVoiceLangChange(langCode) {
  window.i18n.setLanguage(langCode);
}

// Web Speech Recognition
function toggleVoiceRecognition() {
  if (isListening) {
    stopVoiceRecognition();
  } else {
    startVoiceRecognition();
  }
}

function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser. Please use the text input below.");
    return;
  }

  const locale = window.i18n.getSpeechLocale();

  try {
    speechRecognition = new SpeechRecognition();
    speechRecognition.lang = locale;
    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;

    speechRecognition.onstart = function() {
      isListening = true;
      const btn = document.getElementById('mic-main-btn');
      if (btn) btn.classList.add('mic-pulse');
      const wave = document.getElementById('sound-wave-container');
      if (wave) {
        wave.classList.remove('opacity-30');
        wave.classList.add('opacity-100');
      }
      document.getElementById('voice-status-text').innerText = window.i18n.t('voice_listening', "Listening to your voice...");
      document.getElementById('voice-interim-text').innerText = "Speak now...";
    };

    speechRecognition.onresult = function(event) {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (interim) {
        document.getElementById('voice-interim-text').innerText = interim;
      }

      if (final) {
        stopVoiceRecognition();
        submitTextQuery(final);
      }
    };

    speechRecognition.onerror = function(event) {
      console.warn("Speech error:", event.error);
      stopVoiceRecognition();
      document.getElementById('voice-status-text').innerText = "Speech input paused. Click mic to retry.";
      document.getElementById('voice-interim-text').innerText = "Or type your question in the text box below.";
    };

    speechRecognition.onend = function() {
      stopVoiceRecognition();
    };

    speechRecognition.start();
  } catch (e) {
    console.error("Speech initialization error:", e);
    stopVoiceRecognition();
  }
}

function stopVoiceRecognition() {
  isListening = false;
  if (speechRecognition) {
    try { speechRecognition.stop(); } catch(e){}
    speechRecognition = null;
  }
  const btn = document.getElementById('mic-main-btn');
  if (btn) btn.classList.remove('mic-pulse');
  const wave = document.getElementById('sound-wave-container');
  if (wave) {
    wave.classList.add('opacity-30');
    wave.classList.remove('opacity-100');
  }
  const status = document.getElementById('voice-status-text');
  if (status) status.innerText = window.i18n.t('voice_tap_mic', "Tap Microphone to Speak");
}

async function submitTextQuery(queryText) {
  if (!queryText || !queryText.trim()) return;

  const currentLang = window.i18n.getLanguage();

  conversationHistory.push({
    sender: 'user',
    text: queryText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  updateConversationUI();

  document.getElementById('voice-status-text').innerText = window.i18n.t('voice_processing', "Processing query & retrieving farm data...");

  try {
    const res = await fetch('/api/voice/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: queryText,
        language: currentLang
      })
    });

    const data = await res.json();
    document.getElementById('voice-status-text').innerText = window.i18n.t('voice_tap_mic', "Tap Microphone to Speak");

    if (data.success) {
      conversationHistory.push({
        sender: 'assistant',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action_link: data.action_link
      });
      updateConversationUI();
      speakText(encodeURIComponent(data.response));
    }
  } catch (err) {
    document.getElementById('voice-status-text').innerText = "Tap Microphone to Speak";
    conversationHistory.push({
      sender: 'assistant',
      text: "I encountered an issue connecting to the agricultural database. Please try again.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action_link: null
    });
    updateConversationUI();
  }
}

function handleManualVoiceQuery(e) {
  e.preventDefault();
  const input = document.getElementById('voice-manual-input');
  if (input && input.value.trim()) {
    submitTextQuery(input.value.trim());
    input.value = '';
  }
}

function updateConversationUI() {
  const stream = document.getElementById('voice-chat-stream');
  if (stream) {
    stream.innerHTML = renderConversationBubbles();
    stream.scrollTop = stream.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }
}

function speakText(encodedText) {
  const text = decodeURIComponent(encodedText);
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = window.i18n.getSpeechLocale();
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

function clearVoiceChat() {
  conversationHistory = [{
    sender: 'assistant',
    text: "Chat cleared. What agricultural questions can I help you with today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action_link: null
  }];
  updateConversationUI();
}

window.renderVoicePage = renderVoicePage;
window.toggleVoiceRecognition = toggleVoiceRecognition;
window.submitTextQuery = submitTextQuery;
window.handleManualVoiceQuery = handleManualVoiceQuery;
window.handleVoiceLangChange = handleVoiceLangChange;
window.speakText = speakText;
window.clearVoiceChat = clearVoiceChat;
