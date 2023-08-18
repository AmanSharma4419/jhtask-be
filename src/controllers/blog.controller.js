const Blog = require("../models/blogModel");
const { errorMessages } = require("../constants/errors/index");

const createBlog = async (req, res, next) => {
  try {
    const { title, text, subTitle } = req.body;
    if (!title) {
      return res
        .status()
        .json({ success: false, message: errorMessages.TITLE_REQURIED });
    }
    const blogInfo = {
      title: title,
      subTitle: subTitle,
      text: text,
      blogImage: req.file
        ? `images/${req.file.filename}`
        : "images/1692356570308blog.jpeg",
    };
    const blog = await Blog.create(blogInfo);
    if (blog) {
      return res.status(201).json({ success: true, data: blog });
    } else {
      return res
        .status(500)
        .json({ success: false, message: errorMessages.FAILED_TO_CREATE_BLOG });
    }
  } catch (error) {
    next(error);
  }
};

const getAllblogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(201).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, getAllblogs };
