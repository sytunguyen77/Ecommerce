const forms = document.querySelector(".forms"),
   pwShowHide = document.querySelectorAll(".eye-icon"),
   links = document.querySelectorAll(".link");

pwShowHide.forEach((eyeIcon) => {
   eyeIcon.addEventListener("click", () => {
      let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

      pwFields.forEach((password) => {
         if (password.type === "password") {
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
         }
         password.type = "password";
         eyeIcon.classList.replace("bx-show", "bx-hide");
      });
   });
});

links.forEach((link) => {
   link.addEventListener("click", (e) => {
      e.preventDefault(); // prevent form submit
      forms.classList.toggle("show-signup");
   });
});

/*======================== FORM VALIDATION ====================== */
const forms2 = document.querySelectorAll(".form");

forms2.forEach((form) => {
   const eField = form.querySelector(".email");
   const eInput = eField.querySelector("input");
   const pField = form.querySelector(".password");
   const pInput = pField.querySelector("input");

   form.onsubmit = (e) => {
      e.preventDefault(); //prevent form from submitting
      if (eInput.value == "") {
         //if email is empty
         eField.classList.add("shake", "error");
      } else {
         checkEmail(); // calling checkEmail function
      }

      if (pInput.value == "") {
         //if password is empty
         pField.classList.add("shake", "error");
         let errorTxt = pField.querySelector(".error-txt");
         errorTxt.innerText = "Password is required";
      } else if (pInput.value.length < 8) {
         //if password is less than 8 characters
         pField.classList.add("shake", "error");
         let errorTxt = pField.querySelector(".error-txt");
         errorTxt.innerText = "Password must be at least 8 characters long";
      } else if (!pInput.value.match(/[A-Z]/)) {
         //if password does not contain an uppercase letter
         pField.classList.add("shake", "error");
         let errorTxt = pField.querySelector(".error-txt");
         errorTxt.innerText = "Password must contain at least one uppercase letter";
      }

      setTimeout(() => {
         // remove shake class after 500ms
         eField.classList.remove("shake");
         pField.classList.remove("shake");
      }, 500);

      // input keyup
      eInput.onkeyup = () => {
         checkEmail(); // calling checkEmail function
      };

      // create a function
      function checkEmail() {
         let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
         if (!eInput.value.match(pattern)) {
            //if pattern not matched with user entered value
            eField.classList.add("error");
            let errorTxt = eField.querySelector(".error-txt");
            //if email is not empty then show Enter a valid email address until email valid else show Email can't be blank
            eInput.value != ""
               ? (errorTxt.innerText = "Enter a valid email address")
               : (errorTxt.innerText = "Email is required");
         } else {
            eField.classList.remove("error");
         }
      }

      pInput.onkeyup = () => {
         if (pInput.value == "") {
            // if password is empty
            pField.classList.add("error");
         } else {
            pField.classList.remove("error");
         }
      };

      // what to do after user filled up proper details
      // if error class not contains in eField and pField then user has entered proper details
      if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
         window.location.href = "#"; //remove that # and put that url where you want to submit the form data
         // window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
         console.log("form submitted");
      }
   };
});
