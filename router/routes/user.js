const Controllers = require('../../app/controllers/index');

module.exports = {
  '/user': {
    controller: Controllers.User,
    methods: {
      get: 'get',
    },
  },
};