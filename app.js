var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cons = require('consolidate');

//dotenv loads the variables in a file in a environment.
//you can access those variables from anywhere using   process.env.DB_HOST     where   DB_HOST is declared in the config.env
var dotenv =  require('dotenv')
dotenv.load({path: __dirname + '/config.env'});
process.env.NodeEnvironment = "Production";     //you can also set new environment variable that will be accessible anywhere like NodeEnvironment is ot available aywhere now

'use strict';
app = express();

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));


// .hbs files should be handled by `handlebars`
// `consolidate` takes care of loading `handlebars` and interfacing it with Express
app.engine('hbs', cons.handlebars);

// we set 'hbs' as the default extension of template files
// this is optional, but you have to specify the view files's extension if you don't
// it defaults to 'jade'
app.set('view engine', 'hbs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser()); // get information from html forms



app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());





app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/rest/v1/*', [require('./controllers/single-page/ValidateRESTRequest')]);
app.all('/rest/v1/admin/*', [require('./controllers/single-page/ValidateAdminRequest')]);





app.use('/', require('./controllers/single-page/RESTroutes'));
app.use('/web', require('./controllers/HtmlRoutes'));




//----------------------------------------- error handlers

//// If no route is matched by now, it must be a 404
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



module.exports = server;    //added this statement so  that mocha test cases can call the REST apis












//Functional Programming 

var numbers = [1,2,3,4,5,6,7,8];
var filteredImperatively = [];
for (var i = 0; i < numbers.length; ++i) {
	var number = numbers[i];
	if (number % 2 === 0) {
		filteredImperatively.push(number);
	}
}
console.log(filteredImperatively); // Prints [2, 4, 6, 8]
var filteredFunctionally = numbers.filter(function(x) { return x % 2 === 0; });
console.log(filteredFunctionally); // Prints [2, 4, 6, 8]


