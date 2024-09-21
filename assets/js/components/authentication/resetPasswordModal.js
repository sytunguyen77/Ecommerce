// Get the reset password form and submit button
const resetPasswordForm = document.querySelector(
  ".authentication__form-box--forgot-password form"
);
const resetPasswordSubmitBtn = resetPasswordForm.querySelector(
  ".authentication__submit-btn"
);

// Function to validate the reset password form
function validateResetPasswordForm(event) {
  event.preventDefault();
  let isValid = true;

  // Get all input fields
  const inputFields = resetPasswordForm.querySelectorAll(
    ".authentication__input"
  );

  inputFields.forEach((field) => {
    const inputBox = field.closest(".authentication__input-box");
    let errorMessage = inputBox.querySelector(".error-message");

    // Check if the field is empty
    if (field.value.trim() === "") {
      isValid = false;
      inputBox.classList.add("error");

      // Create specific error messages based on the field name
      let errorText;
      switch (field.name) {
        case "email":
          errorText = "Email address is required";
          break;
        case "newPassword":
          errorText = "New password is required";
          break;
        case "confirmNewPassword":
          errorText = "Password confirmation is required";
          break;
        default:
          errorText = "This field is required";
      }

      if (!errorMessage) {
        errorMessage = document.createElement("span");
        errorMessage.className = "error-message";
        inputBox.appendChild(errorMessage);
      }
      errorMessage.textContent = errorText;
      errorMessage.style.display = "block";
    } else {
      inputBox.classList.remove("error");
      if (errorMessage) {
        errorMessage.style.display = "none";
      }
    }
  });

  // Validate email format
  const emailField = resetPasswordForm.querySelector('input[name="email"]');
  if (emailField.value.trim() !== "" && !validateEmail(emailField.value)) {
    isValid = false;
    showError(emailField, "Please enter a valid email address");
  }

  // Validate password strength
  const newPasswordField = resetPasswordForm.querySelector(
    'input[name="newPassword"]'
  );
  if (
    newPasswordField.value.trim() !== "" &&
    !validatePasswordStrength(newPasswordField.value)
  ) {
    isValid = false;
    showError(newPasswordField, "Password doesn't meet requirements.");
  }

  // Check if passwords match
  const confirmNewPasswordField = resetPasswordForm.querySelector(
    'input[name="confirmNewPassword"]'
  );
  if (newPasswordField.value !== confirmNewPasswordField.value) {
    isValid = false;
    showError(confirmNewPasswordField, "Passwords do not match");
  }

  // If the form is valid, attempt to reset the password
  if (isValid) {
    resetPassword();
  }
}

// Function to reset the password
function resetPassword() {
  const emailInput = resetPasswordForm.querySelector('input[name="email"]');
  const newPasswordInput = resetPasswordForm.querySelector(
    'input[name="newPassword"]'
  );
  const submitBtn = resetPasswordForm.querySelector(
    ".authentication__submit-btn"
  );
  const originalText = submitBtn.textContent;

  // Add loading circle
  submitBtn.innerHTML =
    '<i class="fas fa-circle-notch fa-spin"></i> Resetting...';
  submitBtn.disabled = true;

  // Simulate API call with setTimeout
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === emailInput.value);

    if (userIndex !== -1) {
      // Update user's password
      users[userIndex].password = newPasswordInput.value;
      localStorage.setItem("users", JSON.stringify(users));

      $.toast({
        heading: "Success",
        text: "Password reset successful. You can now log in with your new password.",
        icon: "success",
        loader: true,
        loaderBg: "#9EC600",
      });

      resetPasswordForm.reset();
      closeResetPasswordForm();
    } else {
      $.toast({
        heading: "Error",
        text: "Email not found. Please check your email address.",
        icon: "error",
        loader: true,
        loaderBg: "#ff6b6b",
      });
    }

    // Restore button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1000); // Simulate 1 second delay for API call
}

// Function to close reset password form
function closeResetPasswordForm() {
  const authentication = document.querySelector(".authentication");
  authentication.classList.remove("authentication--forgot-password");
  authentication.classList.remove("authentication--active-popup");
  document.body.style.overflow = "";
}

// Function to show error message
function showError(inputField, errorText) {
  const inputBox = inputField.closest(".authentication__input-box");
  inputBox.classList.add("error");
  let errorMessage = inputBox.querySelector(".error-message");
  if (!errorMessage) {
    errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    inputBox.appendChild(errorMessage);
  }
  errorMessage.textContent = errorText;
  errorMessage.style.display = "block";
}

// Helper function to validate email
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Helper function to validate password strength
function validatePasswordStrength(password) {
  const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/;
  return re.test(password);
}

// Add event listener to the reset password submit button
resetPasswordSubmitBtn.addEventListener("click", validateResetPasswordForm);

// Add event listeners to input fields to clear errors on input
resetPasswordForm
  .querySelectorAll(".authentication__input")
  .forEach((input) => {
    input.addEventListener("input", function () {
      const inputBox = this.closest(".authentication__input-box");
      inputBox.classList.remove("error");
      const errorMessage = inputBox.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.style.display = "none";
      }
    });
  });
