'use strict';
const express = require("express");
const router = new express.Router();
const userController = require("../controllers/user");
const authService = require('../config/passport/auth-service');
const User = require('../models/user');

// Passport Configuration
require('../config/passport/local-strategy')(User);

router.post("/login", userController.login);
router.post("/signup", userController.createAccount);
router.get("/logout", userController.logout);
router.get("/me", authService.isAuthenticated(), userController.me);

module.exports = router;





