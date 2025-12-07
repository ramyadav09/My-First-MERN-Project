import { useEffect, useState } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "./../../utils/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../features/user/connectionSlice";

const Messenger = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const connection = useSelector((store) => store.connection?.data);
  useEffect(() => {
    const acceptedRequest = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/accepted/request`, {
          withCredentials: true,
        });
        dispatch(addConnection(res.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    acceptedRequest();
  }, []);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-6">
      <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl h-full flex overflow-hidden">
          {/* Connections List */}
          <div className="w-1/3 border-r border-white/20 flex flex-col">
            <div className="p-4 border-b border-white/20">
              <h2 className="text-white text-xl font-bold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-white/60">Loading...</div>
              ) : !connection || connection.length === 0 ? (
                <div className="p-4 text-center text-white/60">No connections yet</div>
              ) : (
                connection.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 cursor-pointer transition-all hover:bg-white/10 border-b border-white/10 ${
                    selectedUser?._id === user._id ? "bg-white/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.firstName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                          <FaUser className="text-white" />
                        </div>
                      )}
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {user.firstName} {user.lastName}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/20 flex items-center gap-3">
                  {selectedUser.photoURL ? (
                    <img
                      src={selectedUser.photoURL}
                      alt={selectedUser.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-semibold">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {selectedUser.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                {/* Message Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-white/20"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/40 text-6xl mb-4">💬</div>
                  <p className="text-white/60 text-lg">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
