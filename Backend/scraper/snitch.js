const puppeteer = require('puppeteer');


async function scrapeSnitchTshirts(page) {
    const url = 'https://www.snitch.com/men-t-shirts/buy?utm_source=google&utm_medium=cpc&utm_campaign=22156580627&utm_term=snitch%20t%20shirt&utm_content=734581607193&gad_source=1&gclid=CjwKCAjwwe2_BhBEEiwAM1I7sffd0yHYcthCV0Ej4UVxSMjPdedJoOVoaGrwWWhhoz4QsNKK1BZQPhoCWr4QAvD_BwE' ;
    console.log('Navigating to:',url);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    await page.waitForSelector('a[href*="/men-t-shirts/"]');

    const products = await page.$$eval('a[href*="/men-t-shirts/"]',anchors =>{
        const items = anchors.map(anchor =>{
            const imgTag = anchor.querySelector('img');
            const nameTag = anchor.parentElement.querySelector('h2');
            const priceTag = anchor.parentElement.querySelector('p[style*="font-size: 13px"]');

            const name = nameTag?.innerText.trim() || 'No name' ;
            const image = imgTag?.src || '' ;
            const price = priceTag?.innerText.trim() || 'N/A' ; 

            return { name, image, price };
        })
        return items.slice(0,20) ;
    });

    console.log(`✅ Scraped ${products.length} Snitch t-shirts`);
    return products;
}


async function scrapeSnitchTrousers(page){
    const url = 'https://www.snitch.com/men-trousers/buy' ;
    console.log('Navigating to:',url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    await page.waitForSelector('a[href*="/men-trousers/"]');

    const products = await page.$$eval('a[href*="/men-trousers/"]',anchors =>{
        const items = anchors.map(anchor =>{
            const imgTag = anchor.querySelector('img');
            const nameTag = anchor.parentElement.querySelector('h2');
            const priceTag = anchor.parentElement.querySelector('p[style*="font-size: 13px"]');

            const name = nameTag?.innerText.trim() || 'No name' ;
            const image = imgTag?.src || '' ;
            const price = priceTag?.innerText.trim() || 'N/A' ;

            return {name,image,price} ;
        })

        return items.slice(0,20);
    })
    console.log(`✅ Scraped ${products.length} Snitch trousers`);
    return products;
}

module.exports = async function scrapeSnitch(){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    try {
        const tshirts = await scrapeSnitchTshirts(page);
        const trousers = await scrapeSnitchTrousers(page);

        return{
            tshirts,
            trousers
        }
    } catch (error) {
        console.error('❌ Error scraping Snitch:', error);
        return {
            tshirts: [],
            trousers: []
        };
    }finally {
        await browser.close();
    }
}