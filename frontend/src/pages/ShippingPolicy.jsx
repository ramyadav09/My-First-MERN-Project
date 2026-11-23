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
              All courses, learning materials, and digital content offered by
              <strong>{BRAND_NAME}</strong> are delivered entirely online.
              There are no physical products shipped.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Digital Delivery</h2>
            <p className="mb-6">
              Upon successful payment through Razorpay, you receive instant
              access to your enrolled courses via your account dashboard. No
              shipping address is required, and no physical items are
              dispatched.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Delivery Time</h2>
            <p className="mb-6">
              Access is granted immediately once the payment is confirmed.
              There are no delivery timelines, shipping charges, or transit
              delays because all content is digital and hosted on our Platform.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. No Physical Shipments</h2>
            <p className="mb-6">
              {BRAND_NAME} operates as an education and e-learning platform.
              All course videos, reading materials, assignments, and
              certificates are available digitally. We do not ship physical
              materials to any address in India or internationally.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Access Requirements</h2>
            <p className="mb-6">
              To access your courses, you need:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>An active internet connection</li>
              <li>A registered and verified account on {BRAND_NAME}</li>
              <li>A device capable of streaming video and viewing PDFs</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. Certificates</h2>
            <p className="mb-6">
              Course completion certificates are issued digitally and can be
              downloaded from your account dashboard. No printed or mailed
              certificates are provided.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. Contact</h2>
            <p className="mb-0">
              For questions about course access or digital delivery, contact
              us at your-support-email@example.com or write to us at
              {ADDRESS}.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
