// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — COMMUNICATION CONFIG v1.0.2
// Single source of truth for all customer-facing communication.
// ================================================================

const QF_CONFIG = {
  version: "1.0.2",

  // API Configuration - THIS IS THE KEY ADDITION
  apiUrl:
    "https://script.google.com/macros/s/AKfycby7BzbstgloRMWh8TeBw64bxFk_v0pbB_w0sarT3IoT-FPWv42QHyaDePxZZdvsvk7R/exec",
  timeout: 30000,
  debug: true,

  // Company Details
  company: {
    name: "Quick Freights Global Limited",
    shortName: "Quick Freights",
    website: "https://quickfreightsglobal.com",
    timezone: "Africa/Lagos",
    country: "Nigeria",
  },

  // Contact Details
  phone: "+2348037883339",
  whatsapp: "2348037883339",
  email: "reception.quickfreightglobal@gmail.com",

  social: {
    facebook: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  },

  // Email Subjects
  subjects: {
    submission: "Bill of Lading Submission",
    tracking: "Shipment Tracking Support",
    quotation: "Freight Quotation Request",
    enquiry: "General Enquiry",
    complaint: "Customer Complaint",
    feedback: "Customer Feedback",
    partnership: "Business Partnership",
    account: "Corporate Account Registration",
  },

  // File Upload Configuration
  maxFileSize: 10 * 1024 * 1024, // 10 MB
  allowedMimeTypes: ["application/pdf", "image/jpeg", "image/png"],

  // Message Templates
  templates: {
    whatsappSubmission() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to submit my cargo documents for clearance processing.\n\n" +
        "Please find my documents attached."
      );
    },

    blUpload() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "Please find my Bill of Lading attached.\n\n" +
        "Kindly process my clearance and send me my Tracking ID."
      );
    },

    whatsappGeneral() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to learn about your clearing and forwarding services."
      );
    },

    whatsappTeam() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to speak with your team about my cargo."
      );
    },

    whatsappTracking() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to request an update on my shipment.\n\n" +
        "*Tracking ID:*\n\n" +
        "Thank you."
      );
    },

    whatsappQuote() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to request a freight quotation.\n\n" +
        "*Cargo Type:*\n" +
        "*Origin:*\n" +
        "*Destination:*\n\n" +
        "Thank you."
      );
    },

    whatsappCustoms() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to enquire about customs clearance for my shipment.\n\n" +
        "Please advise me on the required documents and procedures.\n\n" +
        "Thank you."
      );
    },

    whatsappWarehousing() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like information about your warehousing and distribution services.\n\n" +
        "Thank you."
      );
    },

    whatsappPartnership() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to discuss a business partnership.\n\n" +
        "Please contact me at your earliest convenience.\n\n" +
        "Thank you."
      );
    },

    whatsappAccount() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to open a corporate account for our company.\n\n" +
        "Please advise me on the registration requirements.\n\n" +
        "Thank you."
      );
    },

    whatsappComplaint() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to report an issue regarding my shipment.\n\n" +
        "*Tracking ID:*\n\n" +
        "Details:\n\n" +
        "Thank you."
      );
    },

    whatsappFeedback() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to share my feedback regarding your services.\n\n" +
        "Thank you."
      );
    },

    responseReceived(trackingId) {
      return (
        "Hello,\n\n" +
        "Your shipping documents have been received successfully.\n\n" +
        "Your Tracking ID is: " +
        trackingId +
        "\n\n" +
        "Our operations team has started processing your submission.\n\n" +
        "Thank you for choosing Quick Freights Global Limited."
      );
    },

    responseIncomplete(trackingId) {
      return (
        "Hello,\n\n" +
        "We have received your submission.\n" +
        "However, one or more required documents are missing.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "Please send the outstanding documents so processing can continue.\n\n" +
        "Thank you."
      );
    },

    responseAdditionalInfo(trackingId) {
      return (
        "Hello,\n\n" +
        "We require additional information to continue processing your shipment.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "Kindly reply to this message or contact our office.\n\n" +
        "Thank you."
      );
    },

    opsClearanceStarted(trackingId) {
      return (
        "Hello,\n\n" +
        "Your shipment has entered Customs Clearance.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "We will notify you once clearance is completed."
      );
    },

    opsCleared(trackingId) {
      return (
        "Hello,\n\n" +
        "Good news.\n\n" +
        "Your shipment has successfully cleared customs.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "Our logistics team is preparing the next stage of delivery."
      );
    },

    opsReadyForCollection(trackingId) {
      return (
        "Hello,\n\n" +
        "Your shipment is now ready for collection.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "Please contact our office before arrival."
      );
    },

    opsDeliveryScheduled(trackingId) {
      return (
        "Hello,\n\n" +
        "Your shipment has been scheduled for delivery.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "Our team will contact you before dispatch."
      );
    },

    opsDeliveryCompleted(trackingId) {
      return (
        "Hello,\n\n" +
        "Your shipment has been successfully delivered.\n\n" +
        "Tracking ID: " +
        trackingId +
        "\n\n" +
        "Thank you for choosing Quick Freights Global Limited.\n" +
        "We look forward to serving you again."
      );
    },

    smsReceived(trackingId) {
      return (
        "Quick Freights: Documents received. Tracking ID: " +
        trackingId +
        ". Processing started."
      );
    },

    smsCleared(trackingId) {
      return "Quick Freights: Shipment " + trackingId + " has cleared customs.";
    },

    smsReadyForCollection(trackingId) {
      return (
        "Quick Freights: Shipment " +
        trackingId +
        " ready for collection. Contact office before arrival."
      );
    },

    smsDeliveryCompleted(trackingId) {
      return (
        "Quick Freights: Delivery completed for " +
        trackingId +
        ". Thank you for choosing us."
      );
    },
  },

  // Helper Methods
  getWhatsAppUrl(message) {
    return (
      "https://wa.me/" + this.whatsapp + "?text=" + encodeURIComponent(message)
    );
  },

  getEmailUrl(subject) {
    return "mailto:" + this.email + "?subject=" + encodeURIComponent(subject);
  },

  getMailTo(subject, body) {
    return (
      "mailto:" +
      this.email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  },

  getTelUrl() {
    return "tel:" + this.phone;
  },
};

// Freeze — no accidental modifications
Object.freeze(QF_CONFIG);
Object.freeze(QF_CONFIG.company);
Object.freeze(QF_CONFIG.social);
Object.freeze(QF_CONFIG.subjects);
Object.freeze(QF_CONFIG.templates);
