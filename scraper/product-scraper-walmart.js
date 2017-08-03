// const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const Store = require('../models/store');
const Product = require('../models/product');
const Inventory = require('../models/inventory');
const BASEURL = `https://www.walmart.com/store/electrode/api/search`;
var request = require('postman-request');


const getProducts = (searchQueries, productIndex) => {
  const searchQuery = searchQueries[productIndex];

  console.log(`PRODUCT ${searchQuery} SCRAPING STARTED`);

  const storePromise = Store.find({
    loc: { $geoWithin: {
      $centerSphere: [ [ -117.1610838, 32.715738 ], 20 / 3963.2] // 20 mile
    }}
  }).lean().exec();

  storePromise.then(stores => {

    //get products list in each store
    if(!stores || !stores.length) return null;
    productsInEachStore(stores, 0);

    function productsInEachStore (stores, index) {
      const store = stores[index];
      request({
        method: 'POST',
        url: BASEURL,
        form: {
          dept:100,
          newIndex:0,
          // query:searchQuery, // is this optional?
          searchTerm:searchQuery,
          size:50, // walmart api maximum size
          storeId:store.storeNo //walmart store number
        }
      }, function (err, res, json) {
        console.log(res);
        if(err) return console.log(err);
        const parsedData = JSON.parse(json);
        const products = parsedData.result.count > 0 ?
          parsedData.result.results.map(product => ({
            product: {
              chain: "Walmart",
              storeId: store._id,
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
              price: product.price.priceInCents / 100,
              quantity: product.inventory.quantity,
            }
          })) : [];

        products.forEach(({product, inventory}) => {
          Product.findOne({storeId: store._id, sku: product.sku}) // sku: unique at least at Walmart
            .exec()
            .lean()
            .then(productFound => {
              if(productFound) {
                //then just add to inventory
                return Inventory.findOne({storeId: store._id, productId: productFound._id})
                  .exec()
                  .lean()
                  .then(foundIndex => {
                    if(foundIndex) {
                      //duplicated data scraping
                      return null
                    }

                    //create inventory doc for this specific store and product
                    Inventory.create(Object.assign(inventory, {productId: productFound._id})) //assign productId of product we just created
                      .then(() => {
                        console.log(`${productFound.name} at ${store.name} was added to db`);
                      });
                  })
              }
              Product.create(product)
                .then(newProduct => {
                  Inventory.create(Object.assign(inventory, {productId: newProduct._id})) //assign productId of product we just created
                    .then(() => {
                      console.log(`${newProduct.name} at ${store.name} was added to db`);
                    });
                })
                .catch(e => console.log(e));
            });
        });
      });

      if(index >= stores.length - 1) {
        if(productIndex >= searchQueries.length - 1) return null;
        else {
          productIndex++;
          return getProducts(searchQueries, productIndex);
        }
      }
      else {
        index++;
        setTimeout(() => productsInEachStore(stores, index), 3000); //3 second
      }

    }

  });
};

module.exports = getProducts;