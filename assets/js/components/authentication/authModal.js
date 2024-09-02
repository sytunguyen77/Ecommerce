const authentication = document.querySelector(".authentication");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const loginShop = document.querySelector("#login-shop");
const iconClose = document.querySelector(".authentication__icon-close");

registerLink.addEventListener("click", () => {
  authentication.classList.add("authentication--active");
});

loginLink.addEventListener("click", () => {
  authentication.classList.remove("authentication--active");
});

loginShop.addEventListener("click", () => {
  authentication.classList.add("authentication--active-popup");
  document.body.style.overflow = "hidden";
});

iconClose.addEventListener("click", () => {
  authentication.classList.remove("authentication--active-popup");
  authentication.classList.remove("authentication--active");
  document.body.style.overflow = "";
});
