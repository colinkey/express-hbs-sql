const Controllers = require('../../controllers/index');

module.exports = {
  '/user': {
    controller: Controllers.User,
    methods: {
      get: 'get',
    },
  },
};