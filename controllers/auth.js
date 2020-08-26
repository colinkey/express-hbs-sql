const bcrypt = require('bcrypt');

const BaseController = require('./base');
const models = require('../models');

const SALT_ROUNDS = 10;

class AuthController extends BaseController {
  constructor(request, response) {
    super(request, response);
  }

  static async loginHandler(email, password, callback) {
    try {
      const user = await models.user.findOne({ where: { email } });
      if (!user) return callback(null, false);
      bcrypt.compare(password, user.passwordDigest, function(error, result) {
        if (error) {
          throw Error(error);
        }

        if (result == true) {
          console.log(result)
          callback(null, user); 
        }
      })
      // if (user.isValidPassword()) 
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  }

  async getLogin() {
    this.response.render('auth/login');
  }

  async getSignUp() {
    this.response.render('auth/sign-up');
  }

  async login() { 
    const params = this.request.params;

    if (!params.email || !params.password) {
      this.response.status(400).send();
    }

    passport.authenticate('local');
    this.response.redirect('/');
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

        user = await models.user.create({ email: params.email, passwordDigest: hash });
        this.response.send(JSON.stringify({ userId: user.id}));
      }); 
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = AuthController