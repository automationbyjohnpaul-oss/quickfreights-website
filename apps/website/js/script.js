// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — WEBSITE SCRIPT v5.4.3
// FIXED: Field IDs aligned with track.html, removed console.log
// ================================================================
var QF_CONFIG = {
  maxFileSize: 5 * 1024 * 1024,
  allowedMimeTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};
var isSubmitting = false;
document.addEventListener("DOMContentLoaded", function () {
  var apiUrl = document.body.getAttribute("data-api");
  if (apiUrl) QF_CONFIG.apiUrl = apiUrl;
  var yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  initMobileMenu();
  initSubmissionChoice();
  initFormHandler();
  initFileUpload();
  initFormMemory();
});

// ── SUBMISSION METHOD CHOICE ──
function initSubmissionChoice() {
  var choiceSection = document.getElementById("submissionChoice");
  var formSection = document.getElementById("formSection");
  var btnOnline = document.getElementById("btnOnline");
  var btnWhatsApp = document.getElementById("btnWhatsApp");
  var backBtn = document.getElementById("backToChoice");

  if (!choiceSection || !formSection) return;

  function showForm() {
    choiceSection.classList.add("is-hidden");
    formSection.classList.remove("is-hidden");
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showChoice() {
    formSection.classList.add("is-hidden");
    choiceSection.classList.remove("is-hidden");
    if (btnOnline) btnOnline.classList.remove("is-active");
    if (btnWhatsApp) btnWhatsApp.classList.remove("is-active");
    choiceSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (btnOnline) {
    btnOnline.addEventListener("click", function () {
      btnOnline.classList.add("is-active");
      if (btnWhatsApp) btnWhatsApp.classList.remove("is-active");
      btnOnline.disabled = true;
      showForm();
      setTimeout(function () {
        btnOnline.disabled = false;
      }, 1500);
    });
  }

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener("click", function () {
      btnWhatsApp.classList.add("is-active");
      btnOnline.classList.remove("is-active");
      btnWhatsApp.disabled = true;

      var waUrl = QF_COMMUNICATION.getWhatsAppUrl(
        QF_COMMUNICATION.templates.whatsappSubmission(),
      );
      window.open(waUrl, "_blank", "noopener,noreferrer");

      setTimeout(function () {
        btnWhatsApp.disabled = false;
      }, 2000);
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      showChoice();
    });
  }
}

// ================================================================
// MOBILE MENU WITH FOCUS TRAP
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
      fileInfo.textContent = "Accepted: PDF, JPG, PNG, DOC (Max 10MB)";
      fileInfo.style.color = "";
      return;
    }
    var sizeMB = (file.size / 1048576).toFixed(1);
    if (file.size > QF_CONFIG.maxFileSize) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent = "File too large (" + sizeMB + "MB). Max 5MB.";
      fileInfo.style.color = "var(--error)";
      if (fileError) fileError.textContent = "Please select a smaller file.";
      fileInput.value = "";
      return;
    }
    if (QF_CONFIG.allowedMimeTypes.indexOf(file.type) === -1) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent =
        "Unsupported file type. Please upload PDF, JPG, PNG, or DOC.";
      fileInfo.style.color = "var(--error)";
      if (fileError) fileError.textContent = "File type not allowed.";
      fileInput.value = "";
      return;
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
      var fileError = document.getElementById("blFile-error");
      if (fileError) fileError.textContent = "Only one attachment allowed.";
      return;
    }
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change"));
  });
}

// ================================================================
// PHONE NORMALIZATION
// ================================================================
function normalizePhone(phone) {
  var cleaned = phone.toString().replace(/[\s\+\-\(\)]/g, "");
  if (cleaned.startsWith("0")) cleaned = "234" + cleaned.substring(1);
  if (!cleaned.startsWith("234")) cleaned = "234" + cleaned;
  return cleaned;
}

