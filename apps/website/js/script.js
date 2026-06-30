// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — WEBSITE SCRIPT v5.3
// Configuration from body data-api | Real API responses
// ================================================================

var CONFIG = {
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
  // Read API URL from body data attribute
  var apiUrl = document.body.getAttribute("data-api");
  if (apiUrl) CONFIG.apiUrl = apiUrl;

  // Dynamic copyright year
  var yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initMobileMenu();
  initFormHandler();
  initFileUpload();
});

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
    var firstLink = navList.querySelector("a");
    if (firstLink)
      setTimeout(function () {
        firstLink.focus();
      }, 100);
  }

  function closeMenu() {
    navList.classList.remove("active");
    menuToggle.classList.remove("active");
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
    if (e.key === "Escape" && navList.classList.contains("active")) {
      closeMenu();
    }
    if (e.key === "Tab" && navList.classList.contains("active")) {
      var focusable = getFocusableElements();
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
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
  var fileInput = document.getElementById("attachment");
  var fileLabel = document.getElementById("fileLabel");
  var fileInfo = document.getElementById("fileInfo");
  var fileError = document.getElementById("fileError");
  if (!fileInput || !fileLabel || !fileInfo) return;

  fileInput.addEventListener("change", function () {
    var file = fileInput.files[0];
    fileLabel.classList.remove("is-valid", "is-error");
    if (fileError) fileError.textContent = "";

    if (!file) {
      fileLabel.querySelector("span").textContent =
        "Click to upload or drag & drop";
      fileInfo.textContent = "PDF, JPG, PNG, or DOC (max 5MB)";
      fileInfo.style.color = "";
      return;
    }

    var sizeMB = (file.size / 1048576).toFixed(1);

    if (file.size > CONFIG.maxFileSize) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent = "File too large (" + sizeMB + "MB). Max 5MB.";
      fileInfo.style.color = "var(--error)";
      if (fileError) fileError.textContent = "Please select a smaller file.";
      fileInput.value = "";
      return;
    }

    if (CONFIG.allowedMimeTypes.indexOf(file.type) === -1) {
      fileLabel.classList.add("is-error");
      fileInfo.textContent =
        "Unsupported file type. Please upload PDF, JPG, PNG, or DOC.";
      fileInfo.style.color = "var(--error)";
      if (fileError) fileError.textContent = "File type not allowed.";
      fileInput.value = "";
      return;
    }

    fileLabel.classList.add("is-valid");
    fileLabel.querySelector("span").textContent = file.name;
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
      var fileError = document.getElementById("fileError");
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
// FORM VALIDATION
// ================================================================
function validateForm() {
  var isValid = true;
  var els = document.querySelectorAll(
    ".form-group input, .form-group textarea",
  );
  var errors = document.querySelectorAll(".field-error");

  for (var i = 0; i < els.length; i++) {
    els[i].classList.remove("is-error");
  }
  for (var j = 0; j < errors.length; j++) {
    errors[j].textContent = "";
  }

  var nameInput = document.getElementById("customerName");
  if (!nameInput.value.trim()) {
    nameInput.classList.add("is-error");
    var nameErr = document.getElementById("nameError");
    if (nameErr) nameErr.textContent = "Please enter your full name.";
    isValid = false;
  }

  var phoneInput = document.getElementById("phoneNumber");
  var phoneValue = phoneInput.value.trim().replace(/\s+/g, "");
  var normalized = normalizePhone(phoneValue);
  if (!phoneValue) {
    phoneInput.classList.add("is-error");
    var phoneErr = document.getElementById("phoneError");
    if (phoneErr) phoneErr.textContent = "Please enter your phone number.";
    isValid = false;
  } else if (!/^234\d{10}$/.test(normalized)) {
    phoneInput.classList.add("is-error");
    var phoneErr2 = document.getElementById("phoneError");
    if (phoneErr2)
      phoneErr2.textContent = "Enter a valid Nigerian phone number.";
    isValid = false;
  }

  var blInput = document.getElementById("blNumber");
  if (!blInput.value.trim()) {
    blInput.classList.add("is-error");
    var blErr = document.getElementById("blError");
    if (blErr) blErr.textContent = "Please enter your B/L number.";
    isValid = false;
  }

  var cargoInput = document.getElementById("cargoDescription");
  if (!cargoInput.value.trim()) {
    cargoInput.classList.add("is-error");
    var cargoErr = document.getElementById("cargoError");
    if (cargoErr) cargoErr.textContent = "Please describe your cargo.";
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
      var errEl = document.getElementById(this.id + "Error");
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

  var fileInput = document.getElementById("attachment");
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

  var formData = {
    customerName: document.getElementById("customerName").value.trim(),
    phoneNumber: normalizePhone(
      document.getElementById("phoneNumber").value.trim(),
    ),
    blNumber: document.getElementById("blNumber").value.trim(),
    containerNumber: document.getElementById("containerNumber").value.trim(),
    cargoDescription: document.getElementById("cargoDescription").value.trim(),
    attachmentName: fileName,
    attachmentData: fileData,
  };

  var apiUrl = CONFIG.apiUrl;
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
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Server error. Please try again.");
    }

    var data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Submission failed. Please try again.");
    }

    blForm.style.display = "none";
    successMsg.style.display = "block";
    errorMsg.style.display = "none";

    document.getElementById("trackingIdDisplay").textContent = data.trackingId;

    // Display phone in local Nigerian format
    var displayPhone = formData.phoneNumber;
    if (displayPhone.startsWith("234") && displayPhone.length === 13) {
      displayPhone = "0" + displayPhone.substring(3);
    }
    document.getElementById("confirmPhone").textContent = displayPhone;

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
    isSubmitting = false;
  }
}

// ================================================================
// FILE HELPERS
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
// FORM RESET
// ================================================================
function resetForm() {
  var blForm = document.getElementById("blForm");
  var successMsg = document.getElementById("successMessage");
  var errorMsg = document.getElementById("errorMessage");
  var submitBtn = document.getElementById("submitBtn");

  if (blForm) {
    blForm.reset();
    blForm.style.display = "";
  }
  if (successMsg) successMsg.style.display = "none";
  if (errorMsg) errorMsg.style.display = "none";
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Bill of Lading";
    submitBtn.classList.remove("is-loading");
  }

  var els = document.querySelectorAll(
    ".form-group input, .form-group textarea",
  );
  for (var i = 0; i < els.length; i++) {
    els[i].classList.remove("is-error");
  }
  var errors = document.querySelectorAll(".field-error");
  for (var j = 0; j < errors.length; j++) {
    errors[j].textContent = "";
  }

  var fileLabel = document.getElementById("fileLabel");
  var fileInfo = document.getElementById("fileInfo");
  var fileError = document.getElementById("fileError");

  if (fileLabel) {
    fileLabel.querySelector("span").textContent =
      "Click to upload or drag & drop";
    fileLabel.classList.remove("is-valid", "is-error", "is-dragover");
  }
  if (fileInfo) {
    fileInfo.textContent = "PDF, JPG, PNG, or DOC (max 5MB)";
    fileInfo.style.color = "";
  }
  if (fileError) {
    fileError.textContent = "";
  }

  // Clear copy feedback
  var copyFeedback = document.getElementById("copyFeedback");
  if (copyFeedback) {
    copyFeedback.textContent = "";
  }

  isSubmitting = false;

  if (blForm) blForm.scrollIntoView({ behavior: "smooth", block: "start" });
  var nameInput = document.getElementById("customerName");
  if (nameInput) nameInput.focus();
}

// ================================================================
// COPY TRACKING ID TO CLIPBOARD
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
