const Review = require('../models/Review');

exports.postReview = async (req, res) => {
  try {
    const { vehicleId, rating, comment } = req.body;
    const userId = req.user.id; // Assuming user session
    await Review.addReview(vehicleId, userId, rating, comment);
    res.redirect(`/vehicles/${vehicleId}`);
  } catch (error) {
    console.error('Failed to post review:', error);
    res.status(500).send('Failed to post review');
  }
};

exports.getVehicleReviews = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const reviews = await Review.getReviewsByVehicle(vehicleId);
    res.render('vehicles/reviews', { reviews });
  } catch (error) {
    console.error('Failed to retrieve reviews:', error);
    res.status(500).send('Failed to retrieve reviews');
  }
};
