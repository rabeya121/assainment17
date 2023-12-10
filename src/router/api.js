const express = require("express");
const { registration, cart, createProduct, createOrder } = require("../controller/userController");
const router = express.Router();

router.post("/registration", registration);
router.post("/cart",cart);
router.post("/create-product",createProduct);
router.post("/create-order",createOrder);




module.exports = router;
