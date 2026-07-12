// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — WEBSITE SCRIPT v6.0
// CLEAN VERSION: Matches simplified track.html form
// ================================================================

// QF_CONFIG is now loaded from communication.config.js
// Do NOT redeclare it here.

var isSubmitting = false;

document.addEventListener("DOMContentLoaded", function () {
  // Use QF_CONFIG from communication.config.js
  // Override apiUrl with data-api from body if present
  var apiUrl = document.body.getAttribute("data-api");
  if (apiUrl && window.QF_CONFIG) {
    window.QF_CONFIG.apiUrl = apiUrl;
  }

  var yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initMobileMenu();
  initFormHandler();
  initFileUpload();
  initFormMemory();
});

// ── HELPER: Safe field value getter ──
function getFieldValue(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// ── HELPER: Phone normalization ──
function normalizePhone(phone) {
  if (!phone) return "";
  var cleaned = phone.toString().replace(/[\s\+\-\(\)]/g, "");
  if (cleaned.startsWith("0")) cleaned = "234" + cleaned.substring(1);
  if (!cleaned.startsWith("234")) cleaned = "234" + cleaned;
  return cleaned;
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
      fileInfo.textContent = "PDF · JPG · PNG — Max 10 MB";
      fileInfo.style.color = "";
      return;
    }

    var sizeMB = (file.size / 1048576).toFixed(1);

    if (file.size > QF_CONFIG.maxFileSize) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent = "File too large (" + sizeMB + "MB). Max 10MB.";
      fileInfo.style.color = "var(--error)";
      if (fileError) fileError.textContent = "Please select a smaller file.";
      fileInput.value = "";
      return;
    }

    if (QF_CONFIG.allowedMimeTypes.indexOf(file.type) === -1) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent =
        "Unsupported file type. Please upload PDF, JPG, or PNG.";
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
// FORM VALIDATION (FIX 2: Only 4 required fields)
// ================================================================
function validateForm() {
  var isValid = true;

  // Clear previous errors
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

  // 1. B/L Reference — required
  var blRef = document.getElementById("blReference");
  if (!blRef || !blRef.value.trim()) {
    setError(
      "blReference",
      "blReference-error",
      "Please enter your B/L number.",
    );
  }

  // 2. Consignee Name — required
  var consignee = document.getElementById("consigneeName");
  if (!consignee || !consignee.value.trim()) {
    setError(
      "consigneeName",
      "consigneeName-error",
      "Please enter the consignee name.",
    );
  }

  // 3. Consignee Phone — required
  var phone = document.getElementById("consigneePhone");
  if (phone) {
    var phoneVal = phone.value.trim().replace(/\s+/g, "");
    var normalized = normalizePhone(phoneVal);
    if (!phoneVal) {
      setError(
        "consigneePhone",
        "consigneePhone-error",
        "Please enter the consignee phone number.",
      );
    } else if (!/^234\d{10}$/.test(normalized)) {
      setError(
        "consigneePhone",
        "consigneePhone-error",
        "Enter a valid Nigerian phone number.",
      );
    }
  }

  // 4. File Upload — required
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
// READ FILE AS BASE64
// ================================================================
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
// FORM HANDLER
// ================================================================
function initFormHandler() {
  var blForm = document.getElementById("blForm");
  if (!blForm) return;

  blForm.addEventListener("submit", handleFormSubmit);

  // Clear errors on input
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

  // Read file
  var fileInput = document.getElementById("blFile");
  var fileData = null;
  var fileName = null;

  if (fileInput && fileInput.files && fileInput.files[0]) {
    try {
      var file = fileInput.files[0];
      fileName = file.name;
      fileData = await readFileAsBase64(file);
    } catch (err) {
      console.error("File read error:", err);
    }
  }

  // Build form data — only required fields + optional fields if they exist
  var formData = {
    customerName: getFieldValue("consigneeName"),
    phoneNumber: normalizePhone(getFieldValue("consigneePhone")),
    blNumber: getFieldValue("blReference"),
    cargoDescription: getFieldValue("cargoDescription"),
    containerNumber: getFieldValue("containerNumber") || "",
    shipperName: getFieldValue("shipperName") || "",
    consigneeEmail: getFieldValue("consigneeEmail") || "",
    portOfDischarge: getFieldValue("portOfDischarge") || "",
    expectedArrival: document.getElementById("expectedArrival")
      ? document.getElementById("expectedArrival").value
      : "",
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
    var response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Server error. Please try again.");

    var data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Submission failed. Please try again.");
    }

    // Show success
    if (blForm) blForm.style.display = "none";
    if (successMsg) successMsg.style.display = "block";
    if (errorMsg) errorMsg.style.display = "none";

    var trackingIdEl = document.getElementById("trackingIdDisplay");
    if (trackingIdEl) trackingIdEl.textContent = data.trackingId;

    var displayPhone = formData.phoneNumber;
    if (
      displayPhone &&
      displayPhone.startsWith("234") &&
      displayPhone.length === 13
    ) {
      displayPhone = "0" + displayPhone.substring(3);
    }
    var confirmPhoneEl = document.getElementById("confirmPhone");
    if (confirmPhoneEl) confirmPhoneEl.textContent = displayPhone;

    saveCustomerMemory(formData.customerName, formData.phoneNumber);
    if (successMsg)
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    console.error("Submission error:", error);
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

  var fileLabel = document.getElementById("fileLabel");
  var fileInfo = document.getElementById("file-help");
  var fileError = document.getElementById("blFile-error");

  if (fileLabel) {
    var fileLabelText = document.getElementById("fileLabelText");
    if (fileLabelText) fileLabelText.textContent = "Choose file or drag & drop";
    fileLabel.classList.remove("is-valid", "is-error", "is-dragover");
  }

  if (fileInfo) {
    fileInfo.textContent = "PDF · JPG · PNG — Max 10 MB";
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
  var idEl = document.getElementById("trackingIdDisplay");
  var feedback = document.getElementById("copyFeedback");

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

// ================================================================
// EXPOSE GLOBALLY
// ================================================================
window.copyTrackingId = copyTrackingId;
window.resetForm = resetForm;
// QF_CONFIG is already exposed from communication.config.js
// Do not redeclare it here
