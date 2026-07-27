/* ====================================================
   MENU.JS
   Menu items only.
   Add, remove or edit items here — never inside HTML.

   availability accepts: "available" | "soldout"

   GOOGLE SHEETS READY (FUTURE):
   When a Google Sheet is connected later, the "price"
   and "availability" fields for each item below are the
   only values that will need to update automatically.
   The structure of this array should stay the same so
   script.js keeps working without any HTML changes.
   ==================================================== */

const MENU_ITEMS = [
  {
    id: "beef-biryani",
    name: "Beef Biryani",
    image: "images/beef-biryani.jpg",
    price: 110, // Replace 0 with your real price, example: 220
    description: "Slow dum-cooked basmati rice layered with tender beef and warm spices.",
    availability: "available",
  },
  {
    id: "litti",
    name: "Litti",
    image: "images/litti.jpg",
    price: 10, // Replace 0 with your real price, example: 60
    description: "Roasted wheat dumplings stuffed with sattu, served with ghee and chokha.",
    availability: "available",
  },
];
