const BaseController = require('./base');
const Socketeer = require('../../sockets');

class UserController extends BaseController {
  constructor(...args) {
    super(args);
  }

  async get() {
    const id = 'abc123';
    function promisedTimeout(ms) {
      return new Promise(res => {
        function handleStuff() {
          Socketeer.sendToClient(id, 'jester', { name: 'frank' });
          res();
        }
        setTimeout(handleStuff, ms);
      });
    }
    promisedTimeout(2500);
    this.render('user/show', { suspense: id });
  }
}

module.exports = UserController;