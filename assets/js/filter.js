// Define a message for when there are no results
const noResultsMessage = "Sorry! No products found";

// Function to display the products or a message if there are no results
const displayProductsOrMessage = (productsToShow) => {
   const productList = document.querySelector(".product-list");
   productList.innerHTML = "";

   if (productsToShow.length > 0) {
      productsToShow.forEach((product) => {
         productsEl2.innerHTML += `
            <article class="products__card">
                     <img src="${product.imgSrc}" alt="" class="products__img" />

                     <h3 class="products__title">${product.name}</h3>
                     <span class="products__price">$${product.price}</span>

                     <div class="products__btn-container">
                        <button class="products__button" onclick="addToCart2(${product.id})">
                           <i class="bx bx-shopping-bag"></i>
                        </button>

                        <button class="products-wishlist__button" onclick="addToWishList2(${product.id})">
                           <i class="bx bx-heart"></i>
                        </button>

                        <button class="products-view__button" onclick="displayModal2(${product.id})">
                           <i class="fa-regular fa-eye"></i>
                        </button>
                     </div>           
            </article>
         `;
      });
   } else {
      const noResultsDiv = document.createElement("div");
      noResultsDiv.classList.add("no-results");
      noResultsDiv.textContent = noResultsMessage;
      noResultsDiv.style.position = "absolute";
      noResultsDiv.style.left = "50%";
      noResultsDiv.style.transform = "translateX(-50%)";
      productList.appendChild(noResultsDiv);
   }
};

// Call the displayProductsorMessage function to show all products initially
displayProductsOrMessage(products2);

// Add an event listener to the search input field
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", () => {
   let filter = searchInput.value.toUpperCase();
   let productsToShow = products2.filter((product) => product.name.toUpperCase().includes(filter));
   displayProductsOrMessage(productsToShow);
});

// Add filter to products section
const searchProduct = document.getElementById("find");
searchProduct.addEventListener("keyup", () => {
   let filter = searchProduct.value.toUpperCase();
   let productsToShow = products2.filter((product) => product.name.toUpperCase().includes(filter));
   displayProductsOrMessage(productsToShow);
});
