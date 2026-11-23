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
    const isvalidateWebhookSignature = validateWebhookSignature(
      JSON.stringify(req.body),
      req.headers["x-razorpay-signature"],
      process.env.WEBHOOK_SECRET,
    );
    if (!isvalidateWebhookSignature) {
      return res.status(400).send("Invalid signature");
    }
    console.log("Webhook event received:", req.body.event);
    //update payment status in database
    const payment = await Payment.findOne({
      orderId: req.body.payload.payment.entity.order_id,
    });
    if (!payment) {
      return res.status(404).send("Payment not found");
    }
    payment.status = req.body.payload.payment.entity.status;
    await payment.save();

    //update premium status in user model
    const user = await User.findById(payment.userId);

    if (req.body.event === "payment.captured") {
      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;
      user.membershipExpiry = new Date() + 30 * 24 * 60 * 60 * 1000; // Set membership expiry to 30 days from now
      await user.save();
    }
    if (req.body.event === "payment.failed") {
      user.isPremium = false;
      await user.save();
    }

    return res.status(200).json({ msg: "Webhook processed successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = paymentRouter;
