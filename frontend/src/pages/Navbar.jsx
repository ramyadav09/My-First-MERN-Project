import Navbar from "../components/layout/Navbar";

export default function NavbarPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Navbar Preview</h1>
        <p className="text-gray-400 mb-8">
          The navbar renders automatically when a user is logged in and wraps all
          app routes via the <code className="text-purple-400">Body</code> layout.
        </p>
      </div>
    </div>
  );
}
