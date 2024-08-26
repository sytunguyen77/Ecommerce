document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("loginModal");
  const signInLink = document.querySelector(".user-dropdown__item");
  const span = document.getElementsByClassName("login-modal__close")[0];
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

  signInLink.onclick = function (event) {
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
    const formGroup = input.closest(".login-modal__form-group");
    let errorElement = formGroup.querySelector(".login-modal__error");

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "login-modal__error";
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.classList.add("login-modal__input--error");
  }

  function clearError(input) {
    const formGroup = input.closest(".login-modal__form-group");
    const errorElement = formGroup.querySelector(".login-modal__error");

    if (errorElement) {
      errorElement.textContent = "";
    }

    input.classList.remove("login-modal__input--error");
  }

  function validateEmail(input) {
    const email = input.value.trim();
    if (email === "") {
      showError(input, "Email is required");
      return false;
    } else if (!email.includes("@")) {
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
      // Change button text to "Signing in..."
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Signing in...";
      submitButton.disabled = true;

      // Get users from local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user exists and password matches
      const user = users.find((u) => u.email === emailInput.value.trim());

      // Simulate an async operation (e.g., API call)
      setTimeout(() => {
        if (user && user.password === passwordInput.value) {
          console.log("Login successful for email:", emailInput.value);

          // Set the current user in local storage
          localStorage.setItem("currentUser", JSON.stringify(user));

          closeModal();

          // Show success toast
          $.toast({
            heading: "Success",
            text: "Login successful! Welcome back.",
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
            hideAfter: 3000,
          });

          // Update UI to show logged-in state
          updateUIForLoggedInUser(user);

          // Clear the form
          form.reset();
        } else {
          showError(emailInput, "Invalid email or password");
          showError(passwordInput, "Invalid email or password");
        }

        // Reset button text and enable it
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 1000); // Simulate a 1-second delay
    }
  });

  emailInput.addEventListener("input", () => validateEmail(emailInput));
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput)
  );

  // Prevent default browser validation
  form.setAttribute("novalidate", "");

  // Function to update UI for logged-in user
  function updateUIForLoggedInUser(user) {
    const userDropdown = document.querySelector(".user-dropdown");
    if (userDropdown) {
      userDropdown.innerHTML = `
        <span>Welcome, ${user.name}</span>
        <a href="#" class="user-dropdown__item" id="logoutLink">Logout</a>
      `;

      // Add logout functionality
      const logoutLink = document.getElementById("logoutLink");
      if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
          event.preventDefault();
          localStorage.removeItem("currentUser");

          // Show logout toast
          $.toast({
            heading: "Logged Out",
            text: "You have been successfully logged out.",
            showHideTransition: "slide",
            icon: "info",
            position: "top-right",
            hideAfter: 3000,
          });

          // Delay the page reload
          setTimeout(() => {
            location.reload();
          }, 3000); // Wait for 3 seconds before reloading
        });
      }
    }
  }

  // Check if user is already logged in on page load
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    updateUIForLoggedInUser(currentUser);
  }
});
