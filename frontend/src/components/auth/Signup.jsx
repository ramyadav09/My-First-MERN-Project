import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../../utils/baseurl";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice";

const Signup = ({ setLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      
      // Auto login after signup
      const loginRes = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(loginRes.data));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-4 sm:p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md text-white transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl font-extrabold tracking-wide animate-fade-in">
          Create Your Account ✨
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative group">
              <FaUser className="absolute top-3 sm:top-3.5 left-4 text-white/60 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 border border-white/30 rounded-xl outline-none focus:border-white focus:bg-white/15 transition-all text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative group">
              <FaUser className="absolute top-3 sm:top-3.5 left-4 text-white/60 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 border border-white/30 rounded-xl outline-none focus:border-white focus:bg-white/15 transition-all text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <FaEnvelope className="absolute top-3 sm:top-3.5 left-4 text-white/60 group-focus-within:text-white transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 border border-white/30 rounded-xl outline-none focus:border-white focus:bg-white/15 transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute top-3 sm:top-3.5 left-4 text-white/60 group-focus-within:text-white transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/70 p-3 pl-12 pr-12 border border-white/30 rounded-xl outline-none focus:border-white focus:bg-white/15 transition-all text-sm sm:text-base"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 sm:top-3.5 right-4 cursor-pointer text-white/70 hover:text-white transition-all hover:scale-110"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl font-bold tracking-wide transition-all shadow-lg mt-2 text-sm sm:text-base ${
              loading
                ? "bg-white/30 cursor-not-allowed"
                : "bg-white text-purple-700 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            }`}
          >
            {loading ? "Please Wait..." : "Sign Up"}
          </button>

          <p className="text-center text-white/80 text-xs sm:text-sm pt-2">
            Already have an account?
            <span
              onClick={() => setLogin(true)}
              className="ml-1 underline cursor-pointer text-white hover:text-yellow-300 transition-colors font-semibold"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;