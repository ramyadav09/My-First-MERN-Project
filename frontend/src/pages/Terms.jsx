import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";
const OWNER_NAME = "Ram Kumar Yadav";
const ADDRESS = "Bhubaneshwar, Odisha, India";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            Terms & Conditions
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm leading-relaxed text-white/80">
            <p className="mb-6">
              These Terms and Conditions ("Terms") govern your use of
              <strong>{BRAND_NAME}</strong> (the "Platform"), an education and
              e-learning platform operated by <strong>{OWNER_NAME}</strong>,
              located at <strong>{ADDRESS}</strong>. By accessing or using the
              Platform, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By creating an account, enrolling in a course, or making a
              payment on the Platform, you agree to these Terms and our
              Privacy Policy. If you do not agree, you may not use the
              Platform.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Account Usage</h2>
            <p className="mb-6">
              You must provide accurate and complete information when
              registering. You are responsible for maintaining the
              confidentiality of your account credentials and for all
              activities that occur under your account. You must be at least
              18 years of age to use the Platform.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Intellectual Property</h2>
            <p className="mb-6">
              All course content, videos, text, images, logos, and materials
              on the Platform are owned by {BRAND_NAME} or its licensors and
              are protected by copyright and intellectual property laws. You
              may access content for personal, non-commercial learning only.
              You may not copy, distribute, or modify any content without
              express written permission.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Payments via Razorpay</h2>
            <p className="mb-6">
              All course and subscription payments are processed securely
              through Razorpay, a PCI DSS-compliant payment gateway. By making
              a payment, you authorize Razorpay to process your transaction in
              Indian Rupees (₹). {BRAND_NAME} does not store your full payment
              card details; all payment data is handled directly by Razorpay.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. Limitation of Liability</h2>
            <p className="mb-6">
              The Platform and all content are provided "as is" without
              warranties of any kind. {BRAND_NAME} and {OWNER_NAME} are not
              liable for any indirect, incidental, or consequential damages
              arising from your use of the Platform, including loss of data,
              downtime, or inability to access courses.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. Governing Law</h2>
            <p className="mb-6">
              These Terms are governed by and construed in accordance with the
              laws of India. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts located in
              {ADDRESS}.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">7. Changes to Terms</h2>
            <p className="mb-6">
              We may update these Terms from time to time. Continued use of
              the Platform after changes are posted constitutes acceptance of
              the revised Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">8. Contact</h2>
            <p className="mb-0">
              If you have questions about these Terms, please contact us at
              your-support-email@example.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
