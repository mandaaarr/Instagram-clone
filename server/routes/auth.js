const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER USER
router.post('/register', async (req, res) => {
  try {
    // 1. Check if user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json("Email already exists");

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    // 4. Save to DB
    const savedUser = await newUser.save();
    res.json({ msg: "User registered successfully", userId: savedUser._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER
router.post('/login', async (req, res) => {
  try {
    // 1. Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    // 2. Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    // 3. Create Token (Session)
    // Use a hardcoded secret for now to avoid .env errors
    const token = jwt.sign({ id: user._id }, "mySecretKey123"); 
    
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;