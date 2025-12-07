const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const SAFE_USER_DATA = "firstName photoURL lastName age gender skills";

userRouter.get("/user/received/request", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_USER_DATA);
    res.json({ massage: "All request are here", data: receivedRequest });
  } catch (err) {
    return res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/user/accepted/request", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const acceptedRequest = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("fromUserId", SAFE_USER_DATA)
      .populate("toUserId", SAFE_USER_DATA);

    const data = acceptedRequest.map((row) => {
      if (row.toUserId._id.toString() === loggedInUser._id.toString()) {
        return row.fromUserId;
      }
      return row.toUserId;
    });
    res.json({ massage: "All request are here", data: data });
  } catch (err) {
    return res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId);
      hideUserFromFeed.add(req.toUserId);
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(SAFE_USER_DATA)
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (err) {
    return res.status(400).send("Error : " + err.message);
  }
});

module.exports = userRouter;
