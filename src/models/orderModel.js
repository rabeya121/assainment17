const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: Number.isInteger,
            message: "{VALUE} (fraction) can't be quantity!",
          },
        },
      },
    ],

    totalAmount: { type: Number, min: 0, required: true },
    shippingAddress: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
