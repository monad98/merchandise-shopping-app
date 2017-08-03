const express = require("express");

const router = new express.Router();
const storeController = require('../controllers/store');
const authService = require('../config/passport/auth-service');

router.get("/near",  authService.isAuthenticated(), storeController.near);
router.get("/near_sorted", authService.isAuthenticated(), storeController.nearSorted);
router.get("/search", authService.isAuthenticated(), storeController.search);

module.exports = router;
