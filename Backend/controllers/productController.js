const scrapeBewakoof = require('../scraper/bewakoof');
const scrapeSnitch  = require('../scraper/snitch') ;
const scrapeUrbanMonkey = require('../scraper/urbanMonkeyScraper');

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
      const products = await scrapeSnitch();
      res.status(200).json(products); // ✅ Explicit status
    } catch (error) {
      console.error('❌ Error in Snitch controller:', error.message);
      res.status(500).json({
        error: 'Failed to fetch Snitch products',
        details: error.message,
      });
    }
  };
  


exports.getUrbanMonkeyTshirts = async (req,res)=>{
    try {
        const data = await scrapeUrbanMonkey();
        res.status(200).json({
            source: 'Urban Monkey',
            category: 't-shirts',
            count: data.length,
            products: data
        });
    } catch (error) {
        console.error('❌ Error in Urban Monkey Controller:', error);
        res.status(500).json({ message: 'Failed to fetch Urban Monkey T-shirts' });
    }
}