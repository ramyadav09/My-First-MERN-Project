const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const rzpInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmounts } = require("../utils/constant");

paymentRouter.post("/create-payment", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const amount = membershipAmounts[membershipType];

    if (!membershipType || amount === undefined) {
      return res.status(400).json({ message: "Invalid membership type" });
    }
    const { firstName, lastName, email } = req.user;
    const order = await rzpInstance.orders.create({
      amount: amount,
      method: "netbanking",
      receipt: "BILL13375649", // receipt id
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

module.exports = paymentRouter;
