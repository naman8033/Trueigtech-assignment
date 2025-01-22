const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    transaction_type: { type: String, enum: ['restock', 'sale'], required: true },
    quantity: { type: Number, required: true },
    user: { type: String, required: true }, // Username or user ID
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);