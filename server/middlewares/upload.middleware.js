const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
