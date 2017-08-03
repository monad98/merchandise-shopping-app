const express = require("express");
const router = new express.Router();
const productController = require('../controllers/product');
const authService = require('../config/passport/auth-service');

router.get('/', authService.isAuthenticated(), productController.index);
router.get('/nearest', authService.isAuthenticated(), productController.nearest);

module.exports = router;
