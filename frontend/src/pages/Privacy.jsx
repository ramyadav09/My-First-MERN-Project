import Footer from "../components/layout/Footer";

const BRAND_NAME = "Dev Tinder";
const OWNER_NAME = "Ram Kumar Yadav";
const SUPPORT_EMAIL = "rkramyadav2060@gmail.com";
const ADDRESS = "Bhubaneshwar, Odisha, India";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm leading-relaxed text-white/80">
            <p className="mb-6">
              This Privacy Policy explains how <strong>{BRAND_NAME}</strong>
              ("we", "us", "our") collects, uses, and protects your personal
              information when you use our Platform. We are operated by
              <strong>{OWNER_NAME}</strong>, located at
              <strong>{ADDRESS}</strong>.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Information We Collect</h2>
            <p className="mb-6">
              We collect personal information that you provide directly to us,
              including:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>Full name</li>
              <li>Email address</li>
              <li>Profile photo (optional)</li>
              <li>Payment details (processed by Razorpay)</li>
              <li>Usage data and course enrollment history</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. How We Use Your Information</h2>
            <p className="mb-6">
              We use your information to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>Create and manage your account</li>
              <li>Process course enrollments and payments</li>
              <li>Provide access to learning content</li>
              <li>Send service-related communications</li>
              <li>Improve the Platform and user experience</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Payment Processing</h2>
            <p className="mb-6">
              All payments are processed securely by Razorpay. {BRAND_NAME}
              does not collect or store your full credit or debit card
              numbers. Razorpay is a PCI DSS-compliant payment gateway and
              handles all sensitive payment data in accordance with its own
              privacy policy and applicable security standards.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Cookies and Tracking</h2>
            <p className="mb-6">
              We use cookies and similar technologies to authenticate your
              session, remember your preferences, and analyze how you use the
              Platform. You can manage or disable cookies through your browser
              settings, though some features may not work properly without
              them.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. Data Sharing</h2>
            <p className="mb-6">
              We do not sell, rent, or trade your personal information to
              third parties. We share data only with:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>Razorpay, for the sole purpose of processing payments</li>
              <li>Service providers who help us operate the Platform</li>
              <li>Legal authorities, when required by law</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. Data Retention</h2>
            <p className="mb-6">
              We retain your personal information only as long as necessary to
              fulfill the purposes described in this Policy, including for
              legal, tax, and reporting obligations.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">7. Your Rights</h2>
            <p className="mb-6">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">8. Data Deletion Requests</h2>
            <p className="mb-6">
              To request deletion of your account and personal data, contact
              us at {SUPPORT_EMAIL}. We will process your request within 30
              days, subject to any legal retention obligations.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">9. Security</h2>
            <p className="mb-6">
              We implement reasonable technical and organizational measures to
              protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">10. Contact</h2>
            <p className="mb-0">
              If you have questions about this Privacy Policy, contact us at
              {SUPPORT_EMAIL}.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
