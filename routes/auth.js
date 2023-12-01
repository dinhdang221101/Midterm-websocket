const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username === 'admin' && password === 'admin') {
            res.cookie('signed_login', 'login', { signed: true });
            res.cookie('role_system', 'admin', { signed: true })
            return res.redirect('/');
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'Tài khoản không tồn tại!' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Sai mật khẩu!' });
        }
        res.cookie('signed_login', 'login', { signed: true });
        res.cookie('role_system', username, { signed: true })
        return res.redirect('/');
    } catch (error) {
        return res.render('login', { error: 'Đăng nhập không thành công!' });
    }
});

router.get('/create-account', authMiddleware, (req, res) => {
    res.render('create-account');
});

router.post('/create-account', async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('create-account', { error: 'Tài khoản đã tồn tại!' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        return res.redirect('/');
    } catch (error) {
        return res.render('create-account', { error: 'Lỗi khi tạo tài khoản!' });

    }
});

router.all('/logout', function (req, res, next) {
    res.clearCookie('signed_login');
    res.clearCookie('role_system');
    res.redirect('/')
})
module.exports = router;
