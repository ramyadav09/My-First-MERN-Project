import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";
const ADDRESS = "Bhubaneshwar, Odisha, India";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            Shipping & Delivery Policy
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm leading-relaxed text-white/80">
            <p className="mb-6">
              <strong>{BRAND_NAME}</strong> is an online dating platform.
              There are no physical products shipped — all features, matches,
              and premium benefits are delivered digitally through our app and
              website.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Digital Delivery</h2>
            <p className="mb-6">
              Upon successful payment through Razorpay, you receive instant
              access to your premium subscription features via your account.
              No shipping address is required, and no physical items are
              dispatched.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Delivery Time</h2>
            <p className="mb-6">
              Premium access is granted immediately once the payment is
              confirmed. There are no delivery timelines, shipping charges, or
              transit delays because all services are digital and hosted on
              our Platform.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. No Physical Shipments</h2>
            <p className="mb-6">
              {BRAND_NAME} operates as an online dating platform. All profile
              features, matches, chats, and premium benefits are available
              digitally. We do not ship physical materials to any address in
              India or internationally.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Access Requirements</h2>
            <p className="mb-6">
              To access your premium features, you need:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>An active internet connection</li>
              <li>A registered and verified account on {BRAND_NAME}</li>
              <li>A device capable of running the app or website</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. Contact</h2>
            <p className="mb-0">
              For questions about premium access or digital delivery, contact
              us at rkramyadav2060@gmail.com or write to us at
              {ADDRESS}.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
