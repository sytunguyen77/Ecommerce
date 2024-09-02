document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("loginModal");
  const signInDropDown = document.querySelector(".user-dropdown__item");
  const span = modal.querySelector(".auth-modal__close");
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = form.querySelector("button[type='submit']");

  function openModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }

  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }

  signInDropDown.onclick = function (event) {
    event.preventDefault();
    openModal();
  };

  span.onclick = closeModal;

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  function showError(input, message) {
    const formGroup = input.closest(".auth-modal__form-group");
    let errorElement = formGroup.querySelector(".auth-modal__error");

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "auth-modal__error";
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.classList.add("auth-modal__input--error");
  }

  function clearError(input) {
    const formGroup = input.closest(".auth-modal__form-group");
    const errorElement = formGroup.querySelector(".auth-modal__error");

    if (errorElement) {
      errorElement.textContent = "";
    }

    input.classList.remove("auth-modal__input--error");
  }

  function validateEmail(input) {
    const email = input.value.trim();
    if (email === "") {
      showError(input, "Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showError(input, "Please enter a valid email address");
      return false;
    } else {
      clearError(input);
      return true;
    }
  }

  function validatePassword(input) {
    const password = input.value.trim();
    if (password === "") {
      showError(input, "Password is required");
      return false;
    } else if (password.length < 6) {
      showError(input, "Password must be at least 6 characters long");
      return false;
    } else {
      clearError(input);
      return true;
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    isValid = validateEmail(emailInput) && isValid;
    isValid = validatePassword(passwordInput) && isValid;

    if (isValid) {
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Signing in...";
      submitButton.disabled = true;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.email === emailInput.value.trim());

      setTimeout(() => {
        if (user && user.password === passwordInput.value) {
          console.log("Login successful for email:", emailInput.value);
          localStorage.setItem("currentUser", JSON.stringify(user));
          closeModal();

          $.toast({
            heading: "Success",
            text: "Login successful! Welcome back.",
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
            hideAfter: 3000,
          });

          updateUIForLoggedInUser(user);
          form.reset();
        } else {
          showError(emailInput, "Invalid email or password");
          showError(passwordInput, "Invalid email or password");
        }

        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 1000);
    }
  });

  emailInput.addEventListener("input", () => validateEmail(emailInput));
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput)
  );

  form.setAttribute("novalidate", "");

  function updateUIForLoggedInUser(user) {
    const userDropdown = document.querySelector(".user-dropdown");
    if (userDropdown) {
      userDropdown.innerHTML = `
        <span>Welcome, ${user.name}</span>
        <a href="#" class="user-dropdown__item" id="logoutLink">Logout</a>
      `;

      const logoutLink = document.getElementById("logoutLink");
      if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
          event.preventDefault();
          localStorage.removeItem("currentUser");

          $.toast({
            heading: "Logged Out",
            text: "You have been successfully logged out.",
            showHideTransition: "slide",
            icon: "info",
            position: "top-right",
            hideAfter: 3000,
          });

          setTimeout(() => {
            location.reload();
          }, 3000);
        });
      }
    }
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    updateUIForLoggedInUser(currentUser);
  }
});
