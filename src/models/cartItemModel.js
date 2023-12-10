const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
      validate: {
        validator: (value) => Number.isInteger(value),
        message: "{VALUE} is not an integer value. Try to omit fraction.",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const CartItemModel = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItemModel;
