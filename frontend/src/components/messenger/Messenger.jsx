import { useEffect, useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "./../../utils/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../features/user/connectionSlice";
import { createSocketConnection } from "../../utils/socket";

import Chat from "./Chat";
import { useParams, useNavigate } from "react-router-dom";

const Messenger = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const connection = useSelector((store) => store.connection?.data);

  // ─── Fetch accepted connections ────────────────────────────────
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

  // ─── Online status socket ─────────────────────────────────────
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    // Tell the server this user is online
    socket.emit("goOnline", { userId });

    // Request the current list of online users
    socket.emit("getOnlineUsers");

    // Receive the full list of online user IDs
    socket.on("onlineUsersList", (userIds) => {
      setOnlineUsers(new Set(userIds));
    });

    // A user just came online
    socket.on("userOnline", ({ userId: onlineId }) => {
      setOnlineUsers((prev) => new Set([...prev, onlineId]));
    });

    // A user went offline
    socket.on("userOffline", ({ userId: offlineId }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(offlineId);
        return next;
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  // ─── Auto-select user from URL param ──────────────────────────
  useEffect(() => {
    if (!loading && connection && targetUserId) {
      const target = connection.find((c) => c._id === targetUserId);
      if (target) setSelectedUser(target);
    }
  }, [loading, connection, targetUserId]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl h-full flex overflow-hidden">
          {/* Connections List */}
          <div className="w-1/3 border-r border-white/20 flex flex-col bg-white/5 backdrop-blur-md">
            <div className="p-5 border-b border-white/20 bg-white/5">
              <h2 className="text-white text-2xl font-bold tracking-tight">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-white/60 space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-sm font-medium animate-pulse">Loading connections...</p>
                </div>
              ) : !connection || connection.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center text-white/60">
                  <div className="bg-white/10 p-4 rounded-full mb-3">
                    <FaUser className="text-2xl text-white/40" />
                  </div>
                  <p className="text-lg font-medium text-white/80">No connections yet</p>
                  <p className="text-sm mt-1 text-white/40">Connect with others to start chatting!</p>
                </div>
              ) : (
                <div className="flex flex-col p-2 gap-1">
                  {connection.map((u) => {
                    const isOnline = onlineUsers.has(u._id);
                    const isActive = selectedUser?._id === u._id;
                    return (
                      <div
                        key={u._id}
                        onClick={() => {
                          setSelectedUser(u);
                          navigate(`/messages/${u._id}`);
                        }}
                        className={`group p-3 rounded-xl cursor-pointer transition-all duration-300 border border-transparent ${
                          isActive 
                            ? "bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-white/10 shadow-lg shadow-purple-500/10" 
                            : "hover:bg-white/10 hover:border-white/5 hover:translate-x-1"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {u.photoURL ? (
                              <img
                                src={u.photoURL}
                                alt={u.firstName}
                                className={`w-12 h-12 rounded-full object-cover transition-transform duration-300 ${isActive ? 'scale-105 ring-2 ring-purple-400/50' : 'group-hover:scale-105'}`}
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isActive 
                                  ? "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-inner" 
                                  : "bg-white/10 group-hover:bg-white/20"
                              }`}>
                                <FaUser className="text-white text-lg" />
                              </div>
                            )}
                            {isOnline && (
                              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900 shadow-sm animate-pulse"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold truncate transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                              {u.firstName} {u.lastName}
                            </h3>
                            <p className="text-xs mt-1 flex items-center gap-1.5">
                              {isOnline ? (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                  <span className="text-green-400 font-medium">Online</span>
                                </>
                              ) : (
                                <span className={isActive ? "text-purple-200/60" : "text-white/40 group-hover:text-white/60 transition-colors"}>
                                  Offline
                                </span>
                              )}
                            </p>
                          </div>
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <Chat
            selectedUser={selectedUser}
            isTargetOnline={selectedUser ? onlineUsers.has(selectedUser._id) : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
