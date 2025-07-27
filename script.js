// Sample product data
const products = [
  {
    title: "Women’s Red Dress",
    category: "Women",
    price: 1299,
    oldPrice: 1999,
    img: "OIP (2).webp",
    badge: "New"
  },
  {
    title: "Men’s Casual Shirt",
    category: "Men",
    price: 1099,
    oldPrice: 1599,
    img: "download (1).webp",
    badge: "Sale"
  },
  {
    title: "Kids T-shirt Pack",
    category: "Kids",
    price: 499,
    oldPrice: 799,
    img: "OIP.webp",
    badge: "Best Seller"
  },
  {
    title: "Remort control car",
    category: "Toys",
    price: 100,
    oldPrice: 200,
    img: "oIP (2).jpeg",
    badge: "New"
  },
];

// Render products dynamically
const productsGrid = document.getElementById("products-grid");

function renderProducts(productList) {
  productsGrid.innerHTML = "";

  productList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.title}">
        <div class="product-badge">${product.badge}</div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-title">${product.title}</div>
        <div class="product-price">
          <span class="current-price">₹${product.price}</span>
          <span class="original-price">₹${product.oldPrice}</span>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    productsGrid.appendChild(productCard);
  });
}

renderProducts(products); // Initial render

// Filtering Logic
const filterCheckboxes = document.querySelectorAll(".filter");

filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const activeFilters = Array.from(filterCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const filteredProducts = activeFilters.length === 0
      ? products
      : products.filter(p => activeFilters.includes(p.category));

    renderProducts(filteredProducts);
  });
});

// Cart logic
let cart = [];
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartPreview = document.getElementById("cart-preview");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCartBtn = document.getElementById("close-cart");
// ...existing code...

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.onclick = checkout;
}

// ...existing code...
// Add to cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productCard = e.target.closest(".product-card");
    const title = productCard.querySelector(".product-title").textContent;
    const price = parseInt(productCard.querySelector(".current-price").textContent.replace("₹", ""));

    const existingItem = cart.find((item) => item.title === title);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ title, price, qty: 1 });
    }

    updateCartUI();
  }
});

// Toggle cart view
cartIcon.addEventListener("click", () => {
  cartPreview.style.display =
    cartPreview.style.display === "block" ? "none" : "block";
});

// Close cart
closeCartBtn.addEventListener("click", () => {
  cartPreview.style.display = "none";
});

// Update cart UI
function updateCartUI() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    totalItems += item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <strong>${item.title}</strong><br>
        ₹${item.price} x ${item.qty}
        <div>
          <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
          <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = total;
  cartCount.textContent = totalItems;
}

// Handle + and - button clicks
cartItemsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("qty-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    const action = e.target.getAttribute("data-action");

    if (action === "increase") {
      cart[index].qty += 1;
    } else if (action === "decrease") {
      cart[index].qty -= 1;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1); // Remove item if quantity is 0
      }
    }

    updateCartUI();
  }
});
// ...existing code...

// ...existing code...

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Prompt for address and mobile number
  const address = prompt("Please enter your delivery address:");
  if (!address || address.trim() === "") {
    alert("Address is required to proceed with checkout.");
    return;
  }

  const mobile = prompt("Please enter your mobile number:");
  if (!mobile || !/^\d{10}$/.test(mobile.trim())) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Save order to localStorage
  const order = {
    items: cart.map(item => ({
      title: item.title,
      qty: item.qty,
      price: item.price
    })),
    total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    address,
    mobile,
    date: new Date().toLocaleString()
  };

  // Get existing orders or empty array
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  let summary = "Order Summary:\n";
  cart.forEach(item => {
    summary += `${item.title} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });
  summary += `\nTotal: ₹${order.total}`;
  summary += `\n\nDelivery Address: ${address}\nMobile: ${mobile}`;
  alert(summary + "\n\nThank you for your purchase!");
  cart = [];
  updateCartUI();
}

// ...existing code...
// ...existing code...

// Newsletter form
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing!");
    this.reset();
  });
}

// Smooth scroll for nav links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerText = "↑";
scrollTopBtn.className = "scroll-top";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====== Footer Section ======
const footer = document.getElementById("footer");
if (footer) {
  footer.innerHTML = `
    <footer style="background:#111; color:white; text-align:center; padding:20px 10px; margin-top:40px;">
      <p>&copy; ${new Date().getFullYear()} Fashion Store. All rights reserved.</p>
      <p>Follow us:
        <a href="#" style="color:#f0f0f0; text-decoration:underline;">Instagram</a> |
        <a href="#" style="color:#f0f0f0; text-decoration:underline;">Facebook</a> |
        <a href="#" style="color:#f0f0f0; text-decoration:underline;">Twitter</a>
      </p>
    </footer>
  `;
}

