// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — WEBSITE SCRIPT v6.5
// CONFIGURATION LOADED FROM communication.config.js
// IMPROVED: File upload with validation and clean Base64
// ================================================================

// QF_CONFIG is defined in communication.config.js
// DO NOT redeclare it here.

var isSubmitting = false;

// File upload constants
var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB (matches backend)
var ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
var ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];

document.addEventListener("DOMContentLoaded", function () {
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

// ── HELPER: Validate file before reading ──
function validateFile(file) {
  // Check if file exists
  if (!file) {
    throw new Error("No file selected.");
  }

  // Check file size (max 5 MB)
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      "File exceeds the 5 MB limit. Current size: " +
        (file.size / 1024 / 1024).toFixed(2) +
        " MB",
    );
  }

  // Check file type by MIME type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    // Fallback: check by extension
    var fileName = file.name.toLowerCase();
    var hasValidExtension = ALLOWED_EXTENSIONS.some(function (ext) {
      return fileName.endsWith(ext);
    });

    if (!hasValidExtension) {
      throw new Error(
        "Unsupported file type: " +
          file.type +
          ". Allowed: PDF, JPG, PNG, DOC, DOCX",
      );
    }
  }

  return true;
}

// ── HELPER: Read file as clean Base64 (no prefix) ──
function readFileAsBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
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
      fileInfo.textContent = "PDF · JPG · PNG — Max 5 MB";
      fileInfo.style.color = "";
      return;
    }

    // Validate file size
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

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      var fileName = file.name.toLowerCase();
      var hasValidExtension = ALLOWED_EXTENSIONS.some(function (ext) {
        return fileName.endsWith(ext);
      });

      if (!hasValidExtension) {
        fileLabel.classList.add("is-error");
        fileInfo.textContent =
          "Unsupported file type. Please upload PDF, JPG, PNG, DOC, or DOCX.";
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
      var fileError = document.getElementById("blFile-error");
      if (fileError) fileError.textContent = "Only one attachment allowed.";
      return;
    }
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change"));
  });
}

