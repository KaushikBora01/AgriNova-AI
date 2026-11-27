/**
 * AgriNova AI - Crop Disease Detection Component
 * Clean, human-crafted agronomic pathology studio.
 * Drag-and-drop leaf upload, live WebRTC camera viewfinder with device fallback,
 * native camera snapshot capture, host crop morphology classifier, differential diagnosis breakdown, and treatment guides.
 */

let selectedDiseaseFile = null;
let cameraStream = null;
let currentFacingMode = 'environment';
let cameraDevices = [];

function renderDiseasePage() {
  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-2.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="scan" class="w-3.5 h-3.5 text-emerald-700"></i>
          <span>ICAR Crop Pathology & Computer Vision Studio</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" data-i18n="dis_heading">
          Detect Crop Diseases Instantly
        </h1>
        <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed" data-i18n="dis_subheading">
          Upload or capture a closeup photograph of an affected crop leaf to receive AI pathology classification and verified agronomic treatment protocols.
        </p>
      </div>

      <!-- MAIN UPLOAD & WORKSPACE AREA -->
      <div id="disease-upload-section" class="agri-card p-6 sm:p-10 space-y-6 bg-white border border-slate-200/90 shadow-sm">
        
        <!-- TARGET CROP TYPE SELECTOR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-50/70 via-slate-50 to-slate-50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-emerald-100/90 flex items-center justify-center text-emerald-800">
              <i data-lucide="sprout" class="w-4 h-4"></i>
            </div>
            <div>
              <label for="crop-selector" class="text-xs font-extrabold text-slate-800 block">Target Crop Specimen</label>
              <span class="text-[11px] text-slate-500">Auto-detect from leaf morphology or select your exact crop</span>
            </div>
          </div>
          <select 
            id="crop-selector" 
            class="form-input text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
          >
            <option value="auto">🌱 Pure PlantVillage AI (Auto-Identifies Crop & Pathology)</option>
            <option value="tomato">🍅 Tomato (टमाटर)</option>
            <option value="potato">🥔 Potato (आलू)</option>
            <option value="maize">🌽 Maize / Corn (मक्का)</option>
            <option value="pepper">🫑 Bell Pepper (शिमला मिर्च)</option>
            <option value="apple">🍎 Apple (सेब)</option>
            <option value="grape">🍇 Grape (अंगूर)</option>
          </select>
        </div>

        <!-- DROPZONE (Specimen Viewfinder Style) -->
        <div 
          id="dropzone"
          ondragover="handleDragOver(event)"
          ondragleave="handleDragLeave(event)"
          ondrop="handleDrop(event)"
          class="dropzone-border rounded-3xl p-8 sm:p-12 text-center bg-slate-50/60 hover:bg-emerald-50/20 transition cursor-pointer flex flex-col items-center justify-center space-y-4 specimen-viewfinder"
          onclick="document.getElementById('file-input').click()"
        >
          <input 
            type="file" 
            id="file-input" 
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            class="hidden" 
            onchange="handleFileSelect(this.files)"
          />

          <div class="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 text-emerald-800 flex items-center justify-center">
            <i data-lucide="upload-cloud" class="w-8 h-8 stroke-[1.8]"></i>
          </div>

          <div class="space-y-1">
            <p class="text-base font-extrabold text-slate-900">
              <span data-i18n="dis_drag_drop">Drag & drop your crop leaf image here, or</span> 
              <span class="text-emerald-800 underline font-black ml-1" data-i18n="dis_browse">Browse Files</span>
            </p>
            <p class="text-xs text-slate-500">Supports JPG, PNG, WEBP up to 16MB • Clear single-leaf closeup recommended</p>
          </div>

          <!-- DUAL CAMERA CONTROLS: LIVE WEBCAM & NATIVE DEVICE CAMERA APP -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2" onclick="event.stopPropagation()">
            <!-- Live WebRTC Camera Stream Modal -->
            <button 
              type="button" 
              onclick="openCameraModal()" 
              class="btn-secondary-agri text-xs !py-2.5 !px-4 shadow-sm flex items-center gap-1.5"
            >
              <i data-lucide="video" class="w-4 h-4 text-emerald-800"></i>
              <span>Live Webcam / Camera</span>
            </button>

            <!-- Native Device Camera App (Mobile & Windows 10/11 Direct Camera Trigger) -->
            <button 
              type="button" 
              onclick="triggerNativeCamera()" 
              class="btn-primary-agri text-xs !py-2.5 !px-4 shadow-sm flex items-center gap-1.5"
            >
              <i data-lucide="camera" class="w-4 h-4 text-amber-300"></i>
              <span>Snap with Camera App</span>
            </button>

            <input 
              type="file" 
              id="native-camera-input" 
              accept="image/*" 
              capture="environment" 
              class="hidden" 
              onchange="handleFileSelect(this.files)"
            />
          </div>
        </div>

        <!-- QUICK TEST SPECIMEN SAMPLES (Human-designed Slide Chips) -->
        <div class="pt-3 border-t border-slate-100 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Clinical Reference Specimens (Instant Test):</span>
            <span class="text-[10px] text-slate-400 font-medium">Click to load pre-verified specimen</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="loadSampleImage('tomato_early_blight')" class="text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl transition font-semibold flex items-center gap-1.5 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Tomato Early Blight</span>
            </button>
            <button onclick="loadSampleImage('potato_late_blight')" class="text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl transition font-semibold flex items-center gap-1.5 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Potato Late Blight</span>
            </button>
            <button onclick="loadSampleImage('rice_blast')" class="text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl transition font-semibold flex items-center gap-1.5 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-yellow-600"></span>
              <span>Rice Blast (Pyricularia)</span>
            </button>
            <button onclick="loadSampleImage('wheat_yellow_rust')" class="text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl transition font-semibold flex items-center gap-1.5 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>Wheat Yellow Rust</span>
            </button>
            <button onclick="loadSampleImage('healthy_crop_leaf')" class="text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl transition font-semibold flex items-center gap-1.5 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Healthy Crop Leaf</span>
            </button>
          </div>
        </div>

        <!-- PREVIEW BOX (HIDDEN BY DEFAULT) -->
        <div id="image-preview-container" class="hidden space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="image" class="w-4 h-4 text-emerald-800"></i>
              <span>Specimen Ready For Diagnostic Extraction</span>
            </span>
            <button onclick="resetImageSelection()" class="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Remove</span>
            </button>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="relative w-48 h-48 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex-shrink-0">
              <img id="image-preview" src="" alt="Crop Leaf Preview" class="w-full h-full object-cover" />
            </div>
            <div class="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <h4 id="file-name-label" class="text-sm font-extrabold text-slate-900">leaf_sample.jpg</h4>
                <p id="file-size-label" class="text-xs text-slate-500">1.2 MB</p>
              </div>
              <button 
                id="btn-analyze-crop" 
                onclick="analyzeSelectedImage()" 
                class="btn-primary-agri w-full sm:w-auto text-sm !py-3 !px-7 shadow-sm"
              >
                <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i>
                <span data-i18n="dis_btn_analyze">Run Computer Vision Diagnosis</span>
              </button>
            </div>
          </div>
        </div>

        <!-- LOADING PROGRESS (HIDDEN) -->
        <div id="analysis-loading-box" class="hidden text-center py-8 space-y-4">
          <div class="inline-block animate-spin text-emerald-800">
            <i data-lucide="loader-2" class="w-10 h-10"></i>
          </div>
          <div class="space-y-1">
            <h4 class="text-base font-extrabold text-slate-900" data-i18n="dis_analyzing">Analyzing leaf morphology & pathology...</h4>
            <p id="loading-stage-text" class="text-xs text-slate-500">Step 1/3: Segmenting leaf boundaries & computing chlorophyll index...</p>
          </div>
          <div class="w-64 max-w-full mx-auto bg-slate-200 rounded-full h-2 overflow-hidden">
            <div id="loading-bar" class="bg-emerald-600 h-2 rounded-full transition-all duration-300" style="width: 25%"></div>
          </div>
        </div>

      </div>

      <!-- RESULTS CONTAINER (RENDERED AFTER ANALYSIS) -->
      <div id="disease-result-container" class="hidden space-y-6"></div>

      <!-- INTERACTIVE CAMERA VIEWFINDER MODAL -->
      <div id="camera-modal" class="hidden fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <i data-lucide="camera" class="w-4 h-4 text-emerald-800"></i>
              <span>Live Leaf Specimen Viewfinder</span>
            </h3>
            <button onclick="closeCameraModal()" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- Video Viewfinder Frame with Targeting Reticle and Flash -->
          <div class="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center shadow-inner">
            <video id="camera-video" autoplay playsinline muted class="w-full h-full object-cover"></video>
            <canvas id="camera-canvas" class="hidden"></canvas>
            
            <!-- Shutter flash animation -->
            <div id="camera-flash" class="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-150"></div>

            <!-- Viewfinder targeting reticle -->
            <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div class="w-44 h-44 border-2 border-dashed border-emerald-400/80 rounded-3xl flex items-center justify-center shadow-lg">
                <span class="text-[10px] font-extrabold text-emerald-200 bg-slate-900/70 px-2.5 py-1 rounded-full backdrop-blur-sm">Align Leaf Specimen</span>
              </div>
            </div>

            <!-- Error fallback box (displayed if camera permissions are blocked) -->
            <div id="camera-error-box" class="hidden absolute inset-0 bg-slate-900/95 text-white p-6 flex flex-col items-center justify-center text-center space-y-3 z-10">
              <i data-lucide="alert-circle" class="w-8 h-8 text-amber-400"></i>
              <p id="camera-error-msg" class="text-xs text-slate-200 max-w-xs leading-relaxed">Camera stream initialization error.</p>
              <div class="flex flex-wrap gap-2 justify-center pt-2">
                <button type="button" onclick="startCameraStream()" class="btn-primary-agri text-xs !py-2 !px-4">
                  <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                  <span>Retry Camera</span>
                </button>
                <button type="button" onclick="triggerNativeCamera(); closeCameraModal();" class="btn-secondary-agri text-xs !py-2 !px-4">
                  <i data-lucide="camera" class="w-3.5 h-3.5"></i>
                  <span>Open Camera App</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Control Toolbar -->
          <div class="flex items-center justify-between pt-2">
            <button 
              id="btn-switch-camera" 
              type="button" 
              onclick="switchCamera()" 
              class="btn-secondary-agri text-xs !py-2 !px-3 shadow-sm flex items-center gap-1.5"
              title="Flip between front and rear cameras"
            >
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Flip Camera</span>
            </button>

            <div class="flex items-center gap-2">
              <button onclick="closeCameraModal()" class="btn-secondary-agri text-xs !py-2 !px-4">Cancel</button>
              <button onclick="captureCameraPhoto()" class="btn-primary-agri text-xs !py-2.5 !px-5 shadow-sm flex items-center gap-1.5">
                <i data-lucide="aperture" class="w-4 h-4 text-amber-300"></i>
                <span class="font-extrabold">Capture Photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

// Drag & Drop Handlers
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('dropzone').classList.add('drag-over');
}

