var express = require("express");
var router = express.Router();

const memeApi = require("./meme.api");
router.use("/memes", memeApi);

module.exports = router;
