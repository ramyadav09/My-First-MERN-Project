import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaLock } from "react-icons/fa";

const BRAND_NAME = "Dev Tinder";
const OWNER_NAME = "Ram Kumar Yadav";
const SUPPORT_EMAIL = "rkramyadav2060@gmail.com";
const SUPPORT_PHONE = "+91-9234600646";
const ADDRESS = "Bhubaneshwar, Odisha, India";

const footerLinks = [
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Pricing", path: "/pricing" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Refund & Cancellation", path: "/refund-policy" },
  { label: "Shipping Policy", path: "/shipping-policy" },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#1a0b2e] border-t border-white/10 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 mb-6 group"
            >
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {BRAND_NAME}
              </h1>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {BRAND_NAME} is an online dating platform that helps people
              connect, match, and build meaningful relationships through a
              simple, secure experience.
            </p>
            <div className="flex gap-4">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>{SUPPORT_EMAIL}</span>
              </a>
              <a
                href={`tel:${SUPPORT_PHONE}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <FaPhone className="w-4 h-4" />
                <span>{SUPPORT_PHONE}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 mt-0.5" />
                <span className="leading-relaxed">{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="w-4 h-4" />
                <span>Mon - Sat, 10:00 AM to 7:00 PM IST</span>
              </li>
              <li className="flex items-center gap-3">
                <FaLock className="w-4 h-4" />
                <span>Payments secured by Razorpay</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Owned and operated by {OWNER_NAME} | {ADDRESS}
          </p>
        </div>
      </div>
    </footer>
  );
}