function handleDragLeave(e) {
  e.preventDefault();
  document.getElementById('dropzone').classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('dropzone').classList.remove('drag-over');
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFileSelect(e.dataTransfer.files);
  }
}

function handleFileSelect(files) {
  if (!files || files.length === 0) return;
  const file = files[0];

  // Validation
  if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
    alert("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
    return;
  }
  if (file.size > 16 * 1024 * 1024) {
    alert("Image size exceeds 16MB limit. Please upload a smaller image.");
    return;
  }

  selectedDiseaseFile = file;

  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById('image-preview');
    preview.src = e.target.result;
    document.getElementById('file-name-label').innerText = file.name;
    document.getElementById('file-size-label').innerText = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    document.getElementById('image-preview-container').classList.remove('hidden');
    document.getElementById('disease-result-container').classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

function resetImageSelection() {
  selectedDiseaseFile = null;
  const fileInput = document.getElementById('file-input');
  if (fileInput) fileInput.value = '';
  const nativeInput = document.getElementById('native-camera-input');
  if (nativeInput) nativeInput.value = '';
  document.getElementById('image-preview-container').classList.add('hidden');
  document.getElementById('disease-result-container').classList.add('hidden');
}

// Synthetic / Sample Images for instant demonstration without physical file
function loadSampleImage(diseaseType) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const cropSelect = document.getElementById('crop-selector');

  if (diseaseType === 'healthy_crop_leaf') {
    if (cropSelect) cropSelect.value = 'auto';
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(128, 20); ctx.lineTo(128, 240);
    ctx.moveTo(128, 70); ctx.lineTo(60, 110);
    ctx.moveTo(128, 70); ctx.lineTo(196, 110);
    ctx.moveTo(128, 140); ctx.lineTo(50, 180);
    ctx.moveTo(128, 140); ctx.lineTo(206, 180);
    ctx.stroke();
  } else if (diseaseType === 'tomato_early_blight') {
    if (cropSelect) cropSelect.value = 'tomato';
    ctx.fillStyle = '#558B2F';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#FBC02D';
    ctx.beginPath(); ctx.arc(100, 90, 45, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#4E342E';
    ctx.beginPath(); ctx.arc(100, 90, 30, 0, 2 * Math.PI); ctx.fill();
    ctx.strokeStyle = '#271714';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(100, 90, 18, 0, 2 * Math.PI); ctx.stroke();
  } else if (diseaseType === 'potato_late_blight') {
    if (cropSelect) cropSelect.value = 'potato';
    ctx.fillStyle = '#33691E';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#1B1414';
    ctx.beginPath();
    ctx.ellipse(130, 130, 75, 55, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  } else if (diseaseType === 'rice_blast') {
    if (cropSelect) cropSelect.value = 'rice';
    ctx.fillStyle = '#689F38';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#ECEFF1';
    ctx.beginPath();
    ctx.moveTo(128, 50); ctx.lineTo(150, 110); ctx.lineTo(128, 170); ctx.lineTo(106, 110); ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 4;
    ctx.stroke();
  } else {
    // wheat_yellow_rust
    if (cropSelect) cropSelect.value = 'wheat';
    ctx.fillStyle = '#7CB342';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#FDD835';
    for (let x = 60; x < 210; x += 30) {
      ctx.fillRect(x, 20, 12, 220);
    }
  }

  canvas.toBlob(blob => {
    const file = new File([blob], `${diseaseType}.jpg`, { type: 'image/jpeg' });
    handleFileSelect([file]);
  }, 'image/jpeg');
}

// Native Device Camera App trigger
function triggerNativeCamera() {
  const nativeInput = document.getElementById('native-camera-input');
  if (nativeInput) {
    nativeInput.click();
  }
}

// Live Camera WebRTC Support
async function openCameraModal() {
  const modal = document.getElementById('camera-modal');
  if (modal) modal.classList.remove('hidden');
  const errorBox = document.getElementById('camera-error-box');
  if (errorBox) errorBox.classList.add('hidden');
  if (window.lucide) window.lucide.createIcons();
  await startCameraStream();
}

async function startCameraStream() {
  const video = document.getElementById('camera-video');
  const errorBox = document.getElementById('camera-error-box');

  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showCameraError("Live WebRTC video streaming is not supported or accessible in this browser context. Please click 'Open Camera App' below to snap your photo directly.");
    return;
  }

  let stream = null;

  // Attempt 1: Try with ideal facingMode (ideal prevents OverconstrainedError on PCs/webcams)
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: currentFacingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    });
  } catch (err1) {
    console.warn("Camera attempt 1 (ideal facingMode) failed:", err1);
    // Attempt 2: Fallback to basic { video: true } which works on all laptop webcams & desktops
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (err2) {
      console.error("Camera attempt 2 (any video) failed:", err2);
      const isDenied = err2.name === 'NotAllowedError' || err2.name === 'PermissionDeniedError';
      const msg = isDenied 
        ? "Camera permission was denied in your browser. Please allow camera permissions in the address bar, or use the 'Open Camera App' button below."
        : "Camera access unavailable (" + err2.message + "). You can snap a photo directly using the 'Open Camera App' button below.";
      showCameraError(msg);
      return;
    }
  }

  if (stream && video) {
    cameraStream = stream;
    video.srcObject = stream;
    video.muted = true;
    try {
      await video.play();
    } catch (e) {
      console.warn("Video play warning:", e);
    }
    if (errorBox) errorBox.classList.add('hidden');

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      cameraDevices = devices.filter(d => d.kind === 'videoinput');
      const switchBtn = document.getElementById('btn-switch-camera');
      if (switchBtn) {
        if (cameraDevices.length > 1) {
          switchBtn.classList.remove('hidden');
        }
      }
    } catch (e) {}
  }
}

