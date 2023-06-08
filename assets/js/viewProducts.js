/*================ PRODUCTS DETAILS MODAL FOR FEATURED SECTION ==========*/
// Function to display the modal
const displayModal = (id) => {
   const product = products.find((p) => p.id === id);
   const modal = document.getElementById("modal");
   setTimeout(function () {
      modal.classList.add("active");
   }, 0);

   modal.innerHTML = `
      <div class="modal__container">
           <div class="modal__image-wrapper">
               <div class="modal__image-small">
                  <img src="${product.smallImgSrc_1}" class="sub__image" alt="no-image" />
                  <img src="${product.smallImgSrc_2}" class="sub__image" alt="no-image" />
                  <img src="${product.smallImgSrc_3}" class="sub__image" alt="no-image" />
                  <img src="${product.smallImgSrc_4}" class="sub__image" alt="no-image" />
               </div>
               <div class="modal__image-big">
                  <img src="${product.imgSrc}" class="modal__image-big zoom id="image" data-magnify-src="${product.imgSrc}" alt="" />
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
               <p>
                  ${product.description}
               </p>
               <div class="price">$${product.price}</div>
               <a onclick="addToCart(${product.id})" class="button modal__button">ADD TO CART</a>
               <button  class="modal-close" id="modal-close"></button>
            </div>
      </div>
   `;

   // Toggle small images to replace big image
   const addSmallImageListeners = () => {
      document.querySelectorAll(".sub__image").forEach((image) => {
         image.addEventListener("mouseover", () => {
            var src = image.getAttribute("src");
            const bigImage = document.querySelector(".modal__image-big img");
            bigImage.src = src;
            // Update magnification source
            bigImage.dataset.magnifySrc = src;
            console.log("success");

            // Refresh magnify plugin for the updated image
            $(".zoom").magnify();
         });
      });
   };
   addSmallImageListeners();

   // Use JQUERY to magnify big image
   $(document).ready(function () {
      $(".zoom").magnify();
   });

   // Close Button
   const closeModal = document.getElementById("modal-close");
   closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
   });
};

/*================ PRODUCTS DETAILS MODAL FOR PRODUCTS SECTION ==========*/
const displayModal2 = (id) => {
   const product = products2.find((p) => p.id === id);
   const modal = document.getElementById("modal");
   setTimeout(function () {
      modal.classList.add("active");
   }, 0);

   modal.innerHTML = `
      <div class="modal__container">
           <div class="modal__image-wrapper">
               <div class="modal__image-small">
                  <img src="${product.smallImgSrc_1}" class="sub__image" alt="no-image" />
                  <img src="${product.smallImgSrc_2}" class="sub__image" alt="no-image" />
                  <img src="${product.smallImgSrc_3}" class="sub__image" alt="no-image" />
                  <img src="${product.smallImgSrc_4}" class="sub__image" alt="no-image" />
               </div>
               <div class="modal__image-big">
                  <img src="${product.imgSrc}" class="modal__image-big zoom id="image" data-magnify-src="${product.imgSrc}" alt="" />
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
               <p>
                  ${product.description}
               </p>
               <div class="price">$${product.price}</div>
               <a onclick="addToCart2(${product.id})" class="button modal__button">ADD TO CART</a>
                  <button  class="modal-close" id="modal-close"></button>
            </div>
      </div>
   `;

   // Toggle small images to replace big image
   const addSmallImageListeners = () => {
      document.querySelectorAll(".sub__image").forEach((image) => {
         image.addEventListener("mouseover", () => {
            var src = image.getAttribute("src");
            const bigImage = document.querySelector(".modal__image-big img");
            bigImage.src = src;
            // Update magnification source
            bigImage.dataset.magnifySrc = src;
            console.log("success");

            // Refresh magnify plugin for the updated image
            $(".zoom").magnify();
         });
      });
   };
   addSmallImageListeners();

   // Use JQUERY to magnify big image
   $(document).ready(function () {
      $(".zoom").magnify();
   });

   // Close Button
   const closeModal = document.getElementById("modal-close");
   closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
   });
};

/*================ PRODUCTS DETAILS MODAL FOR NEW ARRIVALS SECTION ==========*/
const displayModal3 = (id) => {
   const product = products3.find((p) => p.id === id);
   const modal = document.getElementById("modal");
   setTimeout(function () {
      modal.classList.add("active");
   }, 0);

   modal.innerHTML = `
      <div class="modal__container">
           <div class="modal__image-wrapper">
               <div class="modal__image-small">
                  <img src="${product.smallImgSrc_1}" class="sub__image" alt="" />
                  <img src="${product.smallImgSrc_2}" class="sub__image" alt="" />
                  <img src="${product.smallImgSrc_3}" class="sub__image" alt="" />
                  <img src="${product.smallImgSrc_4}" class="sub__image" alt="" />
               </div>
               <div class="modal__image-big">
                  <img src="${product.imgSrc}" class="modal__image-big zoom id="image" data-magnify-src="${product.imgSrc}" alt="" />
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
               <p>
                  ${product.description}
               </p>
               <div class="price">$${product.price}</div>
               <a onclick="addToCart3(${product.id})" class="button modal__button">ADD TO CART</a>
               <button  class="modal-close" id="modal-close"></button>
            </div>
      </div>
   `;

   // Toggle small images to replace big image
   const addSmallImageListeners = () => {
      document.querySelectorAll(".sub__image").forEach((image) => {
         image.addEventListener("mouseover", () => {
            var src = image.getAttribute("src");
            const bigImage = document.querySelector(".modal__image-big img");
            bigImage.src = src;
            // Update magnification source
            bigImage.dataset.magnifySrc = src;
            console.log("success");

            // Refresh magnify plugin for the updated image
            $(".zoom").magnify();
         });
      });
   };
   addSmallImageListeners();

   // Use JQUERY to magnify big image
   $(document).ready(function () {
      $(".zoom").magnify();
   });

   // Close Button
   const closeModal = document.getElementById("modal-close");
   closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
   });
};

/*================ CLOSE THE MODAL IF THE CLICK WAS OUTSIDE OF THE MODAL CONTENT==========*/
modal.addEventListener("click", (e) => {
   const modalContent = document.querySelector(".modal__content");

   if (!modalContent.contains(e.target)) {
      modal.classList.remove("active");
   }
});
