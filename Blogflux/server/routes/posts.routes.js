const route = require("express").Router();
const verifyUser = require("../controllers/verifyUser");

const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  createComment,
  deleteComment,
  topBlogs,
  topBloger,
} = require("../controllers/posts.controllers");

route.get("/", getAllPost);
route.post("/", verifyUser, createPost);
route.patch("/:id", verifyUser, updatePost);
route.delete("/:id", verifyUser, deletePost);
route.post("/like/:id", verifyUser, likeUnlikePost);
route.post("/comment/:id", verifyUser, createComment);
route.delete("/comment/:postId/:commentId", verifyUser, deleteComment);
route.get("/topblogs", topBlogs);
route.get("/topbloger", topBloger);

module.exports = route;
