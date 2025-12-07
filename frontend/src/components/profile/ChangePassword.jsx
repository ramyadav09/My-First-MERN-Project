import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";

const ChangePassword = ({ onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/changePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onCancel();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Change Password</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-400 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col relative">
          <FaLock className="absolute top-3 left-4 text-white/60" />
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 border border-white/30 rounded-xl outline-none focus:border-white"
          />
        </div>

        <div className="flex flex-col relative">
          <FaLock className="absolute top-3 left-4 text-white/60" />
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 border border-white/30 rounded-xl outline-none focus:border-white"
          />
        </div>

        <div className="flex flex-col relative">
          <FaLock className="absolute top-3 left-4 text-white/60" />
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 pr-12 border border-white/30 rounded-xl outline-none focus:border-white"
          />
          <div
            onClick={() => setShowPasswords(!showPasswords)}
            className="absolute top-3 right-4 cursor-pointer text-white/70 hover:text-white transition"
          >
            {showPasswords ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleChangePassword}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
