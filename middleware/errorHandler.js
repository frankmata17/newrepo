// middleware/errorHandler.js

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
      title: "Server Error",
      message: "Something went wrong on our end. Please try again later.",
    });
  };
  