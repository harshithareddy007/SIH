if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('This script is intended for browser execution only.');
    return;
}

let cart = [];

function initializeCart() {
    console.log('Initializing cart');
    fetchCart();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded, running initializeCart');
    initializeCart();
});

async function fetchCart() {
    console.log('fetchCart called');
    try {
        const response = await fetch('/get-cart');
        if (!response.ok) throw new Error('Failed to fetch cart');
        cart = await response.json();
        console.log('Fetched cart:', cart);
        updateCart();
        updateCartCount();
        updateRemoveButtons();
    } catch (e) {
        console.error('Error fetching cart:', e);
    }
}

async function addToCart(product, price) {
    console.log('addToCart called:', product, price);
    try {
        const response = await fetch('/add-to-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, price })
        });
        if (!response.ok) throw new Error('Failed to add item');
        cart = await response.json();
        console.log('Updated cart:', cart);
        alert(`${product} added to cart!`);
        updateCart();
        updateCartCount();
        updateRemoveButtons();
    } catch (e) {
        console.error('Error in addToCart:', e);
        alert('Error adding item to cart. Check console for details.');
    }
}

async function removeFromCart(product) {
    console.log('removeFromCart called:', product);
    try {
        const response = await fetch('/remove-from-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product })
        });
        if (!response.ok) throw new Error('Failed to remove item');
        cart = await response.json();
        console.log('Updated cart:', cart);
        alert(`${product} removed from cart!`);
        updateCart();
        updateCartCount();
        updateRemoveButtons();
    } catch (e) {
        console.error('Error in removeFromCart:', e);
        alert('Error removing item from cart. Check console for details.');
    }
}

function updateCart() {
    console.log('updateCart called');
    try {
        const cartItemsDiv = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        if (!cartItemsDiv || !totalPriceElement) {
            console.log('Cart elements not found, likely not on cart.html');
            return;
        }
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceElement.innerHTML = 'Total: ₹0.00';
            console.log('Cart is empty');
        } else {
            cartItemsDiv.innerHTML = cart.map(item => {
                return (
                    '<div class="cart-item">' +
                    '<p>' + item.product + ' (x' + item.quantity + ') - ₹' + (item.price * item.quantity).toFixed(2) + '</p>' +
                    '<button class="remove-btn" onclick="removeFromCart(\'' + item.product + '\')">Remove</button>' +
                    '</div>'
                );
            }).join('');
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalPriceElement.innerHTML = 'Total: ₹' + total.toFixed(2);
            console.log('Cart updated, total:', total);
        }
    } catch (e) {
        console.error('Error in updateCart:', e);
    }
}

function updateCartCount() {
    console.log('updateCartCount called');
    try {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.innerHTML = totalItems;
            console.log('Cart count set to:', totalItems);
        } else {
            console.log('Cart count element not found');
        }
    } catch (e) {
        console.error('Error in updateCartCount:', e);
    }
}

function updateRemoveButtons() {
    console.log('updateRemoveButtons called');
    try {
        if (!window.location.pathname.includes('index.html')) {
            console.log('Not on index.html, skipping remove buttons');
            return;
        }
        const products = ['Paracetamol', 'Aspirin', 'Cough Syrup', 'Cetirizine', 'Ayurvedic Cough Syrup', 'Calpol', 'Paracip-500'];
        products.forEach(product => {
            const removeButton = document.querySelector(`#product-${product.toLowerCase().replace(' ', '-')} .remove-from-cart`);
            const cartItem = cart.find(item => item.product === product);
            if (removeButton) {
                removeButton.style.display = cartItem ? 'inline-block' : 'none';
                console.log(`Set ${product} remove button display to ${removeButton.style.display}`);
            } else {
                console.warn(`Remove button not found for ${product}`);
            }
        });
    } catch (e) {
        console.error('Error in updateRemoveButtons:', e);
    }
}