// ================================================================
// FORM VALIDATION (Only 4 required fields)
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
  if (!blRef || !blRef.value.trim()) {
    setError(
      "blReference",
      "blReference-error",
      "Please enter your B/L number.",
    );
  }

  var consignee = document.getElementById("consigneeName");
  if (!consignee || !consignee.value.trim()) {
    setError(
      "consigneeName",
      "consigneeName-error",
      "Please enter the consignee name.",
    );
  }

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
// MAIN FORM SUBMIT HANDLER — UPDATED WITH PROPER CONTAINER HIDING
// ================================================================
async function handleFormSubmit(event) {
  event.preventDefault();

  if (isSubmitting) return;
  if (!validateForm()) return;

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

  // ============================================================
  // READ AND VALIDATE THE FILE
  // ============================================================
  var fileInput = document.getElementById("blFile");
  var fileData = null;
  var fileName = null;
  var fileMimeType = null;
  var fileSize = null;

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    var file = fileInput.files[0];
    fileName = file.name;
    fileMimeType = file.type;
    fileSize = file.size;

    try {
      validateFile(file);
      fileData = await readFileAsBase64(file);
      console.log(
        "✅ File validated and loaded:",
        fileName,
        "Size:",
        fileSize,
        "Type:",
        fileMimeType,
      );
    } catch (err) {
      console.error("❌ File validation/read error:", err.message);
      var fileLabel = document.getElementById("fileLabel");
      var fileInfo = document.getElementById("file-help");
      var fileError = document.getElementById("blFile-error");
      if (fileLabel) fileLabel.classList.add("is-error");
      if (fileInfo) {
        fileInfo.textContent = err.message;
        fileInfo.style.color = "var(--error)";
      }
      if (fileError) fileError.textContent = err.message;
      fileInput.value = "";

      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove("is-loading");
      return;
    }
  } else {
    console.warn("⚠️ No file selected");
  }

  // Get form values
  var consigneeName = getFieldValue("consigneeName");
  var consigneePhone = normalizePhone(getFieldValue("consigneePhone"));
  var blReference = getFieldValue("blReference");
  var cargoDescription = getFieldValue("cargoDescription");
  var shipperName = getFieldValue("shipperName") || "";
  var consigneeEmail = getFieldValue("consigneeEmail") || "";
  var portOfDischarge = getFieldValue("portOfDischarge") || "";
  var containerNumber = getFieldValue("containerNumber") || "";
  var expectedArrival = document.getElementById("expectedArrival")
    ? document.getElementById("expectedArrival").value
    : "";

  // ============================================================
  // BUILD FORMDATA WITH CLEAN BASE64 FILE CONTENT
  // ============================================================
  var formData = {
    blReference: blReference,
    consigneeName: consigneeName,
    consigneePhone: consigneePhone,
    cargoDescription: cargoDescription,
    shipperName: shipperName,
    consigneeEmail: consigneeEmail,
    portOfDischarge: portOfDischarge,
    containerNumber: containerNumber,
    expectedArrival: expectedArrival,
    attachmentName: fileName,
    attachmentMimeType: fileMimeType,
    attachmentData: fileData,
  };

  console.log("🔍 Sending form data:", {
    blReference: formData.blReference,
    consigneeName: formData.consigneeName,
    consigneePhone: formData.consigneePhone,
    cargoDescription: formData.cargoDescription,
    attachmentName: formData.attachmentName,
    attachmentMimeType: formData.attachmentMimeType,
    attachmentDataLength: formData.attachmentData
      ? formData.attachmentData.length
      : 0,
  });

  var apiUrl = QF_CONFIG.apiUrl;
  if (!apiUrl) {
    console.error("❌ API URL not configured.");
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("is-loading");
    return;
  }

  console.log("🔍 API URL:", apiUrl);

  try {
    console.log("🔍 Sending fetch request...");

    var response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      redirect: "follow",
      body: JSON.stringify(formData),
    });

    console.log("🔍 Response status:", response.status);
    console.log("🔍 Response OK:", response.ok);

    var responseText = await response.text();
    console.log("🔍 Raw response text:", responseText);

    var data;
    try {
      data = JSON.parse(responseText);
      console.log("🔍 Parsed JSON response:", data);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON. Raw response:", responseText);
      throw new Error(
        "Server returned invalid JSON: " + responseText.substring(0, 100),
      );
    }

    // ============================================================
    // FIX: Include data.message as a fallback error message
    // ============================================================
    if (!response.ok) {
      console.error("❌ Response not OK:", response.status, data);
      throw new Error(
        data.error || data.message || "Server error. Please try again.",
      );
    }

    if (!data.success) {
      console.error("❌ Server returned success: false", data);
      throw new Error(
        data.error || data.message || "Submission failed. Please try again.",
      );
    }

    console.log("✅ Submission successful!", data);

    // ============================================================
    // FIX: Hide the ENTIRE submission section, not just the form
    // ============================================================
    // Hide the form container
    if (formContainer) {
      formContainer.style.display = "none";
    }

    // Hide the entire submission section if it exists
    if (submissionSection) {
      submissionSection.style.display = "none";
    }

    // Hide the form itself as well (backup)
    if (blForm) {
      blForm.style.display = "none";
    }

    // Show success message
    if (successMsg) {
      successMsg.style.display = "block";
    }

    // Hide error message if visible
    if (errorMsg) {
      errorMsg.style.display = "none";
    }

    // ============================================================
    // FIX: Display tracking ID correctly
    // ============================================================
    var trackingIdEl = document.getElementById("trackingIdDisplay");
    if (trackingIdEl) {
      // Handle both response formats: data.data.trackingId OR data.trackingId
      var trackingId = data.data?.trackingId || data.trackingId || "";
      trackingIdEl.textContent = trackingId;
      console.log("✅ Tracking ID displayed:", trackingId);
    }

    // Display phone number
    var displayPhone = formData.consigneePhone;
    if (
      displayPhone &&
      displayPhone.startsWith("234") &&
      displayPhone.length === 13
    ) {
      displayPhone = "0" + displayPhone.substring(3);
    }
    var confirmPhoneEl = document.getElementById("confirmPhone");
    if (confirmPhoneEl) {
      confirmPhoneEl.textContent = displayPhone;
    }

    saveCustomerMemory(formData.consigneeName, formData.consigneePhone);
    if (successMsg) {
      successMsg.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (error) {
    console.error("❌ Submission error:", error);
    console.error("❌ Error stack:", error.stack);

    // Hide form
    if (formContainer) {
      formContainer.style.display = "none";
    }
    if (blForm) {
      blForm.style.display = "none";
    }

    // Show error message
    if (successMsg) {
      successMsg.style.display = "none";
    }
    if (errorMsg) {
      errorMsg.style.display = "block";
    }

    var errorTextEl = document.getElementById("errorText");
    if (errorTextEl) {
      errorTextEl.textContent =
        error.message || "Network error. Please try again.";
    }

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
    fileInfo.textContent = "PDF · JPG · PNG — Max 5 MB";
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
