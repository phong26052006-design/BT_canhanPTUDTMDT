# Chuẩn bị sửa mã trực tiếp

Các ví dụ dùng đúng selector của bài. Đây là hướng dẫn luyện tập; chưa xác nhận sinh viên đã tự thực hiện. Trước mỗi thay đổi, ghi dự đoán, lưu tệp và kiểm tra lại trên trình duyệt.

## 1 Thay khoảng cách bên trong thẻ

Trong `css/style.css`, tìm `.product-content { padding: 24px; }`. Ở desktop lớn hơn 1100 px, thử đổi thành `padding: 28px;`. Nội dung sẽ cách cạnh khối thêm 4 px mỗi phía; với border-box và chiều rộng giữ nguyên, phần nội dung hẹp đi 8 px. Viền ngoài `.product-card` vẫn 1 px, padding của thẻ ngoài vẫn 0.

Ở màn hình ≤1100 và ≤580 px, các media query đặt padding 23 và 22 px sẽ ghi đè quy tắc desktop. Muốn thay cả mobile cần sửa đúng quy tắc breakpoint đó. Đây là lý do không chỉ nhìn một dòng CSS rồi dự đoán mọi màn hình thay đổi giống nhau.

## 2 Đổi màu giá

Tìm `.price-value` và thêm `color: #174e3c;` hoặc thử một màu đủ tương phản. Thuộc tính ảnh hưởng giá hiện tại, không tự đổi màu giá gạch ngang hay toàn bộ văn bản. Kiểm tra bốn sản phẩm và tính dễ đọc trên nền trắng.

## 3 Đổi số cột

Tìm quy tắc `.product-grid` của desktop và thử `grid-template-columns: repeat(3, minmax(0, 1fr));`. Bốn sản phẩm tạo hàng đầu ba thẻ, hàng thứ hai một thẻ. Giữ gap, ảnh và kích thước trong phạm vi container. Media query 2/1 cột vẫn áp dụng ở màn hình nhỏ.

## 4 Đổi khoảng cách menu

Tìm `.main-nav-list`. `gap: 8px 24px` nghĩa là khoảng giữa hàng 8 px và giữa cột 24 px. Thử đổi thành `gap: 8px 32px`; menu có thêm khoảng ngang nếu còn đủ chỗ. Các breakpoint nhỏ có gap riêng, cần kiểm tra xuống dòng và tránh tràn.

`justify-content` phân phối khoảng trống theo trục chính; `align-items` căn theo trục vuông góc. Với row trong trang viết ngang tiếng Việt, trục chính thường theo chiều ngang. `space-between` đưa hai đầu ra hai mép khi có không gian dư; nó không đồng nghĩa mọi khoảng cách luôn đúng bằng gap.

## 5 Sửa alt

Trong `index.html`, tìm ảnh `images/keyboard.svg`. Alt hiện mô tả bàn phím K75 với phím kem và điểm nhấn xanh. Sửa theo đúng nội dung ảnh nếu ảnh đổi; không nhồi quảng cáo hoặc thêm thông số mà hình không thể hiện. Alt không phải chú thích luôn hiện dưới ảnh và không thay tên sản phẩm trong h3.

## Phiếu người học tự thực hiện

- Thay đổi đã chọn:
- Dự đoán trước khi chạy:
- Tệp và selector đã sửa:
- Kích thước màn hình đã thử:
- Kết quả quan sát:
- Điều chỉnh tiếp nếu có:
- Ảnh hoặc commit minh chứng:
- Ngày tự thực hiện:

Chỉ điền sau khi thực sự thao tác. Có thể khôi phục giá trị ban đầu sau khi luyện tập, nhưng cần giải thích được trước/sau và cơ chế cascade.
