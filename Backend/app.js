const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ← Load environment variables

const connectDB = require('./db/db');
const productsRoute = require('./routes/productsRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ← Good to have in case you accept JSON data in POST requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productsRoute);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
