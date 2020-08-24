const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.route('/').get((req, res) => {
  const controller = new Controllers.Home(req, res);
  controller.get();
});

module.exports = router