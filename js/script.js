//  CART
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// OPEN CART
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// CLOSE CART
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// CART WORKING
// checking if the DOM  finished loading (document.readyState). If not, itll wait for the 'DOMContentLoaded' event. If the DOM is ready, then itll call ready()
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// setting up event listeners and functions 
function ready() {
  // REMOVING ITEMS FROM CART
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // QUANTITY CHANGES
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // ADD TO CART
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // BUY BTN
  document.getElementsByClassName("buy-btn")[0].addEventListener("click", buyButtonClicked);
}

// BUY BTN
function buyButtonClicked() {
  window.location.href = "payment.html" // directing me to payment page
  let cartContent = document.getElementsByClassName("cart-content")[0]; // clearing the cart content.
  while (cartContent.hasChildNodes()) { //checking to see if there are child nodes.. 
    cartContent.removeChild(cartContent.firstChild); // removes the first child node of cartContent
  }// childNodes returns child nodes (element nodes, text nodes, and comment nodes)
  updatetotal(); // calling updateTotal() to update the total price display.
}

// REMOVING ITEMS FROM CART
function removeCartItem(event) { // Removes the item from the cart when the "remove" button is clicked.
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// QUANTITY CHANGES
// making sure that the quantity entered is valid (a positive number) and defaults to 1 if not.
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();

}
// ADD TO CART
function addCartClicked(event) {
  let button = event.target; // retrieving the button that triggered the event
  let shopProducts = button.parentElement; //gets the parent element of the button that was clicked.
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText; //removing the title of the product from the product container.
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg); // this function is responsible for adding the product to the shopping cart.
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  // accessing the Cart Content
  let cartItems = document.getElementsByClassName("cart-content")[0]; // selecting the first element with the class name "cart-content" and assigns it to the variable cartItems
  // checking for Duplicate Products
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) { // If the product is not already in the cart, the code continues to add the product to the cart.
      alert("This item is already in your cart");
      return;
    }
  }

  let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt cart-remove' ></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// UPDATE TOTAL
function updatetotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // IF PRICE IS IN CENTS
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
