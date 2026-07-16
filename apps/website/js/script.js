// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — WEBSITE SCRIPT v7.0
// CONFIGURATION LOADED FROM communication.config.js
// FEATURES: Premium submission progress overlay with event-driven stages
// ================================================================

// QF_CONFIG is defined in communication.config.js
// DO NOT redeclare it here.

// ================================================================
// PROCESSING UI — Configuration for the progress flow
// ================================================================

var PROCESSING_UI = {
  stages: [
    "Verifying your details",
    "Preparing your Bill of Lading",
    "Uploading cargo documents",
    "Registering your shipment",
    "Sending your Tracking ID",
  ],
  progress: [
    { stage: 1, percent: 5 },
    { stage: 2, percent: 20 },
    { stage: 3, percent: 38 },
    { stage: 4, percent: 58 },
    { stage: 5, percent: 90 },
  ],
  successMessage: "Shipment Registered Successfully",
  successDelay: 700,
  reassurance: [
    "Your documents are encrypted and securely transmitted.",
    "Your Tracking ID will be sent to your phone via SMS.",
    "Large files may take a few extra seconds. Please keep this page open.",
    "Quick Freights — RC: 8106184 · Licensed Customs Broker.",
  ],
};

var currentStage = 0;
var processingTimer = null;
var processingSeconds = 0;
var reassuranceTimer = null;

// ================================================================
// PROCESSING UI HELPERS
// ================================================================

function setStageState(stageId, state) {
  var el = document.getElementById(stageId);
  if (el) el.setAttribute("data-state", state);
}

function setProgress(percent) {
  var fill = document.getElementById("progressBarFill");
  var pct = document.getElementById("progressPercent");
  var wrapper = document.getElementById("progressBarWrapper");
  if (fill) fill.style.width = percent + "%";
  if (pct) pct.textContent = percent + "%";
  if (wrapper) wrapper.setAttribute("aria-valuenow", percent);
}

function advanceStage(num) {
  if (num <= currentStage) return;
  for (var i = currentStage + 1; i <= num; i++) {
    if (i > 1) setStageState("stage" + (i - 1), "done");
    setStageState("stage" + i, "active");
    var match = PROCESSING_UI.progress.filter(function (p) {
      return p.stage === i;
    });
    if (match.length > 0) setProgress(match[0].percent);
  }
  currentStage = num;
}

function showProcessingOverlay() {
  var overlay = document.getElementById("processingOverlay");
  if (!overlay) return;

  currentStage = 0;
  processingSeconds = 0;
  PROCESSING_UI.stages.forEach(function (_, i) {
    setStageState("stage" + (i + 1), "pending");
  });
  setProgress(0);
  document.getElementById("elapsedTime").textContent = "00:00";
  var title = document.getElementById("processingTitle");
  if (title) title.textContent = "Submitting Your Bill of Lading";

  overlay.setAttribute("data-locked", "true");
  overlay.style.display = "flex";
  overlay.classList.add("active");

  advanceStage(1);

  var timerEl = document.getElementById("elapsedTime");
  processingTimer = setInterval(function () {
    processingSeconds++;
    var mins = String(Math.floor(processingSeconds / 60)).padStart(2, "0");
    var secs = String(processingSeconds % 60).padStart(2, "0");
    if (timerEl) timerEl.textContent = mins + ":" + secs;
  }, 1000);

  var msgEl = document.getElementById("processingReassurance");
  var msgIndex = 0;
  if (msgEl) {
    msgEl.textContent = PROCESSING_UI.reassurance[0];
    reassuranceTimer = setInterval(function () {
      msgIndex = (msgIndex + 1) % PROCESSING_UI.reassurance.length;
      msgEl.style.opacity = "0";
      setTimeout(function () {
        if (msgEl) {
          msgEl.textContent = PROCESSING_UI.reassurance[msgIndex];
          msgEl.style.opacity = "1";
        }
      }, 400);
    }, 4000);
  }

  document.addEventListener("keydown", blockEscapeDuringProcessing);
}

