const express = require('express');
const router = express.Router();

const {getSnitchProducts,getBewakoofProducts,getHMProducts,getJockeyProducts} = require('../controllers/productController');

router.get('/snitch', getSnitchProducts);
router.get('/bewakoof', getBewakoofProducts);
// router.get('/hm', getHMProducts);
// router.get('/jockey', getJockeyProducts);


module.exports = router;