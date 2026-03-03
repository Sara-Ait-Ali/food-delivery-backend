const express = require("express");
const axios = require("axios");
const router = express.Router();
const db = require("../firebase");

const MENU_SERVICE_URL =
  process.env.MENU_SERVICE_URL || "http://localhost:3002";

router.post("/", async (req, res) => {
  const { itemId, quantity = 1 } = req.body;

  if (!itemId) {
    return res.status(400).json({
      service: "order-service",
      error: "itemId is required",
      correlationId: req.correlationId,
    });
  }

  try {
    // Forward Correlation ID to menu-service
    const response = await axios.get(
      `${MENU_SERVICE_URL}/menus/item/${itemId}`,
      {
        headers: {
          "X-Correlation-ID": req.correlationId,
        },
      }
    );

    const item = response.data.data;

    const orderData = {
      itemId: item.id,
      itemName: item.name,
      quantity,
      unitPrice: item.price,
      totalPrice: item.price * quantity,
      status: "CONFIRMED",
      createdAt: new Date(),
    };

    const orderRef = await db.collection("orders").add(orderData);

    res.status(201).json({
      service: "order-service",
      message: "Order created successfully",
      id: orderRef.id,
      correlationId: req.correlationId,
    });

  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        service: "order-service",
        error: "Menu Service unavailable",
        correlationId: req.correlationId,
      });
    }

    res.status(500).json({
      service: "order-service",
      error: "Order creation failed",
      correlationId: req.correlationId,
    });
  }
});

router.get("/", async (req, res) => {
  const snapshot = await db.collection("orders").get();

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json({
    service: "order-service",
    data: orders,
    correlationId: req.correlationId,
  });
});

router.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "order-service",
    correlationId: req.correlationId,
  });
});

module.exports = router;