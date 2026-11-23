import { useEffect, useState, useRef, useCallback } from "react";
import { FaUser, FaPaperPlane, FaSmile } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../../utils/socket";
import { BASE_URL } from "../../utils/baseurl";

const Chat = ({ selectedUser, isTargetOnline }) => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const targetUserId = selectedUser?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ─── Auto-scroll to latest message ────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // ─── Fetch existing messages ──────────────────────────────────────
  useEffect(() => {
    const fetchMessages = async () => {
      if (!targetUserId) {
        setMessages([]);
        return;
      }
      try {
        const res = await axios.get(`${BASE_URL}/messages/${targetUserId}`, {
          withCredentials: true,
        });
        setMessages(res?.data?.messages || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [targetUserId]);

  // ─── Socket setup (single connection, reused) ─────────────────────
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("receivedMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));

    socket.on("messageError", ({ error }) => {
      alert(error);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  // ─── Send message (reuses existing socket) ────────────────────────
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = newMessage.trim();
      if (!trimmed || !socketRef.current) return;

      socketRef.current.emit("sendMessage", {
        userId,
        targetUserId,
        message: trimmed,
      });
      socketRef.current.emit("stopTyping", { userId, targetUserId });
      setNewMessage("");
    },
    [newMessage, userId, targetUserId],
  );

  // ─── Typing indicator emitters ────────────────────────────────────
  const handleInputChange = useCallback(
    (e) => {
      setNewMessage(e.target.value);

      if (!socketRef.current) return;
      socketRef.current.emit("typing", { userId, targetUserId });

      // Debounce the "stop typing" event
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current?.emit("stopTyping", { userId, targetUserId });
      }, 1200);
    },
    [userId, targetUserId],
  );

  // ─── Helpers ──────────────────────────────────────────────────────
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    
    return date.toLocaleDateString(undefined, { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const isSameSender = (curr, prev) =>
    prev && curr?.senderId === prev?.senderId;

  // ─── Render ───────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-black/20 backdrop-blur-sm rounded-r-2xl">
      {selectedUser ? (
        <>
          {/* ── Chat Header ─────────────────────────────────────── */}
          <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/5 backdrop-blur-md shadow-sm z-10">
            <div className="relative group cursor-pointer">
              {selectedUser.photoURL ? (
                <img
                  src={selectedUser.photoURL}
                  alt={selectedUser.firstName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/30 transition-shadow duration-300 group-hover:ring-purple-500/60"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center ring-2 ring-purple-500/30">
                  <FaUser className="text-white text-lg" />
                </div>
              )}
              {/* Online indicator dot */}
              {isTargetOnline && (
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg leading-tight tracking-wide">
                {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <p className="text-xs mt-0.5 flex items-center gap-1.5">
                {isTargetOnline ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    <span className="text-green-400 font-medium">Active now</span>
                  </>
                ) : (
                  <span className="text-white/40 font-medium">Offline</span>
                )}
              </p>
            </div>
          </div>

          {/* ── Message Area ────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-2 relative">
            {/* Background design element */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent pointer-events-none"></div>

            {messages.map((msg, index) => {
              const isOwn = userId === msg?.senderId;
              const prevMsg = messages[index - 1];
              const grouped = isSameSender(msg, prevMsg);
              
              // Helper for Date Separators
              const isFirstMessageOfDay = !prevMsg || 
                new Date(msg.createdAt).toDateString() !== new Date(prevMsg.createdAt).toDateString();

              return (
                <div key={msg._id || index} className="flex flex-col">
                  {/* Date Separator */}
                  {isFirstMessageOfDay && (
                     <div className="flex justify-center my-6">
                       <span className="px-4 py-1 rounded-full bg-white/10 text-white/50 text-xs font-medium backdrop-blur-md border border-white/5 shadow-sm">
                         {formatDate(msg.createdAt)}
                       </span>
                     </div>
                  )}

                  <div
                    className={`flex ${!isOwn ? "justify-start" : "justify-end"} group ${
                      grouped ? "mt-0.5" : "mt-4"
                    }`}
                  >
                    <div className={`flex items-end gap-2 max-w-[80%] ${!isOwn ? "flex-row" : "flex-row-reverse"}`}>
                      {/* Avatar for receiver's messages (only show at bottom of group) */}
                      {!isOwn && (
                        <div className="w-8 h-8 flex-shrink-0 mb-1">
                          {(!messages[index + 1] || messages[index + 1].senderId !== msg.senderId) && (
                            selectedUser.photoURL ? (
                              <img
                                src={selectedUser.photoURL}
                                alt={selectedUser.firstName}
                                className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] text-white">
                                <FaUser />
                              </div>
                            )
                          )}
                        </div>
                      )}

                      <div
                        className={`relative px-5 py-3 transition-all duration-200 shadow-sm ${
                          isOwn
                            ? `bg-gradient-to-br from-purple-600 to-indigo-600 text-white ${
                                grouped
                                  ? "rounded-2xl rounded-tr-md"
                                  : "rounded-2xl rounded-tr-none"
                              } hover:shadow-purple-500/20 shadow-md`
                            : `bg-white/10 text-white/90 backdrop-blur-sm border border-white/5 ${
                                grouped
                                  ? "rounded-2xl rounded-tl-md"
                                  : "rounded-2xl rounded-tl-none"
                              } hover:bg-white/15`
                        }`}
                      >
                        <p className="text-[0.95rem] leading-relaxed break-words whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <span
                          className={`text-[0.65rem] mt-1 block text-right font-medium opacity-60 ${
                             isOwn ? "text-purple-100" : "text-gray-300"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start mt-2 ml-10">
                <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-sm backdrop-blur-sm">
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Message Input ───────────────────────────────────── */}
          <div className="p-4 pt-2">
            <form
              onSubmit={sendMessage}
              className="p-1.5 pr-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-lg flex items-center gap-2 focus-within:bg-white/15 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-purple-500/30 transition-all duration-300"
            >
              <div className="pl-4 pr-2">
                <FaSmile className="text-white/40 hover:text-white/70 transition-colors cursor-pointer text-xl" />
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-white placeholder-white/40 py-3 outline-none text-[0.95rem]"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-0 disabled:scale-0 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-purple-500/30 transform hover:rotate-12 active:scale-95"
              >
                <FaPaperPlane className="text-sm ml-0.5" />
              </button>
            </form>
          </div>
        </>
      ) : (
        /* ── Empty State ──────────────────────────────────────── */
        <div className="flex-1 flex items-center justify-center flex-col p-8 bg-black/20 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
            <div className="relative text-white/20 text-8xl animate-float drop-shadow-2xl">
              <span className="block transform -rotate-12">💬</span>
            </div>
          </div>
          <h2 className="text-white text-3xl font-bold mb-3 tracking-wide drop-shadow-sm">Welcome to Chat</h2>
          <p className="text-white/50 text-lg max-w-md mx-auto leading-relaxed">
            Select a conversation from the sidebar to start connecting with your matches.
          </p>
          <div className="mt-8 flex gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-150"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
