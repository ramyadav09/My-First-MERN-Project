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

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnection());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      {user && (
        <div
          className="flex justify-between items-center px-8 py-4 
             bg-gradient-to-r from-purple-800 to-purple-900 
             text-white shadow-xl sticky top-0 z-50 
             backdrop-blur-lg bg-opacity-90 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <Link to={"/"}>
              {" "}
              <h1 className="m-0 text-3xl cursor-pointer font-extrabold tracking-wide drop-shadow-md">
                DevTinder
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-lg font-medium text-white">
              Welcome, <span className="font-semibold">{user?.firstName}</span>
            </div>

            <button
              onClick={() => navigate("/requests")}
              className="relative p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              title="Connection Requests"
            >
              <FaBell className="text-2xl text-white" />
            </button>

            <button
              onClick={() => navigate("/messages")}
              className="relative p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              title="Messages"
            >
              <FaComments className="text-2xl text-white" />
            </button>

            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer p-1 rounded-full transition 
               hover:bg-white/20 hover:scale-105 active:scale-95 
               flex items-center justify-center"
              >
                {user?.photoURL ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
                    src={user.photoURL}
                    alt="profile"
                  />
                ) : (
                  <FaUser className="text-3xl" />
                )}
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden">
                  <ul className="py-2">
                    <li
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-purple-600 hover:text-white text-gray-800 cursor-pointer transition-all flex items-center gap-3"
                    >
                      <FaUserCircle className="text-lg" />
                      <span className="font-medium">Profile</span>
                    </li>
                    <li
                      onClick={() => {
                        navigate("/settings");
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-purple-600 hover:text-white text-gray-800 cursor-pointer transition-all flex items-center gap-3"
                    >
                      <FaCog className="text-lg" />
                      <span className="font-medium">Settings</span>
                    </li>
                    <li
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-red-500 hover:text-white text-gray-800 cursor-pointer transition-all flex items-center gap-3 border-t border-gray-200"
                    >
                      <FaSignOutAlt className="text-lg" />
                      <span className="font-medium">Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
