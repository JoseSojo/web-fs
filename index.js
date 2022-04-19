// REQUIRE MODULES
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./keys.js');

// Inicialization
const app = express();
require('./src/lib/passport.js');

// Setting
app.set('port', process.env.PORT || 7000);
app.set('server', 'Fantasy Story');
app.set('views', path.join(__dirname, '/public/'));
app.set('template', path.join(__dirname, '/template/'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views')),
  partialsDir: path.join(app.get('template'), '/partials/'),
  extname: '.hbs',
  helpers: require('./src/lib/handlebars.js')
}))
app.set('view engine', '.hbs');

// Middewares
app.use(session({
  secret: 'sessionfantasystory',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// VARIABLES GLOBAL
app.use((req, res, next)=>{
  app.locals.server = app.get('server');
  app.locals.success = req.flash('success');
  app.locals.danger = req.flash('danger');
  app.locals.user = req.user;
  next();
})

// Static Files
app.use(express.static(path.join(__dirname, '/assets')));


// Routes
app.use(require('./src/Controller/LoginController.js'));
app.use(require('./src/Controller/RegisterController.js'));
app.use(require('./src/Controller/LogoutController.js'));
app.use(require('./src/Controller/DashboardController.js'));
app.use(require('./src/Controller/ProfileController.js'));

// LISTEN
app.listen(app.get('port'), ()=>{
  console.log('');
  console.log('   Server the ' + app.get('server'));
  console.log('   Server On port http://127.0.0.1:' + app.get('port'));
  console.log('   Files: ' + path.join(__dirname));
  console.log('   press [Ctrl] + [c] to exit the server');
})
