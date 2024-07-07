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

module.exports = { getClassifications, getVehicleById, getVehiclesByClassification };

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}
module.exports = {getClassifications, getInventoryByClassificationId};