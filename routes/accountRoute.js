// Required external resources
const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const accountsController = require('../controllers/accountsController');

// GET route for "My Account" link
router.get('/login', utilities.handleErrors(accountsController.buildLogin));

// GET route for registration view
router.get('/register', utilities.handleErrors(accountsController.buildRegister));

// POST route for registration form submission
router.post('/register', utilities.handleErrors(accountsController.registerAccount));

// Error handler middleware
router.use(utilities.handleErrors);

// Export the routes
module.exports = router;
