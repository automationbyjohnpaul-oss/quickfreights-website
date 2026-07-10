// ================================================================
// QUICK FREIGHTS GLOBAL LIMITED — COMMUNICATION CONFIG v1.0.1
// Single source of truth for all customer-facing communication.
// Do NOT duplicate contact details or message templates elsewhere.
// FIXED: Attached to window object for global access
// ================================================================

window.QF_COMMUNICATION = {
  version: "1.0.1",

  company: {
    name: "Quick Freights Global Limited",
    shortName: "Quick Freights",
    website: "https://quickfreightsglobal.com",
    timezone: "Africa/Lagos",
    country: "Nigeria",
  },

  // ------------------------------------------------------
  // CONTACT DETAILS
  // ------------------------------------------------------
  phone: "+2348037883339",
  whatsapp: "2348037883339",
  email: "reception.quickfreightglobal@gmail.com",

  social: {
    facebook: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  },

  // ------------------------------------------------------
  // EMAIL SUBJECTS
  // ------------------------------------------------------
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

  // ------------------------------------------------------
  // MESSAGE TEMPLATES
  // ------------------------------------------------------
  templates: {
    // ====================================================
    // CUSTOMER INITIATED (Customer → Quick Freights)
    // ====================================================

    /** WhatsApp — Document Submission (Simplified) */
    whatsappSubmission() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to submit my cargo documents for clearance processing.\n\n" +
        "Please find my documents attached."
      );
    },

    /** General Enquiry (Simplified) */
    whatsappGeneral() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to learn about your clearing and forwarding services."
      );
    },

    /** WhatsApp — Talk to Our Team (NEW) */
    whatsappTeam() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to speak with your team about my cargo."
      );
    },

    /** Shipment Tracking Support (Simplified) */
    whatsappTracking() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to request an update on my shipment.\n\n" +
        "*Tracking ID:*\n\n" +
        "Thank you."
      );
    },

    /** Freight Quote Request (Simplified) */
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

    /** Customs Clearance Enquiry (Simplified) */
    whatsappCustoms() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to enquire about customs clearance for my shipment.\n\n" +
        "Please advise me on the required documents and procedures.\n\n" +
        "Thank you."
      );
    },

    /** Warehousing Enquiry (Simplified) */
    whatsappWarehousing() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like information about your warehousing and distribution services.\n\n" +
        "Thank you."
      );
    },

    /** Business Partnership (Simplified) */
    whatsappPartnership() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to discuss a business partnership.\n\n" +
        "Please contact me at your earliest convenience.\n\n" +
        "Thank you."
      );
    },

    /** Corporate Account Opening (Simplified) */
    whatsappAccount() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to open a corporate account for our company.\n\n" +
        "Please advise me on the registration requirements.\n\n" +
        "Thank you."
      );
    },

    /** Complaint (Simplified) */
    whatsappComplaint() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to report an issue regarding my shipment.\n\n" +
        "*Tracking ID:*\n\n" +
        "Details:\n\n" +
        "Thank you."
      );
    },

    /** Compliment / Feedback (Simplified) */
    whatsappFeedback() {
      return (
        "Hello Quick Freights Global Limited,\n\n" +
        "I would like to share my feedback regarding your services.\n\n" +
        "Thank you."
      );
    },

    // ====================================================
    // COMPANY RESPONSE (Quick Freights → Customer)
    // ====================================================

    /** Submission Received */
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

    /** Documents Incomplete */
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

    /** Additional Information Required */
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

    // ====================================================
    // OPERATIONAL (Tracking & Shipment Updates)
    // ====================================================

    /** Customs Clearance Started */
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

    /** Shipment Cleared */
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

    /** Ready for Collection */
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

    /** Delivery Scheduled */
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

    /** Delivery Completed */
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

    // ====================================================
    // SMS TEMPLATES (Future Automation)
    // ====================================================

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

  // ------------------------------------------------------
  // HELPER METHODS
  // ------------------------------------------------------

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
Object.freeze(window.QF_COMMUNICATION);
Object.freeze(window.QF_COMMUNICATION.company);
Object.freeze(window.QF_COMMUNICATION.social);
Object.freeze(window.QF_COMMUNICATION.subjects);
Object.freeze(window.QF_COMMUNICATION.templates);