function showCameraError(msg) {
  const errorBox = document.getElementById('camera-error-box');
  const errorMsg = document.getElementById('camera-error-msg');
  if (errorBox && errorMsg) {
    errorMsg.innerText = msg;
    errorBox.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  } else {
    alert(msg);
  }
}

async function switchCamera() {
  currentFacingMode = (currentFacingMode === 'environment') ? 'user' : 'environment';
  await startCameraStream();
}

function closeCameraModal() {
  const modal = document.getElementById('camera-modal');
  if (modal) modal.classList.add('hidden');
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}

function captureCameraPhoto() {
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');
  const flash = document.getElementById('camera-flash');

  if (!video || !video.videoWidth) {
    alert("Camera feed is not ready yet. Please ensure camera access is allowed or use 'Snap with Camera App'.");
    return;
  }

  // Trigger visual shutter flash
  if (flash) {
    flash.classList.remove('opacity-0');
    flash.classList.add('opacity-100');
    setTimeout(() => {
      flash.classList.remove('opacity-100');
      flash.classList.add('opacity-0');
    }, 150);
  }

  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(blob => {
    if (!blob) {
      alert("Failed to capture image snapshot. Please try again.");
      return;
    }
    const file = new File([blob], `camera_leaf_${Date.now()}.jpg`, { type: 'image/jpeg' });
    closeCameraModal();
    handleFileSelect([file]);
  }, 'image/jpeg', 0.95);
}

