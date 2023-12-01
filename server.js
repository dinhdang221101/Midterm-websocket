const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const indexRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.set('view engine', 'ejs');
app.set('views', './views');
//session
app.use(session({
    secret: "session-secret",
    maxAge: 60 * 60 * 1000,
    resave: false,
    saveUninitialized: false,
}))

//cookie
app.use(cookieParser(
    "cookie-secret",
    {
        maxAge: 60 * 60 * 1000,
    }
));
connectDB();

io.on('connection', (socket) => {
    console.log('Người dùng đã kết nối!');
    const roomName = "roomChat"
    socket.join(roomName);
    socket.on('message', async (data) => {
        const { sender, receiver, content } = data;

        const newMessage = new Message({
            sender: sender,
            receiver: receiver,
            content: content
        });
        await newMessage.save();
        io.to(roomName).emit('message', newMessage);
    });

    socket.on('focus', async (data) => {
        const { sender, receiver, focus } = data;
        io.to(roomName).emit('focus', {sender, receiver, focus});
    });

    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối!');
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use((req, res, next) => {
    res.render('404');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});
