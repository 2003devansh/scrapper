const express = require('express');
const router = express.Router();

const {getSnitchProducts,getBewakoofProducts,getUrbanMonkeyTshirts} = require('../controllers/productController');

router.get('/snitch', getSnitchProducts);
router.get('/bewakoof', getBewakoofProducts);
router.get('/urbanMonkey', getUrbanMonkeyTshirts);
// router.get('/hm', getHMProducts);
// router.get('/jockey', getJockeyProducts);


module.exports = router;