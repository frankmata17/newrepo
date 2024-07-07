// controllers/inventoryController.js

const { getClassifications, addNewClassification } = require('../models/inventory-model');

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

module.exports = { renderAddClassification, addClassification };
