/* ====================================================
   SCRIPT.JS
   Main website logic.
   Reads data from config.js, business.js, features.js,
   menu.js, booking.js, payment.js and status.js, then
   renders it into the HTML. No business data lives here.
   ==================================================== */

document.addEventListener("DOMContentLoaded", () => {
  applySiteMeta();
  applyFeatureToggles();
  renderHeader();
  renderHero();
  renderMenu();
  renderVisit();
  renderPayment();
  renderFooter();
  wireFloatingButtons();
  wireMobileNav();
  wirePreBookForm();
  wireSmoothScroll();
});

/* ---------------------------------------------------- */
/* SITE META                                             */
/* ---------------------------------------------------- */
function applySiteMeta() {
  document.title = CONFIG.siteTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", CONFIG.siteDescription);
}

/* ---------------------------------------------------- */
/* FEATURE TOGGLES                                        */
/* Any element with data-feature="key" is shown or        */
/* hidden based on FEATURES[key].                         */
/* ---------------------------------------------------- */
function applyFeatureToggles() {
  document.querySelectorAll("[data-feature]").forEach((el) => {
    const key = el.getAttribute("data-feature");
    const enabled = FEATURES[key];
    if (!enabled) el.classList.add("is-hidden");
  });

  // Pre-Book section also depends on booking.js being enabled
  if (!BOOKING.bookingEnabled) {
    const prebook = document.getElementById("prebook");
    if (prebook) prebook.classList.add("is-hidden");
  }
}

/* ---------------------------------------------------- */
/* HEADER                                                 */
/* ---------------------------------------------------- */
function renderHeader() {
  const brandName = document.getElementById("brand-name");
  if (brandName) brandName.textContent = BUSINESS.shopName;

  const logoEls = document.querySelectorAll('img[src="images/logo.png"]');
  logoEls.forEach((img) => (img.src = BUSINESS.images.logo));
}

/* ---------------------------------------------------- */
/* HERO                                                   */
/* ---------------------------------------------------- */
function renderHero() {
  const heroImage = document.getElementById("heroImage");
  if (heroImage) heroImage.src = BUSINESS.images.hero;

  const heroShopName = document.getElementById("heroShopName");
  if (heroShopName) heroShopName.textContent = BUSINESS.shopName;

  const heroTagline = document.getElementById("heroTagline");
  if (heroTagline) heroTagline.textContent = BUSINESS.tagline;

  const whatsappLink = buildWhatsAppLink(BOOKING.whatsappNumber, BOOKING.defaultMessage);
  const heroWhatsapp = document.getElementById("heroWhatsapp");
  if (heroWhatsapp) heroWhatsapp.href = whatsappLink;

  const floatWhatsapp = document.getElementById("floatWhatsapp");
  if (floatWhatsapp) floatWhatsapp.href = whatsappLink;

  const telLink = buildTelLink(BUSINESS.phone);
  const heroCall = document.getElementById("heroCall");
  if (heroCall) heroCall.href = telLink;

  const floatCall = document.getElementById("floatCall");
  if (floatCall) floatCall.href = telLink;

  renderStatusCard();
}

function renderStatusCard() {
  const card = document.getElementById("statusCard");
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  const updated = document.getElementById("statusUpdated");
  if (!card || !text) return;

  const isAvailable = STATUS.current === "available";

  text.textContent = isAvailable ? "Available Today" : "Sold Out Today";
  updated.textContent = STATUS.lastUpdated;
  card.classList.toggle("is-soldout", !isAvailable);
}

/* ---------------------------------------------------- */
/* MENU                                                   */
/* ---------------------------------------------------- */
function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  grid.innerHTML = MENU_ITEMS.map((item) => {
    const isAvailable = item.availability === "available";
    const badgeClass = isAvailable ? "available" : "soldout";
    const badgeText = isAvailable ? "Available" : "Sold Out";
    const priceText = item.price > 0 ? `${CONFIG.currencySymbol}${item.price}` : "Price on request";

    return `
      <article class="menu-card">
        <div class="menu-card-media">
          <span class="menu-card-badge ${badgeClass}">${badgeText}</span>
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="menu-card-seal seal-edge"></div>
        <div class="menu-card-body">
          <div class="menu-card-top">
            <h3 class="menu-card-name">${item.name}</h3>
            <span class="menu-card-price">${priceText}</span>
          </div>
          <p class="menu-card-desc">${item.description}</p>
        </div>
      </article>
    `;
  }).join("");
}

