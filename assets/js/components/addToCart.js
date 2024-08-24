// SELECT ELEMENTS
const elements = {
  productsEl: document.querySelector(".products"),
  productsEl2: document.querySelector(".products2"),
  productsEl3: document.querySelector(".products3"),
  cartItemsEl: document.querySelector(".cart-items"),
  subtotalEl: document.querySelector(".subtotal"),
  subItemsEl: document.querySelector(".subitem"),
  checkoutBtn: document.querySelector(".checkout-btn"),
  clearAllItemsBtn: document.querySelector(".cart__clear-button"),
  totalItemsInCartEl: document.querySelector(".total-items-in-cart"),
};

// Cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];

// RENDER PRODUCTS
function renderProducts() {
  const renderSection = (products, element, templateFunction) => {
    element.innerHTML = products.map(templateFunction).join("");
  };

  renderSection(products, elements.productsEl, productTemplate);
  renderSection(products2, elements.productsEl2, product2Template);
  renderSection(products3, elements.productsEl3, product3Template);

  initializeSwiper();
}

// Product template functions
const productTemplate = (product) => `
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
      <span class="featured__price">$${product.price} <span class="featured__original">$${product.oldprice}</span></span>
    </div>
    <div class="featured__btn-container">
      <button class="button featured__button" onclick="addToWishList(${product.id})">
        <i class="fa-regular fa-heart"></i>
      </button>
      <button class="button featured__button" onclick="addToCart(${product.id})">
        <span>ADD TO CART</span>
      </button>
      <button class="button featured__button" onclick="displayModal(${product.id})">
        <i class="fa-regular fa-eye"></i>
      </button>
    </div>
  </article>  
`;

const product2Template = (product) => `
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

const product3Template = (product) => `
  <article class="new__card swiper-slide">
    <span class="new__tag">New</span>
    <img src="${product.imgSrc}" alt="" class="new__img" />
    <div class="new__data">
      <h3 class="new__title">${product.name}</h3>
      <span class="new__price">$${product.price}</span>
    </div>
    <div class="new__btn-container">
      <button class="new__button" onclick="addToWishList3(${product.id})">
        <i class="fas fa-heart"></i>
      </button>
      <button class="new__button" onclick="addToCart3(${product.id})">
        ADD TO CART
      </button>
      <button class="new__button" onclick="displayModal3(${product.id})">
        <i class="fa-regular fa-eye"></i>
      </button>
    </div>
  </article>
`;

// Reusable function to add item to cart
function addItemToCart(id, productArray, buttonSelector, buttonText) {
  const button = event.target.closest(buttonSelector);
  const originalContent = button.innerHTML;
  button.innerHTML = buttonText;
  button.disabled = true;

  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = productArray.find((product) => product.id === id);
    cart.push({ ...item, numberOfUnits: 1 });
    showToast("Success", `${item.name} has been added to your cart!`);
  }

  updateCart();

  setTimeout(() => {
    button.innerHTML = originalContent;
    button.disabled = false;
  }, 1000);
}

// ADD TO CART functions
const addToCart = (id) =>
  addItemToCart(id, products, ".featured__button", "<span>ADDING...</span>");
const addToCart2 = (id) =>
  addItemToCart(
    id,
    products2,
    ".products__button",
    '<i class="fas fa-circle-notch fa-spin"></i>'
  );
const addToCart3 = (id) =>
  addItemToCart(id, products3, ".new__button", "ADDING...");

// Update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();
  elements.checkoutBtn.style.display = cart.length > 0 ? "block" : "none";
  elements.clearAllItemsBtn.style.display = cart.length > 0 ? "block" : "none";
  localStorage.setItem("CART", JSON.stringify(cart));
}

// Calculate and render subtotal
function renderSubtotal() {
  const { totalPrice, totalItems } = cart.reduce(
    (acc, item) => {
      acc.totalPrice += item.price * item.numberOfUnits;
      acc.totalItems += item.numberOfUnits;
      return acc;
    },
    { totalPrice: 0, totalItems: 0 }
  );

  elements.subItemsEl.innerHTML = `${totalItems} items`;
  elements.subtotalEl.innerHTML = `Your Total: $${totalPrice.toFixed(2)}`;
  elements.totalItemsInCartEl.innerHTML = totalItems;
}

// Render cart items
function renderCartItems() {
  elements.cartItemsEl.innerHTML =
    cart.length === 0
      ? `<img src="./assets/img/empty.png" alt="Empty cart" style="display: block; margin: 0 auto; width: 200px; height: 200px;"/>
       <h3 style="text-align:center">Your cart is empty</h3>`
      : cart.map(cartItemTemplate).join("");
}

const cartItemTemplate = (item) => `
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
            <i class="bx bx-plus"></i>
          </span>
        </div>
        <div class="deleteItem" onclick="removeItemFromCart(${item.id})">
          <i class="bx bx-trash-alt cart__amount-trash"></i>
        </div>
      </div>
    </div>
  </article>
`;

// Remove an item from cart
function removeItemFromCart(id) {
  if (confirm("Are you sure you want to remove this item from your cart?")) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
  }
}

// Clear all items in the cart
const clearCart = () => {
  cart = [];
  updateCart();
};

// Change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    if (item.id === id) {
      if (action === "minus" && item.numberOfUnits > 1) {
        item.numberOfUnits--;
      } else if (action === "plus" && item.numberOfUnits < item.instock) {
        item.numberOfUnits++;
      }
    }
    return item;
  });
  updateCart();
}

// Helper function to show toast
function showToast(heading, text) {
  $.toast({
    heading: heading,
    text: text,
    showHideTransition: "fade",
    icon: "success",
    position: "top-left",
    loaderBg: "#FFB566",
  });
}

// Initialize
renderProducts();
updateCart();
