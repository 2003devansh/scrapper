const express = require('express');
const router = express.Router();

const {getSnitchProducts,getBewakoofProducts,getUrbanMonkeyProducts} = require('../controllers/productController');

router.get('/snitch', getSnitchProducts);
router.get('/bewakoof', getBewakoofProducts);
router.get('/urbanMonkey', getUrbanMonkeyProducts);
// router.get('/hm', getHMProducts);
// router.get('/jockey', getJockeyProducts);


module.exports = router;