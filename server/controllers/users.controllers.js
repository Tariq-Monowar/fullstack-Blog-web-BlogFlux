require("dotenv").config();
const Post = require("../models/posts.models");
const User = require("../models/users.models");

const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imgbbUploader = require("imgbb-uploader");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};


const createUser = async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    if (!(userName && email && password)) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }
    // email....
    if (!isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `User already exists`,
      });
    }

    if (email === password || email === userName) {
      return res.status(400).json({
        message: "Email cannot be the same as your username or password",
      });
    }

    //password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be longer than 6 characters",
      });
    }

    const solt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, solt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    if (req.files && req.files.avatar) {
      const base64string = req.files.avatar.data.toString("base64");
      const img = await imgbbUploader({
        apiKey: process.env.IMGBB_API_KEY,
        base64string,
      });
      newUser.avatar = img.url;
    }

    // console.log(newUser._id)
    const token = jwt.sign(
      { userEmail: newUser.email, userId: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    await newUser.save();
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    const user = await User.findById(req.userId);

    if (userName) {
      if (userName === user.email || userName === user.password) {
        return res.status(400).json({
          message: "usere name cannot be the same as your email or password",
        });
      }

      user.userName = userName;
    }

    if (email) {
      if (!isEmail(email)) {
        return res.status(400).json({
          message: "Please enter a valid email address",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
      if (email === user.password || email === password) {
        return res.status(400).json({
          message: "Email cannot be the same as your username or password",
        });
      }
      user.email = email;
    }

    if (password) {
      if (password.length > 6) {
        return res.status(400).json({
          message: "Password must be longer than 6 characters",
        });
      }
      const solt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, solt);
      user.password = hashedPassword;
    }

    if (req.files && req.files.avatar) {
      const base64string = req.files.avatar.data.toString("base64");
      const img = await imgbbUploader({
        apiKey: process.env.IMGBB_API_KEY,
        base64string,
      });

      user.avatar = img.url;
    }

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    await User.findByIdAndDelete(userId);
    res.status(201).json({
      message: `successfully delete user....`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userEmail: user.email, userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};



module.exports = { getAllUsers, createUser, updateUser, login, deleteUser, getUserProfile };
