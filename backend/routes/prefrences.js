const express = require("express");
const router = express.Router();
const { updatePrefrences, getPrefrences } = require("../controllers/prefrences");


router.post("/updateprefrences",updatePrefrences);
router.post("/getprefrences",getPrefrences);

module.exports = router;