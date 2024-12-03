/* eslint-disable no-undef */
const express = require("express");
const { signup, signin, adminLogin, getAllUser } = require("./userController");

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/admin-login", adminLogin);
router.get("/", getAllUser);

module.exports = router;
