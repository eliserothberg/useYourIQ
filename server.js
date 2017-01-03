var path = require('path');
var express = require('express');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override'); // for deletes in express
var sessionStore = new session.MemoryStore;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ secret: 'yup', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(flash());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//this allows the dynamically genereated excel file to be downloaded
app.get('/excel', function (req, res) {
  res.sendFile(path.join(__dirname, 'excel.csv'));  
});

var application_controller = require('./controllers/application_controller');
var launch_controller = require('./controllers/launch_controller');
var user_controller = require('./controllers/user_controller');
var graph_controller = require('./controllers/graph_controller');
app.use('/', application_controller);
app.use('/launch',launch_controller);
app.use('/users', user_controller);
app.use('/graph', graph_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('This is a rather unhelpful error message');
  err.status = 404;
	console.log(res);
  next(err);
});
// define our port (either our environment's preset, or 3000)
var PORT = process.env.PORT || 3000;

// bring in our sequelize models
var models = require('./models');

// and sync them with our db
models.sequelize.sync();

// listen on our port
app.listen(PORT, function(){
  console.log('Listening on port: ' + PORT);
})

module.exports = app;