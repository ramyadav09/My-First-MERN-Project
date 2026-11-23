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
              <strong>{BRAND_NAME}</strong> (the "Platform"), an online dating
              platform operated by <strong>{OWNER_NAME}</strong>, located at
              <strong>{ADDRESS}</strong>. By accessing or using the Platform,
              you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By creating an account, matching with other users, or making a
              payment on the Platform, you agree to these Terms and our
              Privacy Policy. If you do not agree, you may not use the
              Platform.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Account Usage</h2>
            <p className="mb-6">
              You must be at least 18 years of age to use the Platform. You
              must provide accurate and complete information when registering.
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Profile and Content</h2>
            <p className="mb-6">
              You own the content you post on your profile. By posting content
              on the Platform, you grant {BRAND_NAME} a license to use, host,
              store, and display that content for the purpose of operating the
              dating service. You may not post false, misleading, or harmful
              content, or impersonate another person.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Age Requirement</h2>
            <p className="mb-6">
              {BRAND_NAME} is strictly for users aged <strong>18 years and
              older</strong>. By creating an account, you confirm that you are
              at least 18 years of age. Accounts found to belong to users
              under 18 will be suspended or terminated immediately without
              notice.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. User Conduct and Content Moderation</h2>
            <p className="mb-6">
              You agree to use the Platform responsibly and respectfully. We
              prohibit harassment, hate speech, bullying, fake profiles, and
              any behavior that makes other users feel unsafe. {BRAND_NAME} reserves the right to review, moderate, and remove any profile,
              photo, or message that violates these standards. Repeated
              violations may result in permanent account suspension.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. Prohibited Content and Services</h2>
            <p className="mb-6">
              {BRAND_NAME} is a social dating and matchmaking platform. The
              following are strictly prohibited:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-white/80">
              <li>Adult or sexually explicit content, photos, or messages</li>
              <li>Escort services, prostitution, or solicitation of paid sexual services</li>
              <li>Human trafficking or any illegal activity</li>
              <li>Scams, fraud, or financial exploitation of other users</li>
            </ul>
            <p className="mb-6">
              Any user found engaging in prohibited activities will be
              permanently banned and may be reported to the relevant
              authorities.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">7. Payments via Razorpay</h2>
            <p className="mb-6">
              All premium subscription payments are processed securely through
              Razorpay, a PCI DSS-compliant payment gateway. By making a
              payment, you authorize Razorpay to process your transaction in
              Indian Rupees (₹). {BRAND_NAME} does not store your full payment
              card details; all payment data is handled directly by Razorpay.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">8. Limitation of Liability</h2>
            <p className="mb-6">
              The Platform and all content are provided "as is" without
              warranties of any kind. {BRAND_NAME} and {OWNER_NAME} are not
              liable for any indirect, incidental, or consequential damages
              arising from your use of the Platform, including interactions
              with other users, loss of data, downtime, or inability to access
              the service.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">9. Governing Law</h2>
            <p className="mb-6">
              These Terms are governed by and construed in accordance with the
              laws of India. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts located in
              {ADDRESS}.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">10. Changes to Terms</h2>
            <p className="mb-6">
              We may update these Terms from time to time. Continued use of
              the Platform after changes are posted constitutes acceptance of
              the revised Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">11. Contact</h2>
            <p className="mb-0">
              If you have questions about these Terms, please contact us at
              rkramyadav2063@gmail.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
