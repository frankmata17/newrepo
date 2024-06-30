// controllers/baseControllers.js
const pool = require('../database/database'); // Adjust the path as per your directory structure

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
    res.render('inventory/vehicleDetail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicleHTML: utilities.wrapVehicleInfoInHTML(vehicle)
    });
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = baseController;
