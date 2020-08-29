module.exports = (name) => {
  const capName = name[0].toUpperCase() + name.slice(1);
return `const BaseController = require('./base');

class ${capName}Controller extends BaseController {
  constructor(...args) {
    super(args);
  }

  async index() {

  }

  async show() {

  }

  async create() {
    
  }

  async update() {

  }

  async delete() {

  }
}

module.exports = ${capName}Controller;
`;

};