import { useState } from "react";
import { FiCheck, FiZap, FiAward, FiSend } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";

const plans = [
  {
    name: "Plus",
    icon: <FiZap size={28} className="text-violet-400" />,
    price: { monthly: 9, yearly: 79 },
    color: "from-violet-600/20 to-violet-900/20",
    border: "border-violet-500/40",
    badge: null,
    highlight: false,
    features: [
      "Unlimited swipes",
      "5 Super Likes per day",
      "See who liked you",
      "Rewind last swipe",
      "Ad-free experience",
    ],
  },
  {
    name: "Premium",
    icon: <FiAward size={28} className="text-yellow-400" />,
    price: { monthly: 19, yearly: 149 },
    color: "from-yellow-500/20 to-orange-700/20",
    border: "border-yellow-400/60",
    badge: "Most Popular",
    highlight: true,
    features: [
      "Everything in Plus",
      "Unlimited Super Likes",
      "Priority in feed",
      "Read receipts in chat",
      "Profile boost × 3/month",
      "Advanced filters",
    ],
  },
  {
    name: "Pro",
    icon: <FiSend size={28} className="text-pink-400" />,
    price: { monthly: 29, yearly: 229 },
    color: "from-pink-600/20 to-purple-900/20",
    border: "border-pink-500/40",
    badge: null,
    highlight: false,
    features: [
      "Everything in Premium",
      "Incognito mode",
      "See all profile visitors",
      "Unlimited profile boosts",
      "Dedicated support",
      "Early access to features",
    ],
  },
];

export default function Premium() {
  const [billing, setBilling] = useState("monthly");

  const planTypeMap = { Plus: "plus", Premium: "elite", Pro: "pro" };

  const handlePayment = async (planName) => {
    try {
      const membershipType = planTypeMap[planName];
      if (!membershipType) {
        throw new Error("Invalid plan selected");
      }
      const order = await axios.post(
        BASE_URL + "/create-payment",
        {
          membershipType,
        },
        { withCredentials: true },
      );
      console.log(order.data);
      const { amount, currency, key_id, id: order_id, firstName, lastName, email } = order.data;
      const options = {
        key: key_id, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "DevTinder",
        description: "Connect with your perfect match",
        order_id: order_id, // This is the order_id created in the backend
        // callback_url: "http://localhost:3000/payment-success", // Your success URL
        prefill: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          // contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open(); //Open Razorpay checkout modal
    } catch (err) {
      console.error(
        "Payment creation failed:",
        err.response?.data || err.message,
      );
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-3">
          Upgrade Your Experience
        </h1>
        <p className="text-white/50 text-lg">
          Find your perfect match faster with a premium plan
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-2 py-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === "monthly"
                ? "bg-violet-600 text-white shadow"
                : "text-white/50 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === "yearly"
                ? "bg-violet-600 text-white shadow"
                : "text-white/50 hover:text-white"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              Save 35%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex-1 rounded-2xl border bg-gradient-to-b ${plan.color} ${plan.border} p-6 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl ${
              plan.highlight ? "scale-105 shadow-yellow-500/20 shadow-xl" : ""
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                {plan.badge}
              </span>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-white/10">{plan.icon}</div>
              <h2 className="text-xl font-bold text-white">{plan.name}</h2>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">
                ${plan.price[billing]}
              </span>
              <span className="text-white/40 ml-1 text-sm">
                /{billing === "monthly" ? "mo" : "yr"}
              </span>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <FiCheck size={16} className="text-green-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePayment(plan.name)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                plan.highlight
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-white/30 text-xs text-center">
        Cancel anytime. No hidden charges. Secure payment.
      </p>
    </div>
  );
}
