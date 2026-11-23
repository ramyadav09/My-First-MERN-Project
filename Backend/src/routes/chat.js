const express = require("express");
const { userAuth } = require("../middleware/auth");
const Chat = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/messages/:targetUserId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.targetUserId;
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.send(chat);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = chatRouter;
