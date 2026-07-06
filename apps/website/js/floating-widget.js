// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — FLOATING CONTACT WIDGET v1.0.0
// Generated via JS — single source, no HTML duplication
// ================================================================

(function () {
  if (!window.QF_COMMUNICATION) return;

  var isTrackPage = window.location.pathname.indexOf('track.html') > -1;
  var waTemplate = isTrackPage
    ? QF_COMMUNICATION.templates.whatsappSubmission()
    : QF_COMMUNICATION.templates.whatsappGeneral();

  var html = `
    <div class="floating-widget" id="floatingWidget" aria-label="Contact options">
      <button class="floating-toggle" id="floatingToggle" aria-label="Open contact menu" aria-expanded="false" aria-controls="floatingMenu">
        <svg class="floating-toggle-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      <div class="floating-menu" id="floatingMenu" role="menu">
        <a href="${QF_COMMUNICATION.getWhatsAppUrl(waTemplate)}" class="floating-item" role="menuitem" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <span>WhatsApp</span>
        </a>
        <a href="track.html" class="floating-item" role="menuitem" aria-label="Track your shipment">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Track Shipment</span>
        </a>
        <a href="${QF_COMMUNICATION.getTelUrl()}" class="floating-item" role="menuitem" aria-label="Call office">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Call Office</span>
        </a>
        <a href="${QF_COMMUNICATION.getEmailUrl(QF_COMMUNICATION.subjects.enquiry)}" class="floating-item" role="menuitem" aria-label="Send email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>Email Us</span>
        </a>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  // ── WIDGET BEHAVIOUR ──
  var widget = document.getElementById('floatingWidget');
  var toggle = document.getElementById('floatingToggle');
  var menu = document.getElementById('floatingMenu');
  var items = menu.querySelectorAll('.floating-item');

  if (!widget || !toggle || !menu) return;

  function openMenu() {
    widget.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    // Focus first menu item
    setTimeout(function () {
      items[0].focus();
    }, 100);
  }

  function closeMenu() {
    widget.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    widget.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', function () {
    if (widget.classList.contains('is-open')) closeMenu();
  });

  menu.addEventListener('click', function (e) {
    e.stopPropagation();
    setTimeout(function () { closeMenu(); }, 150);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();