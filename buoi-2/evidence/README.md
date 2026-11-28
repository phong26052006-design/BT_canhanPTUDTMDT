# Minh chứng trước và sau

Ngày thu: **27/10/2026**. Browser: Chrome 155.0.8059.85. Ảnh do công cụ kiểm tra chụp trực tiếp từ trang chạy cục bộ, không phải mockup hay ảnh giao diện được vẽ lại.

## Trước sửa

`before/` được chụp từ bản buổi 1 đã khôi phục, trước khi sửa mã buổi 2:

- `desktop-1366.png`, `mobile-390.png`: toàn trang.
- `products-1366.png`: lưới bốn sản phẩm.
- `card-390.png`: thẻ bàn phím ở 390 px.
- `menu.png`, `audit.json`: menu và số đo cấu trúc/style gốc.

## Sau sửa

`after/` được chụp từ mã buổi 2:

- `page-1366.png`, `page-768.png`, `page-390.png`, `page-320.png`: bố cục hoàn thiện.
- `products-1366.png`, `card-390.png`: cặp đối chiếu với ảnh trước cùng kích thước.
- `focus-keyboard.png`, `hover.png`: thẻ mở thông tin với focus/hover của liên kết ảnh.
- `filter-audio.png`: sau lọc chỉ còn tai nghe, không giữ ô Grid trống.
- `experiment-grid-2.png`, `experiment-grid-3.png`: cấu hình thử 2/3 cột; không phải bố cục mặc định cuối.
- `experiment-flex-flex-start.png`, `experiment-flex-space-between.png`: cùng vùng menu 620 px, thay justify-content để quan sát.
- `results.json`: 104 kiểm tra đạt; số đo Box Model, ngữ nghĩa, vị trí thẻ và các thử nghiệm.

Các thử nghiệm chỉ thay style tạm thời trong browser và được gỡ trước lần chụp tiếp. Không dùng ảnh này để khẳng định một cấu hình thử là cấu hình mặc định của mã bàn giao.
