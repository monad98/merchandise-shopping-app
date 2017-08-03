/**
 * Express configuration
 */
'use strict';
const express = require('express');
const compress= require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const lusca = require('lusca');
const passport = require('passport');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const MongoStore = connectMongo(session);
module.exports = function(app) {

  app.use(morgan('dev'));
  app.use(compress());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  // sessions with MongoStore
  // Lusca depends on sessions
  app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'shopping'
    })
  }));

  //Lusca
  if(process.env === 'production') {
    app.use(lusca({
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 60 * 60 * 24 * 30, //1 month
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  if(process.env !== 'production') {
    app.use(errorHandler());
  }
};

