const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (User) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {

    User.findOne({
      email: email.toLowerCase()
    }).exec()
      .then(user => {
        if(!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
        }
        user.authenticate(password, function(authError, authenticated) {
          if(authError) {
            return done(authError);
          }
          if(!authenticated) {
            return done(null, false, { message: 'This password is not correct.' });
          } else {
            return done(null, user);
          }
        });
      })
      .catch(err => done(err));
  }));
};
