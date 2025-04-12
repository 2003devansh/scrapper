const snitchScraper = require('../scraper/snitch');
const bewakoofScraper = require('../scraper/bewakoof');
const HMScraper = require('../scraper/HMScrapper');


const categorize = (products)=>{
    return {
        oversized_tees : products.filter((products)=>{
            return products.name.toLowerCase().includes('oversized'); 
        }),
        trouser: products.filter((products)=>{
            return ['trouser','pants','cargo'].some((keyword)=>{
                return products.name.toLowerCase().includes(keyword);
            });
        }),
        all: products
    }
}

