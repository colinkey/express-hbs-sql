const models = require('../models');
const BaseController = require('./base');

class HomeController extends BaseController {
  constructor(...args) {
    super(args);
  }

  async get() {
    this.render('home/index');
  }
}

module.exports = HomeController;