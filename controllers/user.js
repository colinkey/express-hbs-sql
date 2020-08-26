const models = require('../models');

class UserController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async get() {
    const data = {
      adjective: 'delightful'
    };

    this.response.render('user', data);
  }

  async create() {
  }
}

module.exports = UserController