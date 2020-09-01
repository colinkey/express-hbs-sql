const { v4: uuidv4 } = require('uuid');
const Socketeer = require('../server/sockets');
const Redis = require('../server/redis');

class BaseController {
  constructor(args) {
    this.request = args[0];
    this.response = args[1];
    this.next = args[2];
  }

  render(template, data = {}) {
    const templateData = {
      ...data,  
    };

    if (this.request.user) {
      templateData.user = this.request.user?.get();
    }
     
    this.response.render(template, templateData);
  }

  renderWithSuspense(template, data, suspender) {
    const templateData = {
      ...data,  
    };

    if (this.request.user) {
      templateData.user = this.request.user?.get();
    }

    const suspenderId = uuidv4();
    templateData.suspenseId = suspenderId;
    const { resolver, ...suspenderOptions } = suspender;
    
    resolver().then(async data => {
      const redisData = await Redis.getAsync(suspenderId);
      
      if (redisData && JSON.parse(redisData).state === 'client-ready') {
        Socketeer.sendToClient(suspenderId, data, suspenderOptions);
      } else {
        Redis.setAsync(suspenderId, JSON.stringify({ state: 'data-ready', data, suspenderOptions }));
        Redis.client.expire(suspenderId, 300);
      }
    });

    this.render(template, templateData);
  }
}

module.exports = BaseController;