const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_MAP_API_KEY,
  formatter: null
};
const geocoder = NodeGeocoder(options);
const Store = require('../models/store');
const Product = require('../models/product');
const Inventory = require('../models/inventory');
/**
 * @api {get} /api/store/near?lng=:lng&lat=:lat&addr=:addr&dist=:dist&limit=:limit Get near stores around user
 * @apiName GetNearStores
 * @apiGroup Store
 *
 * @apiParam (query params) {String} lng Longitude of a center point
 * @apiParam (query params) {String} lat Latitude of a center point
 * @apiParam (query params) {String} addr Address of a center point
 * @apiParam (query params) {String} dist (OPTIONAL) distance from a center point in miles (default 20 miles)
 * @apiParam (query params) {String} limit (OPTIONAL) maximum number of product to send, Default value is 20, Mat value is 50
 */

exports.near = (req, res, next) => {
  const limit = (!+req.query.limit || +req.query.limit > 50 || +req.query.limit < 0) ? 20: +req.query.limit;
  let dist = +req.query.dist || 20;
  let lng = +req.query.lng;
  let lat = +req.query.lat;
  const addr = req.query.addr;
  console.log(addr);
  let promise;

  if(!lng && !lat) {
    if(addr) {
      promise = geocoder.geocode(addr)
        .then(result => ([
            result[0].longitude,
            result[0].latitude
          ])
        );

    } else return res.status(400).end();
  } else {
    promise = Promise.resolve([lng, lat]);
  }

  //lng: -117.1610838, lat: 32.715738  => San Diego
  promise.then(loc=> {
    Store.find({
      loc: { $geoWithin: {
        $centerSphere: [ [ ...loc ], dist / 3963.2] // 20 mile
      }}
    })
      .limit(limit)
      .exec()
      .then(storeFound => res.json(storeFound))
      .catch(e => next(e));
  })
};


/**
 * @api {get} /api/store/near_sorted?lgn=:lng&lat=:lat&addr=:addr&dist=:dist Request sorted(from the nearest to the farthest) stores around user
 * @apiName GetNearStoresSorted
 * @apiGroup Store
 *
 * @apiParam (query params) {String} lng Longitude of a center point
 * @apiParam (query params) {String} lat Latitude of a center point
 * @apiParam (query params) {String} addr Address of a center point
 * @apiParam (query params) {String} dist (OPTIONAL) distance from a center point in miles (default 20 miles)
 */

exports.nearSorted = (req, res, next) => {
  let dist = +req.query.dist || 20;
  let lng = +req.query.lng;
  let lat = +req.query.lat;
  const addr = req.query.addr;
  let promise;

  if(!lng && !lat) {
    if(addr) {
      promise = geocoder.geocode(addr)
        .then(result => {
            console.log(result);
            return ([
              result[0].longitude,
              result[0].latitude
            ])
          }
        );

    } else return res.status(400).end();
  } else {
    promise = Promise.resolve([lng, lat]);
  }

  //lng: -117.1610838, lat: 32.715738  => San Diego
  promise.then(loc=> {
    Store.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [ ...loc ]
          },
          distanceField: "distance",
          maxDistance: 1609.344 * dist, // unit: 'Mile'
          spherical: true,
          limit: 20,
          distanceMultiplier: 1 / 1609.344
        }
      }
    ])
      .then(storeFound => res.json(storeFound))
  })
};




/**
 * @api {get} /api/store/search?query=:query&offset=:offset&limit=:limit Search for stores that carry specific items
 * @apiName StoreSearchWithProductName
 * @apiGroup Store
 *
 * @apiParam (query params) {String} query product name (or its substring)
 * @apiParam (query params) {String} offset (OPTIONAL) offset number (skip), Default value is 0
 * @apiParam (query params) {String} limit (OPTIONAL) maximum number of product to send, Default value is 20 */

exports.search = (req, res, next) => {
  const searchTerm = req.query.query;
  if(!searchTerm) return res.status(400).end();
  const limit = (!+req.query.limit || +req.query.limit > 50 || +req.query.limit < 0) ? 20: +req.query.limit;
  const offset = +req.query.offset > 0 ? +req.query.offset : 0;

  Inventory.aggregate([
    {
      $match: {
        $text: {
          $search: searchTerm
        },
        quantity: { $gt: 0 }
      }
    },
    {
      $project: {
        _id: 0, storeId: 1, productId: 1, price: 1, quantity:1, name: 1, // don't need location
        score: { $meta: "textScore" }
      }
    },
    {
      $sort: {
        score: {
          $meta: 'textScore'
        }
      },
    },
    {
      $skip: offset
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'stores',
        localField: 'storeId',
        foreignField: '_id',
        as: 'storeInfo'
      }
    }
  ])
    .then(stores => res.json(stores))
    .catch(e => next(e));
};