const mongoose = require('mongoose');

const StockTransactionSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    transaction_type: { type: String, enum: ['restock', 'sale'], required: true },
    quantity: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockTransaction', StockTransactionSchema);