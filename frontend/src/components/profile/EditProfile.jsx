import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "./../../utils/baseurl";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../features/user/userSlice";

const EditProfile = ({ user, setShowEditProfile }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
    age: user.age || "",
    photoURL: user.photoURL || "",
    about: user.about || "",
    skills: user.skills ? user.skills.join(", ") : "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return;
    }

    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      setError("Age must be between 18 and 100");
      return;
    }

    setLoading(true);
    try {
      // Convert skills string to array
      const dataToSend = {
        ...formData,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()).filter(s => s) : []
      };
      
      const response = await axios.patch(BASE_URL + "/profile/edit", dataToSend, {
        withCredentials: true,
      });
      
      // Update Redux store with new user data
      dispatch(addUser(response.data.loggedInUser));
      
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        setShowEditProfile(false);
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Edit Profile</h2>

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            required
            onChange={handleChange}
            className="flex-1 bg-white/10 text-white placeholder-white/70 p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors"
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            required
            onChange={handleChange}
            className="flex-1 bg-white/10 text-white placeholder-white/70 p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors"
          />
        </div>

        <input
          name="photoURL"
          type="url"
          placeholder="Photo URL"
          value={formData.photoURL}
          onChange={handleChange}
          className="bg-white/10 text-white placeholder-white/70 p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors"
        />

        <textarea
          name="about"
          placeholder="About yourself"
          value={formData.about}
          onChange={handleChange}
          rows="3"
          className="bg-white/10 text-white placeholder-white/70 p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors resize-none"
        />

        <input
          name="skills"
          type="text"
          placeholder="Skills (comma separated, e.g. JavaScript, React, Node.js)"
          value={formData.skills}
          onChange={handleChange}
          className="bg-white/10 text-white placeholder-white/70 p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="block text-white/80 mb-2 font-semibold">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-white/10 text-white p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors"
            >
              <option value="" disabled className="bg-gray-800">
                Select gender
              </option>
              <option value="male" className="bg-gray-800">
                Male
              </option>
              <option value="female" className="bg-gray-800">
                Female
              </option>
              <option value="other" className="bg-gray-800">
                Other
              </option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="block text-white/80 mb-2 font-semibold">
              Age
            </label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="bg-white/10 text-white placeholder-white/70 p-3 border border-white/30 rounded-xl outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowEditProfile(false)}
            disabled={loading}
            className="flex-1 bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
