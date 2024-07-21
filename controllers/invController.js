// controllers/invController.js

const { getClassifications, addNewClassification, getVehicleById } = require('../models/inventory-model');
const utilities = require('../utilities');

// Controller function to render the add classification form
function renderAddClassification(req, res) {
    res.render('inventory/add-classification', { messages: req.flash('info') });
}

// Controller function to add a new classification
async function addClassification(req, res) {
    const { classificationName } = req.body;

    try {
        // Server-side validation
        if (!classificationName || /^\s*$/.test(classificationName)) {
            req.flash('info', 'Classification name cannot be empty.');
            return res.redirect('/inventory/add-classification');
        }

        // Add classification to database
        await addNewClassification(classificationName);

        // Set flash message for success
        req.flash('info', 'New classification added successfully.');

        // Redirect to management view
        res.redirect('/inventory/management');
    } catch (error) {
        console.error('Error adding classification:', error);
        req.flash('info', 'Failed to add new classification.');
        res.redirect('/inventory/add-classification');
    }
}

// Controller function to render the vehicle detail view
async function renderVehicleDetail(req, res) {
    const vehicleId = req.params.id;
    
    try {
        const vehicleData = await getVehicleById(vehicleId);
        if (!vehicleData) {
            req.flash('info', 'Vehicle not found.');
            return res.redirect('/inventory');
        }

        const nav = await utilities.getNav();
        res.render('inventory/vehicleDetail', {
            title: `${vehicleData.make} ${vehicleData.model}`,
            nav,
            vehicle: vehicleData,
            layout: './layouts/layout'
        });
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        req.flash('info', 'Failed to retrieve vehicle details.');
        res.redirect('/inventory');
    }
}

async function displayInventoryByType(req, res) {
    try {
        const typeId = req.params.id;
        const inventoryItems = await inventoryModel.getInventoryByType(typeId);
        res.render('inventory/typeView', { items: inventoryItems });
    } catch (error) {
        res.status(500).send('Error accessing this type of inventory');
    }
}

// Function to render the management view without repeated headers and footers
function renderManagementView(req, res) {
    res.render('inventory/management', {
        title: 'Inventory Management',
        showHeaderFooter: false // This will be used to conditionally render headers and footers
    });
}

module.exports = { renderAddClassification, addClassification, renderVehicleDetail, displayInventoryByType, renderManagementView };
