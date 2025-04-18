const puppeteer = require('puppeteer');

const SNITCH_TSHIRTS_URL = 'https://www.snitch.com/men-t-shirts/buy';
const SNITCH_TROUSERS_URL = 'https://www.snitch.com/men-trousers/buy';

async function scrapePage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('a[href^="/"] img');

  const products = await page.$$eval('a[href^="/"]', (anchors) => {
    return anchors
      .map((anchor) => {
        const img = anchor.querySelector('img');
        const container = anchor.closest('div'); // broader container
        const nameEl = container?.querySelector('h2');
        const text = container?.innerText || '';

        const name = nameEl?.innerText || 'N/A';
        const priceMatch = text.match(/₹\s?\d{3,5}/);
        const price = priceMatch ? priceMatch[0] : 'N/A';
        const image = img?.src || '';
        const url = `https://www.snitch.com${anchor.getAttribute('href')}`;

        if (!name || !price || !image) return null;

        return { name, price, image, url };
      })
      .filter(Boolean)
      .slice(0, 20); // limit to 20
  });

  return products;
}

async function scrapeSnitchTshirts(page) {
  return await scrapePage(page, SNITCH_TSHIRTS_URL);
}

async function scrapeSnitchTrousers(page) {
  return await scrapePage(page, SNITCH_TROUSERS_URL);
}

module.exports = async function scrapeSnitch() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

  try {
    const [tshirts, trousers] = await Promise.all([
      scrapeSnitchTshirts(page1),
      scrapeSnitchTrousers(page2),
    ]);

    return { tshirts, trousers };
  } catch (error) {
    console.error('❌ Error scraping Snitch:', error);
    return { tshirts: [], trousers: [] };
  } finally {
    await browser.close();
  }
};