function blockEscapeDuringProcessing(e) {
  if (e.key === "Escape") {
    var overlay = document.getElementById("processingOverlay");
    if (
      overlay &&
      overlay.classList.contains("active") &&
      overlay.getAttribute("data-locked") === "true"
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

function signalProcessingComplete() {
  PROCESSING_UI.stages.forEach(function (_, i) {
    setStageState("stage" + (i + 1), "done");
  });
  setProgress(100);

  var title = document.getElementById("processingTitle");
  if (title) title.textContent = PROCESSING_UI.successMessage;

  setTimeout(function () {
    hideProcessingOverlay();
  }, PROCESSING_UI.successDelay);
}

function hideProcessingOverlay() {
  clearInterval(processingTimer);
  clearInterval(reassuranceTimer);
  document.removeEventListener("keydown", blockEscapeDuringProcessing);

  var overlay = document.getElementById("processingOverlay");
  if (overlay) {
    overlay.style.display = "none";
    overlay.classList.remove("active");
    overlay.removeAttribute("data-locked");
  }

  currentStage = 0;
  PROCESSING_UI.stages.forEach(function (_, i) {
    setStageState("stage" + (i + 1), "pending");
  });
  setProgress(0);
  var title = document.getElementById("processingTitle");
  if (title) title.textContent = "Submitting Your Bill of Lading";
}

// ================================================================
// CORE VARIABLES
// ================================================================

var isSubmitting = false;
var MAX_FILE_SIZE = 5 * 1024 * 1024;
var ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
var ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

// ================================================================
// DOM CONTENT LOADED
// ================================================================

document.addEventListener("DOMContentLoaded", function () {
  var yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  initMobileMenu();
  initFormHandler();
  initFileUpload();
  initFormMemory();
});

function getFieldValue(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function normalizePhone(phone) {
  if (!phone) return "";
  var cleaned = phone.toString().replace(/[\s\+\-\(\)]/g, "");
  if (cleaned.startsWith("0")) cleaned = "234" + cleaned.substring(1);
  if (!cleaned.startsWith("234")) cleaned = "234" + cleaned;
  return cleaned;
}

function validateFile(file) {
  if (!file) throw new Error("No file selected.");
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      "File exceeds the 5 MB limit. Current size: " +
        (file.size / 1024 / 1024).toFixed(2) +
        " MB",
    );
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    var fileName = file.name.toLowerCase();
    var hasValidExtension = ALLOWED_EXTENSIONS.some(function (ext) {
      return fileName.endsWith(ext);
    });
    if (!hasValidExtension) {
      throw new Error(
        "Unsupported file type: " + file.type + ". Allowed: PDF, JPG, or PNG",
      );
    }
  }
  return true;
}

function readFileAsBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var base64 = reader.result.split(",")[1];
        resolve(base64);
      } catch (error) {
        reject(new Error("Failed to extract Base64 data: " + error.message));
      }
    };
    reader.onerror = function () {
      reject(
        new Error(
          "File read error: " +
            (reader.error ? reader.error.message : "Unknown error"),
        ),
      );
    };
    reader.readAsDataURL(file);
  });
}

