const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "created", "captured"],
      default: "pending",
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
    notes: {
      type: mongoose.Schema.Types.Mixed,
    },

  },
  { timestamps: true },
);
module.exports = mongoose.model("Payment", paymentSchema);
