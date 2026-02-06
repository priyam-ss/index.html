// ==========================
// CONFIG (EDIT THIS LATER)
// ==========================
let whatsappNumber = "918918066156"; // replace later
let instagramLink = "https://instagram.com/"; // replace later

// ==========================
// PRODUCTS LIST
// ==========================
const products = [
  { id: 1, name: "Cute Heart Keychain", price: 120, img: "assets/p1.jpg" },
  { id: 2, name: "Couple Name Keychain", price: 180, img: "assets/p2.jpg" },
  { id: 3, name: "Aesthetic Resin Keychain", price: 150, img: "assets/p3.jpg" },
  { id: 4, name: "Butterfly Keychain", price: 130, img: "assets/p4.jpg" },
  { id: 5, name: "Photo Keychain", price: 200, img: "assets/p5.jpg" },
  { id: 6, name: "Custom Name Keychain", price: 170, img: "assets/p6.jpg" }
];

// ==========================
// CART SYSTEM
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(productId) {
  let product = products.find(p => p.id === productId);

  let existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartCount();
  alert(product.name + " added to cart 💗");
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
  let cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p style='text-align:center; margin-top:15px;'>Your cart is empty 😭</p>";
    document.getElementById("cartTotal").innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.qty}</p>
        </div>

        <div class="qty-controls">
          <button onclick="decreaseQty(${item.id})">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${item.id})">+</button>
          <button class="remove-btn" onclick="removeItem(${item.id})">✖</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = total;
}

function increaseQty(id) {
  let item = cart.find(i => i.id === id);
  item.qty += 1;
  saveCart();
  renderCart();
  updateCartCount();
}

function decreaseQty(id) {
  let item = cart.find(i => i.id === id);
  if (item.qty > 1) {
    item.qty -= 1;
  }
  saveCart();
  renderCart();
  updateCartCount();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

function checkoutWhatsapp() {
  if (cart.length === 0) {
    alert("Cart is empty 😭");
    return;
  }

  let message = "Hi Chrochely Creations! 💗%0A%0AI want to order:%0A";

  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}) ${item.name} x${item.qty} = ₹${item.price * item.qty}%0A`;
    total += item.price * item.qty;
  });

  message += `%0ATotal: ₹${total}%0A%0ADelivery: Local / Courier%0A%0AThank you!`;

  let url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}

// ==========================
// LOAD PRODUCTS
// ==========================
function loadProducts() {
  let productList = document.getElementById("productList");

  products.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <button class="main-btn" onclick="addToCart(${product.id})">Add to Cart 🛒</button>
      </div>
    `;
  });
}

// ==========================
// OTHER BUTTONS
// ==========================
function openWhatsapp() {
  window.open(`https://wa.me/${whatsappNumber}`, "_blank");
}

function openInstagram() {
  window.open(instagramLink, "_blank");
}

function customOrderWhatsapp() {
  let msg = "Hi Chrochely Creations! 💗%0AI want to place a Custom Keychain Order.%0A%0AName/Text:%0AColor:%0ADesign Idea:%0A%0AThank you!";
  window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
}

function scrollToShop() {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

// ==========================
// INIT
// ==========================
loadProducts();
updateCartCount();