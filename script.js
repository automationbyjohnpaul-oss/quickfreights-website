// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — WEBSITE SCRIPT v5.0
// Mobile menu + B/L form with file attachment + validation
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFormHandler();
    initFileUpload();
});

// MOBILE MENU
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    if (!menuToggle || !navList) return;
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    function openMenu() {
        navList.classList.add('active'); menuToggle.classList.add('active'); overlay.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true'); overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const firstLink = navList.querySelector('a');
        if (firstLink) setTimeout(function() { firstLink.focus(); }, 100);
    }
    function closeMenu() {
        navList.classList.remove('active'); menuToggle.classList.remove('active'); overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false'); overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; menuToggle.focus();
    }
    menuToggle.addEventListener('click', function(e) { e.stopPropagation(); navList.classList.contains('active') ? closeMenu() : openMenu(); });
    overlay.addEventListener('click', closeMenu);
    navList.querySelectorAll('a').forEach(function(link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && navList.classList.contains('active')) closeMenu(); });
    let touchStartX = 0;
    navList.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    navList.addEventListener('touchend', function(e) { if (e.changedTouches[0].screenX > touchStartX + 60) closeMenu(); }, { passive: true });
    menuToggle.setAttribute('aria-expanded', 'false');
}

// FILE UPLOAD UI
function initFileUpload() {
    const fileInput = document.getElementById('attachment');
    const fileLabel = document.getElementById('fileLabel');
    const fileInfo = document.getElementById('fileInfo');
    const fileError = document.getElementById('fileError');
    if (!fileInput || !fileLabel || !fileInfo) return;
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (fileError) fileError.textContent = '';
        fileLabel.style.borderColor = ''; fileLabel.style.background = '';
        if (!file) { fileLabel.querySelector('span').textContent = 'Click to upload or drag & drop'; fileInfo.textContent = 'PDF, JPG, PNG, or DOC (max 5MB)'; fileInfo.style.color = ''; return; }
        const sizeMB = (file.size / 1048576).toFixed(1);
        if (file.size > 5242880) { fileLabel.style.borderColor = 'var(--error)'; fileInfo.textContent = 'File too large (' + sizeMB + 'MB). Max 5MB.'; fileInfo.style.color = 'var(--error)'; if (fileError) fileError.textContent = 'Please select a smaller file.'; fileInput.value = ''; return; }
        fileLabel.querySelector('span').textContent = file.name; fileInfo.textContent = sizeMB + ' MB · Ready'; fileInfo.style.color = 'var(--success)'; fileLabel.style.borderColor = 'var(--gold)'; fileLabel.style.background = 'rgba(218,165,32,0.05)';
    });
    fileLabel.addEventListener('dragover', function(e) { e.preventDefault(); fileLabel.style.borderColor = 'var(--gold)'; });
    fileLabel.addEventListener('dragleave', function() { if (!fileInput.files[0]) { fileLabel.style.borderColor = ''; } });
    fileLabel.addEventListener('drop', function(e) { e.preventDefault(); fileInput.files = e.dataTransfer.files; fileInput.dispatchEvent(new Event('change')); });
}

