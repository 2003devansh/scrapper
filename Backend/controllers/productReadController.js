const Product = require('../model/Product');

exports.getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('❌ Error fetching products from DB:', error.message);
        res.status(500).json({ error: 'Failed to fetch products from database' });
    }
}


exports.getProductsByFilter = async(req,res)=>{
    try {
        const { brand, category } = req.query;
        const filter = {};
    
        if (brand) filter.brand = new RegExp(`^${brand}$`, 'i'); 
        if (category) filter.category = category;
    
        const products = await Product.find(filter);
        res.status(200).json(products);
      } catch (error) {
        console.error('❌ Error fetching filtered products:', error.message);
        res.status(500).json({ error: 'Failed to fetch filtered products' });
    }
}