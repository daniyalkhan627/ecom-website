let products = [
    { id: 1, name: "Gaming Laptop", price: 1200, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { id: 2, name: "Smartphone", price: 800, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 3, name: "Wireless Headphones", price: 250, image: "https://tse3.mm.bing.net/th/id/OIP.Aa_WLPgwlp6ORGeoxK39xgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 4, name: "Smart Watch", price: 300, image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b" },
    { id: 5, name: "Bluetooth Speaker", price: 150, image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7" },
    { id: 6, name: "DSLR Camera", price: 950, image: "https://tse2.mm.bing.net/th/id/OIP.PCeHYP92p-3KIltzk9Sa0AHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 7, name: "Tablet", price: 600, image: "https://tse1.mm.bing.net/th/id/OIP.0mFNmAAt_SLR-8c8hCMNvgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 8, name: "Gaming Console", price: 700, image: "https://th.bing.com/th/id/OIP.-t6yEsdtmm4uYV7gAUOjIwHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    let productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}">
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Added Successfully!");
    updateCartCount();
}

function updateCartCount() {
    let count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}

/* SLIDER FUNCTIONALITY */
let currentIndex = 0;
const slides = document.querySelector(".slides");

function showSlide(index) {
    if (!slides) return;
    if (index >= 3) currentIndex = 0;
    if (index < 0) currentIndex = 2;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex++;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex--;
    showSlide(currentIndex);
}

setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
}, 4000);

displayProducts();
updateCartCount();