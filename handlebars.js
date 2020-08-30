const handlebars = require('express-handlebars');

const hbs = handlebars.create({
  helpers: require('./app/lib/view-helpers'),
  extname: '.hbs',
  layoutsDir: 'app/views/_layouts',
  partialsDir: 'app/views/_partials',
});

module.exports = hbs;