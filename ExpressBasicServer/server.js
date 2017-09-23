//-------------------------Module "Importing"-----------------------------//
var express = require('express'); //used as routing framework
var app = express(); //creates an instance of express

//modules required (same idea of #includes or Imports)
var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request
var server = require('http').createServer(app); //creates an HTTP server instance

var api = require('./routes/api'); //gets api logic from path

//add for Mongo support
var mongoose = require('mongoose');                         
var mongoURI = "mongodb://127.0.0.1:27017/DataBaseNameHere";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});


//-------------------------Express JS configs-----------------------------//
//view engine setup
app.set('views', './views'); //says where in root directory the find files (./views)
app.set('view engine', 'ejs'); //says which engine being used (ejs)

app.use(logger('dev')); //debugs logs in terminal
app.use(bodyParser.json()); //parses json and sets to body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front'))); //sets all static file calls to folder


//---------------API-------------------//
app.use('/api', api);


app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/color/:color', function(req, res, next) {
    
    var backgroundColor = req.params.color || "white"; //defaults if no param is passed
    
    res.render('color', {
        message: "Server is up and running",
        color: backgroundColor        
    });   
});


// ------------ Server Setup --------------//


/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
