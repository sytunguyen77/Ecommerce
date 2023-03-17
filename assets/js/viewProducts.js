/*================ PRODUCTS DETAILS MODAL FOR FEATURED SECTION ==========*/
// Don't need to loop through array of products2 anymore since we have done that in filter.js and addToCart.js
// Function to display the modal
const displayModal = (id) => {
   const product = products.find((p) => p.id === id);
   const modal = document.getElementById("modal");
   modal.style.display = "flex";

   modal.innerHTML = `
      <div class="modal-content">
           <div class="image-container">
               <div class="small-image">
                  <img src="${product.smallImgSrc_1}" class="small-image-1" alt="" />
                  <img src="${product.smallImgSrc_2}" class="small-image-1" alt="" />
                  <img src="${product.smallImgSrc_3}" class="small-image-1" alt="" />
                  <img src="${product.smallImgSrc_4}" class="small-image-1" alt="" />
               </div>
               <div class="big-image">
                  <img src="${product.imgSrc}" class="big-image-1" alt="" />
               </div>
            </div>

            <div class="content">
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
               <a onclick="addToCart2(${product.id})"class="button button--modal">ADD TO CART</a>
               <button  class="close-modal" id="close-modal"></button>
            </div>
      </div>
   `;

   // Close Button
   const closeModal = document.getElementById("close-modal");
   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
   });

   // Toggle small images to replace big image
   const addSmallImageListeners = () => {
      document.querySelectorAll(".small-image-1").forEach((image) => {
         image.addEventListener("click", () => {
            var src = image.getAttribute("src");
            document.querySelector(".big-image-1").src = src;
            console.log("success");
         });
      });
   };
   addSmallImageListeners();
};

/*================ PRODUCTS DETAILS MODAL FOR PRODUCTS SECTION ==========*/
const displayModal2 = (id) => {
   const product = products2.find((p) => p.id === id);
   const modal = document.getElementById("modal");
   modal.style.display = "flex";

   modal.innerHTML = `
       <div class="modal-content">
           <div class="image-container">
               <div class="small-image">
                  <img src="${product.smallImgSrc_1}" class="small-image-1" alt="" />
                  <img src="${product.smallImgSrc_2}" class="small-image-1" alt="" />
                  <img src="${product.smallImgSrc_3}" class="small-image-1" alt="" />
                  <img src="${product.smallImgSrc_4}" class="small-image-1" alt="" />
               </div>
               <div class="big-image">
                  <img src="${product.imgSrc}" class="big-image-1" alt="" />
               </div>
            </div>

            <div class="content">
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
               <a onclick="addToCart2(${product.id})"class="button button--modal">ADD TO CART</a>
               <button  class="close-modal" id="close-modal"></button>
            </div>
      </div>
   
   `;

   // Close Button
   const closeModal = document.getElementById("close-modal");
   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
   });

   // Toggle small images to replace big image
   const addSmallImageListeners = () => {
      document.querySelectorAll(".small-image-1").forEach((image) => {
         image.addEventListener("click", () => {
            var src = image.getAttribute("src");
            document.querySelector(".big-image-1").src = src;
            console.log("success");
         });
      });
   };
   addSmallImageListeners();
};
