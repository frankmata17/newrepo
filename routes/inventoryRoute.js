// routes/inventoryRoute.js

const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseControllers');

// Route to handle vehicle detail view
router.get('/vehicle/:id', baseController.getVehicleDetails);

// Route to handle vehicles by classification view
router.get('/type/:id', baseController.getVehiclesByType);

module.exports = router;