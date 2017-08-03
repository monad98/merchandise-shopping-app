const path = require('path');
const Store = require('../models/store');
const Product = require('../models/product');
const Inventory = require('../models/inventory');
const fs = require('fs');

function productsInEachStore (stores, index) {
  const store = stores[index];
  const searchResults = JSON.parse(fs.readFileSync(`./scraper/${store.storeNo}.json`, 'utf8'));

  saveProducts(searchResults, 0);

  function saveProducts(searchResults, pIndex) {
    const rawProducts = searchResults[pIndex];
    const products =
      rawProducts.result.results.map(product => ({
        product: {
          chain: "Walmart",
          upc: product.productId.upc,
          sku: product.productId.WWWItemId,
          name: product.name,
          department: product.department.name,
          images: product.images,
          url: product.walmartCanonicalUrl ? `https://www.walmart.com${product.walmartCanonicalUrl}` : `https://www.walmart.com`
        },
        inventory: {
          storeId: store._id,
          loc: store.loc,
          price: calculatePrice(product),
          quantity: product.inventory.quantity,
        }
      }));

    products.forEach(({product, inventory}) => {
      Product.findOne({sku: product.sku}) // sku: unique at least at Walmart
        .lean()
        .exec()
        .then(productFound => {
          if(productFound) { // we already have this product in db, so just add this to inventory
            //then just add to inventory
            return Inventory.findOne({storeId: store._id, productId: productFound._id})
              .lean()
              .exec()
              .then(foundIndex => {
                if(foundIndex) {
                  //duplicated data scraping
                  return null
                }

                //create inventory doc for this specific store and product
                Inventory.create(Object.assign(inventory, {name: productFound.name, productId: productFound._id})) //assign productId of product we just created
                  .then(() => {
                    console.log(`${productFound.name} at ${store.name} was added to db`);
                  });
              })
          }
          Product.create(product)
            .then(newProduct => {
              Inventory.create(Object.assign(inventory, {name: newProduct.name, productId: newProduct._id})) //assign productId of product we just created
                .then(() => {
                  console.log(`${newProduct.name} at ${store.name} was added to db`);
                });
            })
            .catch(e => console.log(e));
        });



    });

    if(pIndex >= searchResults.length - 1) { //means this is last index of searchResults array
      if(index >= stores.length - 1) {
        return null;
      }
      else {
        index++;
        return setTimeout(() => productsInEachStore(stores, index), 500); //0.5 seconds
      }
    } else {
      pIndex++;
      return setTimeout(() => saveProducts(searchResults, pIndex), 500); // 0.5 seconds
    }
  }

}


//helper to make a little variance in price
function calculatePrice(product) {
  if(product.price && product.price.priceInCents) {
    return Math.floor((1 + Math.floor(Math.random() * 10)/10) * product.price.priceInCents) / 100;
  }
  else return null;
}

module.exports = productsInEachStore;