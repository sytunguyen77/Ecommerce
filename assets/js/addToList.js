const wishListItemsEl = document.querySelector(".wishlist-items");
const totalItemsInWishListEl = document.querySelector(".total-items-in-wishlist");
const clearAllWishListItemsEl = document.querySelector(".wishlist__clear-button");
const subWishListEl = document.querySelector(".wishlist__item");

// Wishlist Array
let wishlist = JSON.parse(localStorage.getItem("WISHLIST")) || [];
updateWishList();

// ADD TO WISHLIST (FEATURED SECTION)
function addToWishList(id) {
   // check if wishlist already exist in cart
   if (wishlist.some((item) => item.id === id)) {
      $.toast({
         heading: "Information",
         text: "Product already in wishlist",
         icon: "info",
         loader: true,
         loaderBg: "#FFB566",
      });
   } else {
      const item = products.find((product) => product.id === id);
      wishlist.push({
         ...item,
         numberOfWishList: 1,
      });
   }

   updateWishList();
}

// ADD TO WISHLIST (PRODUCTS SECTION)
function addToWishList2(id) {
   // check if wishlist already exist in cart
   if (wishlist.some((item) => item.id === id)) {
      $.toast({
         heading: "Information",
         text: "Product already in wishlist",
         icon: "info",
         loader: true,
         loaderBg: "#FFB566",
      });
   } else {
      const item = products2.find((product) => product.id === id);
      wishlist.push({
         ...item,
         numberOfWishList: 1,
      });
   }

   updateWishList();
}

// ADD TO WISHLIST (NEW ARRIVALS SECTION)
function addToWishList3(id) {
   // check if wishlist already exist in cart
   if (wishlist.some((item) => item.id === id)) {
      $.toast({
         heading: "Information",
         text: "Product already in wishlist",
         icon: "info",
         loader: true,
         loaderBg: "#FFB566",
      });
   } else {
      const item = products3.find((product) => product.id === id);
      wishlist.push({
         ...item,
         numberOfWishList: 1,
      });
   }

   updateWishList();
}

// update wistlist
function updateWishList() {
   renderWishListItems();
   renderWistListTotal();

   // save wistlist to local storage
   localStorage.setItem("WISHLIST", JSON.stringify(wishlist));
}

// calculate and render total of wishlist items
function renderWistListTotal() {
   let totalWishList = 0;
   wishlist.forEach((item) => {
      totalWishList += item.numberOfWishList;
   });
   totalItemsInWishListEl.innerHTML = totalWishList;
   subWishListEl.innerHTML = `${totalWishList} items`;
}

// render wishlist items
function renderWishListItems() {
   if (wishlist.length === 0) {
      wishListItemsEl.innerHTML = `
        <img src="./assets/img/empty.png" alt="Empty cart" style="display: block; margin: 0 auto; width: 200px; height: 200px; "/>
        <h3 style="text-align:center">Your wishlist is empty</h3>`;
      clearAllWishListItemsEl.style.display = "none"; // Hide clear button when wishlist is empty
      subWishListEl.style.display = "none";
   } else {
      wishListItemsEl.innerHTML = ``; // clear wishlist element
      wishlist.forEach((item) => {
         wishListItemsEl.innerHTML += `
         <article class="wishlist__card">
                  <div class="wishlist__box">
                     <img src="${item.imgSrc}" alt="" class="wishlist__img" />
                  </div>

                  <div class="wishlist__details">
                     <h3 class="wishlist__title">${item.name}</h3>
                     <span class="wishlist__price">$${item.price}</span>

                    <div class="deleteItem" onclick="removeItemFromWishList(${item.id})"><i class="bx bx-trash-alt wishlist__amount-trash "></i></div>

                     </div>
                  </div>
         </article>
    `;
      });
      clearAllWishListItemsEl.style.display = "block"; //  Show clear button when there's at least one item in the wishlist
      subWishListEl.style.display = "block";
   }
}

// remove item from wislist
function removeItemFromWishList(id) {
   wishlist = wishlist.filter((item) => item.id !== id);
   updateWishList();
}

// clear all items in the wishlist
function clearList() {
   wishlist = [];
   updateWishList();
}
