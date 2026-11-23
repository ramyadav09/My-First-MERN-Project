import { Link } from "react-router-dom";
import { FiZap, FiAward, FiSend } from "react-icons/fi";
import { FaClock, FaInfinity } from "react-icons/fa";
import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";

const plans = [
  {
    name: "Plus",
    icon: <FiZap size={28} className="text-violet-400" />,
    price: 100,
    interval: "/mo",
    features: [
      "Unlimited swipes",
      "5 Super Likes per day",
      "See who liked you",
      "Rewind last swipe",
      "Ad-free experience",
    ],
    description: "Perfect for getting started with premium dating features.",
  },
  {
    name: "Premium",
    icon: <FiAward size={28} className="text-yellow-400" />,
    price: 200,
    interval: "/mo",
    features: [
      "Everything in Plus",
      "Unlimited Super Likes",
      "Priority in feed",
      "Read receipts in chat",
      "Profile boost × 3/month",
      "Advanced filters",
    ],
    description: "Our most popular plan for serious daters.",
    popular: true,
  },
  {
    name: "Pro",
    icon: <FiSend size={28} className="text-pink-400" />,
    price: 300,
    interval: "/mo",
    features: [
      "Everything in Premium",
      "Incognito mode",
      "See all profile visitors",
      "Unlimited profile boosts",
      "Dedicated support",
      "Early access to features",
    ],
    description: "For power users who want complete access.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
          Choose the plan that fits your dating goals. All prices are in
          Indian Rupees (₹) and billed through Razorpay. Cancel anytime.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-transform hover:-translate-y-2 ${
                plan.popular
                  ? "border-yellow-500/40 bg-gradient-to-b from-yellow-500/20 to-orange-700/20 scale-105 shadow-yellow-500/20"
                  : "border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-white/10">{plan.icon}</div>
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">
                  ₹{plan.price}
                </span>
                <span className="text-white/40 ml-1 text-sm">{plan.interval}</span>
              </div>
              <p className="text-white/60 text-sm mb-8 flex-1">
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-white/80 text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs shrink-0">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/premium"
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                Get {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <FaClock className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Billing Frequency</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              All plans are monthly subscriptions billed automatically through
              Razorpay. You can cancel at any time from your account settings.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <FaInfinity className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Currency</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              All pricing is displayed in Indian Rupees (₹). Payments are
              processed securely in INR via Razorpay.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