// FORM VALIDATION
function validateForm() {
    let isValid = true;
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(function(el) { el.style.borderColor = ''; });
    document.querySelectorAll('.field-error').forEach(function(el) { el.textContent = ''; });
    const nameInput = document.getElementById('customerName');
    if (!nameInput.value.trim()) { nameInput.style.borderColor = 'var(--error)'; document.getElementById('nameError').textContent = 'Please enter your full name.'; isValid = false; }
    const phoneInput = document.getElementById('phoneNumber');
    const phoneValue = phoneInput.value.trim().replace(/\s+/g, '');
    if (!phoneValue) { phoneInput.style.borderColor = 'var(--error)'; document.getElementById('phoneError').textContent = 'Please enter your phone number.'; isValid = false; }
    else if (!/^(\+?234|0)?[7-9][0-1]\d{8}$/.test(phoneValue)) { phoneInput.style.borderColor = 'var(--error)'; document.getElementById('phoneError').textContent = 'Enter a valid Nigerian phone number.'; isValid = false; }
    const blInput = document.getElementById('blNumber');
    if (!blInput.value.trim()) { blInput.style.borderColor = 'var(--error)'; document.getElementById('blError').textContent = 'Please enter your B/L number.'; isValid = false; }
    const cargoInput = document.getElementById('cargoDescription');
    if (!cargoInput.value.trim()) { cargoInput.style.borderColor = 'var(--error)'; document.getElementById('cargoError').textContent = 'Please describe your cargo.'; isValid = false; }
    if (!isValid) { const firstError = document.querySelector('[style*="var(--error)"]'); if (firstError) { firstError.focus(); firstError.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }
    return isValid;
}

// FORM HANDLER
function initFormHandler() {
    const blForm = document.getElementById('blForm');
    if (!blForm) return;
    blForm.addEventListener('submit', handleFormSubmit);
    blForm.querySelectorAll('input, textarea').forEach(function(el) { el.addEventListener('input', function() { this.style.borderColor = ''; const errEl = document.getElementById(this.id + 'Error'); if (errEl) errEl.textContent = ''; }); });
}

async function handleFormSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    const submitBtn = document.getElementById('submitBtn');
    const blForm = document.getElementById('blForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; submitBtn.style.opacity = '0.8';
    const fileInput = document.getElementById('attachment');
    let fileData = null; let fileName = null;
    if (fileInput && fileInput.files[0]) { try { const file = fileInput.files[0]; fileName = file.name; fileData = await readFileAsBase64(file); } catch (err) { console.error('File read error:', err); } }
    const formData = { customerName: document.getElementById('customerName').value.trim(), phoneNumber: document.getElementById('phoneNumber').value.trim(), blNumber: document.getElementById('blNumber').value.trim(), containerNumber: document.getElementById('containerNumber').value.trim(), cargoDescription: document.getElementById('cargoDescription').value.trim(), attachmentName: fileName, attachmentData: fileData };
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxIc6aKphJc1YusqUjxy-22-tmIk03bR8DqJLh4rSq8vxiu_li-oC2_uYrACuqS21R0/exec';
    try {
        await fetch(GOOGLE_APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(formData) });
        blForm.style.display = 'none'; successMessage.style.display = 'block'; errorMessage.style.display = 'none';
        const tempId = 'QF-' + new Date().getFullYear() + '-' + formData.blNumber.replace(/[^A-Z0-9]/gi, '').substring(0, 6).toUpperCase();
        document.getElementById('trackingIdDisplay').textContent = tempId; document.getElementById('confirmPhone').textContent = formData.phoneNumber;
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) { console.error('Submission error:', error); blForm.style.display = 'none'; successMessage.style.display = 'none'; errorMessage.style.display = 'block'; document.getElementById('errorText').textContent = 'Network error. Please try again.'; submitBtn.disabled = false; submitBtn.textContent = originalText; submitBtn.style.opacity = '1'; }
}

function readFileAsBase64(file) { return new Promise(function(resolve, reject) { const reader = new FileReader(); reader.onload = function() { resolve(reader.result); }; reader.onerror = function() { reject(reader.error); }; reader.readAsDataURL(file); }); }

function resetForm() {
    const blForm = document.getElementById('blForm'); const successMessage = document.getElementById('successMessage'); const errorMessage = document.getElementById('errorMessage');
    if (blForm) { blForm.reset(); blForm.style.display = ''; } if (successMessage) successMessage.style.display = 'none'; if (errorMessage) errorMessage.style.display = 'none';
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(function(el) { el.style.borderColor = ''; });
    document.querySelectorAll('.field-error').forEach(function(el) { el.textContent = ''; });
    const fileLabel = document.getElementById('fileLabel'); const fileInfo = document.getElementById('fileInfo');
    if (fileLabel) { fileLabel.querySelector('span').textContent = 'Click to upload or drag & drop'; fileLabel.style.borderColor = ''; fileLabel.style.background = ''; }
    if (fileInfo) { fileInfo.textContent = 'PDF, JPG, PNG, or DOC (max 5MB)'; fileInfo.style.color = ''; }
    if (blForm) { blForm.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    document.getElementById('customerName') && document.getElementById('customerName').focus();
}