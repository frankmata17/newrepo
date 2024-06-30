const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications();
    let list = "";
    list += '<a href="/" title="Home page">Home</a>';
    data.rows.forEach((row) => {
      list +=
        `<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`;
    });
    return list;
  } catch (error) {
    console.error('Error generating navigation:', error);
    throw error; // Handle or log the error as needed
  }
};

/* ************************
 * Wraps vehicle information in HTML
 ************************** */
Util.wrapVehicleInfoInHTML = (vehicle) => {
  return `
    <div class="vehicle-detail">
      <h1>${vehicle.make} ${vehicle.model}</h1>
      <img src="${vehicle.fullSizeImage}" alt="${vehicle.make} ${vehicle.model}">
      <div class="vehicle-info">
        <p><strong>Make:</strong> ${vehicle.make}</p>
        <p><strong>Model:</strong> ${vehicle.model}</p>
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
};

module.exports = Util;
