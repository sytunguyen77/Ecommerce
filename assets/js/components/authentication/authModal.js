const authentication = document.querySelector(".authentication");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const forgotPasswordLink = document.querySelector(
  ".authentication__forgot-link"
);
const loginShop = document.querySelector("#login-shop");
const iconClose = document.querySelector(".authentication__icon-close");

registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  authentication.classList.add("authentication--active");
  authentication.classList.remove("authentication--forgot-password");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  authentication.classList.remove("authentication--active");
  authentication.classList.remove("authentication--forgot-password");
});

forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  authentication.classList.add("authentication--forgot-password");
  authentication.classList.remove("authentication--active");
});

loginShop.addEventListener("click", () => {
  authentication.classList.add("authentication--active-popup");
  authentication.classList.remove("authentication--active");
  authentication.classList.remove("authentication--forgot-password");
  document.body.style.overflow = "hidden";
});

iconClose.addEventListener("click", () => {
  authentication.classList.remove("authentication--active-popup");
  authentication.classList.remove("authentication--active");
  authentication.classList.remove("authentication--forgot-password");
  document.body.style.overflow = "";
});

// Add event listener to handle back to login from forgot password
const backToLoginLink = document.querySelector(
  ".authentication__form-box--forgot-password .login-link"
);
if (backToLoginLink) {
  backToLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    authentication.classList.remove("authentication--forgot-password");
  });
}
