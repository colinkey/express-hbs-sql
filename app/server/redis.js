const { promisify } = require('util');
const redis = require('redis');

class Redis {
  constructor() {
    this.client = redis.createClient();
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
  }
}

module.exports = new Redis();