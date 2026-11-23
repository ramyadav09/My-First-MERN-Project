import { useState } from "react";
import { FiZap, FiAward, FiSend, FiCheck } from "react-icons/fi";

const plans = [
  {
    name: "Plus",
    icon: <FiZap size={26} className="text-violet-400" />,
    price: { monthly: 100, yearly: 999 },
    color: "from-violet-600/20 to-violet-900/20",
    border: "border-violet-500/40",
    shadow: "shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    badge: null,
    highlight: false,
    popular: false,
    features: [
      "Unlimited swipes",
      "5 Super Likes per day",
      "See who liked you",
      "Rewind last swipe",
      "Ad-free experience",
    ],
    cta: "Get Plus",
  },
  {
    name: "Premium",
    icon: <FiAward size={26} className="text-yellow-400" />,
    price: { monthly: 300, yearly: 2999 },
    color: "from-yellow-500/20 to-orange-700/20",
    border: "border-yellow-400/60",
    shadow: "shadow-[0_0_20px_rgba(234,179,8,0.25)]",
    badge: "Most Popular",
    highlight: true,
    popular: true,
    features: [
      "Everything in Plus",
      "Unlimited Super Likes",
      "Priority in feed",
      "Read receipts in chat",
      "Profile boost × 3/month",
      "Advanced filters",
    ],
    cta: "Get Premium",
  },
  {
    name: "Pro",
    icon: <FiSend size={26} className="text-pink-400" />,
    price: { monthly: 200, yearly: 1999 },
    color: "from-pink-600/20 to-purple-900/20",
    border: "border-pink-500/40",
    shadow: "shadow-[0_0_20px_rgba(236,72,153,0.25)]",
    badge: null,
    highlight: false,
    popular: false,
    features: [
      "Everything in Premium",
      "Incognito mode",
      "See all profile visitors",
      "Unlimited profile boosts",
      "Dedicated support",
      "Early access to features",
    ],
    cta: "Get Pro",
  },
];

export default function SubscriptionPlans() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          Upgrade Your Experience
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto">
          Find your perfect match faster with a premium plan
        </p>

        <div className="mt-8 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-sm">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === "monthly"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === "yearly"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
              Save 35%
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative w-full flex-1 rounded-3xl border bg-gradient-to-b ${plan.color} ${plan.border} ${plan.shadow} p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              plan.highlight ? "scale-[1.04] shadow-yellow-500/25 ring-1 ring-yellow-400/50" : ""
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold tracking-wider px-4 py-1.5 rounded-full shadow-lg shadow-yellow-400/30">
                {plan.badge}
              </span>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                {plan.icon}
              </div>
              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">
                ₹{plan.price[billing]}
              </span>
              <span className="text-white/40 ml-1 text-sm font-medium">
                /{billing === "monthly" ? "mo" : "yr"}
              </span>
            </div>

            <ul className="flex-1 space-y-3.5 mb-10">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
                  <div className="flex-shrink-0 mt-0.5">
                    <FiCheck size={15} className="text-green-400" />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                plan.highlight
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/40 hover:bg-yellow-300 hover:shadow-yellow-500/60"
                  : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
              }`}
            >
              {plan.cta}
            </button>

            {billing === "yearly" && (
              <p className="mt-4 text-center text-xs text-white/40 font-medium">
                Billed annually • Cancel anytime
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-12 text-white/30 text-xs text-center">
        Cancel anytime. No hidden charges. Secure payment.
      </p>
    </div>
  );
}
