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

  // If the form is valid, register the user
  if (isValid) {
    registerUser();
  }
}

// Function to check if email already exists
function emailExists(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some((user) => user.email === email);
}

// Function to register the user
function registerUser() {
  const fullName = registrationForm.querySelector(
    'input[name="fullName"]'
  ).value;
  const email = registrationForm.querySelector('input[name="email"]').value;
  const password = registrationForm.querySelector(
    'input[name="password"]'
  ).value;

  // Add loading circle
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML =
    '<i class="fas fa-circle-notch fa-spin"></i> Registering...';
  submitBtn.disabled = true;

  // Simulate API call with setTimeout
  setTimeout(() => {
    if (emailExists(email)) {
      // Show error toast if email already exists
      $.toast({
        heading: "Error",
        text: "Email already exists. Please use a different email.",
        icon: "error",
        loader: true,
        loaderBg: "#ff6b6b",
      });
      // Restore button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }

    // Here you would typically send this data to your server
    // For this example, we'll just store it in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Show success toast
    $.toast({
      heading: "Success",
      text: "Registration successful",
      icon: "success",
      loader: true,
      loaderBg: "#9EC600",
    });

    // Reset the form
    registrationForm.reset();

    // Switch to login form
    const authentication = document.querySelector(".authentication");
    authentication.classList.remove("authentication--active");

    // Restore button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1000); // Simulate 1 second delay for API call
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
