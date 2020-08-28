const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.route('/').get((req, res, next) => {
  const controller = new Controllers.Home(req, res, next);
  controller.get();
});

router.route('/user').get((req, res, next) => {
  const controller = new Controllers.User(req, res, next);
  controller.get();
})

router.route('/auth/login').get((req, res, next) => {
  const controller = new Controllers.Auth(req, res, next);
  controller.getLogin();
}).post((req, res, next) => {
  const controller = new Controllers.Auth(req, res, next);
  controller.login();
})

router.route('/auth/logout').get((req, res, next) => {
  const controller = new Controllers.Auth(req, res, next);
  controller.logOut();
})

router.route('/auth/sign-up').get((req, res, next) => {
  const controller = new Controllers.Auth(req, res, next);
  controller.getSignUp();
}).post((req, res, next) => {
  const controller = new Controllers.Auth(req, res, next);
  controller.signUp();
})

module.exports = router