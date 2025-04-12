const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www2.hm.com/en_in/men/shop-by-product/view-all.html';

module.exports = async function HMScraper() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const products = [];

    $('.product-item').each((index, element) => {
      const name = $(element).find('.item-heading').text().trim();
      const price = $(element).find('.price').text().trim();
      const image = $(element).find('img').attr('data-src');
      const link = 'https://www2.hm.com' + $(element).find('a').attr('href');

      products.push({
        name,
        price,
        image: image?.startsWith('http') ? image : `https:${image}`,
        link,
        source: 'H&M'
      });
    });

    return products;
  } catch (error) {
    console.log('Error fetching data from H&M:', error.message);
    return [];
  }
};
