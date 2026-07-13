// GET PRODUCT DATA
console.log("Script Loaded");
console.log(products);
const product = products[0];
// LOAD PRODUCT DETAILS
const productName = document.getElementById("productName");
const price = document.getElementById("price");
const mainImage = document.getElementById("mainImage");
productName.textContent = product.name;
price.textContent = "₹" + product.price.toLocaleString();
mainImage.src = product.images[0];
// CREATE THUMBNAILS
const thumbnailContainer = document.getElementById("thumbnailContainer");
thumbnailContainer.innerHTML = "";
product.images.forEach((image, index) => {
    thumbnailContainer.innerHTML += `
        <img src="${image}"
             class="thumb ${index === 0 ? 'active' : ''}"
             alt="Product Image">
    `;
});
// IMAGE GALLERY
const thumbnails = document.querySelectorAll(".thumb");
thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
        thumbnails.forEach((img) => {
            img.classList.remove("active");
        });
        thumb.classList.add("active");
    });
});
// IMAGE ZOOM
mainImage.addEventListener("mousemove", (e) => {
    const rect = mainImage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mainImage.style.transformOrigin = `${x}% ${y}%`;
});
mainImage.addEventListener("mouseenter", () => {
    mainImage.style.transform = "scale(1.5)";
});
mainImage.addEventListener("mouseleave", () => {
    mainImage.style.transform = "scale(1)";
});
// PRODUCT OPTIONS
const optionButtons = document.querySelectorAll(".option");
optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const parent = button.parentElement;
        parent.querySelectorAll(".option").forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
    });
});
// QUANTITY
const qtyInput = document.getElementById("qty");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
plusBtn.addEventListener("click", () => {
    qtyInput.value = Number(qtyInput.value) + 1;
});
minusBtn.addEventListener("click", () => {
    if (Number(qtyInput.value) > 1) {
        qtyInput.value = Number(qtyInput.value) - 1;
    }
});
qtyInput.addEventListener("change", () => {
    if (qtyInput.value < 1 || qtyInput.value === "") {
        qtyInput.value = 1;
    }
});
// LOCAL STORAGE FUNCTIONS
function getCart() {

    const cart = localStorage.getItem("cart");

    return cart ? JSON.parse(cart) : [];

}

function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

}
// CART COUNT
function updateCartCount() {
    const cart = getCart();
    let total = 0;
    cart.forEach((item) => {
        total += item.quantity;
    });
    document.getElementById("cartCount").textContent = total;
}
updateCartCount();
// ADD TO CART
const cartBtn = document.getElementById("cartBtn");
cartBtn.addEventListener("click", () => {
    const cart = getCart();
    const quantity = Number(qtyInput.value);
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    saveCart(cart);
    updateCartCount();
    cartBtn.innerHTML =
        '<i class="fa-solid fa-check"></i> Added';
    cartBtn.style.background = "#28a745";
    setTimeout(() => {
        cartBtn.innerHTML =
            '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';
        cartBtn.style.background = "#ff9800";
    }, 1500);
});
// BUY NOW
const buyBtn = document.getElementById("buyBtn");
buyBtn.addEventListener("click", () => {
    const quantity = Number(qtyInput.value);
    const cart = [{
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
    }];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
});
// WISHLIST
const heartIcon = document.querySelector(".fa-heart");
let liked = false;
heartIcon.addEventListener("click", () => {
    liked = !liked;
    heartIcon.style.color = liked ? "red" : "#444";
});
// RELATED PRODUCTS
const relatedGrid = document.getElementById("relatedGrid");
relatedGrid.innerHTML = "";
products.slice(1).forEach((item) => {
    relatedGrid.innerHTML += `
    <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price.toLocaleString()}</p>
    </div>
    `;
});
// RELATED CARD EFFECT
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow =
            "0 15px 30px rgba(0,0,0,.15)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.boxShadow =
            "0 5px 15px rgba(0,0,0,.08)";
    });
});
// PAGE LOAD ANIMATION
window.addEventListener("load", () => {
    const container = document.querySelector(".product-container");
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
});