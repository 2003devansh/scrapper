const axios  =  require('axios');
const cheerio = require('cheerio');

const url = 'https://www.snitch.co.in/collections/all' ;

module.exports = async function snitchScraper(){
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const products = [];
        $('.product-grid-item').each((index,element)=>{
            const name = $(element).find('.product-title').text().trim();
            const price = $(element).find('.product-item--regular').text().trim();
            const image = $(element).find('img').attr('src');
            const link = 'https://www.snitch.co.in' + $(element).find('a').attr('href');

            products.push({
                name,
                price,
                image: image?.startsWith('http') ? image : `https:${image}`,
                link,
                source: 'Snitch'
            })
        })
       return products ; 

    } catch (error) {
        console.log('Error fetching data from Snitch:', error.message) ;
        return [] ;
    }
}