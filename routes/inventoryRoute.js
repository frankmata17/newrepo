// routes/inventoryRoute.js

const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

// Management View
router.get('/', invController.renderManagementView);

// Add Classification View
router.get('/add-classification', invController.renderAddClassification);
router.post('/add-classification', invController.addClassification);

// Add Inventory View
router.get('/add-inventory', invController.renderAddInventoryView);
router.post('/add-inventory', invController.addInventory);

// Vehicle Detail View
router.get('/detail/:id', invController.renderVehicleDetail);

// Display inventory by type
router.get('/type/:id', invController.displayInventoryByType);

module.exports = router;
