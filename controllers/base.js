class BaseController {
  constructor(args) {
    this.request = args[0];
    this.response = args[1];
    this.next = args[2];
  }

  render(template, data = {}) {
    const templateData = {
      ...data  
    }

    if (this.request.user) {
      templateData.user = this.request.user?.get()
    }
     
    this.response.render(template, templateData);
  }
}

module.exports = BaseController