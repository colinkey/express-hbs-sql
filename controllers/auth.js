const bcrypt = require('bcrypt');

const passport = require('passport');
const models = require('../models');
const BaseController = require('./base');

const SALT_ROUNDS = 10;

class AuthController extends BaseController {
  constructor(...args) {
    super(args);
  }

  static async loginHandler(email, password, callback) {
    try {
      const user = await models.User.findOne({ where: { email } });
      if (!user) return callback(null, false);
      bcrypt.compare(password, user.passwordDigest, function(error, result) {
        if (error) {
          throw Error(error);
        }

        if (result == true) {
          user.incrementSignInCount();
          callback(null, user); 
        }
      });
      // if (user.isValidPassword()) 
    } catch (error) {
      return callback(error);
    }
  }

  async getLogin() {
    this.render('auth/login');
  }

  async getSignUp() {
    this.render('auth/sign-up');
  }

  async login() { 
    const params = this.request.body;

    if (!params.email || !params.password) {
      this.response.status(400).send();
    }

    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(this.request, this.response, this.next);
  }


  async signUp() {
    const params = this.request.body;

    if (!params.email || !params.password) {
      this.response.status(400).send();
    }

    try {
      let user;
      bcrypt.hash(params.password, SALT_ROUNDS, async (error, hash) => {
        if (error) {
          throw Error(error);
        }

        user = await models.User.create({ email: params.email, passwordDigest: hash });
        this.response.send(JSON.stringify({ userId: user.id}));
      }); 
    } catch (error) {
      throw Error(error);
    }
  }

  async logOut() {
    this.request.logout();
    this.response.redirect('/');
  }
}

module.exports = AuthController;