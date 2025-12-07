import React from "react";
import {
  FaHeart,
  FaTimes,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCode,
} from "react-icons/fa";

const UserCard = ({ currentUser, onRequest }) => {
  // console.log(currentUser);
  return (
    <div className="max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={currentUser.photoURL}
            alt={`${currentUser.firstName} ${currentUser.lastName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-white text-2xl font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            <div className="flex items-center text-white/80 mt-1">
              <FaBirthdayCake className="mr-2" />
              <span>{currentUser.age} years old</span>
            </div>
            {currentUser.location && (
              <div className="flex items-center text-white/80 mt-1">
                <FaMapMarkerAlt className="mr-2" />
                <span>{currentUser.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 text-white">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-white/80 leading-relaxed">{currentUser.about}</p>
          </div>

          {currentUser.skills && currentUser.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaCode className="mr-2" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills.map((skill, index) => (
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

          <div className="flex justify-center space-x-8">
            <button
              onClick={() => onRequest("ignored", currentUser._id)}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <FaTimes />
            </button>
            <button
              onClick={() => onRequest("interested", currentUser._id)}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 text-white/60"></div>
    </div>
  );
};

export default UserCard;
