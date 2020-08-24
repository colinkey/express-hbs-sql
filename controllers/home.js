class HomeController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async get() {
    const data = { name: "Albert" }
    this.response.render('home/index', data);
  }
}

module.exports = HomeController;