const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    text: {
      type: String,
    },
    blogImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("BlogModel", blogSchema);

module.exports = BlogModel;
