// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — QUICK ASSIST WIDGET v2.0.1
// Premium floating customer assistant
// UPDATED: Stronger pulse animation (more visible, still premium)
// Depends on: communication.config.js (must load first)
// ================================================================

(function () {
  "use strict";

  // ── CONFIGURATION ──
  var CONFIG = {
    phone: "+2348037883339",
    phoneRaw: "2348037883339",
    email: "reception.quickfreightglobal@gmail.com",
    portalUrl: "track.html",
    pulseInterval: 8000,
    animDuration: 280,
  };

  // ── WHATSAPP MESSAGE TEMPLATES ──
  var WA_TEMPLATES = {
    enquiry: encodeURIComponent(
      "Hello Quick Freights Global Limited,\n\nI would like to learn about your clearing and forwarding services.",
    ),
    team: encodeURIComponent(
      "Hello Quick Freights Global Limited,\n\nI would like to speak with your team about my cargo.",
    ),
    documents: encodeURIComponent(
      "Hello Quick Freights Global Limited,\n\nI would like to submit my cargo documents for clearance processing.\n\nPlease find my documents attached.",
    ),
  };

  // ── DETECT PAGE CONTEXT ──
  function isTrackPage() {
    return window.location.pathname.indexOf("track") !== -1;
  }

  // ── BUILD WHATSAPP URL ──
  function waUrl(template) {
    var number =
      typeof QF_COMMUNICATION !== "undefined" && QF_COMMUNICATION.whatsapp
        ? QF_COMMUNICATION.whatsapp.replace(/\D/g, "")
        : CONFIG.phoneRaw;
    return "https://wa.me/" + number + "?text=" + template;
  }

  // ── INJECT STYLES ──
  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = [
      "/* ── QUICK ASSIST WIDGET ── */",
      ".qa-wrapper{position:fixed;bottom:24px;right:24px;z-index:9998;font-family:var(--font,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);}",

      /* Toggle button */
      ".qa-toggle{display:flex;align-items:center;gap:8px;background:var(--navy,#0a1f3f);color:#fff;border:2px solid var(--gold,#daa520);border-radius:50px;padding:12px 20px;cursor:pointer;font-size:0.9rem;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:all 0.28s ease;white-space:nowrap;letter-spacing:0.3px;}",
      ".qa-toggle:hover{background:var(--navy-light,#132d56);box-shadow:0 4px 24px rgba(218,165,32,0.35);}",
      ".qa-toggle svg{transition:transform 0.28s ease;flex-shrink:0;}",
      ".qa-toggle.is-open svg{transform:rotate(45deg);}",
      ".qa-toggle-label{transition:opacity 0.2s ease;}",

      /* Pulse animation — stronger but still premium */
      "@keyframes qa-pulse{0%{box-shadow:0 4px 20px rgba(0,0,0,0.25),0 0 0 0 rgba(218,165,32,0.7);}70%{box-shadow:0 4px 20px rgba(0,0,0,0.25),0 0 0 14px rgba(218,165,32,0);}100%{box-shadow:0 4px 20px rgba(0,0,0,0.25),0 0 0 0 rgba(218,165,32,0);}}",
      ".qa-toggle.qa-pulse{animation:qa-pulse 1.5s ease-in-out;}",

      /* Panel */
      ".qa-panel{position:absolute;bottom:calc(100% + 12px);right:0;width:300px;background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.18),0 4px 12px rgba(0,0,0,0.08);overflow:hidden;transform:translateY(12px) scale(0.97);opacity:0;pointer-events:none;transition:transform 0.28s cubic-bezier(0.4,0,0.2,1),opacity 0.28s ease;}",
      ".qa-panel.is-open{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}",

      /* Panel header */
      ".qa-header{background:var(--navy,#0a1f3f);padding:16px 18px;display:flex;align-items:center;justify-content:space-between;}",
      ".qa-header-left{display:flex;align-items:center;gap:10px;}",
      ".qa-header-title{color:#fff;font-weight:700;font-size:0.95rem;letter-spacing:0.3px;}",
      ".qa-header-sub{color:rgba(255,255,255,0.6);font-size:0.72rem;margin-top:1px;}",
      ".qa-close{background:none;border:none;color:rgba(255,255,255,0.6);cursor:pointer;padding:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:color 0.2s ease;}",
      ".qa-close:hover{color:#fff;}",

      /* Sub-panel header with back button */
      ".qa-sub-header{background:var(--navy,#0a1f3f);padding:14px 18px;display:flex;align-items:center;gap:10px;}",
      ".qa-back{background:none;border:none;color:rgba(255,255,255,0.75);cursor:pointer;padding:4px 8px 4px 0;display:flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:600;transition:color 0.2s ease;}",
      ".qa-back:hover{color:var(--gold,#daa520);}",
      ".qa-sub-title{color:#fff;font-weight:700;font-size:0.9rem;}",

      /* Panel body */
      ".qa-body{padding:8px 0;}",
      ".qa-label{padding:10px 18px 4px;font-size:0.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;}",

      /* Menu items */
      ".qa-item{display:flex;align-items:center;gap:14px;padding:13px 18px;cursor:pointer;transition:background 0.18s ease;border:none;background:none;width:100%;text-align:left;}",
      ".qa-item:hover{background:#f8f9fb;}",
      ".qa-item:focus-visible{outline:2px solid var(--gold,#daa520);outline-offset:-2px;}",
      ".qa-item-icon{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem;}",
      ".qa-item-icon.green{background:#dcfce7;}.qa-item-icon.navy{background:#e8edf5;}.qa-item-icon.gold{background:#fef9e7;}.qa-item-icon.red{background:#fef2f2;}",
      ".qa-item-text{flex:1;}",
      ".qa-item-label{font-size:0.9rem;font-weight:600;color:#1f2937;line-height:1.2;}",
      ".qa-item-desc{font-size:0.75rem;color:#6b7280;margin-top:2px;}",
      ".qa-item-arrow{color:#d1d5db;flex-shrink:0;}",

      /* Divider */
      ".qa-divider{height:1px;background:#f3f4f6;margin:4px 0;}",

      /* Slide views */
      ".qa-views{position:relative;overflow:hidden;}",
      ".qa-view{transition:transform 0.28s cubic-bezier(0.4,0,0.2,1),opacity 0.28s ease;}",
      ".qa-view.is-hidden-left{position:absolute;top:0;left:0;right:0;transform:translateX(-100%);opacity:0;pointer-events:none;}",
      ".qa-view.is-hidden-right{position:absolute;top:0;left:0;right:0;transform:translateX(100%);opacity:0;pointer-events:none;}",

      /* Footer */
      ".qa-footer{padding:10px 18px;text-align:center;border-top:1px solid #f3f4f6;}",
      ".qa-footer p{font-size:0.68rem;color:#9ca3af;}",
      ".qa-footer strong{color:var(--gold-dark,#b8860b);}",

      /* Mobile */
      "@media(max-width:480px){",
      ".qa-wrapper{bottom:0;right:0;left:0;}",
      ".qa-toggle{border-radius:0;border-left:none;border-right:none;border-bottom:none;width:100%;justify-content:center;padding:14px 20px;}",
      ".qa-panel{position:fixed;bottom:53px;right:0;left:0;width:100%;border-radius:16px 16px 0 0;max-height:80vh;overflow-y:auto;}",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  // ── BUILD WIDGET HTML ──
  function buildWidget() {
    var onTrack = isTrackPage();

    var waItems = onTrack
      ? [
          {
            key: "documents",
            icon: "📄",
            label: "Submit Documents",
            desc: "Begin clearance process",
            color: "gold",
          },
          {
            key: "team",
            icon: "👥",
            label: "Talk to Our Team",
            desc: "Discuss your cargo",
            color: "navy",
          },
          {
            key: "enquiry",
            icon: "💬",
            label: "General Enquiry",
            desc: "Learn about our services",
            color: "green",
          },
        ]
      : [
          {
            key: "enquiry",
            icon: "💬",
            label: "General Enquiry",
            desc: "Learn about our services",
            color: "green",
          },
          {
            key: "team",
            icon: "👥",
            label: "Talk to Our Team",
            desc: "Discuss your cargo",
            color: "navy",
          },
          {
            key: "documents",
            icon: "📄",
            label: "Submit Documents",
            desc: "Begin clearance process",
            color: "gold",
          },
        ];

    var waItemsHTML = waItems
      .map(function (item) {
        return (
          '<button class="qa-item" data-wa="' +
          item.key +
          '" aria-label="' +
          item.label +
          '">' +
          '<span class="qa-item-icon ' +
          item.color +
          '">' +
          item.icon +
          "</span>" +
          '<span class="qa-item-text">' +
          '<span class="qa-item-label">' +
          item.label +
          "</span>" +
          '<span class="qa-item-desc">' +
          item.desc +
          "</span>" +
          "</span>" +
          '<svg class="qa-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
          "</button>"
        );
      })
      .join("");

    var html =
      '<div class="qa-wrapper" id="qaWrapper" role="complementary" aria-label="Quick Assist">' +
      '<button class="qa-toggle" id="qaToggle" aria-expanded="false" aria-controls="qaPanel" aria-label="Open Quick Assist">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' +
      "</svg>" +
      '<span class="qa-toggle-label">Quick Assist</span>' +
      "</button>" +
      '<div class="qa-panel" id="qaPanel" role="dialog" aria-modal="false" aria-label="Quick Assist menu">' +
      '<div class="qa-header">' +
      '<div class="qa-header-left">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold,#daa520)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      '<div><div class="qa-header-title">Quick Assist</div><div class="qa-header-sub">How can we help you?</div></div>' +
      "</div>" +
      '<button class="qa-close" id="qaClose" aria-label="Close Quick Assist">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      "</button>" +
      "</div>" +
      '<div class="qa-views" id="qaViews">' +
      '<div class="qa-view" id="qaMainView">' +
      '<div class="qa-body">' +
      '<p class="qa-label">Contact Options</p>' +
      '<button class="qa-item" id="qaWhatsAppBtn" aria-label="WhatsApp Us">' +
      '<span class="qa-item-icon green">🟢</span>' +
      '<span class="qa-item-text"><span class="qa-item-label">WhatsApp Us</span><span class="qa-item-desc">Chat with our team</span></span>' +
      '<svg class="qa-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>" +
      '<button class="qa-item" id="qaPortalBtn" aria-label="Clear My Cargo">' +
      '<span class="qa-item-icon gold">📄</span>' +
      '<span class="qa-item-text"><span class="qa-item-label">Clear My Cargo</span><span class="qa-item-desc">Submit documents online</span></span>' +
      '<svg class="qa-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>" +
      '<div class="qa-divider"></div>' +
      '<p class="qa-label">Direct Contact</p>' +
      '<a class="qa-item" href="tel:' +
      CONFIG.phone +
      '" aria-label="Call Office">' +
      '<span class="qa-item-icon navy">📞</span>' +
      '<span class="qa-item-text"><span class="qa-item-label">Call Office</span><span class="qa-item-desc">' +
      CONFIG.phone +
      "</span></span>" +
      "</a>" +
      '<a class="qa-item" href="mailto:' +
      CONFIG.email +
      '" aria-label="Email Support">' +
      '<span class="qa-item-icon gold">✉</span>' +
      '<span class="qa-item-text"><span class="qa-item-label">Email Support</span><span class="qa-item-desc">reception@quickfreights</span></span>' +
      "</a>" +
      "</div>" +
      '<div class="qa-footer"><p>Powered by <strong>Quick Freights</strong> · RC: 8106184</p></div>' +
      "</div>" +
      '<div class="qa-view is-hidden-right" id="qaWaView">' +
      '<div class="qa-sub-header">' +
      '<button class="qa-back" id="qaBack" aria-label="Go back">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>' +
      "Back" +
      "</button>" +
      '<span class="qa-sub-title">WhatsApp Us</span>' +
      "</div>" +
      '<div class="qa-body">' +
      '<p class="qa-label">Choose your message</p>' +
      waItemsHTML +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    document.body.insertAdjacentHTML("beforeend", html);
  }

  // ── CONTROLLER ──
  function initWidget() {
    var wrapper = document.getElementById("qaWrapper");
    var toggle = document.getElementById("qaToggle");
    var panel = document.getElementById("qaPanel");
    var closeBtn = document.getElementById("qaClose");
    var waBtn = document.getElementById("qaWhatsAppBtn");
    var portalBtn = document.getElementById("qaPortalBtn");
    var backBtn = document.getElementById("qaBack");
    var mainView = document.getElementById("qaMainView");
    var waView = document.getElementById("qaWaView");
    var isOpen = false;
    var pulseTimer = null;

    function openPanel() {
      isOpen = true;
      panel.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.classList.remove("qa-pulse");
      clearInterval(pulseTimer);
      showMainView();
    }

    function closePanel() {
      isOpen = false;
      panel.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      startPulse();
    }

    function togglePanel() {
      if (isOpen) closePanel();
      else openPanel();
    }

    function showMainView() {
      mainView.classList.remove("is-hidden-left");
      mainView.classList.remove("is-hidden-right");
      waView.classList.remove("is-hidden-left");
      waView.classList.add("is-hidden-right");
    }

    function showWaView() {
      mainView.classList.add("is-hidden-left");
      mainView.classList.remove("is-hidden-right");
      waView.classList.remove("is-hidden-right");
      waView.classList.remove("is-hidden-left");
    }

    function startPulse() {
      pulseTimer = setInterval(function () {
        toggle.classList.add("qa-pulse");
        setTimeout(function () {
          toggle.classList.remove("qa-pulse");
        }, 1500);
      }, CONFIG.pulseInterval);
    }

    toggle.addEventListener("click", togglePanel);
    closeBtn.addEventListener("click", closePanel);
    waBtn.addEventListener("click", showWaView);
    backBtn.addEventListener("click", showMainView);
    portalBtn.addEventListener("click", function () {
      closePanel();
      window.location.href = CONFIG.portalUrl;
    });

    waView.querySelectorAll("[data-wa]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-wa");
        var url = waUrl(WA_TEMPLATES[key]);
        window.open(url, "_blank", "noopener,noreferrer");
        closePanel();
      });
    });

    document.addEventListener("click", function (e) {
      if (isOpen && wrapper && !wrapper.contains(e.target)) closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) closePanel();
    });

    setTimeout(startPulse, 3000);
  }

  function init() {
    injectStyles();
    buildWidget();
    initWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
