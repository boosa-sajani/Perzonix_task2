// CART DATA
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

const itemCount = document.getElementById("itemCount");
const subtotal = document.getElementById("subtotal");
const gst = document.getElementById("gst");
const grandTotal = document.getElementById("grandTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
// DISPLAY CART
function displayCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        document.querySelector(".cart-layout").style.display = "none";
        emptyCart.style.display = "block";
        return;
    }
    document.querySelector(".cart-layout").style.display = "grid";
    emptyCart.style.display = "none";
    cart.forEach((item, index) => {
        cartItems.innerHTML += `

        <div class="cart-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h2>${item.name}</h2>
                <p class="price">
                    ₹${item.price.toLocaleString()}
                </p>
                <div class="qty-box">
                    <button class="qty-btn"
                            onclick="decreaseQty(${index})">
                        -
                    </button>
                    <span class="qty-value">
                        ${item.quantity}
                    </span>
                    <button class="qty-btn"
                            onclick="increaseQty(${index})">
                        +
                    </button>
                </div>
                <button class="remove-btn"
                        onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>
                    Remove
                </button>
            </div>
        </div>
        `;
    });
    calculateTotals();
}
// CALCULATE TOTALS
function calculateTotals() {
    let totalItems = 0;
    let sub = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
        sub += item.price * item.quantity;
    });
    let gstAmount = sub * 0.18;
    let total = sub + gstAmount;
    itemCount.textContent = totalItems;
    subtotal.textContent = "₹" + sub.toLocaleString();
    gst.textContent = "₹" + gstAmount.toFixed(2);
    grandTotal.textContent = "₹" + total.toFixed(2);
}
// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
// INCREASE QUANTITY
function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
}
// DECREASE QUANTITY
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        if (confirm("Remove this item from cart?")) {
            cart.splice(index, 1);
        }
    }
    saveCart();
}
// REMOVE ITEM
function removeItem(index) {
    if (confirm("Are you sure you want to remove this product?")) {
        cart.splice(index, 1);
        saveCart();
    }
}
// CHECKOUT
checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    window.location.href = "checkout.html";

});
// LOAD PAGE
displayCart();