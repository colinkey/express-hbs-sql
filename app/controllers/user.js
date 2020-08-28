const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(args);
  }

  async get() {
    this.render('user/show');
  }
}

module.exports = UserController;