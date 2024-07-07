/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const bodyParser = require('body-parser');
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseControllers");
const errorRoutes = require('./routes/errorRoute');
const errorHandler = require("./middleware/errorHandler");
const utilities = require("./utilities");
const session = require("express-session");
const pool = require('./database/');
const accountRoute = require('./routes/accountRoute');

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Middleware to Generate Navigation
 *************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes);
app.use(express.static('public'));
app.use('/account', accountRoute);

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));

// Test route
app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

// Error route and error handling middleware
app.use("/error", errorRoutes); // Mount error routes under /error prefix
app.use(errorHandler); // Error handling middleware

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  const message = err.status === 404 ? err.message : 'Oh no! There was a crash. Maybe try a different route?';
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500; // Default to port 5500 if PORT is not defined in .env
const host = process.env.HOST || 'localhost'; // Default to localhost if HOST is not defined in .env

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App is listening on ${host}:${port}`);
});
