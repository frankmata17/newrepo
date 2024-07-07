// models/inventory-model.js

const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 *  Get vehicle data by ID
 * ************************** */
async function getVehicleById(id) {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [id]);
    return result.rows[0]; // Assuming the vehicle data is stored in the first row of the result
  } catch (error) {
    throw error;
  }
}

/* ***************************
 *  Get vehicles by classification ID
 * ************************** */
async function getVehiclesByClassification(classificationId) {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE classification_id = $1', [classificationId]);
    return result.rows; // Return an array of vehicles matching the classification ID
  } catch (error) {
    throw error;
  }
}

/* ***************************
 *  Add new classification
 * ************************** */
async function addNewClassification(classificationName) {
  try {
    const query = 'INSERT INTO public.classification (classification_name) VALUES ($1)';
    await pool.query(query, [classificationName]);
  } catch (error) {
    throw error;
  }
}

module.exports = { getClassifications, getVehicleById, getVehiclesByClassification, addNewClassification };
