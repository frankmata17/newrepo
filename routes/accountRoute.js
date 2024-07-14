// accountRoute.js

const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const accountsController = require('../controllers/accountsController');
const validation = require('../middleware/validation'); // Import validation middleware

// GET route for "My Account" link
router.get('/login', utilities.handleErrors(accountsController.buildLogin));

// GET route for registration view
router.get('/register', utilities.handleErrors(accountsController.buildRegister));

// POST route for registration form submission
router.post('/register', utilities.handleErrors(accountsController.registerAccount));

// Process the login request with validation middleware
router.post(
  '/login',
  validation.loginRules,      // Ensure validation middleware is correctly referenced
  validation.checkLoginData,
  utilities.handleErrors(accountsController.accountLogin)
);

// Error handler middleware
router.use(utilities.handleErrors);

// Export the routes
module.exports = router;
