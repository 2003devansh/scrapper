const puppeteer = require('puppeteer');


const URBAN_TSHIRTS_URL = 'https://www.urbanmonkey.com/collections/t-shirts';
const URBAN_BOTTOMS_URL = 'https://www.urbanmonkey.com/collections/bottoms';

async function scrapeUrbanMonkeyPage(page, url) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

    await page.waitForSelector('div.t4s-product-wrapper');

    const products = await page.$$eval('div.t4s-product-wrapper', cards => {
            return cards.map(card => {
                const img = card.querySelector('img');
                const name = img?.alt || 'No name';
        
                const image =
                    img?.getAttribute('data-srcset')?.split(' ')[0] ||
                    img?.getAttribute('data-src') ||
                    img?.src ||
                    '';
        
                const url = card.querySelector('a.t4s-full-width-link')?.href || '';
                const price = card.querySelector('span.money')?.textContent.trim() || 'N/A';
        
                return { name, image, price, url };
            });
        });
        

    return products.slice(0, 20);
}

module.exports = async function scrapeUrbanMonkey() {
    const browser = await puppeteer.launch({ headless: true });
    const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

    try {
        const [tshirts, bottoms] = await Promise.all([
            scrapeUrbanMonkeyPage(page1, URBAN_TSHIRTS_URL),
            scrapeUrbanMonkeyPage(page2, URBAN_BOTTOMS_URL)
        ]);

        return {
            tshirts,
            trousers: bottoms
        };
    } catch (error) {
        console.error('❌ Error scraping Urban Monkey:', error);
        return {
            tshirts: [],
            trousers: []
        };
    } finally {
        await browser.close();
    }
};