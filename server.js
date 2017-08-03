const dotenv = require('dotenv');
//Load environment variables
dotenv.load({ path: '.env' });
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

// Set up a default port, configure mongoose, configure our middleware
const PORT = process.env.PORT || 3000;
const app = express();

app.disable("x-powered-by");


// Connect mongoose to our database
const db = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true })
  .then(() => console.log(`Database connected at ${db}`))
  .catch(err => console.log(`Database connection error: ${err.message}`));

//configure express
require('./config/express')(app);
app.use(express.static(__dirname + "/public"));

//route setup
app.use("/", routes);

//scraping
require('./scraper/index');

// Start the server
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});
