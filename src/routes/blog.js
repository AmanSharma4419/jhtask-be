const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const { createBlog, getAllblogs } = require("../controllers/blog.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now() + file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/write-blog", upload.single("blogImg"), createBlog);
router.get("/blogs", getAllblogs);

module.exports = router;