// ================================================================
// MOBILE MENU
// ================================================================
function initMobileMenu() {
  var menuToggle = document.getElementById("menuToggle");
  var navList = document.getElementById("navList");
  if (!menuToggle || !navList) return;

  var overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  function getFocusableElements() {
    return navList.querySelectorAll(
      "a[href], button:not([disabled]), input:not([disabled])",
    );
  }

  function openMenu() {
    navList.classList.add("active");
    menuToggle.classList.add("active");
    overlay.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    navList.addEventListener(
      "transitionend",
      function handler() {
        var firstLink = navList.querySelector("a");
        if (firstLink) firstLink.focus();
        navList.removeEventListener("transitionend", handler);
      },
      { once: true },
    );
  }

  function closeMenu() {
    navList.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    menuToggle.focus();
  }

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    navList.classList.contains("active") ? closeMenu() : openMenu();
  });
  overlay.addEventListener("click", closeMenu);
  navList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navList.classList.contains("active")) closeMenu();
    if (e.key === "Tab" && navList.classList.contains("active")) {
      var focusable = getFocusableElements();
      if (focusable.length === 0) return;
      var first = focusable[0],
        last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  var touchStartX = 0;
  navList.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  navList.addEventListener(
    "touchend",
    function (e) {
      if (e.changedTouches[0].screenX > touchStartX + 60) closeMenu();
    },
    { passive: true },
  );

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

// ================================================================
// FILE UPLOAD UI
// ================================================================
function initFileUpload() {
  var fileInput = document.getElementById("blFile");
  var fileLabel = document.getElementById("fileLabel");
  var fileInfo = document.getElementById("file-help");
  var fileError = document.getElementById("blFile-error");
  if (!fileInput || !fileLabel || !fileInfo) return;

  fileInput.addEventListener("change", function () {
    var file = fileInput.files[0];
    fileLabel.classList.remove("is-valid", "is-error");
    if (fileError) fileError.textContent = "";
    if (!file) {
      document.getElementById("fileLabelText").textContent =
        "Choose file or drag & drop";
      fileInfo.textContent = "PDF · JPG · PNG — Max 5 MB";
      fileInfo.style.color = "";
      return;
    }
    var sizeMB = (file.size / 1048576).toFixed(1);
    if (file.size > MAX_FILE_SIZE) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent = "File too large (" + sizeMB + "MB). Max 5MB.";
      fileInfo.style.color = "var(--error)";
      if (fileError)
        fileError.textContent = "Please select a smaller file (max 5MB).";
      fileInput.value = "";
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      var fileName = file.name.toLowerCase();
      var hasValidExtension = ALLOWED_EXTENSIONS.some(function (ext) {
        return fileName.endsWith(ext);
      });
      if (!hasValidExtension) {
        fileLabel.classList.add("is-error");
        fileInfo.textContent =
          "Unsupported file type. Please upload PDF, JPG, or PNG.";
        fileInfo.style.color = "var(--error)";
        if (fileError) fileError.textContent = "File type not allowed.";
        fileInput.value = "";
        return;
      }
    }
    fileLabel.classList.add("is-valid");
    document.getElementById("fileLabelText").textContent = file.name;
    fileInfo.textContent = sizeMB + " MB · Ready";
    fileInfo.style.color = "var(--success)";
  });

  fileLabel.addEventListener("dragover", function (e) {
    e.preventDefault();
    fileLabel.classList.add("is-dragover");
  });
  fileLabel.addEventListener("dragleave", function () {
    fileLabel.classList.remove("is-dragover");
  });
  fileLabel.addEventListener("drop", function (e) {
    e.preventDefault();
    fileLabel.classList.remove("is-dragover");
    if (e.dataTransfer.files.length > 1) {
      if (fileError) fileError.textContent = "Only one attachment allowed.";
      return;
    }
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change"));
  });
}

// ================================================================
// FORM VALIDATION (4 required fields)
// ================================================================
function validateForm() {
  var isValid = true;
  document.querySelectorAll(".is-error").forEach(function (el) {
    el.classList.remove("is-error");
  });
  document.querySelectorAll(".field-error").forEach(function (el) {
    el.textContent = "";
  });

  function setError(id, errId, msg) {
    var el = document.getElementById(id);
    var err = document.getElementById(errId);
    if (el) el.classList.add("is-error");
    if (err) err.textContent = msg;
    isValid = false;
  }

  var blRef = document.getElementById("blReference");
  if (!blRef || !blRef.value.trim())
    setError(
      "blReference",
      "blReference-error",
      "Please enter your B/L number.",
    );

  var consignee = document.getElementById("consigneeName");
  if (!consignee || !consignee.value.trim())
    setError(
      "consigneeName",
      "consigneeName-error",
      "Please enter the consignee name.",
    );

  var phone = document.getElementById("consigneePhone");
  if (phone) {
    var phoneVal = phone.value.trim().replace(/\s+/g, "");
    var normalized = normalizePhone(phoneVal);
    if (!phoneVal)
      setError(
        "consigneePhone",
        "consigneePhone-error",
        "Please enter the consignee phone number.",
      );
    else if (!/^234\d{10}$/.test(normalized))
      setError(
        "consigneePhone",
        "consigneePhone-error",
        "Enter a valid Nigerian phone number.",
      );
  }

  var blFile = document.getElementById("blFile");
  if (!blFile || !blFile.files || !blFile.files[0]) {
    var fileErr = document.getElementById("blFile-error");
    if (fileErr) fileErr.textContent = "Please upload your Bill of Lading.";
    isValid = false;
  }

  if (!isValid) {
    var firstError = document.querySelector(".is-error");
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  return isValid;
}

// ================================================================
// FORM HANDLER
// ================================================================
function initFormHandler() {
  var blForm = document.getElementById("blForm");
  if (!blForm) return;
  blForm.addEventListener("submit", handleFormSubmit);
  var inputs = blForm.querySelectorAll("input, textarea");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
      this.classList.remove("is-error");
      var errEl = document.getElementById(this.id + "-error");
      if (errEl) errEl.textContent = "";
    });
  }
}

