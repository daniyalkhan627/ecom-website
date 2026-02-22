let products = [
    { id: 1, name: "Gaming Laptop", price: 1200, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600" },
    { id: 2, name: "Smartphone", price: 800, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600" },
    { id: 3, name: "Wireless Headphones", price: 250, image: "https://tse3.mm.bing.net/th/id/OIP.Aa_WLPgwlp6ORGeoxK39xgHaHa?rs=1&pid=ImgDetMain&w=600" },
    { id: 4, name: "Smart Watch", price: 300, image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600" },
    { id: 5, name: "Bluetooth Speaker", price: 150, image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600" },
    { id: 6, name: "DSLR Camera", price: 950, image: "https://tse2.mm.bing.net/th/id/OIP.PCeHYP92p-3KIltzk9Sa0AHaHa?w=626&h=626&rs=1&pid=ImgDetMain&w=600" },
    { id: 7, name: "Tablet", price: 600, image: "https://tse1.mm.bing.net/th/id/OIP.0mFNmAAt_SLR-8c8hCMNvgHaEK?rs=1&pid=ImgDetMain&w=600" },
    { id: 8, name: "Gaming Console", price: 700, image: "https://th.bing.com/th/id/OIP.-t6yEsdtmm4uYV7gAUOjIwHaE7?w=600" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
    initSlider();
});

// Display Products Function
function displayProducts() {
    let productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {
        let productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-content">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add to Cart Function
function addToCart(id) {
    let product = products.find(p => p.id === id);
    
    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.id === id);
    
    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
    
    updateCartCount();
}

// Show Notification
function showNotification(message) {
    // Remove existing notification
    let existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update Cart Count
function updateCartCount() {
    let countElement = document.getElementById("cart-count");
    if (countElement) {
        let totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        countElement.innerText = totalItems;
    }
}

// Initialize Slider
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Function to show slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Add event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    setInterval(nextSlide, 5000);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            prevSlide();
        }
    }
}

// Display Cart Items (for cart.html)
function displayCart() {
    let cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; padding: 50px;">Your cart is empty</p>';
        return;
    }
    
    cartContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        
        let cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 5px;">${item.name}</h4>
                    <p>$${item.price} x ${item.quantity || 1} = $${itemTotal}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #ff4757; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                    Remove
                </button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
    
    // Add total
    let totalElement = document.createElement('div');
    totalElement.style.cssText = `
        margin-top: 30px;
        text-align: right;
        font-size: 1.5rem;
        font-weight: bold;
        padding: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `;
    totalElement.innerHTML = `Total: $${total}`;
    cartContainer.appendChild(totalElement);
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;