/* ---------------------------------------------------- */
/* VISIT                                                  */
/* ---------------------------------------------------- */
function renderVisit() {
  const buildingImage = document.getElementById("buildingImage");
  if (buildingImage) buildingImage.src = BUSINESS.images.building;

  const visitShopName = document.getElementById("visitShopName");
  if (visitShopName) visitShopName.textContent = BUSINESS.shopName;

  const visitAddress = document.getElementById("visitAddress");
  if (visitAddress) visitAddress.textContent = BUSINESS.address;

  const hoursWrap = document.getElementById("visitHours");
  if (hoursWrap) {
    hoursWrap.innerHTML = BUSINESS.openingHours
      .map((row) => `<div class="hours-row"><span>${row.day}</span><span>${row.time}</span></div>`)
      .join("");
  }

  const mapButton = document.getElementById("mapButton");
  if (mapButton) mapButton.href = BUSINESS.googleMapLink;
}

/* ---------------------------------------------------- */
/* PAYMENT                                                */
/* Hidden automatically unless FEATURES.onlinePayment AND */
/* PAYMENT.enabled are both true.                         */
/* ---------------------------------------------------- */
function renderPayment() {
  const section = document.getElementById("paymentSection");
  if (!section) return;

  const shouldShow = FEATURES.onlinePayment && PAYMENT.enabled;
  section.classList.toggle("is-hidden", !shouldShow);

  if (shouldShow) {
    const title = document.getElementById("paymentTitle");
    const detail = document.getElementById("paymentDetail");
    if (title) title.textContent = `Pay via ${PAYMENT.method}`;
    if (detail) detail.textContent = `${PAYMENT.payeeName} — ${PAYMENT.upiId}`;
  }
}

/* ---------------------------------------------------- */
/* FOOTER                                                 */
/* ---------------------------------------------------- */
function renderFooter() {
  const footerShopName = document.getElementById("footerShopName");
  if (footerShopName) footerShopName.textContent = BUSINESS.shopName;

  const footerPhone = document.getElementById("footerPhone");
  if (footerPhone) footerPhone.textContent = BUSINESS.phone;

  const footerWhatsapp = document.getElementById("footerWhatsapp");
  if (footerWhatsapp) footerWhatsapp.textContent = BUSINESS.whatsapp;

  const footerAddress = document.getElementById("footerAddress");
  if (footerAddress) footerAddress.textContent = BUSINESS.address;

  const footerMapButton = document.getElementById("footerMapButton");
  if (footerMapButton) footerMapButton.href = BUSINESS.googleMapLink;

  const copyrightText = document.getElementById("copyrightText");
  if (copyrightText) {
    const year = new Date().getFullYear();
    copyrightText.textContent = `© ${year} ${CONFIG.copyrightName}. All rights reserved.`;
  }
}

/* ---------------------------------------------------- */
/* FLOATING BUTTONS                                       */
/* Hidden entirely if FEATURES.floatingButtons is false,   */
/* handled already by applyFeatureToggles(). Individual     */
/* buttons inside also respect their own feature flag.     */
/* ---------------------------------------------------- */
function wireFloatingButtons() {
  // Links are already set in renderHero(); nothing further needed here.
}

/* ---------------------------------------------------- */
/* MOBILE NAV                                             */
/* ---------------------------------------------------- */
function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMobile");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* ---------------------------------------------------- */
/* PRE-BOOK FORM                                          */
/* ---------------------------------------------------- */
function wirePreBookForm() {
  const form = document.getElementById("prebookForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    const lines = [
      BOOKING.defaultMessage,
      name ? `Name: ${name}` : null,
      phone ? `Phone: ${phone}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    const link = buildWhatsAppLink(BOOKING.whatsappNumber, lines.join("\n"));
    window.open(link, "_blank", "noopener");
  });
}

/* ---------------------------------------------------- */
/* SMOOTH SCROLL (accounts for sticky header height)      */
/* ---------------------------------------------------- */
function wireSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.scrollOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ---------------------------------------------------- */
/* HELPERS                                                */
/* ---------------------------------------------------- */
function buildWhatsAppLink(number, message) {
  const digits = String(number).replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message || "");
  return `https://wa.me/${digits}?text=${encoded}`;
}

function buildTelLink(phone) {
  const digits = String(phone).replace(/[^0-9+]/g, "");
  return `tel:${digits}`;
}
