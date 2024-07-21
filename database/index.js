const { Pool } = require("pg");
require("dotenv").config();

// Connection Pool
let pool;
if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

// Function to execute queries, consistent for any environment
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('error in query', { text, error });
    throw error;
  }
}

module.exports = { query };