// ================================================================
// MAIN FORM SUBMIT HANDLER
// ================================================================
async function handleFormSubmit(event) {
  event.preventDefault();
  if (isSubmitting) return;
  if (!validateForm()) return;

  const T0 = performance.now();
  var T1 = T0,
    T2 = T0,
    T3 = T0,
    T4 = T0,
    T5 = T0,
    T6 = T0,
    T7 = T0,
    T8 = T0,
    T9 = T0;
  var validateStart = T0,
    validateEnd = T0,
    readStart = T0,
    readEnd = T0;
  var serializeStart = T0,
    serializeEnd = T0;

  showProcessingOverlay();
  T1 = performance.now();
  console.time("🚀 Total Submission");

  isSubmitting = true;
  var submitBtn = document.getElementById("submitBtn");
  var blForm = document.getElementById("blForm");
  var formContainer = document.getElementById("formContainer");
  var submissionSection = document.getElementById("submissionSection");
  var successMsg = document.getElementById("successMessage");
  var errorMsg = document.getElementById("errorMessage");
  var originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  submitBtn.classList.add("is-loading");

  var fileInput = document.getElementById("blFile");
  var fileData = null,
    fileName = null,
    fileMimeType = null,
    fileSize = null;

  T2 = performance.now();
  advanceStage(2);

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    var file = fileInput.files[0];
    fileName = file.name;
    fileMimeType = file.type;
    fileSize = file.size;
    try {
      validateStart = performance.now();
      validateFile(file);
      validateEnd = performance.now();
      readStart = performance.now();
      fileData = await readFileAsBase64(file);
      readEnd = performance.now();
      T3 = performance.now();
    } catch (err) {
      hideProcessingOverlay();
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove("is-loading");
      return;
    }
  }

  T4 = performance.now();
  var formData = {
    blReference: getFieldValue("blReference"),
    consigneeName: getFieldValue("consigneeName"),
    consigneePhone: normalizePhone(getFieldValue("consigneePhone")),
    cargoDescription: getFieldValue("cargoDescription"),
    shipperName: getFieldValue("shipperName") || "",
    consigneeEmail: getFieldValue("consigneeEmail") || "",
    portOfDischarge: getFieldValue("portOfDischarge") || "",
    containerNumber: getFieldValue("containerNumber") || "",
    expectedArrival: document.getElementById("expectedArrival")
      ? document.getElementById("expectedArrival").value
      : "",
    attachmentName: fileName,
    attachmentMimeType: fileMimeType,
    attachmentData: fileData,
  };

  T5 = performance.now();
  advanceStage(3);

  var apiUrl = QF_CONFIG.apiUrl;
  if (!apiUrl) {
    hideProcessingOverlay();
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("is-loading");
    return;
  }

  serializeStart = performance.now();
  var requestBody = JSON.stringify(formData);
  serializeEnd = performance.now();

  T6 = performance.now();
  advanceStage(4);

  try {
    var response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: requestBody,
    });
    T7 = performance.now();
    var responseText = await response.text();
    var data = JSON.parse(responseText);
    T8 = performance.now();
    advanceStage(5);

    if (!data.success)
      throw new Error(data.error || data.message || "Submission failed.");

    console.timeEnd("🚀 Total Submission");
    signalProcessingComplete();

    if (formContainer) formContainer.style.display = "none";
    if (submissionSection) submissionSection.style.display = "none";
    if (blForm) blForm.style.display = "none";
    if (successMsg) successMsg.style.display = "block";
    if (errorMsg) errorMsg.style.display = "none";

    var trackingIdEl = document.getElementById("trackingIdDisplay");
    if (trackingIdEl)
      trackingIdEl.textContent = data.data?.trackingId || data.trackingId || "";

    var displayPhone = formData.consigneePhone;
    if (
      displayPhone &&
      displayPhone.startsWith("234") &&
      displayPhone.length === 13
    )
      displayPhone = "0" + displayPhone.substring(3);
    var confirmPhoneEl = document.getElementById("confirmPhone");
    if (confirmPhoneEl) confirmPhoneEl.textContent = displayPhone;

    saveCustomerMemory(formData.consigneeName, formData.consigneePhone);

    T9 = performance.now();
    console.log("⏱️ TOTAL: " + (T9 - T0).toFixed(0) + " ms");
    if (successMsg)
      successMsg.scrollIntoView({ behavior: "smooth", block: "start" });
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("is-loading");
  } catch (error) {
    console.timeEnd("🚀 Total Submission");
    hideProcessingOverlay();
    if (formContainer) formContainer.style.display = "none";
    if (blForm) blForm.style.display = "none";
    if (successMsg) successMsg.style.display = "none";
    if (errorMsg) errorMsg.style.display = "block";
    var errorTextEl = document.getElementById("errorText");
    if (errorTextEl)
      errorTextEl.textContent =
        error.message || "Network error. Please try again.";
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("is-loading");
  } finally {
    isSubmitting = false;
  }
}

