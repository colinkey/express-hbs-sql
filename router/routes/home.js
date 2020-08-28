const Controllers = require('../../app/controllers/index');

module.exports = {
  '/': {
    controller: Controllers.Home,
    methods: {
      get: 'get',
    },
  },
};