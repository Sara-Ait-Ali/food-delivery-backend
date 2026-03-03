const express = require("express");
const router = express.Router();

const restaurants = [
  { id: 1, name: "Pizza House", location: "City Center" },
  { id: 2, name: "Sushi Bar", location: "Downtown" }
];

router.get("/", (req, res) => {
  res.json({
    service: "restaurant-service",
    data: restaurants
  });
});

router.get("/:id", (req, res) => {
  const restaurant = restaurants.find(r => r.id == req.params.id);

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json({
    service: "restaurant-service",
    data: restaurant
  });
});

router.get("/health", (req, res) => {
  res.json({ status: "UP", service: "restaurant-service" });
});

module.exports = router;
