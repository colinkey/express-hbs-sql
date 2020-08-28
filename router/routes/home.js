const Controllers = require('../../controllers/index');

module.exports = {
  '/': {
    controller: Controllers.Home,
    methods: {
      get: 'get',
    },
  },
};