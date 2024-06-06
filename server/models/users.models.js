const { default: mongoose } = require("mongoose");

const userSchma = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchma);
