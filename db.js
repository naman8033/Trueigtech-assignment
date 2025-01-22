// password - thqYNYGZPggIv4tn
// username - namancool251
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://namancool251:thqYNYGZPggIv4tn@cluster0.famit.mongodb.net/inventorymanagement');
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;