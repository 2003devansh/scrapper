const puppeteer = require('puppeteer');

async function scrapeUrbanMonkeyTshirts(page) {
    const url = 'https://www.urbanmonkey.com/collections/t-shirts?srsltid=AfmBOoqWQ51ADY_HM3o32t1z7jBBcg2wz6f4RpWiOhkEMY73KckcmUsJ';
    console.log('Navigating to:', url);

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
        await page.waitForSelector('.t4s-product-wrapper');

        const products = await page.$$eval('.t4s-product-wrapper', items =>
            items.slice(0, 10).map(item => {
                const name = item.querySelector('.t4s-product-title')?.innerText.trim() || 'No name';
                const imgTag = item.querySelector('img');
                const image =
                    imgTag?.getAttribute('data-src')?.trim() ||
                    imgTag?.getAttribute('srcset')?.split(' ')[0] ||
                    imgTag?.src || '';
                const price = item.querySelector('.money')?.innerText.trim() || 'N/A';
                return { name, image, price };
            })
        );

        console.log(`✅ Scraped ${products.length} Urban Monkey t-shirts`);
        return products;
    } catch (err) {
        console.error('❌ Error in scrapeUrbanMonkeyTshirts:', err.message);
        return [];
    }
}

async function scrapeUrbanMonkeyTrousers(page) {
    const url = 'https://www.urbanmonkey.com/collections/trousers-pants?srsltid=AfmBOooVinX-um3fk9VN41EfwayvQ-ysdoQT2UYzU7Pz-3OrmdPrvHWD';
    console.log('Navigating to:', url);

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
        await page.waitForSelector('.t4s-product-wrapper');

        const products = await page.$$eval('.t4s-product-wrapper', items =>
            items.slice(0, 10).map(item => {
                const name = item.querySelector('.t4s-product-title')?.innerText.trim() || 'No name';
                const imgTag = item.querySelector('img');
                const image =
                    imgTag?.getAttribute('data-src')?.trim() ||
                    imgTag?.getAttribute('srcset')?.split(' ')[0] ||
                    imgTag?.src || '';
                const price = item.querySelector('.money')?.innerText.trim() || 'N/A';
                return { name, image, price };
            })
        );

        console.log(`✅ Scraped ${products.length} Urban Monkey trousers`);
        return products;
    } catch (err) {
        console.error('❌ Error in scrapeUrbanMonkeyTrousers:', err.message);
        return [];
    }
}

module.exports = async function scrapeUrbanMonkey() {
    const browser = await puppeteer.launch({ headless: true });
    const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

    try {
        const [tshirts, trousers] = await Promise.all([
            scrapeUrbanMonkeyTshirts(page1),
            scrapeUrbanMonkeyTrousers(page2)
        ]);

        return { tshirts, trousers };
    } catch (err) {
        console.error('❌ Error scraping Urban Monkey:', err.message);
        return { tshirts: [], trousers: [] };
    } finally {
        await browser.close();
    }
};