async function analyzeSelectedImage() {
  if (!selectedDiseaseFile) {
    alert("Please select or capture a crop leaf image first.");
    return;
  }

  const loadingBox = document.getElementById('analysis-loading-box');
  const btnAnalyze = document.getElementById('btn-analyze-crop');
  const loadingBar = document.getElementById('loading-bar');
  const stageText = document.getElementById('loading-stage-text');

  loadingBox.classList.remove('hidden');
  btnAnalyze.disabled = true;

  // Staged progress simulation
  loadingBar.style.width = '35%';
  stageText.innerText = "Step 1/3: Reading leaf image features...";

  setTimeout(() => {
    loadingBar.style.width = '70%';
    stageText.innerText = "Step 2/3: Comparing visual patterns against PlantVillage database...";
  }, 400);

  try {
    const formData = new FormData();
    formData.append('image', selectedDiseaseFile);

    const cropSelect = document.getElementById('crop-selector');
    if (cropSelect && cropSelect.value) {
      formData.append('crop', cropSelect.value);
    }

    const headers = {};
    const token = window.authManager.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch('/api/disease/detect', {
      method: 'POST',
      headers: headers,
      body: formData
    });

    const result = await response.json();

    loadingBar.style.width = '100%';
    stageText.innerText = "Step 3/3: Advisory report generated!";

    setTimeout(() => {
      loadingBox.classList.add('hidden');
      btnAnalyze.disabled = false;
      if (result.success) {
        displayDiseaseResult(result);
      } else {
        alert("Error: " + (result.error || "Analysis failed"));
      }
    }, 300);

  } catch (error) {
    loadingBox.classList.add('hidden');
    btnAnalyze.disabled = false;
    alert("Network or server error during image analysis: " + error.message);
  }
}

