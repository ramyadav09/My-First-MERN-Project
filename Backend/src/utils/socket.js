const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const connectionRequest = require("../models/connectionRequest");

// ─── In-memory online users tracker (userId → socketId) ──────────
const onlineUsers = new Map();

const secretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // ─── User comes online ─────────────────────────────────────
    socket.on("goOnline", ({ userId }) => {
      onlineUsers.set(userId, socket.id);
      // Broadcast to all OTHER sockets that this user is now online
      socket.broadcast.emit("userOnline", { userId });
    });

    // ─── Client requests the full list of online users ─────────
    socket.on("getOnlineUsers", () => {
      socket.emit("onlineUsersList", [...onlineUsers.keys()]);
    });

    // ─── Chat room ─────────────────────────────────────────────
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = secretRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    // ─── Typing indicators ─────────────────────────────────────
    socket.on("typing", ({ userId, targetUserId }) => {
      const roomId = secretRoomId(userId, targetUserId);
      socket.to(roomId).emit("typing", { userId });
    });

    socket.on("stopTyping", ({ userId, targetUserId }) => {
      const roomId = secretRoomId(userId, targetUserId);
      socket.to(roomId).emit("stopTyping", { userId });
    });

    // ─── Send message ──────────────────────────────────────────
    socket.on("sendMessage", async ({ userId, targetUserId, message }) => {
      try {
        const roomId = secretRoomId(userId, targetUserId);

        const existingRequest = await connectionRequest.findOne({
          $or: [
            { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
            { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
          ],
        });
        if (!existingRequest) {
          socket.emit("messageError", {
            error: "You can't send a message. Connection not accepted.",
          });
          return;
        }

        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          message,
        });

        await chat.save();

        const savedMessage = chat.messages[chat.messages.length - 1];
        io.to(roomId).emit("receivedMessage", savedMessage);
      } catch (err) {
        console.log(err);
      }
    });

    // ─── User disconnects ──────────────────────────────────────
    socket.on("disconnect", () => {
      // Find which userId owned this socket and remove them
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("userOffline", { userId });
          break;
        }
      }
    });
  });
};

module.exports = initializeSocket;
