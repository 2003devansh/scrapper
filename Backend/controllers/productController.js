const scrapeBewakoof = require('../scraper/bewakoof');
const scrapeSnitch = require('../scraper/snitch');
const scrapeUrbanMonkey = require('../scraper/urbanMonkeyScraper');
const saveProducts = require('../utils/saveProducts');

// 🔵 BEWAKOOF CONTROLLER
exports.getBewakoofProducts = async (req, res) => {
  try {
    const { tshirts, trousers } = await scrapeBewakoof();

    const formattedProducts = [
      ...tshirts.map(p => ({ ...p, brand: 'Bewakoof', category: 'tshirt' })),
      ...trousers.map(p => ({ ...p, brand: 'Bewakoof', category: 'trouser' }))
    ];

    const savedCount = await saveProducts(formattedProducts);
    res.status(200).json({ savedCount });
  } catch (error) {
    console.error('❌ Error fetching from Bewakoof:', error.message);
    res.status(500).json({ error: 'Unable to fetch products from Bewakoof' });
  }
};

// 🔵 SNITCH CONTROLLER
exports.getSnitchProducts = async (req, res) => {
  try {
    const { tshirts, trousers } = await scrapeSnitch();

    const formattedProducts = [
      ...tshirts.map(p => ({ ...p, brand: 'Snitch', category: 'tshirt' })),
      ...trousers.map(p => ({ ...p, brand: 'Snitch', category: 'trouser' }))
    ];

    const savedCount = await saveProducts(formattedProducts);
    res.status(200).json({ savedCount });
  } catch (error) {
    console.error('❌ Error in Snitch controller:', error.message);
    res.status(500).json({ error: 'Failed to fetch Snitch products' });
  }
};

// 🔵 URBAN MONKEY CONTROLLER
exports.getUrbanMonkeyProducts = async (req, res) => {
  try {
    const { tshirts, trousers } = await scrapeUrbanMonkey();

    const formattedProducts = [
      ...tshirts.map(p => ({ ...p, brand: 'Urban Monkey', category: 'tshirt' })),
      ...trousers.map(p => ({ ...p, brand: 'Urban Monkey', category: 'trouser' }))
    ];

    const savedCount = await saveProducts(formattedProducts);
    res.status(200).json({ savedCount });
  } catch (error) {
    console.error('❌ Error in Urban Monkey controller:', error.message);
    res.status(500).json({ error: 'Failed to fetch Urban Monkey products' });
  }
};
