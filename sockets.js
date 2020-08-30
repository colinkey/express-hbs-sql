const hbs = require('./handlebars');

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
      const roomId = `Room-${Math.floor(Math.random() * 10000)}`;
      socket.join(roomId);
      socket.emit('room-created', { room: roomId });
      console.log(socket);
      console.log(socket.id);
      console.log('a user connected');
    });
  }

  async sendToClient(id, partial, data) {
    const partials = await hbs.getPartials();
    const renderedPartial = partials[partial](data);
    this.io.emit('server-message', { replacer: renderedPartial, insertionMethod: 'replace' });
  }
};

module.exports = new Socketeer();