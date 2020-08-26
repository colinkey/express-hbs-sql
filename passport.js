const passport = require('passport');
const passportLocal = require('passport-local');

const Controllers = require('./controllers')
const models = require('./models');

passport.use(new passportLocal.Strategy((email, password, callback) => Controllers.Auth.loginHandler(email, password, callback)))

passport.serializeUser((user, callback) => {
  callback(null, user.id);
})

passport.deserializeUser((id, callback) => {
  try {
    const user = models.user.findByPk(id);
    if (!user) {
      throw Error('Not Found');
    }

    callback(null, user);
  } catch (error) {
    return callback(error);
  }
})

module.exports = passport;