const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Record a new sale
router.post('/', async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        const sale = new Sale({ product_id, quantity });
        await sale.save();

        // Update product quantity
        const product = await Product.findById(product_id);
        product.quantity -= quantity;
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve all sales transactions
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().populate('product_id');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Generate Sales Report
router.get('/report', async (req, res) => {
    const { startDate, endDate } = req.query;
    const salesReport = await Sale.aggregate([
      { $match: { timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: null, totalSales: { $sum: "$quantity" } } }
    ]);
    res.send(salesReport);
  });

  // Get Most Sold Product
router.get('/most-sold', async (req, res) => {
    const days = parseInt(req.query.days) || 30;
    const mostSoldProduct = await Sale.aggregate([
      { $match: { timestamp: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: "$productId", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);
    res.send(mostSoldProduct);
  });

// Generate a sales report for a specific time range
router.get('/report', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
        const salesReport = await Sale.find({
            timestamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        res.status(200).json(salesReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;