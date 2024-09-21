document.addEventListener("DOMContentLoaded", function () {
  const authentication = document.querySelector(".authentication");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const loginShop = document.querySelector("#login-shop");
  const iconClose = document.querySelector(".authentication__icon-close");

  // Selecting forms by their class
  const loginForm = document.querySelector(
    ".authentication__form-box--login form"
  );
  const registerForm = document.querySelector(
    ".authentication__form-box--register form"
  );

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

  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      const errorMessage = input.parentElement.querySelector(
        ".authentication__error-message"
      );
      if (!input.value.trim()) {
        errorMessage.textContent = "Please fill out this field.";
        isValid = false;
      } else {
        errorMessage.textContent = "";
      }
    });
    return isValid;
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm(loginForm)) {
        console.log("Login form is valid");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm(registerForm)) {
        console.log("Registration form is valid");
      }
    });
  }
});
