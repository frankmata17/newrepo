// routes/errorRoute.js

const express = require('express');
const router = express.Router();

// Route to intentionally trigger an error
router.get('/trigger', (req, res, next) => {
  // Intentionally trigger an error
  const error = new Error("This is an intentional error.");
  next(error);
});

module.exports = router;
