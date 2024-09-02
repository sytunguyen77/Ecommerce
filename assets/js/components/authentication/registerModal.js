document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registerModal");
  const registerDropDown = document.querySelectorAll(".user-dropdown__item");
  const span = modal.querySelector(".auth-modal__close");
  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("registerName");
  const emailInput = document.getElementById("registerEmail");
  const passwordInput = document.getElementById("registerPassword");
  const confirmPasswordInput = document.getElementById(
    "registerConfirmPassword"
  );
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

  registerDropDown.forEach((link, index) => {
    if (index === 1 || link.textContent.trim().toLowerCase() === "register") {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openModal();
      });
    }
  });

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

  function validateName(input) {
    const name = input.value.trim();
    if (name === "") {
      showError(input, "Name is required");
      return false;
    } else if (name.length < 2) {
      showError(input, "Name must be at least 2 characters long");
      return false;
    } else if (/[0-9]/.test(name)) {
      showError(input, "Name cannot contain numbers");
      return false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      showError(
        input,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      );
      return false;
    } else {
      clearError(input);
      return true;
    }
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

  function validateConfirmPassword(passwordInput, confirmPasswordInput) {
    if (confirmPasswordInput.value.trim() === "") {
      showError(confirmPasswordInput, "Please confirm your password");
      return false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      showError(confirmPasswordInput, "Passwords do not match");
      return false;
    } else {
      clearError(confirmPasswordInput);
      return true;
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    isValid = validateName(nameInput) && isValid;
    isValid = validateEmail(emailInput) && isValid;
    isValid = validatePassword(passwordInput) && isValid;
    isValid =
      validateConfirmPassword(passwordInput, confirmPasswordInput) && isValid;

    if (isValid) {
      // Change button text to "Registering..."
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Registering...";
      submitButton.disabled = true;

      // Simulate an async operation (e.g., API call)
      setTimeout(() => {
        // Save user data to local storage
        const userData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value, // In a real application, never store passwords in plain text
        };

        // Get existing users or initialize an empty array
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user already exists
        const existingUser = users.find(
          (user) => user.email === userData.email
        );
        if (existingUser) {
          showError(emailInput, "An account with this email already exists.");
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          return;
        }

        // Add new user
        users.push(userData);

        // Save updated users array
        localStorage.setItem("users", JSON.stringify(users));

        console.log("Registration successful for email:", userData.email);
        closeModal();

        // Show success toast
        $.toast({
          heading: "Success",
          text: "Registration successful! You can now log in.",
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
          hideAfter: 3000,
        });

        // Clear the form
        form.reset();

        // Reset button text and enable it
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 1000); // Simulate a 1-second delay
    }
  });

  nameInput.addEventListener("input", () => validateName(nameInput));
  emailInput.addEventListener("input", () => validateEmail(emailInput));
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput)
  );
  confirmPasswordInput.addEventListener("input", () =>
    validateConfirmPassword(passwordInput, confirmPasswordInput)
  );

  // Prevent default browser validation
  form.setAttribute("novalidate", "");
});

// Add a global click event listener to check if the register link is clickable
document.addEventListener("click", function (event) {
  if (
    event.target.matches(".user-dropdown__item") &&
    event.target.textContent.trim().toLowerCase() === "register"
  ) {
    console.log("Register link clicked via global listener");
  }
});
