const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:username',authMiddleware, async (req, res) => {
    try {
        const otherUser = req.params.username;
        req.session.receiverId = otherUser;
        const loggedInUser = req.signedCookies.role_system;

        const messages = await Message.find({
            $or: [
                { sender: loggedInUser, receiver: otherUser },
                { sender: otherUser, receiver: loggedInUser }
            ]
        }).sort({ createdAt: 1 });

        res.render('chat', { otherUser, loggedInUser, messages });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải trang chat!' });
    }
});

router.post('/send-message', async (req, res) => {
    const { content } = req.body;
    const receiverId = req.session.receiverId;
    const senderId = req.signedCookies.role_system;

    try {
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            content
        });

        await newMessage.save();

        res.status(200).json({ message: 'Tin nhắn đã được gửi và lưu trữ!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Lỗi khi gửi tin nhắn!' });
    }
});

module.exports = router;
