const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../utils/config");

// ===== CHANGE ONLY THESE =====
const LOGIN_FIELD = "username"; // or "email"
const SIGNUP_FIELDS = ["name", "username", "password", "phone_number", "address"]; // all required
const ROLES = ["user", "admin"]; // [] if the task has no roles; first = default
const TOKEN_EXPIRES = "3d";
// =============================

const isFilled = (v) => typeof v === "string" && v.trim() !== "";

// user without password + token
const userResponse = (user) => {
  const { password, ...rest } = user.toObject();
  const token = jwt.sign(
    { _id: user._id, [LOGIN_FIELD]: user[LOGIN_FIELD] },
    config.SECRET,
    { expiresIn: TOKEN_EXPIRES }
  );
  return { ...rest, token };
};

// POST /api/users/signup
const signup = async (req, res) => {
  try {
    if (!SIGNUP_FIELDS.every((f) => isFilled(req.body[f]))) {
      return res.status(400).json({ error: "Please add all fields" });
    }
    const role = req.body.role || ROLES[0];
    if (ROLES.length && !ROLES.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    if (await User.findOne({ [LOGIN_FIELD]: req.body[LOGIN_FIELD] })) {
      return res.status(400).json({ error: "User already exists" });
    }

    const data = Object.fromEntries(SIGNUP_FIELDS.map((f) => [f, req.body[f]]));
    data.password = await bcrypt.hash(data.password, 10);
    if (ROLES.length) data.role = role;

    const user = await User.create(data);
    res.status(201).json(userResponse(user));
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: "User already exists" });
    res.status(400).json({ error: error.message });
  }
};

// POST /api/users/login
const login = async (req, res) => {
  const loginValue = req.body[LOGIN_FIELD];
  const { password } = req.body;
  if (!isFilled(loginValue) || !isFilled(password)) {
    return res.status(400).json({ error: "Please add all fields" });
  }
  try {
    const user = await User.findOne({ [LOGIN_FIELD]: loginValue });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json(userResponse(user));
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { signup, login };
