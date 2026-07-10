// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — QUICK ASSIST WIDGET v2.0.2
// Premium floating customer assistant
// UPDATED: Premium SVG icons replace emojis, stronger pulse
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

  // ── SVG ICONS ──
  var ICONS = {
    whatsapp:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    document:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DAA520" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    phone:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A1F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    email:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DAA520" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    users:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A1F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
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
      ".qa-toggle{display:flex;align-items:center;gap:8px;background:var(--navy,#0a1f3f);color:#fff;border:2px solid var(--gold,#daa520);border-radius:50px;padding:12px 20px;cursor:pointer;font-size:0.9rem;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:all 0.28s ease;white-space:nowrap;letter-spacing:0.3px;}",
      ".qa-toggle:hover{background:var(--navy-light,#132d56);box-shadow:0 4px 24px rgba(218,165,32,0.35);}",
      ".qa-toggle svg{transition:transform 0.28s ease;flex-shrink:0;}",
      ".qa-toggle.is-open svg{transform:rotate(45deg);}",
      ".qa-toggle-label{transition:opacity 0.2s ease;}",
      "@keyframes qa-pulse{0%{box-shadow:0 4px 20px rgba(0,0,0,0.25),0 0 0 0 rgba(218,165,32,0.7);}70%{box-shadow:0 4px 20px rgba(0,0,0,0.25),0 0 0 14px rgba(218,165,32,0);}100%{box-shadow:0 4px 20px rgba(0,0,0,0.25),0 0 0 0 rgba(218,165,32,0);}}",
      ".qa-toggle.qa-pulse{animation:qa-pulse 1.5s ease-in-out;}",
      ".qa-panel{position:absolute;bottom:calc(100% + 12px);right:0;width:300px;background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.18),0 4px 12px rgba(0,0,0,0.08);overflow:hidden;transform:translateY(12px) scale(0.97);opacity:0;pointer-events:none;transition:transform 0.28s cubic-bezier(0.4,0,0.2,1),opacity 0.28s ease;}",
      ".qa-panel.is-open{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}",
      ".qa-header{background:var(--navy,#0a1f3f);padding:16px 18px;display:flex;align-items:center;justify-content:space-between;}",
      ".qa-header-left{display:flex;align-items:center;gap:10px;}",
      ".qa-header-title{color:#fff;font-weight:700;font-size:0.95rem;letter-spacing:0.3px;}",
      ".qa-header-sub{color:rgba(255,255,255,0.6);font-size:0.72rem;margin-top:1px;}",
      ".qa-close{background:none;border:none;color:rgba(255,255,255,0.6);cursor:pointer;padding:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:color 0.2s ease;}",
      ".qa-close:hover{color:#fff;}",
      ".qa-sub-header{background:var(--navy,#0a1f3f);padding:14px 18px;display:flex;align-items:center;gap:10px;}",
      ".qa-back{background:none;border:none;color:rgba(255,255,255,0.75);cursor:pointer;padding:4px 8px 4px 0;display:flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:600;transition:color 0.2s ease;}",
      ".qa-back:hover{color:var(--gold,#daa520);}",
      ".qa-sub-title{color:#fff;font-weight:700;font-size:0.9rem;}",
      ".qa-body{padding:8px 0;}",
      ".qa-label{padding:10px 18px 4px;font-size:0.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;}",
      ".qa-item{display:flex;align-items:center;gap:14px;padding:13px 18px;cursor:pointer;transition:background 0.18s ease;border:none;background:none;width:100%;text-align:left;}",
      ".qa-item:hover{background:#f8f9fb;}",
      ".qa-item:focus-visible{outline:2px solid var(--gold,#daa520);outline-offset:-2px;}",
      ".qa-item-icon{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}",
      ".qa-item-icon.green{background:#dcfce7;}.qa-item-icon.navy{background:#e8edf5;}.qa-item-icon.gold{background:#fef9e7;}.qa-item-icon.red{background:#fef2f2;}",
      ".qa-item-text{flex:1;}",
      ".qa-item-label{font-size:0.9rem;font-weight:600;color:#1f2937;line-height:1.2;}",
      ".qa-item-desc{font-size:0.75rem;color:#6b7280;margin-top:2px;}",
      ".qa-item-arrow{color:#d1d5db;flex-shrink:0;}",
      ".qa-divider{height:1px;background:#f3f4f6;margin:4px 0;}",
      ".qa-views{position:relative;overflow:hidden;}",
      ".qa-view{transition:transform 0.28s cubic-bezier(0.4,0,0.2,1),opacity 0.28s ease;}",
      ".qa-view.is-hidden-left{position:absolute;top:0;left:0;right:0;transform:translateX(-100%);opacity:0;pointer-events:none;}",
      ".qa-view.is-hidden-right{position:absolute;top:0;left:0;right:0;transform:translateX(100%);opacity:0;pointer-events:none;}",
      ".qa-footer{padding:10px 18px;text-align:center;border-top:1px solid #f3f4f6;}",
      ".qa-footer p{font-size:0.68rem;color:#9ca3af;}",
      ".qa-footer strong{color:var(--gold-dark,#b8860b);}",
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
            icon: ICONS.document,
            label: "Submit Documents",
            desc: "Begin clearance process",
            color: "gold",
          },
          {
            key: "team",
            icon: ICONS.users,
            label: "Talk to Our Team",
            desc: "Discuss your cargo",
            color: "navy",
          },
          {
            key: "enquiry",
            icon: ICONS.chat,
            label: "General Enquiry",
            desc: "Learn about our services",
            color: "green",
          },
        ]
      : [
          {
            key: "enquiry",
            icon: ICONS.chat,
            label: "General Enquiry",
            desc: "Learn about our services",
            color: "green",
          },
          {
            key: "team",
            icon: ICONS.users,
            label: "Talk to Our Team",
            desc: "Discuss your cargo",
            color: "navy",
          },
          {
            key: "documents",
            icon: ICONS.document,
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
      ICONS.chat +
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
      '<span class="qa-item-icon green">' +
      ICONS.whatsapp +
      "</span>" +
      '<span class="qa-item-text"><span class="qa-item-label">WhatsApp Us</span><span class="qa-item-desc">Chat with our team</span></span>' +
      '<svg class="qa-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>" +
      '<button class="qa-item" id="qaPortalBtn" aria-label="Clear My Cargo">' +
      '<span class="qa-item-icon gold">' +
      ICONS.document +
      "</span>" +
      '<span class="qa-item-text"><span class="qa-item-label">Clear My Cargo</span><span class="qa-item-desc">Submit documents online</span></span>' +
      '<svg class="qa-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>" +
      '<div class="qa-divider"></div>' +
      '<p class="qa-label">Direct Contact</p>' +
      '<a class="qa-item" href="tel:' +
      CONFIG.phone +
      '" aria-label="Call Office">' +
      '<span class="qa-item-icon navy">' +
      ICONS.phone +
      "</span>" +
      '<span class="qa-item-text"><span class="qa-item-label">Call Office</span><span class="qa-item-desc">' +
      CONFIG.phone +
      "</span></span>" +
      "</a>" +
      '<a class="qa-item" href="mailto:' +
      CONFIG.email +
      '" aria-label="Email Support">' +
      '<span class="qa-item-icon gold">' +
      ICONS.email +
      "</span>" +
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
