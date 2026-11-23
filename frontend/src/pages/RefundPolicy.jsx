import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";
const SUPPORT_EMAIL = "rkramyadav2060@gmail.com";
const ADDRESS = "Bhubaneshwar, Odisha, India";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            Refund & Cancellation Policy
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm leading-relaxed text-white/80">
            <p className="mb-6">
              This Refund & Cancellation Policy applies to all purchases made
              on <strong>{BRAND_NAME}</strong>, including course enrollments
              and subscription plans. Payments are processed through Razorpay
              in Indian Rupees (₹).
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Cancellation</h2>
            <p className="mb-6">
              You may cancel your subscription at any time from your account
              settings. Cancellation takes effect at the end of your current
              billing period. You will continue to have access to your
              enrolled courses until the end of that period.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Refund Eligibility</h2>
            <p className="mb-6">
              Refunds are considered within <strong>7 days</strong> of the
              original purchase date, provided the course content has not been
              accessed or downloaded. Once you access or begin a course, the
              purchase is considered consumed and is not eligible for a refund
              because digital content cannot be returned.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Non-Refundable Items</h2>
            <p className="mb-6">
              The following are non-refundable:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>Courses or content that have been accessed, viewed, or downloaded</li>
              <li>Subscription fees for periods already consumed</li>
              <li>Promotional or discounted purchases marked as final sale</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Refund Process</h2>
            <p className="mb-6">
              Approved refunds are processed back to the original payment
              method used for the transaction. Refunds typically take
              <strong>5 to 7 working days</strong> to appear in your account,
              depending on your bank or payment provider.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. How to Request a Refund</h2>
            <p className="mb-6">
              To request a refund, contact us at
              <strong>{SUPPORT_EMAIL}</strong> with your order ID, registered
              email address, and reason for the request. We will review your
              request and respond within 3 business days.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. Razorpay Transactions</h2>
            <p className="mb-6">
              All refunds are initiated through Razorpay. Once we approve a
              refund, Razorpay handles the reversal of funds to your original
              payment method. {BRAND_NAME} does not control the exact timing
              of when funds appear in your account, as this depends on your
              bank or card issuer.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">7. Contact</h2>
            <p className="mb-0">
              For any questions about refunds or cancellations, please contact
              us at {SUPPORT_EMAIL} or write to us at {ADDRESS}.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
