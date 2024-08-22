const modal = document.getElementById("loginModal");
const signInLink = document.querySelector(".user-dropdown__item");
const span = document.getElementsByClassName("login-modal__close")[0];

// When the user clicks on the "Sign In" link, open the modal
signInLink.onclick = function (event) {
  event.preventDefault(); // Prevent the default link behavior
  modal.style.display = "block";
};

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
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Here you would typically send the login data to your server
    console.log("Login attempt with email:", email);

    // For demo purposes, we'll just close the modal and show a success message
    modal.style.display = "none";
    alert("Login successful!");
  });
