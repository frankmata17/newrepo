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
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseControllers");
const errorRoutes = require("./routes/errorRoute"); // Import error routes
const errorHandler = require("./middleware/errorHandler");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes);
app.use(express.static('public'));

// Index route
app.get("/", baseController.buildHome);

// Test route
app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

// Error route and error handling middleware
app.use("/error", errorRoutes); // Mount error routes under /error prefix
app.use(errorHandler); // Error handling middleware

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
