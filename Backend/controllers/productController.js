const scrapeBewakoof = require('../scraper/bewakoof');
const scrapeSnitchTshirts  = require('../scraper/snitch') ;

exports.getBewakoofProducts = async (req, res) => {
    try {
        const data = await scrapeBewakoof();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Bewakoof:', error.message);
        res.status(500).json({ error: 'Unable to fetch products from Bewakoof' });
    }
};


exports.getSnitchProducts = async (req, res) => {
    try {
        const products = await scrapeSnitchTshirts();
        res.json(products);
    } catch (error) {
        console.error('❌ Error in Snitch controller:', error.message);
        res.status(500).json({ error: 'Failed to fetch Snitch t-shirts' });
    }
}