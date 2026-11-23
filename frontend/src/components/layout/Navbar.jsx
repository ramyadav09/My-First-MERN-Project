import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaComments,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { removeUser } from "../../features/user/userSlice";
import { removeFeed } from "../../features/user/feedSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";
import { removeConnection } from "../../features/user/connectionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnection());
      navigate("/login");
      setIsMobileMenuOpen(false); // Close mobile menu on logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { icon: <FaBell />, label: "Requests", path: "/requests" },
    { icon: <FaComments />, label: "Messages", path: "/messages" },
  ];

  return (
    <>
      {user && (
        <nav
          className="px-6 py-4 
             bg-gradient-to-r from-purple-900/90 to-purple-950/90 
             text-white shadow-xl sticky top-0 z-50 
             backdrop-blur-md border-b border-white/10"
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Logo */}
            <Link to={"/"} className="flex items-center gap-2 group">
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                DevTinder
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-lg font-medium text-purple-100">
                Hi, <span className="font-bold text-white">{user?.firstName}</span>
              </div>

              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="p-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95 group relative"
                  title={item.label}
                >
                  <span className="text-xl group-hover:text-purple-300 transition-colors">
                    {item.icon}
                  </span>
                </button>
              ))}

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center p-1 rounded-full border-2 border-transparent hover:border-purple-400 transition-all duration-300 focus:outline-none"
                >
                  {user?.photoURL ? (
                    <img
                      className="w-10 h-10 rounded-full object-cover shadow-md"
                      src={user.photoURL}
                      alt="profile"
                    />
                  ) : (
                    <FaUser className="text-2xl" />
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#1a1025] rounded-xl shadow-2xl border border-purple-800/50 overflow-hidden transform origin-top-right transition-all">
                    <ul className="flex flex-col">
                      <li
                        onClick={() => {
                          navigate("/profile");
                          setShowDropdown(false);
                        }}
                        className="px-5 py-3 hover:bg-purple-800/50 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <FaUserCircle className="text-lg opacity-70" />
                        <span className="font-medium">Profile</span>
                      </li>
                      <li
                        onClick={() => {
                          navigate("/settings"); // Assuming settings exists, handled in original code
                          setShowDropdown(false);
                        }}
                        className="px-5 py-3 hover:bg-purple-800/50 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <FaCog className="text-lg opacity-70" />
                        <span className="font-medium">Settings</span>
                      </li>
                      <li
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="px-5 py-3 hover:bg-red-900/30 text-red-400 hover:text-red-300 cursor-pointer flex items-center gap-3 border-t border-white/5 transition-colors"
                      >
                        <FaSignOutAlt className="text-lg" />
                        <span className="font-medium">Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-2xl p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#11081f]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-fade-in">
              <div className="flex flex-col p-4 space-y-2">
                <div className="px-4 py-2 text-purple-200 border-b border-white/5 mb-2">
                  Signed in as <span className="font-bold text-white">{user?.firstName}</span>
                </div>

                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xl text-purple-300">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FaUserCircle className="text-xl text-purple-300" />
                  <span className="font-medium">Profile</span>
                </button>

                <button
                  onClick={() => {
                    // Settings logic
                    navigate("/settings");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FaCog className="text-xl text-purple-300" />
                  <span className="font-medium">Settings</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors mt-2 border-t border-white/5"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
