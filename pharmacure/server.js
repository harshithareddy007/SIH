const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

// Helper function to read cart.json
async function readCart() {
    try {
        const data = await fs.readFile('cart.json', 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error('Error reading cart.json:', e.message, e.stack);
        return [];
    }
}

// Helper function to write to cart.json
async function writeCart(cart) {
    try {
        await fs.writeFile('cart.json', JSON.stringify(cart, null, 2), 'utf8');
    } catch (e) {
        console.error('Error writing to cart.json:', e.message, e.stack);
        throw e;
    }
}

// API to get cart contents
app.get('/get-cart', async (req, res) => {
    try {
        const cart = await readCart();
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: 'Failed to load cart', details: e.message });
    }
});

// API to add item to cart
app.post('/add-to-cart', async (req, res) => {
    try {
        const { product, price } = req.body;
        if (!product || !price) {
            return res.status(400).json({ error: 'Product and price are required' });
        }
        const cart = await readCart();
        const index = cart.findIndex(item => item.product === product);
        if (index > -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ product, price, quantity: 1 });
        }
        await writeCart(cart);
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: 'Failed to add item to cart', details: e.message });
    }
});

// API to remove item from cart
app.post('/remove-from-cart', async (req, res) => {
    try {
        const { product } = req.body;
        if (!product) {
            return res.status(400).json({ error: 'Product is required' });
        }
        let cart = await readCart();
        const index = cart.findIndex(item => item.product === product);
        if (index > -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            await writeCart(cart);
        }
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: 'Failed to remove item from cart', details: e.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});