const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/chatDB', {
        });
        console.log('Kết nối với MongoDB thành công!');
    } catch (error) {
        console.error('Lỗi kết nối với MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
