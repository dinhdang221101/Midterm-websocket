// routes/index.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.signedCookies.role_system;
    console.log(loggedInUser);

    const accounts = await User.find({ username: { $ne: loggedInUser } });

    res.render('home', { accounts, loggedInUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải trang chủ!' });
  }
});

module.exports = router;
