const express = require('express');
const routes = require('./routes');

const router = express.Router();

Object.keys(routes).forEach(route => {
  Object.keys(routes[route].methods).forEach(method => {
    router.route(route)[method]((req, res, next) => {
      const controller = new routes[route].controller(req, res, next);
      controller[routes[route].methods[method]]();
    });
  });
});

module.exports = router; 