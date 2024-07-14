// validation.js

function loginRules(req, res, next) {
    // Example: Check if email and password are present
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    next(); // Call next to proceed to the next middleware or route handler
}
  
function checkLoginData(req, res, next) {
    // Example: Validate email format or check password length
    // Simulated example for demonstration purposes
    if (!req.body || req.body.password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    next(); // Call next to proceed to the next middleware or route handler
}
  
module.exports = {
    loginRules,
    checkLoginData,
};
