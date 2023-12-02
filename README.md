# Đồ án giữa kỳ NodeJS

- Đề tài: Tìm hiểu về giao thức Web Socket và xây dựng một trang web cho phép người dùng chat trực tuyến.

## Thành viên nhóm

- Đinh Đình Đẳng - 51900701
- Nguyễn Trọng Kiên - 52000892
- Tống Đức Thành Nam - 52000896

Trong đó:
- server: server.js

## Chạy chương trình

- Bước 1: Cài đặt các thư viện cần thiết
- Config monggoDB: Mặc định mongodb://localhost:27017/chat thay đổi ở file db.js

```
npm install
```

- Bước 2: Chạy chương trình

```
npm start
```

- Bước 3: WebNodeJS sẽ chạy trên đường link: <http://localhost:3000/>

- Bước 4: Đăng nhập bằng tài khoản ADMIN mặc định:
  - Tài khoản: admin
  - Mật khẩu: admin

- Bước 5: Tạo các tài khoản
  - Tạo một tài khoản mới (Thao tác bằng giao diện hoặc link: <http://localhost:3000/auth/create-account>)

- Bước 6: Đăng nhập bằng các tài khoản vừa tạo (dùng các trình duyệt khác nhau để đăng nhập cùng lúc nhiều tài khoản - có thể dùng tab ẩn danh và tab bình thường)
  - Lúc này thử 2 người dùng chat với nhau (lưu ý user không tạo chat với ADMIN được - phải đăng nhập bằng 2 tài khoản user để chat với nhau)

- Bước 7: Chat với nhau
  - Bấm vào các người dùng hiện cho bấm nút chat (<http://localhost:3000/chat/:username>) sao cho username là tên người dùng cần chat đến. Lúc này 2 người dùng có thể chat với nhau.


## Tài liệu tham khảo

- Socket.io
