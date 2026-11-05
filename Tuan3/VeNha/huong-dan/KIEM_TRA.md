# Chạy lại kiểm tra mã

Đây là kiểm tra trang HTML/CSS cục bộ, không điều khiển hoặc xác nhận tiến độ hai trò chơi bên ngoài.

Môi trường lần chạy bàn giao: Node.js, Playwright và Google Chrome headless. Xem phiên bản Chrome và thời điểm trong `../minh-chung/ket-qua-kiem-tra.json`.

1. Từ thư mục gốc kho, mở server tĩnh: `python -m http.server 8879 --bind 127.0.0.1`.
2. Cài Playwright trong môi trường thử nghiệm của bạn hoặc đặt biến `PLAYWRIGHT_PACKAGE_PATH` đến gói Playwright đã có. Không cần cài vào thư mục bài nộp.
3. Chạy `node Tuan3/VeNha/huong-dan/verify.mjs`. Máy cần có Google Chrome; script dùng `channel: 'chrome'`.
4. Nếu dùng địa chỉ khác, đặt biến `SITE_URL` với URL kết thúc bằng `/` dẫn đến thư mục `Tuan3/VeNha/`.

Script mở 12 trang tại 1366, 768, 390 và 320px; kiểm tra lỗi mạng/tài nguyên, liên kết nội bộ, bố cục, các thuộc tính theo đề, hover, Tab và Font Awesome ngoại tuyến. Các ảnh kiểm tra sẽ được cập nhật trong `minh-chung/giao-dien/`, JSON kết quả sẽ được ghi đè bằng lần chạy mới.

Kiểm tra tự động không chứng minh tất cả trình duyệt hoặc thiết bị đều giống nhau, và không chứng minh hình ảnh khớp từng pixel với bản PDF. Ảnh được rà trực quan để đối chiếu bố cục và nội dung. Cách hiển thị background-attachment:fixed trên thiết bị di động có thể phụ thuộc trình duyệt.
