# Minh chứng thực hiện JavaScript Labs

Ngày kiểm tra: 15/11/2026, múi giờ Asia/Bangkok. Thời gian trong JSON dùng UTC ISO 8601.

- `ket-qua-kiem-tra.json`: 187 phép kiểm tra đạt, không có exception chưa xử lý. Bao gồm việc tải từng trang, chỉ số đầu ra, tương tác DOM, form, hiệu ứng, HTTP GET và hiển thị 390px của cả 29 Exercise.
- `kiem-tra-bo-sung.json`: 2 kiểm tra riêng xác nhận form minh họa selector của Exercise 10.3 không đưa mật khẩu vào URL và có thông báo đúng phạm vi.
- `Lab08-Exercise01-js-off.png`, `Lab08-Exercise04-js-off.png`: ảnh chụp từ browser context thực sự tắt JavaScript, không sửa trang để giả lập trạng thái này.
- `Lab09-Exercise08-loi.png`: submit biểu mẫu trống. Ảnh không có hậu tố là kết quả nhập hợp lệ bằng dữ liệu mẫu.
- `Lab10-Exercise07-preview.png`: preview ảnh đang xuất hiện sau hover thật.
- `Lab10-Exercise09-thanh-cong.png`, `Lab10-Exercise10-thanh-cong.png`: GET dữ liệu mẫu qua HTTP thành công.
- `Lab10-Exercise09.png`, `Lab10-Exercise10.png`: nhánh HTTP 404 thật từ URL không tồn tại.
- `dich-vu-goc.json`, `Lab10-Exercise10-dich-vu-goc.png`: thử dịch vụ HTTPS của tác giả và ghi nhận lỗi chứng chỉ `net::ERR_CERT_AUTHORITY_INVALID`; không có dữ liệu thành phố được tải từ dịch vụ gốc.
- `portfolio-desktop.png`, `portfolio-mobile.png`: trang cá nhân trên hai kích thước màn hình.

Tất cả ảnh ở đây là ảnh chụp trang của bộ mã hiện tại trong Chrome headless do trợ lý AI thao tác khi kiểm thử. Không khẳng định sinh viên đã tự thao tác các lần kiểm tra này. Sinh viên cần chạy lại và giải thích được mã trước khi nộp.

Log debugger trong JSON ghi lần dừng thật tại câu lệnh `debugger`, đọc `e.target.id`, `e.type` và `triggeredBy` từ call frame, sau đó Resume. Ảnh Exercise 9.6 chụp trang sau Resume, không phải ảnh giao diện DevTools.

`console.error` của Exercise 8.5 và lỗi HTTP 404 trong bài GET là các tình huống chủ đích. Chúng không bị đánh đồng với exception JavaScript chưa xử lý.

Ảnh trong báo cáo Word là vùng trích từ các PNG gốc, giữ nguyên tỉ lệ và không sửa nội dung kết quả. Hồ sơ công việc lưu hình chữ nhật cắt và SHA-256 của ảnh nguồn để có thể đối chiếu. Ảnh gốc trong thư mục này không bị ghi đè khi dàn trang Word.
