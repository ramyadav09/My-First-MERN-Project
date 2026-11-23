import { Link } from "react-router-dom";
import { FiHeart, FiUsers, FiZap, FiShield } from "react-icons/fi";
import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Verified 18+ Adults Only</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            Find Your Perfect Match on {BRAND_NAME}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {BRAND_NAME} is a social dating and matchmaking platform designed
            to help verified adults connect safely. Build your profile, swipe
            through genuine matches, and start meaningful conversations — all
            in one secure place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Go Premium
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-all duration-300"
            >
              Login or Sign Up
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Genuine Matches</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Swipe through verified profiles and connect with people who
              share your interests.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Safe &amp; Verified</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              All users are 18+ and verified. We moderate content to keep the
              platform safe for everyone.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiZap className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Connection</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Match instantly and start chatting with your matches right away.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to meet someone special?</h2>
          <p className="text-white/60 mb-8">
            Join thousands of verified singles on {BRAND_NAME}. Free to join,
            premium features available.
          </p>
          <Link
            to="/login"
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-400 font-bold rounded-xl text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30"
          >
            Create Your Profile
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