// ================================================================
// FORM MEMORY
// ================================================================
var FORM_MEMORY_KEY = "quickfreights_customer";
function saveCustomerMemory(name, phone) {
  try {
    var remember = document.getElementById("rememberMe");
    if (!remember || !remember.checked) return;
    localStorage.setItem(
      FORM_MEMORY_KEY,
      JSON.stringify({ consigneeName: name, consigneePhone: phone }),
    );
  } catch (e) {}
}
function loadCustomerMemory() {
  try {
    var data = localStorage.getItem(FORM_MEMORY_KEY);
    if (!data) return;
    var customer = JSON.parse(data);
    var nameEl = document.getElementById("consigneeName"),
      phoneEl = document.getElementById("consigneePhone"),
      rememberEl = document.getElementById("rememberMe");
    if (nameEl && customer.consigneeName) nameEl.value = customer.consigneeName;
    if (phoneEl && customer.consigneePhone)
      phoneEl.value = customer.consigneePhone;
    if (rememberEl) rememberEl.checked = true;
  } catch (e) {}
}
function initFormMemory() {
  loadCustomerMemory();
}

// ================================================================
// FORM RESET
// ================================================================
function resetForm() {
  var blForm = document.getElementById("blForm"),
    successMsg = document.getElementById("successMessage"),
    errorMsg = document.getElementById("errorMessage"),
    submitBtn = document.getElementById("submitBtn");
  if (blForm) {
    blForm.reset();
    blForm.style.display = "flex";
  }
  if (successMsg) successMsg.style.display = "none";
  if (errorMsg) errorMsg.style.display = "none";
  if (submitBtn) {
    submitBtn.disabled = false;
    var submitText = document.getElementById("submitText");
    if (submitText) submitText.textContent = "Submit Documents";
    submitBtn.classList.remove("is-loading");
  }
  document.querySelectorAll(".is-error").forEach(function (el) {
    el.classList.remove("is-error");
  });
  document.querySelectorAll(".field-error").forEach(function (el) {
    el.textContent = "";
  });
  var fileLabel = document.getElementById("fileLabel"),
    fileInfo = document.getElementById("file-help"),
    fileError = document.getElementById("blFile-error");
  if (fileLabel) {
    var fileLabelText = document.getElementById("fileLabelText");
    if (fileLabelText) fileLabelText.textContent = "Choose file or drag & drop";
    fileLabel.classList.remove("is-valid", "is-error", "is-dragover");
  }
  if (fileInfo) {
    fileInfo.textContent = "PDF · JPG · PNG — Max 5 MB";
    fileInfo.style.color = "";
  }
  if (fileError) fileError.textContent = "";
  var copyFeedback = document.getElementById("copyFeedback");
  if (copyFeedback) copyFeedback.textContent = "";
  currentStage = 0;
  PROCESSING_UI.stages.forEach(function (_, i) {
    setStageState("stage" + (i + 1), "pending");
  });
  setProgress(0);
  isSubmitting = false;
  if (blForm) blForm.scrollIntoView({ behavior: "smooth", block: "start" });
  var nameInput = document.getElementById("consigneeName");
  if (nameInput) nameInput.focus();
}

// ================================================================
// COPY TRACKING ID
// ================================================================
function copyTrackingId() {
  var idEl = document.getElementById("trackingIdDisplay"),
    feedback = document.getElementById("copyFeedback");
  if (!idEl) return;
  var id = idEl.textContent.trim();
  if (!id) return;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(id)
      .then(function () {
        if (feedback) feedback.textContent = "Copied!";
        setTimeout(function () {
          if (feedback) feedback.textContent = "";
        }, 2000);
      })
      .catch(function () {
        if (feedback) feedback.textContent = "Unable to copy.";
      });
  } else {
    if (feedback) feedback.textContent = "Copy not supported.";
  }
}

window.copyTrackingId = copyTrackingId;
window.resetForm = resetForm;
