# AI Usage Log

## 1. Công cụ AI

ChatGPT/Codex trong cuộc trò chuyện hỗ trợ này. Không có phiên Gemini hay công cụ phản biện AI độc lập nào được thực hiện.

## 2. Mục đích sử dụng

Đọc đề; lập kế hoạch; khảo sát nội dung website qua HTTPS; phân biệt bằng chứng với đề xuất; thiết kế thẻ sản phẩm; tạo HTML/CSS/SVG; chạy Chromium/Playwright và axe-core phục vụ kiểm tra; giải thích code; soạn báo cáo.

Playwright và axe-core là công cụ kiểm tra trong môi trường hỗ trợ, không phải thư viện được đưa vào trang web. Trang triển khai chỉ gồm HTML/CSS và tài nguyên SVG.

## 3. Prompt và yêu cầu

Yêu cầu thực tế của sinh viên trong phiên:

> hãy thực hiện bài tập này cho tôi một cách chỉnh chu và chính xác hoàn thiện nhé.

Đầu vào kèm theo là BaiTap_CaNhan_Chuong1.pdf. Sinh viên sau đó cung cấp họ tên, MSSV và lớp để điền báo cáo.

Các khung yêu cầu dưới đây được diễn giải từ đề và được trợ lý dùng để tổ chức công việc. Đây không phải bản ghi rằng sinh viên đã tự gửi từng prompt thành các lượt chat riêng.

### Khung phân tích website

> Khảo sát GitHub Marketplace, https://github.com/marketplace. Xem trang chủ, danh mục, chi tiết ứng dụng, tìm kiếm và khu vực chọn gói/đăng ký. Với mỗi khu vực, phân biệt dữ kiện quan sát được, điểm hợp lý, rủi ro cần kiểm tra và đề xuất. Không khẳng định có giỏ hàng nhiều ứng dụng hoặc checkout hoạt động nếu chưa xác minh.

### Khung thiết kế

> Đề xuất một cách trình bày thẻ công cụ số giúp đọc rõ giá, đơn vị tính, chu kỳ và ưu đãi. Đối tượng đọc là người mua dịch vụ số nói tiếng Việt. Giải thích bố cục, HTML semantic, CSS Grid và cách thay đổi số cột trước khi triển khai.

### Khung triển khai

> Tạo trang HTML5/CSS3 có ít nhất bốn sản phẩm, hình minh họa tự tạo, tên, giá và thao tác có ý nghĩa; CSS tách riêng; chạy trên desktop/mobile; không thêm backend, CSDL hoặc thư viện không cần thiết. Giá và sản phẩm phải ghi rõ là dữ liệu minh họa.

### Khung xác minh

> Kiểm tra bằng trình duyệt ở các độ rộng 1440, 1024, 768, 390, 375 và 320 px; kiểm tra ảnh, tràn ngang, liên kết, details/summary, bàn phím và tương phản. Ghi đúng kết quả đã chạy, lỗi đã sửa và giới hạn.

## 4. Kết quả AI đề xuất và được triển khai

- DevShelf: một trang danh sách bốn công cụ giả định.
- Bố cục thống nhất cho mô tả, giá hiện tại, chu kỳ, phạm vi, giá trước ưu đãi và số tiền giảm.
- Grid 4/2/1 cột; details/summary cho thông tin gói.
- Hình SVG nguyên gốc, không lấy logo/screenshot sản phẩm của website tham khảo.
- Tách các chức năng giao dịch thật khỏi bản mẫu giao diện.

## 5. Kiểm tra, điều chỉnh và nội dung không sử dụng

**Do trợ lý thực hiện:**

- Kiểm tra HTML được các URL nguồn trả về; lưu văn bản quan sát S01–S06.
- Xác nhận URL bước đăng ký chuyển đến trang đăng nhập.
- Không dùng nhận xét về lỗi bố cục/mobile của website gốc vì một số tài nguyên CSS bị chặn.
- Không gọi luồng đăng ký là giỏ hàng nhiều sản phẩm.
- Không dùng giá minh họa VND làm giá của ứng dụng Codecov.
- Thay hai mũi tên Unicode bị hiển thị thành ô vuông bằng SVG; tăng cỡ chữ một số nội dung thẻ.
- Sửa màu ba số thứ tự sau khi kiểm tra tương phản phát hiện lỗi.
- Kiểm tra responsive, hình ảnh, bàn phím, liên kết và reduced motion.
- Ghi riêng việc file:// bị chính sách trình duyệt chặn.

**Chưa có bằng chứng trong phiên này:**

- Sinh viên tự mở website và tự thao tác trên máy cá nhân.
- Sinh viên tự phát hiện, sửa ít nhất một điểm và giải thích thay đổi.
- Một thử nghiệm usability với người dùng thật hoặc xác nhận đạt toàn bộ WCAG.

Không thay các việc này bằng một lời xác nhận giả. Sinh viên dùng TU_KIEM_TRA.md để thực hiện phần trách nhiệm cá nhân trước khi nộp.

## 6. Những phần cần hiểu và có thể luyện giải thích

Các câu trả lời và ví dụ ở GIAI_THICH_MA_NGUON.md giúp chuẩn bị, nhưng không chứng minh sinh viên đã hiểu. Các ý quan trọng:

1. semantic HTML và quan hệ heading.
2. grid-template-columns, minmax và media query.
3. Vai trò của box-sizing, padding, gap và max-width.
4. Cách details/summary mở nội dung không dùng JavaScript.
5. Giá bán, giá trước ưu đãi và tỷ lệ giảm.
6. alt, focus-visible, skip link và reduced motion.
7. Khác biệt giữa mô phỏng giao diện, repository và website được deploy.
