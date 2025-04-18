const express = require('express');
const router = express.Router();

const {
  getSnitchProducts,
  getBewakoofProducts,
  getUrbanMonkeyProducts
} = require('../controllers/productController');

const {
  getAllProducts,
  getProductsByFilter
} = require('../controllers/productReadController');

// ▶ Scraper endpoints (save to MongoDB on request)
router.get('/snitch', getSnitchProducts);
router.get('/bewakoof', getBewakoofProducts);
router.get('/urbanMonkey', getUrbanMonkeyProducts);

// ▶ MongoDB fetch endpoints (fast + reliable)
router.get('/saved', getAllProducts); // All products
router.get('/saved/filter', getProductsByFilter); // Filtered by query

module.exports = router;
