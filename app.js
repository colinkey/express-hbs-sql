const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');

// Redis config
const redisClient = redis.createClient();
const RedisStore = require('connect-redis')(session);

// Server configuration
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
  store: new RedisStore({ client: redisClient }),
  secret: 'gryzzle',
  cookie: {
    maxAge: 60 * 60 * 24 * 7 * 1000,
  },
  resave: false,
  saveUninitialized: false,
}));

// Authentication setup
const passport = require('./passport');
app.use(passport.initialize());
app.use(passport.session());

// Views and templating engine setup
const hbs = require('./handlebars');
app.engine('.hbs', hbs.engine);
app.set('views', './app/views');
app.set('view engine', '.hbs');

// Register routes
const router = require('./router');
app.use('/', router);

// Serve static files
app.use('/', express.static('public'));

// Spin it up and lets get it
function serverListener() {
  require('./sockets').register(server);
  console.log(`App listening on port ${port}`);
}

const server = app.listen(port, serverListener);