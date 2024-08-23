document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registerModal");
  const registerLinks = document.querySelectorAll(".user-dropdown__item");
  const span = modal.querySelector(".auth-modal__close");

  console.log("Register links found:", registerLinks.length); // Debugging

  // Function to open the modal
  function openModal() {
    console.log("Opening modal"); // Debugging
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }

  // Function to close the modal with animation
  function closeModal() {
    console.log("Closing modal"); // Debugging
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }, 300); // Wait for the animation to complete before hiding the modal
  }

  // When the user clicks on the "Register" link, open the modal
  registerLinks.forEach((link, index) => {
    console.log("Link text:", link.textContent.trim()); // Debugging
    if (index === 1 || link.textContent.trim().toLowerCase() === "register") {
      console.log("Adding click event listener to register link"); // Debugging
      link.addEventListener("click", function (event) {
        console.log("Register link clicked"); // Debugging
        event.preventDefault(); // Prevent the default link behavior
        openModal();
      });
    }
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = closeModal;

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
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

      // Here you would typically validate the input and send the registration data to your server
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      console.log("Registration attempt with email:", email);

      // For demo purposes, we'll just close the modal and show a success message
      closeModal();
      alert("Registration successful!");
    });
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
