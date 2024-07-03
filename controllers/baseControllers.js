// controllers/baseControllers.js
const pool = require('../database/database');
const utilities = require('../utilities');

const baseController = {};

baseController.getVehicleDetails = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const query = 'SELECT * FROM inventory WHERE inv_id = $1';
    const { rows } = await pool.query(query, [vehicleId]);

    if (rows.length === 0) {
      return res.status(404).send('Vehicle not found');
    }

    const vehicle = rows[0];
    const nav = await utilities.getNav();
    res.render('inventory/vehicleDetail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicleHTML: utilities.wrapVehicleInfoInHTML(vehicle)
    });
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).send('Server Error');
  }
};

baseController.buildHome = async (req, res) => {
  try {
    const nav = await utilities.getNav();
    res.render('index', {
      title: 'Home',
      nav
    });
  } catch (error) {
    console.error('Error building home page:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = baseController;
