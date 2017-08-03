'use strict';
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const User = require('../../models/user');

const validateJwt = expressJwt({
  secret: process.env.SESSION_SECRET
});

/**
 * add user object to the req if authenticated
 * Otherwise returns 403
 */
const isAuthenticated = () => {
  return compose()
  // Validate jwt
    .use(function(req, res, next) {
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if(!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
          return null;
        })
        .catch(err => next(err));
    });
};
module.exports.isAuthenticated = isAuthenticated;

/**
 * Returns a jwt token signed by the app secret
 */
function signToken (id, role) {
  return jwt.sign({ _id: id, role }, process.env.SESSION_SECRET, {
    expiresIn: 60 * 60 * 24 * 30 // 1 month
  });
}
module.exports.signToken = signToken;
