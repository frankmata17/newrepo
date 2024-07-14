// Required external resources
const pool = require('../database');

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_password]);
    return result.rows[0]; // Return the inserted row
  } catch (error) {
    throw new Error(`Error registering account: ${error.message}`);
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email]
    );
    return result.rows[0]; // Return the first matching row
  } catch (error) {
    throw new Error(`Error fetching account by email: ${error.message}`);
  }
}

module.exports = {
  registerAccount,
  getAccountByEmail,
};
