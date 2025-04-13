const puppeteer = require('puppeteer');

// Scraper for oversized t-shirts
async function scrapeBewakoofOversized() {
    const url = 'https://www.bewakoof.com/oversized-t-shirts-for-men';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log('Navigating to:', url);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
        await page.waitForSelector('section[data-testid="product-card"]');

        const products = await page.$$eval('section[data-testid="product-card"]', sections => {
            return sections.map(section => {
                const imgTag = section.querySelector('img');
                const name = imgTag?.alt || 'No name';
                const image = imgTag?.src || '';
                const priceElement = section.querySelector('.product-card_product_price_container__Ek01t span');
                const price = priceElement ? priceElement.innerText.trim() : 'N/A';

                return { name, image, price };
            });
        });

        console.log(`✅ Scraped ${products.length} oversized t-shirts`);
        return products.slice(0, 20); // limit to 20
    } catch (error) {
        console.error('❌ Error scraping oversized t-shirts:', error);
        return [];
    } finally {
        await browser.close();
    }
}

// Scraper for trousers/jeans
async function scrapeBewakoofTrousers() {
    const url = 'https://www.bewakoof.com/search?q=jeans';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log('Navigating to:', url);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
        await page.waitForSelector('section[data-testid="product-card"]');

        const products = await page.$$eval('section[data-testid="product-card"]', sections => {
            return sections.map(section => {
                const imgTag = section.querySelector('img');
                const name = imgTag?.alt || 'No name';
                const image = imgTag?.src || '';
                const priceElement = section.querySelector('.product-card_product_price_container__Ek01t span');
                const price = priceElement ? priceElement.innerText.trim() : 'N/A';

                return { name, image, price };
            });
        });

        console.log(`✅ Scraped ${products.length} trousers`);
        return products.slice(0, 20); // limit to 20
    } catch (error) {
        console.error('❌ Error scraping trousers:', error);
        return [];
    } finally {
        await browser.close();
    }
}

// Combined export
module.exports = async function scrapeBewakoof() {
    const oversizedTees = await scrapeBewakoofOversized();
    const trousers = await scrapeBewakoofTrousers();

    return {
        oversized_tees: oversizedTees,
        trousers: trousers
    };
};
