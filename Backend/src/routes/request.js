const express = require("express");
const requestRouter = express.Router();
const mongoose = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status is not valid!" });
    }

    // Prevent sending request to yourself
    if (fromUserId.equals(toUserId)) {
      return res
        .status(400)
        .json({ message: "You cannot send a request to yourself!" });
    }

    // Validate receiving user
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if any request already exists (both directions)
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      return res.status(409).json({ message: "Request already exists!" });
    }

    let message = "";
    if (status === "interested") {
      message = `${req.user.firstName} is interested in ${toUser.firstName}`;
    } else {
      message = `${req.user.firstName} ignored ${toUser.firstName}`;
    }

    // Create request
    const newRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await newRequest.save();

    return res.status(201).json({
      message,
      request: newRequest,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


requestRouter.post(
  "/request/receive/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;

      // Validate status
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value!" });
      }

      // Find pending/interested request
      const interestedRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!interestedRequest) {
        return res
          .status(404)
          .json({ message: "Request not found or already processed!" });
      }

      // Update status
      interestedRequest.status = status;
      await interestedRequest.save();

      return res.status(200).json({
        message: `Request ${status} successfully.`,
        request: interestedRequest,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = requestRouter;
