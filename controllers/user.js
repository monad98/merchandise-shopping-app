const passport = require('passport');
const User = require('../models/user');
const signToken = require('../config/passport/auth-service').signToken;
const md5 = require('md5');

/**
 * login
 */
exports.login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    const error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    const token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next);

};

/**
 * Log out
 */
exports.logout = (req, res) => {
  req.logout();
  return res.json({ success: true })
};


/**
 * signup
 */
exports.createAccount = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        res.json({ success: false, message: "Email already in use" });
        return null;
      }
      // go ahead and create the new user
      else {
        req.body.photoURL = `https://gravatar.com/avatar/${md5(req.body.email)}?s=200&d=retro`;
        User.create(req.body)
          .then(() => {
            res.json({ success: true });
            return null;
          })
          .catch(e => next(e));
      }
    })
    .catch(err => next(err));
};

/**
 * Get User Info
 */
exports.me = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId, '-salt -password')
    .exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
};
