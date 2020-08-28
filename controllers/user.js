const BaseController = require('./base');
const models = require('../models');

class UserController extends BaseController {
  constructor(...args) {
    super(args)
  }

  async get() {
    this.render('user/show');
  }
}

module.exports = UserController