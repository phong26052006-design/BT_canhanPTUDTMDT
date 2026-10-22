# Kết quả kiểm tra mới nhất — Buổi 2, 22/10/2026

Chi tiết và giới hạn: [docs/buoi2/KIEM_THU.md](docs/buoi2/KIEM_THU.md). Log: [evidence/buoi2/after/ui-check.json](evidence/buoi2/after/ui-check.json). Người thực hiện: trợ lý trong phiên hỗ trợ; chưa thay cho xác nhận cá nhân của sinh viên.

- 7 chiều rộng 1440/1366/1024/768/390/375/320 px, không tràn ngang; lưới 4/4/2/2/1/1/1 cột.
- 21/21 tình huống lọc đúng; 7/7 lần đặt lại khôi phục 4 thẻ.
- 4/4 chi tiết mở/đóng bằng Enter; radio dùng phím mũi tên; reset bằng Enter.
- CSS chính tải đúng, bốn SVG đúng tỷ lệ, fragment có đích; không HTTP/lỗi thực thi trong lượt kiểm tra.
- html5lib: 0 lỗi phân tích; không ID trùng/nhảy heading; ul có 4 li sản phẩm, menu có 3 li.
- Hover đổi màu, thao tác cao 48px không đổi; focus solid 3px; giảm chuyển động đưa transition về 0s.
- Đã thử 3 justify-content, Grid 2/3 cột và bỏ Grid; thử 5 dạng sửa mã trực tiếp trên DOM.
- Giá hiển thị khớp products.json; tỷ lệ giảm khớp phép tính.
- axe-core 4.10.3: 31 quy tắc đạt, 0 vi phạm phát hiện; 1 quy tắc chưa kết luận ở bốn ký hiệu ₫, đối chiếu màu bổ sung 12,09:1. Không phải chứng nhận WCAG.

Công cụ tái chạy tùy chọn: [tools/README.md](tools/README.md). Không có công cụ kiểm tra được tải trong website.

Kết quả Buổi 1 vẫn giữ ở evidence/ui-check.json và lịch sử Git; không ghi đè bằng dữ liệu mới. Chưa thử mọi trình duyệt, thiết bị thật, trình đọc màn hình hoặc khảo sát người dùng.

Bổ sung Buổi 2: bốn liên kết Xem hình lớn đã được click và xác minh mở đúng SVG của từng sản phẩm trong tab mới.
