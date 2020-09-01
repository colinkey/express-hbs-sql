const hbs = require('./handlebars');
const Redis = require('./redis');

class Socketeer {
  constructor() {
    this.registered = false;
    this.io = null;
    this.clients = [];
  }

  register(server) {
    this.io = require('socket.io')(server);
    this.registered = true;
    this.attachListeners();
  }

  attachListeners() {
    this.io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('ready-state', async ({ id }) => {
        console.log(`${id} ready to receive data`);
        const redisData = await Redis.getAsync(id);
        if (redisData) {
          const jsonData = JSON.parse(redisData);
          if (jsonData.state === 'data-ready') {
            this.sendToClient(id, jsonData.data, jsonData.suspenderOptions);
          }
        } else {
          Redis.setAsync(id, JSON.stringify({ state: 'client-ready' }));
        }
      });
    });
  }

  async sendToClient(id, data, options) {
    const partials = await hbs.getPartials();
    const renderedPartial = partials[options.template](data);
    this.io.emit('suspense-message', { 
      id: id, 
      replacer: renderedPartial, 
      insertionMethod: options.insertionMethod, 
    });
  }
};

module.exports = new Socketeer();