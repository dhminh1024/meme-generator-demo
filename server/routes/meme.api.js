const express = require("express");
const memeController = require("../controllers/meme.controller");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const photoMiddleware = require("../middlewares/photo.middleware");

/**
 * @route GET api/memes
 * @description Get a list of memes
 * @access Public
 */
router.get("/", memeController.getMemes);

/**
 * @route POST api/memes
 * @description Create a new meme from a uploaded image
 * @access Public
 */
router.post(
  "/",
  upload.single("image"),
  photoMiddleware.resize,
  memeController.createMeme
);

/**
 * @route PUT api/memes/:id
 * @description Update the texts on a meme
 * @access Public
 */
router.put("/:id", memeController.updateMeme);

module.exports = router;
