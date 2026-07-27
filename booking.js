/* ====================================================
   BOOKING.JS
   WhatsApp booking settings.
   Controls the Pre-Book section and its WhatsApp message.
   ==================================================== */

const BOOKING = {
  // Digits only with country code, example: "919000000000"
  whatsappNumber: "YOUR WHATSAPP NUMBER",

  // Used when the visitor does not type a custom message
  defaultMessage: "Hello, I would like to pre-book an order.",

  // When false, the entire Pre-Book section is hidden automatically
  bookingEnabled: true,
};

/* ----------------------------------------------------
   Reservation form → WhatsApp message
   Builds the exact message format requested and opens
   WhatsApp with it pre-filled.
   ---------------------------------------------------- */
(function () {
  function getShopName() {
    if (typeof CONFIG !== "undefined" && CONFIG && CONFIG.shopName) {
      return CONFIG.shopName;
    }
    var el = document.getElementById("heroShopName");
    var text = el && el.textContent ? el.textContent.trim() : "";
    return text && text !== "YOUR SHOP NAME" ? text : "Biryani Outlet";
  }

  function formatTime(rawTime) {
    if (!rawTime) return "";
    var parts = rawTime.split(":");
    if (parts.length < 2) return rawTime;
    var hours = parseInt(parts[0], 10);
    var minutes = parts[1];
    if (isNaN(hours)) return rawTime;
    var period = hours >= 12 ? "PM" : "AM";
    var hours12 = hours % 12;
    if (hours12 === 0) hours12 = 12;
    return hours12 + ":" + minutes + " " + period;
  }

  function buildMessage(data) {
    var lines = [
      "🍽️ " + getShopName() + " Reservation",
      "👤 Name: " + data.name,
      "📞 Phone: " + data.phone,
      "🍛 Biryani Plates: " + data.plates,
      "🥟 Litti: " + data.litti,
      "🕒 Pickup Time: " + data.time,
      "📝 Special Request:",
      data.special ? data.special : "None",
      "Thank you!",
    ];
    return lines.join("\n");
  }

  function handleSubmit(e) {
    var form = document.getElementById("prebookForm");
    if (!form || e.target !== form) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    var name = (document.getElementById("pbName") || {}).value || "";
    var phone = (document.getElementById("pbPhone") || {}).value || "";
    var plates = (document.getElementById("pbPlates") || {}).value || "0";
    var litti = (document.getElementById("pbLitti") || {}).value || "0";
    var rawTime = (document.getElementById("pbTime") || {}).value || "";
    var special = (document.getElementById("pbSpecial") || {}).value || "";

    var message = buildMessage({
      name: name.trim(),
      phone: phone.trim(),
      plates: plates.trim(),
      litti: litti.trim(),
      time: formatTime(rawTime),
      special: special.trim(),
    });

    var number = BOOKING.whatsappNumber.replace(/[^0-9]/g, "");
    var url = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  }

  var prebookForm = document.getElementById("prebookForm");
  if (prebookForm) {
    prebookForm.addEventListener("submit", handleSubmit, true);
  }
})();
