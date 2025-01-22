const express = require('express');
const Product = require('../models/Product');
const StockTransaction = require('../models/StockTransaction');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Add Product
router.post('/', authenticateToken, authorizeRole('Admin'), async (req, res) => {
  console.log("inside authentication");
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

// Update Product
router.put('/:id', authenticateToken, authorizeRole('Admin'), async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedProduct) {
    return res.status(404).send('Product not found');
  }
  res.send(updatedProduct);
});

// Delete Product
router.delete('/:id', authenticateToken, authorizeRole('Admin'), async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).send('Product not found');
  }
  res.send(deletedProduct);
});
 

// Retrieve all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// // Update a product
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// Delete a product
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//         if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Restock Product
router.post('/:id/restock', authenticateToken, authorizeRole('Admin'), async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    product.quantity += quantity;
    await product.save();
    
    const transaction = new StockTransaction({ productId: product._id, type: 'restock', quantity });
    await transaction.save();
    
    res.send(product);
  });
  
  // Sell Product
  router.post('/:id/sell', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    if (product.quantity < quantity) {
      return res.status(400).send('Insufficient stock');
    }
  
    product.quantity -= quantity;
    await product.save();
    
    const transaction = new StockTransaction({ productId: product._id, type: 'sale', quantity });
    await transaction.save();
    
    const sale = new Sale({ productId: product._id, quantity, timestamp: new Date() });
    await sale.save();
    
    res.send(product);
  });
  
  // View Low-Stock Products
  router.get('/low-stock', async (req, res) => {
    const threshold = parseInt(req.query.threshold) || 5;
    const lowStockProducts = await Product.find({ quantity: { $lt: threshold } });
    res.send(lowStockProducts);
  });

module.exports = router;