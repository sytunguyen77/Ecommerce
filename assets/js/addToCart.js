// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const productsEl2 = document.querySelector(".products2");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const subItemsEl = document.querySelector(".subitem");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
// RENDER PRODUCTS
function renderProducts() {
   products.forEach((product) => {
      productsEl.innerHTML += `
        <article class="featured__card">
                  <span class="featured__tag">Sale</span>
                  <img src="${product.imgSrc}" alt="" class="featured__img" />

                  <div class="featured__data">
                     <h3 class="featured__title">${product.name}</h3>
                     <span class="featured__price">$${product.price} <span class="featured__original">$${product.oldprice}</span> </span>
                  </div>

                  <button class="button featured__button" onclick="addToCart(${product.id})">ADD TO CART</button>
        </article>
        
      `;
   });
   products2.forEach((product) => {
      productsEl2.innerHTML += `
            <article class="products__card">
                     <img src="${product.imgSrc}" alt="" class="products__img" />

                     <h3 class="products__title">${product.name}</h3>
                     <span class="products__price">$${product.price}</span>

                     <button class="products__button" onclick="addToCart2(${product.id})">
                        <i class="bx bx-shopping-bag"></i>
                     </button>

                     <button class="products-wishlist__button" onclick="addToWishList(${product.id})">
                        <i class="bx bx-heart"></i>
                     </button>
                     
            </article>
         `;
   });
}

renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART (FEATURED)
function addToCart(id) {
   // check if product already exist in cart
   if (cart.some((item) => item.id === id)) {
      // alert("Product already in cart");
      changeNumberOfUnits("plus", id);
   } else {
      const item = products.find((product) => product.id === id);
      cart.push({
         ...item,
         numberOfUnits: 1,
      });
   }

   updateCart();
}

// ADD TO CART (PRODUCTS)
function addToCart2(id) {
   // check if product already exist in cart
   if (cart.some((item) => item.id === id)) {
      // alert("Product already in cart");
      changeNumberOfUnits("plus", id);
   } else {
      const item = products2.find((product) => product.id === id);
      cart.push({
         ...item,
         numberOfUnits: 1,
      });
   }

   updateCart();
}

// update cart
function updateCart() {
   renderCartItems();
   renderSubtotal();

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
   subtotalEl.innerHTML = `Subtotal: $${totalPrice.toFixed()}`;
   totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
   if (cart.length === 0) {
      cartItemsEl.innerHTML = `<h3 style="text-align:center">Your cart is currently empty.</h3>`;
   } else {
      cartItemsEl.innerHTML = `<button class="button home__button" id="checkout">CONTINUE TO CHECKOUT</button>`; // clear cart element
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

                        <div class="deleteItem" onclick="removeItemFromCart(${item.id})"><i class="bx bx-trash-alt cart__amount-trash "></i></div>

                     </div>
                  </div>
         </article>
    `;
      });
   }
}

// remove item from cart
function removeItemFromCart(id) {
   cart = cart.filter((item) => item.id !== id);
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
