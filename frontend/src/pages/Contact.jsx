import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";
const OWNER_NAME = "Ram Kumar Yadav";
const SUPPORT_EMAIL = "rkramyadav2063@gmail.com";
const SUPPORT_PHONE = "+91-9234600646";
const ADDRESS = "Bhubaneshwar, Odisha, India";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Have questions about {BRAND_NAME}, your matches, or your account?
            Reach out to us and we will get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-400 mt-0.5">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Office Address</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-400 mt-0.5">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Support Email</h3>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-purple-300 hover:text-white underline underline-offset-4"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-400 mt-0.5">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Support Phone</h3>
                  <a
                    href={`tel:${SUPPORT_PHONE}`}
                    className="text-purple-300 hover:text-white underline underline-offset-4"
                  >
                    {SUPPORT_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-400 mt-0.5">
                  <FaClock />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Operating Hours</h3>
                  <p className="text-white/60 text-sm">
                    Monday to Saturday, 10:00 AM to 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get("name");
                const email = formData.get("email");
                const subject = formData.get("subject");
                const message = formData.get("message");
                const body = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
                window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none transition-colors"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your message"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-white text-purple-700 font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
