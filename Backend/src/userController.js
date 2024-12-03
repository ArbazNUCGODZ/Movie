/* eslint-disable no-undef */
const User = require("./userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "This-is-my-jwtSecrete";

// SignUp
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(201).json({ message: "User Created", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: "Email Already Exist" });
  }
};

// SignIn
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.role === "admin") throw new Error("User Not Found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({ message: "Logged In", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Admin Login

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") throw new Error("Admin not found");
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) throw new Error("Invalid Credentials");
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(201).json({ message: "Logged In" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// exports.createPrivacy = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);

//     res.status(201).json({
//       status: "success",
//       data: {
//         newUser,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
