const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

// Server configuration
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication setup
const passport = require('./passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'gryzzle' }));

// Views and templating engine setup
const hbs = handlebars.create({
  helpers: require('./lib/view-helpers'),
  extname: '.hbs',
  layoutsDir: 'views/_layouts',
  partialsDir: 'views/_partials'
})
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Register routes
const router = require('./router');
app.use('/', router);

// Serve static files
app.use('/', express.static('public'));

// Spin it up and lets get it
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});