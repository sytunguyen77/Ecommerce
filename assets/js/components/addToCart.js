// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const productsEl2 = document.querySelector(".products2");
const productsEl3 = document.querySelector(".products3");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const subItemsEl = document.querySelector(".subitem");
const checkoutBtn = document.querySelector(".checkout-btn");
const clearAllItemsBtn = document.querySelector(".cart__clear-button");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// RENDER PRODUCTS
function renderProducts() {
  // Featured Section
  products.forEach((product) => {
    productsEl.innerHTML += `
      <article class="featured__card">
         <span class="featured__tag">${product.sale}% OFF</span>
         <div class="featured__img-container">
            <img
               src="${product.imgSrc}"
               alt=""
               class="featured__img"
               onmouseover="this.src='${product.imgSrcSub}'"
               onmouseout="this.src='${product.imgSrc}'"
            />
         </div>

         <div class="featured__data">
            <h3 class="featured__title">${product.name}</h3>
            <span class="featured__price"
               >$${product.price} <span class="featured__original">$${product.oldprice}</span>
            </span>
         </div>

         <div class="featured__btn-container">
            <button class="button featured__button" onclick="addToWishList(${product.id})">
               <i class="fa-regular fa-heart"></i>
               <div class="spinner"></div>
            </button>

            <button class="button featured__button" onclick="addToCart(${product.id}, this)" data-original-text="ADD TO CART">
               <span class="button-text">ADD TO CART</span>
            </button>

            <button class="button featured__button" onclick="displayModal(${product.id})">
               <i class="fa-regular fa-eye"></i>
            </button>
         </div>
      </article>  
    `;
  });

  // Product Section
  products2.forEach((product) => {
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

  // New Arrival Section
  products3.forEach((product) => {
    productsEl3.innerHTML += `
         <article class="new__card swiper-slide">
            <span class="new__tag">New</span>
            <img src="${product.imgSrc}" alt="" class="new__img" />
            <div class="new__data">
               <h3 class="new__title">${product.name}</h3>
               <span class="new__price">$${product.price}</span>
            </div>
            <div class=new__btn-container>
              <button class="new__button" onclick="addToWishList3(${product.id})">
                  <i class="fas fa-heart"></i>
                  <div class="spinner"></div>
              </button>

              <button class="new__button" onclick="addToCart3(${product.id}, this)" data-original-text="ADD TO CART">
                  <span class="button-text">ADD TO CART</span>
              </button>
              
              <button class="new__button" onclick="displayModal3(${product.id})">
                  <i class="fa-regular fa-eye"></i>
                    <div class="spinner"></div>
              </button>
            </div>
         </article>`;
  });
  initializeSwiper();
}

renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART (FEATURED)
function addToCart(id, button) {
  // Change button text to "ADDING..."
  const buttonText = button.querySelector(".button-text");
  const originalText = button.dataset.originalText;
  buttonText.textContent = "ADDING...";
  button.disabled = true;

  // Simulate an async operation (e.g., adding to cart)
  setTimeout(() => {
    // check if product already exist in cart
    if (cart.some((item) => item.id === id)) {
      changeNumberOfUnits("plus", id);
    } else {
      const item = products.find((product) => product.id === id);
      cart.push({
        ...item,
        numberOfUnits: 1,
      });
      $.toast({
        heading: "Success",
        text: `${item.name} has been added to your cart!`,
        showHideTransition: "fade",
        icon: "success",
        position: "top-left",
        loaderBg: "#FFB566",
      });
    }

    updateCart();

    // Change button text back to original
    buttonText.textContent = originalText;
    button.disabled = false;
  }, 1000); // Simulating a 1-second delay
}

// ADD TO CART (PRODUCTS SECTION)
function addToCart2(id) {
  // check if product already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products2.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
    $.toast({
      heading: "Success",
      text: `${item.name} has been added to your cart!`,
      showHideTransition: "fade",
      icon: "success",
      position: "top-left",
      loaderBg: "#FFB566",
    });
  }
  updateCart();
}

// ADD TO CART (NEW ARRIVALS SECTION)
function addToCart3(id, button) {
  // Change button text to "ADDING..."
  const buttonText = button.querySelector(".button-text");
  const originalText = button.dataset.originalText;
  buttonText.textContent = "ADDING...";
  button.disabled = true;

  setTimeout(() => {
    if (cart.some((item) => item.id === id)) {
      changeNumberOfUnits("plus", id);
    } else {
      const item = products3.find((product) => product.id === id);
      cart.push({
        ...item,
        numberOfUnits: 1,
      });
      $.toast({
        heading: "Success",
        text: `${item.name} has been added to your cart!`,
        showHideTransition: "fade",
        icon: "success",
        position: "top-left",
        loaderBg: "#FFB566",
      });
    }
    updateCart();

    // Change button text back to original
    buttonText.textContent = originalText;
    button.disabled = false;
  }, 1000);
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // add or remove checkout and clear button
  if (cart.length > 0) {
    checkoutBtn.style.display = "block";
    clearAllItemsBtn.style.display = "block";
  } else {
    checkoutBtn.style.display = "none";
    clearAllItemsBtn.style.display = "none";
  }

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subItemsEl.innerHTML = `${totalItems} items`;
  subtotalEl.innerHTML = `Your Total: $${totalPrice.toFixed()}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
       <img src="./assets/img/empty.png" alt="Empty cart" style="display: block; margin: 0 auto; width: 200px; height: 200px;"/>
       <h3 style="text-align:center">Your cart is empty</h3>
     `;
  } else {
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
      cartItemsEl.innerHTML += `
        <article class="cart__card">
            <div class="cart__box">
               <img src="${item.imgSrc}" alt="" class="cart__img" />
            </div>

            <div class="cart__details">
               <h3 class="cart__title">${item.name}</h3>
               <span class="cart__price">$${item.price}</span>

               <div class="cart__amount">
                  <div class="cart__amount-content">
                     <span class="cart__amount-box" onclick="changeNumberOfUnits('minus', ${item.id})">
                        <i class="bx bx-minus"></i>
                     </span>

                     <span class="cart__amount-number">${item.numberOfUnits}</span>

                     <span class="cart__amount-box" onclick="changeNumberOfUnits('plus', ${item.id})">
                        <i class="bx bx-plus"> </i>
                     </span>
                  </div>

                  <div class="deleteItem" onclick="removeItemFromCart(${item.id})">
                     <i class="bx bx-trash-alt cart__amount-trash "></i>
                  </div>
               </div>
            </div>
         </article>
    `;
    });
  }
}

// remove an item from cart
function removeItemFromCart(id) {
  const confirmation = confirm(
    "Are you sure you want to remove this item from your cart?"
  );
  if (confirmation) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
  }
}

// clear all items in the cart
function clearCart() {
  cart = [];
  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}
