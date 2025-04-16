const puppeteer = require('puppeteer');

async function scrapeBewakoofOversized(page) {
    const url = 'https://www.bewakoof.com/oversized-t-shirts-for-men';
    console.log('Navigating to:', url);
    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
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
        return products.slice(0, 10);
    } catch (err) {
        console.error('❌ Error in scrapeBewakoofOversized:', err.message);
        return [];
    }
}

async function scrapeBewakoofTrousers(page) {
    const url = 'https://www.bewakoof.com/search?q=jeans';
    console.log('Navigating to:', url);
    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
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
        return products.slice(0, 10);
    } catch (err) {
        console.error('❌ Error in scrapeBewakoofTrousers:', err.message);
        return [];
    }
}

module.exports = async function scrapeBewakoof() {
    const browser = await puppeteer.launch({ headless: true });
    const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

    try {
        const [oversizedTees, trousers] = await Promise.all([
            scrapeBewakoofOversized(page1),
            scrapeBewakoofTrousers(page2)
        ]);

        return {
            oversized_tees: oversizedTees,
            trousers: trousers
        };
    } catch (error) {
        console.error('❌ Error scraping Bewakoof:', error);
        return {
            oversized_tees: [],
            trousers: []
        };
    } finally {
        await browser.close();
    }
};
