const Store = require('../models/store');
const Inventory = require('../models/inventory');

/**
 * @api {get} /api/product Get merchandise in all of the store in ascending order according to price
 * @apiName GetMerchandise
 * @apiGroup Product
 *
 * @apiParam (query params) {String} offset (OPTIONAL) offset number (skip), Default value is 0
 * @apiParam (query params) {String} limit (OPTIONAL) maximum number of product to send, Default value is 20
 *
 */

exports.index = (req, res, next) => {
  const limit = (!+req.query.limit || +req.query.limit > 20 || +req.query.limit < 0) ? 20: +req.query.limit;
  const skip = +req.query.offset > 0 ? +req.query.offset : 0;

  let stages = [
    {
      $match: { quantity: { $gt: 0}, price: {$gt: 0}}
    },
    {
      $sort: { price: 1}
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'details'
      }
    },
    {
      $lookup: {
        from: 'stores',
        localField: 'storeId',
        foreignField: '_id',
        as: 'storeInfo'
      }
    },
    {
      $project: {
        _id: 1, quantity:1, price: 1, distance: 1, details:1,
        'storeInfo._id': 1, 'storeInfo.name': 1, 'storeInfo.city': 1, 'storeInfo.streetAddress': 1,
        'storeInfo.stateProvCode': 1, 'storeInfo.phoneNumber': 1
      }
    }
  ];

  Inventory.aggregate(stages)
    .then(products => res.json(products))
    .catch(e => next(e));
};


/**
 * @api {get} /api/product Get the list of merchandise of stores that are closest to the user.
 * @apiName GetMerchandise
 * @apiGroup Product
 *
 * @apiParam (query params) {String} offset (OPTIONAL) offset number (skip), Default value is 0
 * @apiParam (query params) {String} limit (OPTIONAL) maximum number of product to send, Default value is 20, Mat value is 50
 * @apiParam (query params) {String} lng Longitude of a center point
 * @apiParam (query params) {String} lat Latitude of a center point
 *
 */

exports.nearest = (req, res, next) => {
  //skipped a range validation for now
  if(!req.query.lng || !req.query.lat) {
    return res.status(400).end();
  }
  const lng = +req.query.lng, lat = +req.query.lat;
  const limit = (!+req.query.limit || +req.query.limit > 50 || +req.query.limit < 0) ? 20: +req.query.limit;
  const offset = +req.query.offset > 0 ? +req.query.offset : 0;


  if(!offset) { // if there is no offset, this means no pagination. 1 query
    let stages = [
      {
        $geoNear: {
          query: { quantity: { $gt: 0}, price: {$gt: 0}},
          near: {
            type: 'Point',
            coordinates: [ lng, lat ]
          },
          distanceField: 'distance',
          maxDistance: 1609.344 * 100, //within 100 miles
          spherical: true,
          limit: limit,
          distanceMultiplier: 1 / 1609.344
        }
      },
      {
        $sort: { price: 1}
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'details'
        }
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'storeId',
          foreignField: '_id',
          as: 'storeInfo'
        }
      },
      {
        $project: {
          _id: 1, quantity:1, price: 1, distance: 1, details:1,
          'storeInfo._id': 1, 'storeInfo.name': 1, 'storeInfo.city': 1, 'storeInfo.streetAddress': 1,
          'storeInfo.stateProvCode': 1, 'storeInfo.phoneNumber': 1
        }
      }
    ];

    Inventory.aggregate(stages)
      .then(products => res.json(products))
      .catch(e => next(e));

  } else { // user wants pagination

    Store.aggregate([ // get nearest store
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [ lng, lat ]
          },
          distanceField: "distance",
          maxDistance: 1609.344 * 100, // within 100 miles
          spherical: true,
          limit: 1,
          distanceMultiplier: 1 / 1609.344
        }
      }
    ])
      .then(storeFound => { //get this store's all merchandise with price sort
        if(!storeFound.length) return res.json([]);
        let stages = [
          {
            $match: { storeId: storeFound[0]._id, quantity: { $gt: 0}, price: {$gt: 0}}
          },
          {
            $sort: { price: 1}
          },
          {
            $skip: offset
          },
          {
            $limit: limit
          },
          {
            $lookup: {
              from: 'products',
              localField: 'productId',
              foreignField: '_id',
              as: 'details'
            }
          },
          {
            $project: {
              _id: 1, quantity:1, price: 1, distance: 1, details:1
            }
          }
        ];

        Inventory.aggregate(stages)
          .then(products => {
            return res.json({products, store: storeFound})
          })
          .catch(e => next(e));

      });
  }
};
