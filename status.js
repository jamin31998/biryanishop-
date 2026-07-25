/* ====================================================
   STATUS.JS
   Available / Sold Out status settings.
   The Hero Glass Status Card reads its data from here.

   GOOGLE SHEETS READY (FUTURE):
   When a Google Sheet is connected later, "current" and
   "lastUpdated" below are the only values that will need
   to update automatically. Keep the field names the same
   so script.js keeps working without any HTML changes.
   ==================================================== */

const STATUS = {
  // accepts: "available" | "soldout"
  current: "available",

  // Shown under the status label, format is fully editable
  lastUpdated: "Updated today",

  // Reserved for the future Google Sheet connection.
  // Not used yet — safe to leave as is.
  googleSheetPlaceholder: {
    sheetId: "",
    range: "",
    connected: false,
  },
};
