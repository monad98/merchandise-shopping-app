const CronJob = require('cron').CronJob;
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const Store = require('../models/store');
const BASEURL = `http://api.walmartlabs.com/v1/stores?apiKey=ve44scg6fzj9bazv3rbj7hwc&format=json`;

const getStore = ({ cities, index }) => {
  console.log(`STORE SCRAPING STARTED FOR ${cities[index]}`);
  const locationQuery = `&city=${cities[index]}`;


  request.get(`${BASEURL}&${locationQuery}`, function (err, res, json) {
    if(err) return console.log(err);
    const parsedData = JSON.parse(json);
    const stores = Array.isArray(parsedData) ? JSON.parse(json).map(s => {
      return {
        chain: 'Walmart',
        name: s.name,
        country: s.country,
        storeNo: s.no,
        streetAddress: s.streetAddress,
        city: s.city,
        stateProvCode: s.stateProvCode,
        zip: s.zip,
        loc: {
          coordinates: [s.coordinates[0], s.coordinates[1]]
        },
        phoneNumber: s.phoneNumber
      }
    }) : [];
    stores.forEach(store => {
      Store.findOne({streetAddress: store.streetAddress})
        .lean()
        .exec()
        .then(storeFound => {
          if(storeFound) return null;
          Store.create(store)
            .then(newStore => {
              console.log(newStore.name + ' was saved.');
            })
            .catch(e => console.log(e));
        });
    });
  });

  if(index >= cities.length - 1) return null;
  else {
    index++;
    console.log("Next city index is " + index + ' and city name is ' + cities[index] );
    return setTimeout(() => getStore({cities: cities, index}), 1000 * 2); // due to API RESTRICTION 5/sec
  }

};

module.exports = getStore;
// saving Walmart stores for each cities
// cities.forEach(city => {
//   getStore({city})
// });

// const job = new CronJob({
//   cronTime: '*/10 * * * * *',
//   onTick: getStore({cities: cities}),
//   timeZone: 'America/Los_Angeles',
//   start: false
// });
// job.start();