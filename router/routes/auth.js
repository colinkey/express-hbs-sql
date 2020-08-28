const Controllers = require('../../controllers/index');

module.exports = {
  '/auth/login': {
    controller: Controllers.Auth,
    methods: {
      get: 'getLogin',
      post: 'login',
    },
  },
  '/auth/sign-up': {
    controller: Controllers.Auth,
    methods: {
      get: 'getSignUp',
      post: 'signUp',
    },
  },
  '/auth/logout': {
    controller: Controllers.Auth,
    methods: {
      get: 'logOut',
    },
  },
};