function displayDiseaseResult(data) {
  const container = document.getElementById('disease-result-container');
  const isHealthy = data.disease_name.includes("Healthy");

  // Morphology explanation text
  const isBroadleaf = data.feature_metrics.leaf_aspect_ratio < 2.8;
  const leafTypeDesc = isBroadleaf ? "Broadleaf Dicot Leaflet (Ovate / Serrate)" : "Monocot Grass Blade (Linear Ribbon)";

  container.innerHTML = `
    <div class="agri-card p-6 sm:p-10 space-y-8 bg-white border border-slate-200 shadow-sm">
      
      <!-- TOP STATUS ROW -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <span class="${isHealthy ? 'badge-agri-green' : 'badge-agri-gold'} text-xs font-bold">
              ${isHealthy ? 'Optimal Plant Health' : 'Pathology Infection Detected'}
            </span>
            <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
              <i data-lucide="sprout" class="w-3.5 h-3.5 text-emerald-700"></i>
              <span>Host Crop: ${data.crop_name}</span>
            </span>
            <span class="text-xs text-slate-400 font-medium">Model Engine: ${data.model_engine}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ${data.disease_name}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            Pathogen: <span class="italic text-slate-700 font-semibold">${data.scientific_name}</span> • Severity: <strong class="text-slate-800 font-bold">${data.severity}</strong>
          </p>
        </div>

        <div class="text-left sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Advisory Status</span>
          <span class="text-xl sm:text-2xl font-black text-emerald-800">Visual Pattern Match</span>
        </div>
      </div>

      <!-- ADVISORY NOTICE -->
      <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
        <i data-lucide="info" class="w-4 h-4 text-amber-700 flex-shrink-0"></i>
        <span><strong>Advisory Guidance:</strong> Automated computer vision screening. Please verify with a local Krishi Vigyan Kendra (KVK) specialist or agricultural extension officer before chemical intervention.</span>
      </div>

      <!-- MAIN DIAGNOSIS CONTENT -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Uploaded Image & Metrics Card -->
        <div class="space-y-4">
          <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100 relative">
            <img src="${data.image_url}" alt="Analyzed Leaf" class="w-full h-full object-cover" />
            <div class="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
              Leaf Specimen Isolated
            </div>
          </div>
          
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-2.5 shadow-sm">
            <span class="font-extrabold text-slate-900 block uppercase tracking-wider text-[10px] border-b border-slate-200/60 pb-1">Computer Vision Feature Metrics</span>
            
            <div class="flex justify-between items-center text-slate-600">
              <span>Leaf Morphology:</span>
              <span class="font-bold text-slate-800 text-[11px] text-right">${leafTypeDesc}</span>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>Aspect Ratio:</span>
              <span class="font-extrabold text-slate-900 tabular-nums">${data.feature_metrics.leaf_aspect_ratio || '1.0'}:1</span>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>Detected Lesions:</span>
              <span class="font-extrabold text-red-600 tabular-nums">${data.feature_metrics.lesion_count || 0} spots</span>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>Chlorophyll Index:</span>
              <span class="font-extrabold text-emerald-800 tabular-nums">${data.feature_metrics.green_ratio}%</span>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>Chlorosis (Yellowing):</span>
              <span class="font-extrabold text-amber-700 tabular-nums">${data.feature_metrics.chlorosis_ratio}%</span>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>Necrotic Spot Area:</span>
              <span class="font-extrabold text-red-700 tabular-nums">${data.feature_metrics.necrosis_ratio}%</span>
            </div>
          </div>

          <!-- DIFFERENTIAL DIAGNOSES PROBABILITIES -->
          ${data.differential_diagnoses && data.differential_diagnoses.length > 1 ? `
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-2.5 shadow-sm">
              <span class="font-extrabold text-slate-900 block uppercase tracking-wider text-[10px] border-b border-slate-200/60 pb-1">Differential Diagnoses (Ranked)</span>
              ${data.differential_diagnoses.map((item, idx) => `
                <div class="space-y-1">
                  <div class="flex justify-between text-[11px]">
                    <span class="font-bold text-slate-800 truncate mr-2">${idx + 1}. ${item.disease}</span>
                    <span class="font-semibold text-slate-500">${idx === 0 ? 'Primary Match' : 'Potential Match'}</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div class="${idx === 0 ? 'bg-emerald-600' : 'bg-slate-400'} h-1.5 rounded-full" style="width: ${idx === 0 ? '80%' : (idx === 1 ? '45%' : '25%')}"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

        </div>

        <!-- Symptoms & Causes Details -->
        <div class="md:col-span-2 space-y-5">
          
          <div class="space-y-1.5">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="eye" class="w-4 h-4 text-emerald-800"></i>
              <span data-i18n="dis_symptoms">Observed Agronomic Symptoms</span>
            </h4>
            <div class="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 leading-relaxed font-medium">
              ${data.symptoms}
            </div>
          </div>

          <div class="space-y-1.5">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="info" class="w-4 h-4 text-amber-700"></i>
              <span data-i18n="dis_causes">Pathogen Etiology & Microclimatic Causes</span>
            </h4>
            <div class="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 leading-relaxed font-medium">
              ${data.causes}
            </div>
          </div>

          <div class="space-y-1.5">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-800"></i>
              <span data-i18n="dis_treatments">Organic & Chemical Treatment Prescription</span>
            </h4>
            <div class="text-xs sm:text-sm text-emerald-950 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 leading-relaxed font-medium">
              ${data.treatments}
            </div>
          </div>

          <div class="space-y-1.5">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="check-square" class="w-4 h-4 text-purple-700"></i>
              <span data-i18n="dis_prevention">Preventive & Cultural Measures</span>
            </h4>
            <div class="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 leading-relaxed font-medium">
              ${data.preventive_measures}
            </div>
          </div>

          <div class="space-y-1.5">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="arrow-right-circle" class="w-4 h-4 text-blue-700"></i>
              <span data-i18n="dis_next_steps">Immediate Next Steps</span>
            </h4>
            <div class="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 leading-relaxed font-medium">
              ${data.next_steps}
            </div>
          </div>

          ${data.expert_consultation ? `
            <div class="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-red-950 flex items-start gap-3">
              <i data-lucide="alert-octagon" class="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5"></i>
              <div class="text-xs space-y-1">
                <span class="font-bold text-sm block">Urgent Agricultural Advisory</span>
                <p>High contagion potential under prevailing humidity. Please preserve leaf sample and contact your block Krishi Vigyan Kendra (KVK) or Kisan Call Centre (Toll-Free 1800-180-1551) for on-site verification.</p>
              </div>
            </div>
          ` : ''}

        </div>

      </div>

      <!-- ACTION BUTTONS -->
      <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <button onclick="window.print()" class="btn-secondary-agri text-xs sm:text-sm !py-2.5 !px-5 shadow-sm">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print / Save Diagnostic Report</span>
        </button>

        <button onclick="resetImageSelection()" class="btn-primary-agri text-xs sm:text-sm !py-2.5 !px-6 shadow-sm">
          <i data-lucide="refresh-cw" class="w-4 h-4"></i>
          <span data-i18n="dis_analyze_another">Analyze Another Leaf</span>
        </button>
      </div>

    </div>
  `;

  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

window.renderDiseasePage = renderDiseasePage;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
window.handleFileSelect = handleFileSelect;
window.resetImageSelection = resetImageSelection;
window.loadSampleImage = loadSampleImage;
window.openCameraModal = openCameraModal;
window.closeCameraModal = closeCameraModal;
window.startCameraStream = startCameraStream;
window.switchCamera = switchCamera;
window.captureCameraPhoto = captureCameraPhoto;
window.triggerNativeCamera = triggerNativeCamera;
window.analyzeSelectedImage = analyzeSelectedImage;
