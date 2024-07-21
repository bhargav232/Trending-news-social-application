const express = require("express");
const router = express.Router();

const { newsHome, newsSearch, newsSearchByCategory, saveNews, findNewsByName, findNewsByUser } = require("../controllers/news");


router.post("/trending",newsHome);

router.post("/keywordsearch",newsSearch);

router.post("/categorysearch",newsSearchByCategory);

router.post("/savenews", saveNews);

router.post("/getnews", findNewsByName);

router.post("/loadnews", findNewsByUser);

module.exports = router;