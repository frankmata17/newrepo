// controllers/baseControllers.js

const utilities = require("../utilities");
const Inventory = require('../models/inventory-model');

const baseController = {};

// Method for rendering the home page
baseController.buildHome = async function(req, res) {
  try {
    const nav = await utilities.getNav();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).send('Server Error');
  }
};

// Method for rendering vehicle details
baseController.getVehicleDetails = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Inventory.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }

    const vehicleHTML = utilities.wrapVehicleInfoInHTML(vehicle);
    res.render('inventory/vehicleDetail', {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleHTML
    });
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).send('Server Error');
  }
};

// Method for rendering vehicles by classification type
baseController.getVehiclesByType = async (req, res) => {
  try {
    const classificationId = req.params.id;
    const vehicles = await Inventory.getVehiclesByClassification(classificationId);

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).send('Vehicles not found for this classification');
    }

    res.render('inventory/classification', {
      title: 'Vehicles by Classification',
      vehicles
    });
  } catch (error) {
    console.error('Error fetching vehicles by classification:', error);
    res.status(500).send('Server Error');
  }
};

// Intentional error route handler
baseController.generateError = (req, res, next) => {
  const err = new Error('Intentional error for testing');
  next(err);
};

module.exports = baseController;
