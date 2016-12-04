/*
Here is where you set up your server file.
express middleware.
*/

// var express = require('express');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');

// var app = express();

// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + '/public'));

// app.use(bodyParser.urlencoded({
// 	extended: false
// }));
// // override with POST having ?_method=DELETE
// app.use(methodOverride('_method'));
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
// 	defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

// var routes = require('./controllers/sales_controller.js');
// app.use('/', routes);

// var port = 3000;
// app.listen(port);



//if we use jwt- can leverage this.

// dependencies
// ============
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var cors = require('cors');

// Express
// =======

// instantiate our express
var app = express();
app.use(logger('dev'));
app.use(cors());

// set up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

// set up the public directory as our static folder
var staticContentFolder = './public';
app.use(express.static(staticContentFolder));

// set json webtokensecret
var jwt_secret = process.env.JWT_SECRET || "CodingsCool";
app.set('jwtSecret', jwt_secret);


// Sequelize
// =========

// bring in our sequelize models 
var models = require('./models');

// and sync them with our db
models.sequelize.sync();

// API routing
// ===========

// Note: react and react-router will handle html routing
require('./routes/api.js')(app);
// auth route to be added once we get to login


// Listen
// ======

// define our port (either our environment's preset, or 3000)
var PORT = process.env.PORT || 3000;


// listen on our port
app.listen(PORT, function(){
  console.log('Esal is listening. Port: ' + PORT);
})
