const {
  getAllUsers,
  createUser,
  updateUser,
  login,
  deleteUser,
  getUserProfile,
} = require("../controllers/users.controllers");
const verifyUser = require("../controllers/verifyUser");

const route = require("express").Router();

route.get("/", getAllUsers);
route.get("/profile", verifyUser, getUserProfile);
route.post("/", createUser);
route.patch("/", verifyUser, updateUser);
route.post("/login", login);
route.delete("/", verifyUser, deleteUser);

module.exports = route;
