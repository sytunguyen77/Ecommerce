// Get the registration form and submit button
const registrationForm = document.querySelector(
  ".authentication__form-box--register form"
);
const submitBtn = registrationForm.querySelector(".authentication__submit-btn");

// Function to validate the form
function validateForm(event) {
  event.preventDefault();
  let isValid = true;

  // Get all input fields
  const inputFields = registrationForm.querySelectorAll(
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
        case "fullName":
          errorText = "Full name is required";
          break;
        case "email":
          errorText = "Email address is required";
          break;
        case "password":
          errorText = "Password is required";
          break;
        case "confirmPassword":
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

  // Check if passwords match
  const password = registrationForm.querySelector('input[name="password"]');
  const confirmPassword = registrationForm.querySelector(
    'input[name="confirmPassword"]'
  );
  if (
    password.value !== confirmPassword.value &&
    password.value !== "" &&
    confirmPassword.value !== ""
  ) {
    isValid = false;
    const confirmPasswordBox = confirmPassword.closest(
      ".authentication__input-box"
    );
    let errorMessage = confirmPasswordBox.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("span");
      errorMessage.className = "error-message";
      confirmPasswordBox.appendChild(errorMessage);
    }
    errorMessage.textContent = "Passwords do not match";
    errorMessage.style.display = "block";
    confirmPasswordBox.classList.add("error");
  }

  // Check if terms and conditions are accepted
  const termsCheckbox = registrationForm.querySelector(
    'input[type="checkbox"]'
  );
  if (!termsCheckbox.checked) {
    isValid = false;
    const termsBox = termsCheckbox.closest(".authentication__remember-forgot");
    let errorMessage = termsBox.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("span");
      errorMessage.className = "error-message";
      termsBox.appendChild(errorMessage);
    }
    errorMessage.textContent = "You must agree to the terms and conditions";
    errorMessage.style.display = "block";
  }

  // If the form is valid, you can submit it here
  if (isValid) {
    console.log("Form is valid and can be submitted");
    // Add your form submission logic here
  }
}

// Add event listener to the submit button
submitBtn.addEventListener("click", validateForm);

// Add event listeners to input fields to clear errors on input
registrationForm.querySelectorAll(".authentication__input").forEach((input) => {
  input.addEventListener("input", function () {
    const inputBox = this.closest(".authentication__input-box");
    inputBox.classList.remove("error");
    const errorMessage = inputBox.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  });
});
