const Razorpay = require("razorpay");

let instance = null;
try {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} catch (err) {
  console.warn("Razorpay initialization failed:", err.message);
}

module.exports = instance || {
  orders: {
    create: () => {
      throw new Error(
        "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.",
      );
    },
  },
};
