import { useSelector } from "react-redux";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Please login to view your profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <button
              onClick={() => setShowEditProfile(!showEditProfile)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center mx-auto"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          </div>

          {showEditProfile ? (
            <EditProfile user={user} setShowEditProfile={setShowEditProfile} />
          ) : (
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-white/60" />
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                  </div>
                  {user.age && (
                    <div className="flex items-center space-x-3">
                      <FaBirthdayCake className="text-white/60" />
                      <div>
                        <p className="text-white/60 text-sm">Age</p>
                        <p className="text-white">{user.age} years old</p>
                      </div>
                    </div>
                  )}
                  {user.gender && (
                    <div className="flex items-center space-x-3">
                      <FaUser className="text-white/60" />
                      <div>
                        <p className="text-white/60 text-sm">Gender</p>
                        <p className="text-white capitalize">{user.gender}</p>
                      </div>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-white/60" />
                      <div>
                        <p className="text-white/60 text-sm">Location</p>
                        <p className="text-white">{user.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {user.about && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">About Me</h2>
                  <p className="text-white/80 leading-relaxed">{user.about}</p>
                </div>
              )}

              {user.skills && user.skills.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {showChangePassword ? (
                <ChangePassword onCancel={() => setShowChangePassword(false)} />
              ) : (
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Security</h2>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      Change Password
                    </button>
                  </div>
                  <p className="text-white/60 mt-2">
                    Update your password to keep your account secure
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
