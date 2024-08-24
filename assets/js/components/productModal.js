// Reusable function to animate icon
function animateIcon(icon, toSpin) {
  const originalClasses = [...icon.classList];

  icon.style.transition = "transform 0.3s, opacity 0.3s";
  icon.style.transform = "scale(0)";
  icon.style.opacity = "0";

  setTimeout(() => {
    icon.classList.remove(...icon.classList);
    icon.classList.add("fas", "fa-circle-notch", "fa-spin");
    icon.style.transform = "scale(1)";
    icon.style.opacity = "1";
  }, 150);

  return originalClasses;
}

// Reusable function to restore icon
function restoreIcon(icon, originalClasses) {
  icon.style.transform = "scale(0)";
  icon.style.opacity = "0";

  setTimeout(() => {
    icon.classList.remove(...icon.classList);
    icon.classList.add(...originalClasses);
    icon.style.transform = "scale(1)";
    icon.style.opacity = "1";
  }, 150);
}

// Reusable function to generate modal content
function generateModalContent(product, addToCartFunction) {
  return `
     <div class="modal__container">
       <div class="modal__image-wrapper">
         <div class="modal__image-small">
           <img src="${product.smallImgSrc_1}" class="sub__image" alt="no-image" />
           <img src="${product.smallImgSrc_2}" class="sub__image" alt="no-image" />
           <img src="${product.smallImgSrc_3}" class="sub__image" alt="no-image" />
           <img src="${product.smallImgSrc_4}" class="sub__image" alt="no-image" />
         </div>
         <div class="modal__image-big">
           <img src="${product.imgSrc}" class="modal__image-big zoom" id="image" data-magnify-src="${product.imgSrc}" alt="" />
         </div>
       </div>
       <div class="modal__content">
         <h3>${product.name}</h3>
         <div class="stars">
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="far fa-star"></i>
         </div>
         <p>${product.description}</p>
         <div class="price">$${product.price}</div>
         <a onclick="${addToCartFunction}(${product.id})" class="button modal__button">ADD TO CART</a>
         <button class="modal-close" id="modal-close"></button>
       </div>
     </div>
   `;
}

/*================ PRODUCTS DETAILS MODAL FOR FEATURED SECTION ==========*/
const displayModal = (id) => {
  const button = event.target.closest(".featured__button");
  const icon = button.querySelector("i");
  const originalClasses = animateIcon(icon, true);
  button.disabled = true;

  const product = products.find((p) => p.id === id);
  const modal = document.getElementById("modal");

  setTimeout(() => {
    modal.classList.add("active");
    modal.innerHTML = generateModalContent(product, "addToCart");
    setupModalFunctionality();
    restoreIcon(icon, originalClasses);
    button.disabled = false;
  }, 500);
};

/*================ PRODUCTS DETAILS MODAL FOR PRODUCTS SECTION ==========*/
const displayModal2 = (id) => {
  const button = event.target.closest(".products-view__button");
  const icon = button.querySelector("i");
  const originalClasses = animateIcon(icon, true);
  button.disabled = true;

  const product = products2.find((p) => p.id === id);
  const modal = document.getElementById("modal");

  setTimeout(() => {
    modal.classList.add("active");
    modal.innerHTML = generateModalContent(product, "addToCart2");
    setupModalFunctionality();
    restoreIcon(icon, originalClasses);
    button.disabled = false;
  }, 500);
};

/*================ PRODUCTS DETAILS MODAL FOR NEW ARRIVALS SECTION ==========*/
const displayModal3 = (id) => {
  const button = event.target.closest(".new__button");
  const icon = button.querySelector("i");
  const originalClasses = animateIcon(icon, true);
  button.disabled = true;

  const product = products3.find((p) => p.id === id);
  const modal = document.getElementById("modal");

  setTimeout(() => {
    modal.classList.add("active");
    modal.innerHTML = generateModalContent(product, "addToCart3");
    setupModalFunctionality();
    restoreIcon(icon, originalClasses);
    button.disabled = false;
  }, 500);
};

// Function to setup common modal functionality
function setupModalFunctionality() {
  document.querySelectorAll(".sub__image").forEach((image) => {
    image.addEventListener("mouseover", () => {
      const src = image.getAttribute("src");
      const bigImage = document.querySelector(".modal__image-big img");
      bigImage.src = src;
      bigImage.dataset.magnifySrc = src;
      $(".zoom").magnify();
    });
  });

  $(".zoom").magnify();

  const closeModal = document.getElementById("modal-close");
  closeModal.addEventListener("click", () => {
    document.getElementById("modal").classList.remove("active");
  });
}

/*================ CLOSE THE MODAL IF THE CLICK WAS OUTSIDE OF THE MODAL CONTENT==========*/
document.getElementById("modal").addEventListener("click", (e) => {
  const modalContent = document.querySelector(".modal__container");
  if (!modalContent.contains(e.target)) {
    document.getElementById("modal").classList.remove("active");
  }
});
