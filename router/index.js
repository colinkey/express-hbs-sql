const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.route('/').get((req, res) => {
  const controller = new Controllers.Home(req, res);
  controller.get();
});

router.route('/auth/login').get((req, res) => {
  const controller = new Controllers.Auth(req, res);
  controller.getLogin();
}).post((req, res) => {
  const controller = new Controllers.Auth(req, res);
  controller.login();
})

router.route('/auth/sign-up').get((req, res) => {
  const controller = new Controllers.Auth(req, res);
  controller.getSignUp();
}).post((req, res) => {
  const controller = new Controllers.Auth(req, res);
  controller.signUp();
})

module.exports = router