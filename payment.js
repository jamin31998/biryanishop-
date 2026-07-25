/* ====================================================
   PAYMENT.JS
   Payment settings.
   Kept OFF by default. This module only PREPARES the
   structure for a future payment method — it does not
   implement any payment gateway.

   When onlinePayment is switched to true in features.js,
   script.js will automatically reveal the payment section
   built from the data below. No HTML changes are required
   either way.
   ==================================================== */

const PAYMENT = {
  enabled: false, // Mirrors FEATURES.onlinePayment, kept here for module independence

  // Placeholder fields for a future payment method.
  // Fill these in only when you are ready to turn payment ON.
  method: "YOUR PAYMENT METHOD",       // Example: "UPI"
  upiId: "YOUR UPI ID",                 // Example: "yourshop@upi"
  payeeName: "YOUR SHOP NAME",
  note: "Online payment is not active yet. Please pay at the outlet or on delivery.",
};
