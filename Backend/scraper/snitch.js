const puppeteer = require('puppeteer');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeSnitchTshirts(page) {
    const url = 'https://www.snitch.com/men-t-shirts/buy?utm_source=google&utm_medium=cpc&utm_campaign=22156580627&utm_term=snitch%20t%20shirt&utm_content=734581607193&gad_source=1&gclid=CjwKCAjwwe2_BhBEEiwAM1I7sffd0yHYcthCV0Ej4UVxSMjPdedJoOVoaGrwWWhhoz4QsNKK1BZQPhoCWr4QAvD_BwE';
    console.log('Navigating to:', url);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
    await delay(2000); // ✅ universal fallback for wait
    await page.waitForSelector('h2'); // Wait for product titles

    const products = await page.$$eval('a[href*="/men-t-shirts/"]', anchors => {
        const items = anchors.map(anchor => {
            const imgTag = anchor.querySelector('img');
            const nameTag = anchor.parentElement.querySelector('h2');
            const priceTag = anchor.parentElement.querySelector('p[style*="font-size: 13px"]');

            const name = nameTag?.innerText.trim() || 'No name';
            const image = imgTag?.src || '';
            const price = priceTag?.innerText.trim() || 'N/A';

            return { name, image, price };
        });
        return items.slice(0, 10);
    });

    console.log(`✅ Scraped ${products.length} Snitch t-shirts`);
    return products;
}

async function scrapeSnitchTrousers(page) {
    const url = 'https://www.snitch.com/men-trousers/buy';
    console.log('Navigating to:', url);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
    await delay(2000); // ✅ universal fallback for wait
    await page.waitForSelector('h2');

    const products = await page.$$eval('a[href*="/men-trousers/"]', anchors => {
        const items = anchors.map(anchor => {
            const imgTag = anchor.querySelector('img');
            const nameTag = anchor.parentElement.querySelector('h2');
            const priceTag = anchor.parentElement.querySelector('p[style*="font-size: 13px"]');

            const name = nameTag?.innerText.trim() || 'No name';
            const image = imgTag?.src || '';
            const price = priceTag?.innerText.trim() || 'N/A';

            return { name, image, price };
        });
        return items.slice(0, 10);
    });

    console.log(`✅ Scraped ${products.length} Snitch trousers`);
    return products;
}

module.exports = async function scrapeSnitch() {
    const browser = await puppeteer.launch({ headless: true });
    const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

    try {
        const [tshirts, trousers] = await Promise.all([
            scrapeSnitchTshirts(page1),
            scrapeSnitchTrousers(page2)
        ]);

        return { tshirts, trousers };
    } catch (error) {
        console.error('❌ Error scraping Snitch:', error);
        return { tshirts: [], trousers: [] };
    } finally {
        await browser.close();
    }
};
