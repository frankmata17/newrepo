class Review {
    static async addReview(vehicleId, userId, rating, comment) {
      const sql = `INSERT INTO reviews (vehicle_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await pool.query(sql, [vehicleId, userId, rating, comment]);
      return result.rows[0];
    }
  
    static async getReviewsByVehicle(vehicleId) {
      const sql = `SELECT * FROM reviews WHERE vehicle_id = $1`;
      const result = await pool.query(sql, [vehicleId]);
      return result.rows;
    }
  }
  