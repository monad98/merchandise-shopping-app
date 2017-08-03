'use strict';
const express = require("express");
const path = require("path");
const storeRoutes = require("./store");
const productRoutes = require("./product");
const userRoutes = require("./user");
const router = new express.Router();

// Use the apiRoutes module for any routes starting with "/api"
router.use("/api/user", userRoutes);
router.use("/api/store", storeRoutes);
router.use("/api/product", productRoutes);


// Otherwise send all other requests the index.html page
// React router will handle routing withing the app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;

