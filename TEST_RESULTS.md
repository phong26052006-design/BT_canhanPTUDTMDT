# Kết quả kiểm tra DevShelf

## Môi trường và bằng chứng

- Ngày kiểm tra: 18/10/2026.
- Công cụ: Chromium 154.0.8037.57, Playwright và axe-core 4.10.3.
- Cách chạy: máy chủ HTTP tĩnh trong môi trường hỗ trợ.
- Người thực hiện các kiểm tra: trợ lý AI bằng công cụ trình duyệt, không ghi nhận thay cho thao tác cá nhân của sinh viên.
- Log: [evidence/ui-check.json](evidence/ui-check.json).

## Bảng kết quả

| Mã | Nội dung | Kết quả thực tế |
|---|---|---|
| UI01 | Desktop 1440 px | 4 cột; 4 sản phẩm; không tràn ngang; ảnh tải đủ |
| UI02 | 1024 px | 2 cột; 4 sản phẩm; không tràn ngang; ảnh tải đủ |
| UI03 | 768 px | 2 cột; 4 sản phẩm; không tràn ngang; ảnh tải đủ |
| UI04 | 390 px | 1 cột; 4 sản phẩm; không tràn ngang; ảnh tải đủ |
| UI05 | 375 px | 1 cột; 4 sản phẩm; không tràn ngang; ảnh tải đủ |
| UI06 | 320 px | 1 cột; 4 sản phẩm; không tràn ngang; ảnh tải đủ |
| UI07 | Enter ở summary của 4 thẻ | Mở và đóng được cả 4 |
| UI08 | Chuột mở thông tin gói | Nội dung được mở |
| UI09 | Liên kết fragment nội bộ | Không phát hiện đích id bị thiếu |
| UI10 | Tài nguyên HTTP và lỗi runtime | Không có HTTP 4xx/5xx hoặc pageerror trong luồng kiểm tra bản mẫu |
| UI11 | Script ứng dụng | 0 script ở cả 6 viewport trước khi chèn công cụ kiểm tra |
| UI12 | prefers-reduced-motion | scroll-behavior là auto |
| UI13 | axe-core với nhóm WCAG 2/2.1/2.2 A/AA đã chọn | 24 rule pass, 0 violation, 1 rule cần xem xét thủ công |
| UI14 | Mở trực tiếp file:// | Bị chính sách Chromium chặn; không ghi đạt; HTTP đã chạy đạt |
| UI15 | Phép tính giá tĩnh | 75.000→60.000: 20%; 150.000→120.000: 20%; 100.000→85.000: 15% |

## Mục tự động cần xem xét thủ công

axe-core không tự kết luận tương phản của bốn ký tự ₫ vì chỉ có ký tự không phải chữ cái. Đã kiểm tra màu kế thừa rgb(24,60,53) trên nền trắng rgb(255,255,255), tính tỷ lệ theo độ chói tương đối là **12,09:1**. Kết quả tính được lưu trong JSON. Điều này xử lý câu hỏi về màu của các ký tự đó, không chứng nhận toàn bộ khả năng tiếp cận.

## Điều chỉnh sau kiểm tra

1. Ký tự mũi tên ở bản render đầu không hiển thị ổn định: thay bằng SVG.
2. Tăng cỡ chữ một số thông tin trên thẻ.
3. Lỗi tương phản ba số thứ tự: đổi màu thành #36533b và chạy lại.
4. Nhãn giảm giá: bỏ aria-label trên span không có role; dùng nội dung ẩn thị giác phù hợp.

## Ảnh minh chứng

- [Tổng quan desktop](evidence/desktop-overview.png)
- [Lưới sản phẩm desktop](evidence/product-grid-desktop.png)
- [Đầu trang mobile](evidence/mobile-top.png)
- [Thẻ mobile](evidence/product-card-mobile.png)
- [Thông tin gói đang mở](evidence/product-card-open.png)
- Các ảnh toàn trang 1440/390/320 px được giữ trong evidence.

## Giới hạn và việc chưa kiểm tra

- Chưa thử thiết bị vật lý, Safari/Firefox và screen reader thực tế.
- Chưa có usability test hay số liệu cải thiện chuyển đổi.
- Không có giao dịch, giỏ hàng thật, đăng nhập hoặc thanh toán trong bản mẫu.
- Khảo sát website gốc dựa vào HTML/nội dung; tài nguyên giao diện gốc bị giới hạn mạng.
- Chưa xác nhận sinh viên đã tự thao tác/tự điều chỉnh.

Passed, incomplete, blocked và unrun được ghi riêng; không xem việc không phát hiện lỗi tự động là bằng chứng mọi yêu cầu chất lượng đã được kiểm tra.
