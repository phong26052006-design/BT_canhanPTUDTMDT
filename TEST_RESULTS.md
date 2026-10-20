# Kết quả kiểm tra — 20/10/2026

Môi trường: Chromium 154.0.8037.57; trang phục vụ qua Python HTTP server. Người thực hiện: trợ lý AI trong phiên hỗ trợ. Log máy: [evidence/ui-check.json](evidence/ui-check.json).

| Nhóm kiểm tra | Thực tế đã chạy | Kết quả |
|---|---|---|
| Độ rộng | 1440, 1024, 768, 390, 375, 320 px | 6/6 không tràn ngang; lưới 4/2/2/1/1/1 cột. |
| Tài nguyên | 4 ảnh sản phẩm, liên kết nội bộ ở mỗi độ rộng | Tải đủ, không liên kết fragment hỏng; không HTTP lỗi trong lượt kiểm tra. |
| Lọc nhóm | 3 nhóm × 6 độ rộng | 18/18 đúng: 2 chuột/bàn phím, 1 âm thanh, 1 phụ kiện; nhãn kết quả phù hợp. |
| Đặt lại | Sau lượt lọc ở từng độ rộng | 6/6 khôi phục 4 thẻ. |
| Chi tiết bằng bàn phím | Enter mở rồi đóng từng thẻ | 4/4 mở và đóng được. |
| Radio bằng bàn phím | ArrowRight từ “Tất cả” | Chọn nhóm chuột/bàn phím, còn 2 thẻ. |
| Đặt lại bằng bàn phím | Focus nút, nhấn Enter | Trở về “Tất cả”, hiện 4 thẻ. |
| Giảm chuyển động | Giả lập `prefers-reduced-motion:reduce` | `scroll-behavior:auto`. |
| Giá mẫu | 4 phép trừ và 4 tỷ lệ | Đúng 20%, 20%, 15%, 20%. |
| JavaScript ứng dụng | Kiểm tra trang trước khi chèn công cụ đo | 0 script; không lỗi thực thi trong lượt thử. |
| axe-core 4.10.3 | Các quy tắc phù hợp với trang | 27 quy tắc đạt, 0 vi phạm phát hiện, 1 quy tắc chưa kết luận tự động. |

Quy tắc chưa kết luận là tương phản của bốn ký hiệu ₫ vì công cụ coi nội dung chỉ gồm ký tự phi văn bản. Kiểm tra bổ sung màu thực tính: chữ `rgb(24,60,53)` trên nền `rgb(255,255,255)`, tỷ lệ **12,09:1**, vượt ngưỡng chữ thường 4,5:1. Không xem kết quả axe là chứng nhận tuân thủ đầy đủ WCAG.

## Minh chứng

- [Máy tính](evidence/products-desktop.png), [điện thoại](evidence/product-mobile.png), [bộ lọc 320 px](evidence/filter-mobile-320.png).
- [Lọc còn hai sản phẩm](evidence/filter-input-result.png), [mở chi tiết](evidence/product-open.png).
- [Trước](evidence/filter-before.png) / [sau](evidence/filter-after.png) và [nhật ký điều chỉnh](evidence/iteration-log.json).

## Chưa kiểm tra hoặc nằm ngoài phạm vi

Chưa thử đầy đủ trên Safari/Firefox, thiết bị thật, trình đọc màn hình, thanh toán hay dữ liệu lớn. Các kiểm tra trên không thay thế bước sinh viên tự chạy và tự điều chỉnh theo đề bài.

Khảo sát Lazada: có ảnh thật của 5 khu vực. L02/L04 gặp xác minh, chưa thử bộ lọc nguồn thành công. L05 là giỏ trống; không kết luận về số lượng/tổng tiền/voucher của giỏ có hàng. Giá và nội dung nguồn có thể đổi sau thời điểm chụp.
