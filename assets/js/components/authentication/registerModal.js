document.addEventListener("DOMContentLoaded", function () {
  const authentication = document.querySelector(".authentication");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const loginShop = document.querySelector("#login-shop");
  const iconClose = document.querySelector(".authentication__icon-close");
  const registerForm = document.querySelector(
    ".authentication__form-box--register form"
  );
  const loginForm = document.querySelector(
    ".authentication__form-box--login form"
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
    clearAllErrors();
  });

  function validateForm(e) {
    e.preventDefault();
    let isValid = true;

    this.querySelectorAll(".authentication__input").forEach((input) => {
      if (input.value.trim() === "") {
        let errorMessage = getErrorMessage(input);
        showError(input, errorMessage);
        isValid = false;
      } else {
        clearError(input);
      }
    });

    if (isValid) {
      console.log("Form is valid, proceed with submission");
      // Add your form submission logic here
    }
  }

  function getErrorMessage(input) {
    const inputBox = input.closest(".authentication__input-box");
    const label = inputBox.querySelector(".authentication__input-label");
    let fieldName = label
      ? label.textContent.trim()
      : input.placeholder || "Field";

    fieldName = fieldName.replace(/:$/, "");

    return `${fieldName} is required`;
  }

  function showError(input, message) {
    const inputBox = input.closest(".authentication__input-box");
    inputBox.classList.add("error");
    let error = inputBox.querySelector(".error-message");

    if (!error) {
      error = document.createElement("div");
      error.className = "error-message";
      inputBox.appendChild(error);
    }

    error.textContent = message;
    // Force a reflow to ensure the transition works
    error.offsetHeight;
    error.style.opacity = "1";
    error.style.maxHeight = "50px";
  }

  function clearError(input) {
    const inputBox = input.closest(".authentication__input-box");
    inputBox.classList.remove("error");
    const error = inputBox.querySelector(".error-message");
    if (error) {
      error.style.opacity = "0";
      error.style.maxHeight = "0";
      setTimeout(() => error.remove(), 300); // Remove after transition
    }
  }

  function clearAllErrors() {
    document
      .querySelectorAll(".authentication__input-box")
      .forEach((inputBox) => {
        inputBox.classList.remove("error");
        const error = inputBox.querySelector(".error-message");
        if (error) {
          error.remove();
        }
      });
  }

  registerForm.addEventListener("submit", validateForm);
  loginForm.addEventListener("submit", validateForm);

  document.querySelectorAll(".authentication__input").forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });
});