// ================================================================
// FORM VALIDATION (aligned with track.html field IDs)
// ================================================================
function validateForm() {
  var isValid = true;
  var els = document.querySelectorAll(
    ".form-group input, .form-group textarea",
  );
  var errors = document.querySelectorAll(".field-error");
  for (var i = 0; i < els.length; i++) els[i].classList.remove("is-error");
  for (var j = 0; j < errors.length; j++) errors[j].textContent = "";

  var blRef = document.getElementById("blReference");
  if (blRef && !blRef.value.trim()) {
    blRef.classList.add("is-error");
    var blRefErr = document.getElementById("blReference-error");
    if (blRefErr)
      blRefErr.textContent = "Please enter your B/L reference number.";
    isValid = false;
  }

  var shipperName = document.getElementById("shipperName");
  if (shipperName && !shipperName.value.trim()) {
    shipperName.classList.add("is-error");
    var shipperErr = document.getElementById("shipperName-error");
    if (shipperErr) shipperErr.textContent = "Please enter the shipper name.";
    isValid = false;
  }

  var consigneeName = document.getElementById("consigneeName");
  if (consigneeName && !consigneeName.value.trim()) {
    consigneeName.classList.add("is-error");
    var consigneeErr = document.getElementById("consigneeName-error");
    if (consigneeErr)
      consigneeErr.textContent = "Please enter the consignee name.";
    isValid = false;
  }

  var consigneePhone = document.getElementById("consigneePhone");
  if (consigneePhone) {
    var phoneValue = consigneePhone.value.trim().replace(/\s+/g, "");
    var normalized = normalizePhone(phoneValue);
    if (!phoneValue) {
      consigneePhone.classList.add("is-error");
      var phoneErr = document.getElementById("consigneePhone-error");
      if (phoneErr)
        phoneErr.textContent = "Please enter the consignee phone number.";
      isValid = false;
    } else if (!/^234\d{10}$/.test(normalized)) {
      consigneePhone.classList.add("is-error");
      var phoneErr2 = document.getElementById("consigneePhone-error");
      if (phoneErr2)
        phoneErr2.textContent = "Enter a valid Nigerian phone number.";
      isValid = false;
    }
  }

  var consigneeEmail = document.getElementById("consigneeEmail");
  if (consigneeEmail && !consigneeEmail.value.trim()) {
    consigneeEmail.classList.add("is-error");
    var emailErr = document.getElementById("consigneeEmail-error");
    if (emailErr) emailErr.textContent = "Please enter the consignee email.";
    isValid = false;
  } else if (
    consigneeEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consigneeEmail.value.trim())
  ) {
    consigneeEmail.classList.add("is-error");
    var emailErr2 = document.getElementById("consigneeEmail-error");
    if (emailErr2)
      emailErr2.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  var cargoDesc = document.getElementById("cargoDescription");
  if (cargoDesc && !cargoDesc.value.trim()) {
    cargoDesc.classList.add("is-error");
    var cargoErr = document.getElementById("cargoDescription-error");
    if (cargoErr) cargoErr.textContent = "Please describe your cargo.";
    isValid = false;
  }

  var portOfDischarge = document.getElementById("portOfDischarge");
  if (portOfDischarge && !portOfDischarge.value.trim()) {
    portOfDischarge.classList.add("is-error");
    var portErr = document.getElementById("portOfDischarge-error");
    if (portErr) portErr.textContent = "Please enter the port of discharge.";
    isValid = false;
  }

  var expectedArrival = document.getElementById("expectedArrival");
  if (expectedArrival && !expectedArrival.value) {
    expectedArrival.classList.add("is-error");
    var arrivalErr = document.getElementById("expectedArrival-error");
    if (arrivalErr)
      arrivalErr.textContent = "Please select the expected arrival date.";
    isValid = false;
  }

  var blFile = document.getElementById("blFile");
  if (blFile && !blFile.files[0]) {
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
// PROCESSING OVERLAY
// ================================================================
var processingTimer = null;
var processingSeconds = 0;
var processingStages = [
  { max: 2, message: "Validating your information..." },
  { max: 5, message: "Preparing your shipment details..." },
  { max: 10, message: "Uploading your supporting document..." },
  { max: 99, message: "Generating your Tracking ID..." },
];
function showProcessingOverlay() {
  var overlay = document.getElementById("processingOverlay");
  var status = document.getElementById("processingStatus");
  var timer = document.getElementById("elapsedTime");
  var subtext = document.getElementById("processingSubtext");
  processingSeconds = 0;
  overlay.classList.add("active");
  status.textContent = processingStages[0].message;
  timer.textContent = "00:00";
  if (subtext)
    subtext.textContent =
      "Please keep this page open while we securely process your submission.";
  setTimeout(function () {
    if (subtext && subtext.textContent.indexOf("keep this page open") > -1)
      subtext.textContent = "";
  }, 8000);
  processingTimer = setInterval(function () {
    processingSeconds++;
    var mins = String(Math.floor(processingSeconds / 60)).padStart(2, "0");
    var secs = String(processingSeconds % 60).padStart(2, "0");
    timer.textContent = mins + ":" + secs;
    for (var i = 0; i < processingStages.length; i++) {
      if (processingSeconds <= processingStages[i].max) {
        status.textContent = processingStages[i].message;
        break;
      }
    }
    if (processingSeconds === 15 && subtext)
      subtext.textContent =
        "Large attachments or slower internet connections may take a little longer.";
  }, 1000);
}
function signalProcessingComplete() {
  var s = document.getElementById("processingStatus");
  if (s) s.textContent = "Almost done... Finalizing your submission.";
}
function hideProcessingOverlay() {
  clearInterval(processingTimer);
  document.getElementById("processingOverlay").classList.remove("active");
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

async function handleFormSubmit(event) {
  event.preventDefault();
  if (isSubmitting) return;
  if (!validateForm()) return;
  isSubmitting = true;
  var submitBtn = document.getElementById("submitBtn");
  var blForm = document.getElementById("blForm");
  var successMsg = document.getElementById("successMessage");
  var errorMsg = document.getElementById("errorMessage");
  var originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  submitBtn.classList.add("is-loading");

  var fileInput = document.getElementById("blFile");
  var fileData = null;
  var fileName = null;
  if (fileInput && fileInput.files[0]) {
    try {
      var file = fileInput.files[0];
      fileName = file.name;
      fileData = await readFileAsBase64(file);
    } catch (err) {
      console.error("File read error:", err);
    }
  }

  var consigneePhoneVal = document
    .getElementById("consigneePhone")
    .value.trim();
  var formData = {
    blReference: document.getElementById("blReference").value.trim(),
    shipperName: document.getElementById("shipperName").value.trim(),
    consigneeName: document.getElementById("consigneeName").value.trim(),
    consigneePhone: normalizePhone(consigneePhoneVal),
    consigneeEmail: document.getElementById("consigneeEmail").value.trim(),
    cargoDescription: document.getElementById("cargoDescription").value.trim(),
    portOfDischarge: document.getElementById("portOfDischarge").value.trim(),
    expectedArrival: document.getElementById("expectedArrival").value,
    attachmentName: fileName,
    attachmentData: fileData,
  };

  var apiUrl = QF_CONFIG.apiUrl;
  if (!apiUrl) {
    console.error("API URL not configured.");
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("is-loading");
    return;
  }

  try {
    showProcessingOverlay();
    var response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Server error. Please try again.");
    var data = await response.json();
    if (!data.success)
      throw new Error(data.error || "Submission failed. Please try again.");
    signalProcessingComplete();
    await new Promise(function (r) {
      setTimeout(r, 800);
    });
    blForm.style.display = "none";
    successMsg.style.display = "block";
    errorMsg.style.display = "none";
    document.getElementById("trackingIdDisplay").textContent = data.trackingId;
    var displayPhone = formData.consigneePhone;
    if (displayPhone.startsWith("234") && displayPhone.length === 13)
      displayPhone = "0" + displayPhone.substring(3);
    document.getElementById("confirmPhone").textContent = displayPhone;
    saveCustomerMemory(formData.consigneeName, formData.consigneePhone);
    successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    console.error("Submission error:", error);
    blForm.style.display = "none";
    successMsg.style.display = "none";
    errorMsg.style.display = "block";
    document.getElementById("errorText").textContent =
      error.message || "Network error. Please try again.";
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("is-loading");
  } finally {
    hideProcessingOverlay();
    isSubmitting = false;
  }
}

function readFileAsBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function () {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
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
    var nameEl = document.getElementById("consigneeName");
    var phoneEl = document.getElementById("consigneePhone");
    var rememberEl = document.getElementById("rememberMe");
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
  var blForm = document.getElementById("blForm");
  var successMsg = document.getElementById("successMessage");
  var errorMsg = document.getElementById("errorMessage");
  var submitBtn = document.getElementById("submitBtn");
  if (blForm) {
    blForm.reset();
    blForm.style.display = "flex";
  }
  if (successMsg) successMsg.style.display = "none";
  if (errorMsg) errorMsg.style.display = "none";
  if (submitBtn) {
    submitBtn.disabled = false;
    document.getElementById("submitText").textContent = "Submit Bill of Lading";
    submitBtn.classList.remove("is-loading");
  }
  var els = document.querySelectorAll(
    ".form-group input, .form-group textarea",
  );
  for (var i = 0; i < els.length; i++) els[i].classList.remove("is-error");
  var errors = document.querySelectorAll(".field-error");
  for (var j = 0; j < errors.length; j++) errors[j].textContent = "";
  var fileLabel = document.getElementById("fileLabel");
  var fileInfo = document.getElementById("file-help");
  var fileError = document.getElementById("blFile-error");
  if (fileLabel) {
    document.getElementById("fileLabelText").textContent =
      "Choose file or drag & drop";
    fileLabel.classList.remove("is-valid", "is-error", "is-dragover");
  }
  if (fileInfo) {
    fileInfo.textContent = "Accepted: PDF, JPG, PNG, DOC (Max 10MB)";
    fileInfo.style.color = "";
  }
  if (fileError) fileError.textContent = "";
  var copyFeedback = document.getElementById("copyFeedback");
  if (copyFeedback) copyFeedback.textContent = "";
  isSubmitting = false;
  if (blForm) blForm.scrollIntoView({ behavior: "smooth", block: "start" });
  var nameInput = document.getElementById("consigneeName");
  if (nameInput) nameInput.focus();
}

// ================================================================
// COPY TRACKING ID
// ================================================================
function copyTrackingId() {
  var id = document.getElementById("trackingIdDisplay").textContent.trim();
  var feedback = document.getElementById("copyFeedback");
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(id)
      .then(function () {
        feedback.textContent = "Copied!";
        setTimeout(function () {
          feedback.textContent = "";
        }, 2000);
      })
      .catch(function () {
        feedback.textContent = "Unable to copy.";
      });
  } else {
    feedback.textContent = "Copy not supported.";
  }
}
