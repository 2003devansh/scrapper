const puppeteer = require('puppeteer');

async function scrapeSnitchTshirts() {
    const url = 'https://www.snitch.com/men-t-shirts/buy';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log('Navigating to:', url);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

        await page.waitForSelector('.ProductCard__CardWrapper-sc-1v5tz3n-0');

        const products = await page.$$eval('.ProductCard__CardWrapper-sc-1v5tz3n-0', cards => {
            return cards.map(card => {
                const imgTag = card.querySelector('img');
                const name = imgTag?.alt || 'No name';
                const image = imgTag?.src || '';
                const priceElement = card.querySelector('div[class*="Price__PriceWrapper"] span');
                const price = priceElement ? priceElement.innerText.trim() : 'N/A';

                return { name, image, price };
            });
        });

        console.log(`✅ Scraped ${products.length} Snitch t-shirts`);
        return products.slice(0, 20); // limit to 20
    } catch (error) {
        console.error('❌ Error scraping Snitch:', error);
        return [];
    } finally {
        await browser.close();
    }
}

module.exports = scrapeSnitchTshirts;
