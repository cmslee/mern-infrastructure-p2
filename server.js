require('dotenv').config();
require('./config/database'); // connects to db

//setup: import necessary dependencies
const express = require('express');
const path = require('path'); // node module
const favicon = require('serve-favicon');
const logger = require('morgan');

//create express app
const app = express();
// set condition for in-devopment vs. in-production PORTs
//? React dev server on port 3000 (dev version of app: served by src folder)
//? Express backend server on port 3001 (production-ready version of app: served by build folder)
const PORT = process.env.PORT || 3001;


//* Config
//? on app.use: https://expressjs.com/en/guide/using-middleware.html
// Logger middleware: logs the request the server is receiving
//? https://expressjs.com/en/resources/middleware/morgan.html
app.use(logger('dev'));
// JSON payload middleware: for data coming from frontend functions
app.use(express.json());
// Configure both serve-favicon & static middleware to serve from the production 'build' folder
//?favicon needs a path to favicon icon((path module from node.js . join method to join following arguments(name of... a)...current folder/dir -- i.e. mern infrastructure-p1, b) build directory, and c)name of favicon file in build folder)))
//?https://expressjs.com/en/resources/middleware/serve-favicon.html
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
//sets build folder -- rather than public folder -- as our static folder
app.use(express.static(path.join(__dirname, 'build')));
// Check Token Middleware: checks if token was sent and sets user data upon the req (req.user)
app.use(require('./config/checkToken'));
//! remember middleware goes before routes!

//*ROUTES

//API Routes
//?anything that comes through 'this' path, pass it through 'this' router
app.use('/api/users', require('./routes/api/users'));
//!API routes go before "catch all" route

//Catch-all Route
//?returns 'index.html' on all non-AJAX requests
//?AJAX: Asynchronous JavaScript and XML (see doc: https://www.w3schools.com/xml/ajax_intro.asp)
app.get('/*', (req, res) => {
    //~res.send can send anything, but res.sendFile is specific to files~
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


//*Listen

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
})