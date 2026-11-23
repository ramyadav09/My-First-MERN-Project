import { Link } from "react-router-dom";
import { FaHeart, FaUsers, FaLightbulb } from "react-icons/fa";
import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";

export default function About() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            About {BRAND_NAME}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            {BRAND_NAME} is an online dating platform built to help people
            connect with the right matches, build meaningful conversations,
            and find lasting relationships — all in one place.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
            <FaHeart className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Who it is for</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Singles looking for genuine connections, meaningful
              conversations, and long-term relationships through a safe and
              verified dating experience.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
            <FaUsers className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">How it works</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Create your profile, swipe through matches, connect with people
              you like, and upgrade to a premium plan for unlimited likes and
              priority visibility.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
            <FaLightbulb className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">What you get</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Unlimited swipes, see who liked you, rewind your last swipe,
              ad-free experience, and priority in the match queue for premium
              subscribers.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Ready to find your match?</h2>
          <div className="flex justify-center">
            <Link
              to="/pricing"
              className="px-8 py-3 bg-white text-purple-700 font-bold rounded-xl hover:scale-105 transition-transform duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
