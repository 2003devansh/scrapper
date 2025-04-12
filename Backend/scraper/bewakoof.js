const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.bewakoof.com/men-clothing';

module.exports = async function bewakoofScraper() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const products = [];

    $('.productCardBox').each((index, element) => {
      const name = $(element).find('.productCardDetail .productCardDetailText').text().trim();
      const price = $(element).find('.discountedPriceText').text().trim();
      const image = $(element).find('img').attr('src');
      const link = 'https://www.bewakoof.com' + $(element).find('a').attr('href');

      products.push({
        name,
        price,
        image: image?.startsWith('http') ? image : `https:${image}`,
        link,
        source: 'Bewakoof'
      });
    });

    return products;
  } catch (error) {
    console.log('Error fetching data from Bewakoof:', error.message);
    return [];
  }
};
