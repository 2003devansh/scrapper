const Product = require('../model/Product');

async function saveProducts(productsArray, brand) {
    for (const item of productsArray) {
      const product = {
        name: item.name,
        image: item.image.startsWith('http') ? item.image : 'https:' + item.image,
        price: item.price,
        brand: item.brand,
        category: item.category,
        productUrl: item.url,
      };
  
      await Product.findOneAndUpdate(
        { productUrl: product.productUrl },
        product,
        { upsert: true, new: true }
      );
    }
  
    return productsArray.length;
}

module.exports = saveProducts;