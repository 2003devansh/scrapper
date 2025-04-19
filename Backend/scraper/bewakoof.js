const puppeteer = require('puppeteer');

const BEWAKOOF_TSHIRTS_URL = 'https://www.bewakoof.com/oversized-t-shirts-for-men';
const BEWAKOOF_TROUSERS_URL = 'https://www.bewakoof.com/mens-denim';

async function scrapeBewakoofPage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

  // Wait for product cards to load
  await page.waitForSelector('section[data-testid="product-card"]', { timeout: 30000 });

  // Short delay to ensure content is fully rendered
  await new Promise(resolve => setTimeout(resolve, 1500));

  const products = await page.$$eval('section[data-testid="product-card"]', (cards) => {
    return cards.map((card) => {
      const anchor = card.querySelector('a[data-testid="product-card-link"]');
      const productUrl = anchor ? 'https://www.bewakoof.com' + anchor.getAttribute('href') : '';

      const img = card.querySelector('img');
      const image = img?.getAttribute('src') || img?.getAttribute('data-src') || '';

      // ✅ Skip if image is missing or fallback
      if (!image || image.includes('fallback-placeholder')) return null;

      const name =
        card.querySelector('h3')?.textContent.trim() ||
        img?.alt?.trim() ||
        '';

      const priceSpan = card.querySelector('div[class*="product_price_container"] span');
      const price = priceSpan?.textContent.trim() || '';

      return { name, image, price, productUrl };
    }).filter(Boolean); // Removes null entries
  });

  return products.slice(0, 20); // Limit to top 20
}

module.exports = async function scrapeBewakoof() {
  const browser = await puppeteer.launch({ headless: true });
  const [page1, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

  try {
    const [tshirts, trousers] = await Promise.all([
      scrapeBewakoofPage(page1, BEWAKOOF_TSHIRTS_URL),
      scrapeBewakoofPage(page2, BEWAKOOF_TROUSERS_URL),
    ]);

    return { tshirts, trousers };
  } catch (error) {
    console.error('❌ Error scraping Bewakoof:', error);
    return { tshirts: [], trousers: [] };
  } finally {
    await browser.close();
  }
};
