// controllers/invController.js

const pool = require('../database/database');
const utilities = require('../utilities');

// Function to get vehicles by classification ID
async function getVehiclesByClassificationId(classificationId) {
  try {
    const query = 'SELECT * FROM vehicles WHERE classification_id = $1';
    const { rows } = await pool.query(query, [classificationId]);
    return rows;
  } catch (error) {
    console.error('Error fetching vehicles by classification:', error);
    throw error; // Propagate the error for handling in higher levels
  }
}

// Controller function to build view by classification ID
async function buildByClassificationId(req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    let nav = await utilities.getNav();
    const vehicles = await getVehiclesByClassificationId(classificationId);

    res.render('inventory/classification', {
      title: `${classificationId} Vehicles`,
      nav,
      vehicles,
    });
  } catch (error) {
    console.error('Error building by classification:', error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  buildByClassificationId,
};
