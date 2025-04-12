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

exports.getSnitchProducts = async (req,res)=>{
    try {
        const products = await snitchScraper();
        res.json(categorize(products));
    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch products from Snitch",
        })
    }
}

exports.getBewakoofProducts = async(req,res)=>{
    try {
        const products = await bewakoofScraper();
        res.json(categorize(products));
    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch products from Bewakoof",
        })
    }
}

exports.getHMProducts = async(req,res)=>{
    try {
        const products = await HMScraper();
        res.json(categorize(products));
    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch products from HM",
        })
    }
}