/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
   navToggle = document.getElementById("nav-toggle"),
   navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
   navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
   });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
   navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
   });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
   const navMenu = document.getElementById("nav-menu");
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
   const header = document.getElementById("header");
   // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
   this.scrollY >= 50 ? header.classList.add("scroll-header") : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
   spaceBetween: 30,
   loop: "true",

   autoplay: {
      delay: 6000, // time between each slide transition in milliseconds
      disableOnInteraction: false, // allows autoplay to continue even when the user interacts with the swiper
   },

   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

/*=============== NEW SWIPER ===============*/
function initializeSwiper() {
   let newSwiper = new Swiper(".new-swiper", {
      spaceBetween: 24,
      loop: true,
      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
      },

      navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },

      breakpoints: {
         576: {
            slidesPerView: 2,
         },
         768: {
            slidesPerView: 3,
         },
         1024: {
            slidesPerView: 4,
         },
      },
   });
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
   const scrollY = window.pageYOffset;

   sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
         sectionTop = current.offsetTop - 58,
         sectionId = current.getAttribute("id"),
         sectionsClass = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         sectionsClass.classList.add("active-link");
      } else {
         sectionsClass.classList.remove("active-link");
      }
   });
};
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById("scroll-up");
   // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
   this.scrollY >= 350 ? scrollUp.classList.add("show-scroll") : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SHOW SEARCH INPUT ===============*/
let navbar = document.querySelector(".nav");
let searchBox = document.querySelector(".search-box .bx-search");

searchBox.addEventListener("click", () => {
   navbar.classList.toggle("showInput");
   if (navbar.classList.contains("showInput")) {
      searchBox.classList.replace("bx-search", "bx-x");
   } else {
      searchBox.classList.replace("bx-x", "bx-search");
   }
});

/*===== POPUP SHOW AUTIMATICALLY AFTER 2 SECONDS =======*/
const popupElement = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const dealButton = document.querySelector(".deal");

function showPopup() {
   popupElement.style.display = "block";
   setTimeout(() => {
      popupElement.style.transform = "translate(-50%, -50%) scale(1)";
   }, 50);
   document.body.insertAdjacentHTML("afterbegin", `<div class="overlay"></div>`);
}

function hidePopup() {
   popupElement.style.transform = "translate(-50%, -50%) scale(0)";
   setTimeout(() => {
      popupElement.style.display = "none";
      document.querySelector(".overlay").remove();
   }, 500);
}

window.onload = () => {
   setTimeout(showPopup, 2000);
};

closeButton.addEventListener("click", hidePopup);
dealButton.addEventListener("click", hidePopup);

/*=============== LOGIN SHOW ===============*/
const loginShop = document.getElementById("login-shop");
loginShop.addEventListener("click", () => {
   window.location.href = "../login.html";
});

/*=============== WISHLIST SHOW ===============*/
const wishlist1 = document.getElementById("wishlist"),
   wishlistShop = document.getElementById("wishlist-shop"),
   wishlistClose = document.getElementById("wishlist-close");

/* Validate if constant exists */
if (wishlistShop) {
   wishlistShop.addEventListener("click", () => {
      wishlist1.classList.add("show-wishlist");
   });
}

/*===== WISHLIST HIDDEN =====*/
/* Validate if constant exists */
if (wishlistClose) {
   wishlistClose.addEventListener("click", () => {
      wishlist1.classList.remove("show-wishlist");
   });
}

/*=============== CART SHOW ===============*/
const cart1 = document.getElementById("cart"),
   cartShop = document.getElementById("cart-shop"),
   cartClose = document.getElementById("cart-close");

/* Validate if constant exists */
if (cartShop) {
   cartShop.addEventListener("click", () => {
      cart1.classList.add("show-cart");
   });
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if (cartClose) {
   cartClose.addEventListener("click", () => {
      cart1.classList.remove("show-cart");
   });
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun");

// We validate if the user previously chose a topic
if (selectedTheme) {
   // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
   document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
   themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](iconTheme);
} else {
   // Set the dark theme as the default theme
   document.body.classList.add(darkTheme);
   themeButton.classList.add(iconTheme);
   localStorage.setItem("selected-theme", getCurrentTheme());
   localStorage.setItem("selected-icon", getCurrentIcon());
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
   // Add or remove the dark / icon theme
   document.body.classList.toggle(darkTheme);
   themeButton.classList.toggle(iconTheme);
   // We save the theme and the current icon that the user chose
   localStorage.setItem("selected-theme", getCurrentTheme());
   localStorage.setItem("selected-icon", getCurrentIcon());
});
