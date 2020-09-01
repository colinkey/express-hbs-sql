const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(args);
  }

  async get() {
    const promisedTimeout = () => new Promise((res, rej) => {
      function handleStuff() {
        res({ name: 'frank'});
      }
      setTimeout(handleStuff, Math.floor(Math.random() * 3000));
    });

    this.renderWithSuspense('user/show', {}, { 
      template: 'jester', 
      resolver: promisedTimeout, 
      insertionMethod: 'replace', 
    });
  }
}

module.exports = UserController;