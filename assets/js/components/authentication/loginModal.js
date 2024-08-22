document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("loginModal");
  const signInLink = document.querySelector(".user-dropdown__item");
  const span = document.getElementsByClassName("login-modal__close")[0];

  // When the user clicks on the "Sign In" link, open the modal
  signInLink.onclick = function (event) {
    event.preventDefault(); // Prevent the default link behavior
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    closeModal();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  // Function to close the modal with animation
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }, 300); // Wait for the animation to complete before hiding the modal
  }

  // Handle form submission
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Here you would typically send the login data to your server
      console.log("Login attempt with email:", email);

      // For demo purposes, we'll just close the modal and show a success message
      closeModal();
      alert("Login successful!");
    });
});
