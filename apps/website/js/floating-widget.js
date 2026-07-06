// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — FLOATING CONTACT WIDGET v1.0.3
// Generated via JS — single source, no HTML duplication
// UPDATED: "Email Us" → "Email Support"
// ================================================================

(function () {
  if (!window.QF_COMMUNICATION) return;

  var isTrackPage = window.location.pathname.indexOf("track.html") > -1;
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
        <a href="${QF_COMMUNICATION.getWhatsAppUrl(waTemplate)}"
           class="floating-item"
           role="menuitem"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Gold outer ring -->
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="#25D366"
              stroke="#D4AF37"
              stroke-width="2.5"
            />
            <!-- WhatsApp logo -->
            <path
              fill="#FFFFFF"
              d="M16 7.2c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.41 3.06 1.18 4.39L7.2 24.8l4.52-1.18A8.76 8.76 0 0 0 16 24.8c4.85 0 8.8-3.95 8.8-8.8S20.85 7.2 16 7.2zm0 15.9a7.08 7.08 0 0 1-3.6-.99l-.26-.15-2.68.7.72-2.61-.17-.27a7.07 7.07 0 1 1 5.99 3.32zm3.9-5.3c-.21-.11-1.24-.61-1.43-.68-.19-.07-.33-.11-.47.11s-.54.68-.66.82c-.12.14-.24.16-.45.05-.21-.11-.88-.32-1.68-1.01-.62-.55-1.04-1.22-1.16-1.43-.12-.21-.01-.33.09-.44.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.04-.26-.02-.36-.05-.11-.47-1.14-.64-1.56-.17-.41-.35-.36-.47-.37h-.4c-.14 0-.36.05-.55.26-.19.21-.73.71-.73 1.74s.75 2.03.86 2.17c.11.14 1.47 2.24 3.56 3.14.5.22.9.35 1.2.45.5.16.95.14 1.31.08.4-.06 1.24-.51 1.41-1 .17-.49.17-.92.12-1.01-.05-.09-.19-.14-.4-.25z"
            />
          </svg>
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
          <span>Email Support</span>
        </a>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", html);

  // ── WIDGET BEHAVIOUR ──
  var widget = document.getElementById("floatingWidget");
  var toggle = document.getElementById("floatingToggle");
  var menu = document.getElementById("floatingMenu");
  var items = menu.querySelectorAll(".floating-item");

  if (!widget || !toggle || !menu) return;

  function openMenu() {
    widget.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    // Focus first menu item
    setTimeout(function () {
      items[0].focus();
    }, 100);
  }

  function closeMenu() {
    widget.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    widget.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  document.addEventListener("click", function () {
    if (widget.classList.contains("is-open")) closeMenu();
  });

  menu.addEventListener("click", function (e) {
    e.stopPropagation();
    setTimeout(function () {
      closeMenu();
    }, 150);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && widget.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();
