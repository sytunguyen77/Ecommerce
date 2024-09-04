// Get the login form and submit button
const loginForm = document.querySelector(
  ".authentication__form-box--login form"
);
const loginSubmitBtn = loginForm.querySelector(".authentication__submit-btn");

// Function to validate the login form
function validateLoginForm(event) {
  event.preventDefault();
  let isValid = true;

  // Get email and password fields
  const emailField = loginForm.querySelector('input[type="email"]');
  const passwordField = loginForm.querySelector('input[type="password"]');

  // Validate email
  if (emailField.value.trim() === "") {
    isValid = false;
    showError(emailField, "Email is required");
  } else if (!validateEmail(emailField.value)) {
    isValid = false;
    showError(emailField, "Please enter a valid email address");
  } else {
    clearError(emailField);
  }

  // Validate password
  if (passwordField.value.trim() === "") {
    isValid = false;
    showError(passwordField, "Password is required");
  } else {
    clearError(passwordField);
  }

  // If the form is valid, attempt to log in
  if (isValid) {
    loginUser();
  }
}

// Function to log in the user
function loginUser() {
  const emailInput = loginForm.querySelector('input[type="email"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');
  const submitBtn = loginForm.querySelector(".authentication__submit-btn");
  const originalText = submitBtn.textContent;

  // Add loading circle
  submitBtn.innerHTML =
    '<i class="fas fa-circle-notch fa-spin"></i> Logging in...';
  submitBtn.disabled = true;

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === emailInput.value && u.password === passwordInput.value
    );

    if (user) {
      // Login successful
      localStorage.setItem("currentUser", JSON.stringify(user));
      $.toast({
        heading: "Success",
        text: "Login successful",
        icon: "success",
        loader: true,
        loaderBg: "#FFB566",
      });
      loginForm.reset();
      updateUIForLoggedInUser(user);
    } else {
      // Login failed
      $.toast({
        heading: "Error",
        text: "Invalid email or password",
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

// Function to update UI for logged-in user
function updateUIForLoggedInUser(user) {
  const loginShop = document.querySelector("#login-shop");
  loginShop.innerHTML = `
    <i class="bx bx-user"></i>
    <div class="user-dropdown">
      <span>${user.fullName}</span>
      <a href="#" class="user-dropdown__item" onclick="logoutUser()">Logout</a>
    </div>
  `;
  // Close the authentication modal
  document
    .querySelector(".authentication")
    .classList.remove("authentication--active-popup");
}

// Function to log out the user
function logoutUser() {
  localStorage.removeItem("currentUser");
  const loginShop = document.querySelector("#login-shop");
  loginShop.innerHTML = '<i class="bx bx-user"></i>';
  $.toast({
    heading: "Success",
    text: "Logged out successfully",
    icon: "success",
    loader: true,
    loaderBg: "#FFB566",
  });
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

// Function to clear error message
function clearError(inputField) {
  const inputBox = inputField.closest(".authentication__input-box");
  inputBox.classList.remove("error");
  const errorMessage = inputBox.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.style.display = "none";
  }
}

// Helper function to validate email
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Add event listener to the login submit button
loginSubmitBtn.addEventListener("click", validateLoginForm);

// Add event listeners to input fields to clear errors on input
loginForm.querySelectorAll(".authentication__input").forEach((input) => {
  input.addEventListener("input", function () {
    clearError(this);
  });
});

// Check if user is already logged in on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    updateUIForLoggedInUser(currentUser);
  }
});
