const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const rzpInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const User = require("../models/user");
const { membershipAmounts } = require("../utils/constant");
/* NODE SDK: https://github.com/razorpay/razorpay-node */
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

paymentRouter.post("/create-payment", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const amount = membershipAmounts[membershipType];

    if (!membershipType || amount === undefined) {
      return res.status(400).json({ message: "Invalid membership type" });
    }
    const { firstName, lastName, email } = req.user;
    const order = await rzpInstance.orders.create({
      amount: amount * 100,
      receipt: `rcpt_${Date.now()}`,
      currency: "INR",
      notes: {
        // for your reference
        key1: firstName,
        key2: lastName,
        membershipType: membershipType,
      },
    });
    console.log(order);
    const payment = new Payment({
      userId: req.user._id,
      amount: order.amount,
      orderId: order.id,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
      status: order.status,
    });
    const savedPayment = await payment.save();
    res.json({
      ...savedPayment.toJSON(),
      key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_U3JtJnlOQuNt64",
      firstName,
      lastName,
      email,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

paymentRouter.post("/payment-webhook", async (req, res) => {
  try {
    const isValid = validateWebhookSignature(
      req.rawBody,
      req.headers["x-razorpay-signature"],
      process.env.WEBHOOK_SECRET,
    );
    if (!isValid) {
      return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;
    if (event !== "payment.captured" && event !== "payment.failed") {
      return res.status(200).json({ msg: "Event ignored" });
    }

    const paymentEntity = req.body.payload?.payment?.entity;
    const payment = await Payment.findOne({ orderId: paymentEntity?.order_id });
    if (!payment) {
      return res.status(404).send("Payment not found");
    }

    payment.status = paymentEntity.status;
    await payment.save();

    const user = await User.findById(payment.userId);
    if (user) {
      if (event === "payment.captured") {
        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;
        user.membershipExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();
      } else if (event === "payment.failed") {
        user.isPremium = false;
        await user.save();
      }
    }

    return res.status(200).json({ msg: "Webhook processed successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(400).send(err.message);
  }
});

module.exports = paymentRouter;
