import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/received/request",
        {
          withCredentials: true,
        }
      );
      setRequests(res.data.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + `/request/receive/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      setRequests(requests.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error("Failed to handle request:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Connection Requests</h1>

        {requests.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
            <p className="text-white/80 text-lg">No pending requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                    {request.fromUserId?.photoURL ? (
                      <img
                        src={request.fromUserId.photoURL}
                        alt={request.fromUserId.firstName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-white text-2xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                    </h3>
                    {request.fromUserId?.about && (
                      <p className="text-white/70 text-sm mt-1">
                        {request.fromUserId.about.substring(0, 80)}...
                      </p>
                    )}
                    {request.fromUserId?.skills && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {request.fromUserId.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white/20 px-2 py-1 rounded-full text-xs text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleRequest("rejected", request._id)}
                    className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <FaTimes />
                  </button>
                  <button
                    onClick={() => handleRequest("accepted", request._id)}
                    className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;