// routes/inventoryRoute.js

const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');
const { renderAddInventory, addInventory } = require('../controllers/inventoryController');

// Management View
router.get('/', invController.renderManagementView);

// Add Classification View
router.get('/add-classification', invController.renderAddClassificationView);
router.post('/add-classification', invController.addClassification);

// Add Inventory View
router.get('/add-inventory', invController.renderAddInventoryView);
router.post('/add-inventory', invController.addInventory);

module.exports = router;
