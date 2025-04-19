const mongoose = require("mongoose");
const Product = require("../model/Product");

async function deleteFallbacks() {
  try {
    await mongoose.connect("mongodb+srv://DEVANSH:DEVANSH@cluster0.95ofrxw.mongodb.net/");
    
    const result = await Product.deleteMany({
      brand: 'Bewakoof',
      image: /fallback-placeholder/,
    });

    console.log(`🧹 Deleted ${result.deletedCount} fallback-image products for Bewakoof`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error deleting:', err);
    process.exit(1);
  }
}

deleteFallbacks();
