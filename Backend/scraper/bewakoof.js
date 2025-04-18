const puppeteer = require('puppeteer');

const BEWAKOOF_OVERSIZED_URL = 'https://www.bewakoof.com/oversized-t-shirts-for-men';
const BEWAKOOF_TROUSERS_URL = 'https://www.bewakoof.com/search?q=jeans';

async function scrapeBewakoofPage(page, url) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
    await page.waitForSelector('section[data-testid="product-card"]');

    const products = await page.$$eval('section[data-testid="product-card"]', sections =>
        sections.map(section => {
            const imgTag = section.querySelector('img');
            const name = imgTag?.alt || 'No name';
            const image = imgTag?.src || '';
            const priceElement = section.querySelector('.product-card_product_price_container__Ek01t span');
            const price = priceElement ? priceElement.innerText.trim() : 'N/A';
            const anchor = section.querySelector('a');
            const url = anchor ? `https://www.bewakoof.com${anchor.getAttribute('href')}` : '';

            return { name, image, price, url };
        })
    );

    return products.slice(0, 20);
}

module.exports = async function scrapeBewakoof() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--ignore-certificate-errors'],
        ignoreHTTPSErrors: true
    });

    const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

    try {
        const [tshirts, trousers] = await Promise.all([
            scrapeBewakoofPage(page1, BEWAKOOF_OVERSIZED_URL),
            scrapeBewakoofPage(page2, BEWAKOOF_TROUSERS_URL)
        ]);

        return {
            tshirts,
            trousers
        };
    } catch (error) {
        console.error('❌ Error scraping Bewakoof:', error);
        return {
            tshirts: [],
            trousers: []
        };
    } finally {
        await browser.close();
    }
};
