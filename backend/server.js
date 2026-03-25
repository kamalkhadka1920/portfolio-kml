require('dotenv').config(); // MUST be the first line

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

// Verification Test: This will tell us if your .env is working
console.log("🔍 Verification Test:");
console.log("DB URI Found:", process.env.MONGO_URI ? "YES ✅" : "NO ❌");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
    .then(() => console.log('☁️ Connected to MongoDB Atlas!'))
    .catch(err => console.error('❌ Atlas Connection Error:', err));

// Your Contact Route
app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message" });
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});