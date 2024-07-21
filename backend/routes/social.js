const express = require("express");
const router = express.Router();

const { followUser, getFollowingById, getFollowing } = require("../controllers/social");


router.post("/followuser",followUser);

router.post("/getfollowing", getFollowing);

router.post("/getfollowingbyid", getFollowingById);


module.exports = router;