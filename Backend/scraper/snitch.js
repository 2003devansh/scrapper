const puppeteer = require('puppeteer');

async function scrapeSnitchTshirts(page) {
  const url = 'https://www.snitch.com/men-oversized-t-shirts/buy';
  console.log('Navigating to:', url);

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
  await page.waitForSelector('.ProductListItem__Wrapper-sc-pz1b4t-0');

  const products = await page.$$eval('.ProductListItem__Wrapper-sc-pz1b4t-0', items => {
    return items.map(item => {
      const name = item.querySelector('h2')?.innerText.trim() || 'No name';
      const image = item.querySelector('img')?.src || '';
      const price = item.querySelector('p')?.innerText.trim() || 'N/A';
      const url = item.querySelector('a')?.href || '';

      return { name, image, price, url };
    }).slice(0, 10);
  });

  console.log(`✅ Scraped ${products.length} Snitch oversized t-shirts`);
  return products;
}

async function scrapeSnitchTrousers(page) {
  const url = 'https://www.snitch.com/men-trousers/buy';
  console.log('Navigating to:', url);

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
  await page.waitForSelector('.ProductListItem__Wrapper-sc-pz1b4t-0');

  const products = await page.$$eval('.ProductListItem__Wrapper-sc-pz1b4t-0', items => {
    return items.map(item => {
      const name = item.querySelector('h2')?.innerText.trim() || 'No name';
      const image = item.querySelector('img')?.src || '';
      const price = item.querySelector('p')?.innerText.trim() || 'N/A';
      const url = item.querySelector('a')?.href || '';

      return { name, image, price, url };
    }).slice(0, 10);
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
