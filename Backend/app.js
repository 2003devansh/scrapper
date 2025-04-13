const express = require('express');
const cors = require('cors'); // <-- Import CORS
const app = express();

const productsroute = require('./routes/productsRoute');

// ✅ Enable CORS (for all origins)
app.use(cors());

// OR for stricter control (only allow your Vite frontend during dev)
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/products', productsroute);

app.listen(4000, () => {
    console.log("🚀 Server is running on port 4000");
});
