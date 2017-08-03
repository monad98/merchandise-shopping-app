if(process.env.WALMART_STORE_SCRAPING === 'true') {
  const walmartStoreScraper = require('./store-scraper-walmart');
  const cities = require('./cities');
  walmartStoreScraper({cities, index: 0});
}
if(process.env.WALMART_PRODUCT_SCRAPING === 'true') {
  const walmartProductScraper = require('./product-scraper-walmart-from-json');
  const stores = require('./store-sandiego');
  walmartProductScraper(stores, 0);

}

