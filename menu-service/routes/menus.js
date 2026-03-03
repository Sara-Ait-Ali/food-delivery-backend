const express = require("express");
const router = express.Router();

const menuItems = [
  { id: 1, restaurantId: 1, name: "Margherita Pizza", price: 10 },
  { id: 2, restaurantId: 1, name: "Pepperoni Pizza", price: 12 },
  { id: 3, restaurantId: 2, name: "Salmon Sushi", price: 15 }
];

router.get("/:restaurantId", (req, res) => {
  const items = menuItems.filter(
    item => item.restaurantId == req.params.restaurantId
  );

  res.json({
    service: "menu-service",
    data: items
  });
});

router.get("/item/:id", (req, res) => {
  const item = menuItems.find(item => item.id == req.params.id);

  if (!item) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  res.json({
    service: "menu-service",
    data: item
  });
});

router.get("/health", (req, res) => {
  res.json({ status: "UP", service: "menu-service" });
});

module.exports = router;