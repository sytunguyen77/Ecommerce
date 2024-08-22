document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registerModal");
  const registerLink = document.querySelector(
    ".user-dropdown__item:nth-child(2)"
  );
  const span = modal.querySelector(".auth-modal__close");

  console.log("Register link:", registerLink); // Debugging

  // When the user clicks on the "Register" link, open the modal
  registerLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    console.log("Register link clicked"); // Debugging
    modal.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Handle form submission
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById(
        "registerConfirmPassword"
      ).value;

      // Basic form validation
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Here you would typically send the registration data to your server
      console.log("Registration attempt with email:", email);

      // For demo purposes, we'll just close the modal and show a success message
      modal.style.display = "none";
      alert("Registration successful!");

      // Clear the form
      document.getElementById("registerForm").reset();
    });
});
