# Công cụ kiểm tra tùy chọn

Website chỉ cần HTML/CSS và trình duyệt hiện đại. Không cần cài các công cụ sau để mở bài.

`verify_buoi2.py` dùng Python, Playwright, html5lib và Chromium để kiểm tra DOM, CSS, ảnh, liên kết, kích thước, bộ lọc, bàn phím, hover/focus, Flexbox/Grid và năm tình huống luyện sửa. Nó chỉ sửa DOM tạm trong trình duyệt; không sửa mã nguồn ứng dụng.

Để tái chạy trên môi trường có Python/Chromium:

```bash
python -m pip install playwright html5lib
python3 -m http.server 8892 --bind 127.0.0.1
```

Giữ máy chủ chạy, mở Terminal thứ hai ở cùng thư mục rồi chạy:

```bash
python tools/verify_buoi2.py --out /tmp/phong-select-buoi2-check
```

Script mặc định tìm chromium hoặc google-chrome; có thể truyền `--browser /duong/dan/chromium`. Nếu dùng cổng khác, truyền `--base-url` tương ứng. Bản chạy gốc sử dụng Chromium 154.0.8037.57 và html5lib 1.1; mã công cụ không phải hệ thống build của website.

Kiểm tra axe chỉ thực hiện khi truyền `--axe /duong/dan/axe.min.js` với bundle axe-core đã chuẩn bị; thiếu tham số được ghi **not_run**, không giả là đã kiểm tra. Phiên hỗ trợ dùng axe-core 4.10.3 và kết quả ở evidence/buoi2/after/ui-check.json. Không tự thêm thư viện này vào index.html.

Không ghi kết quả chạy mới đè bằng chứng gốc khi chưa cần; sử dụng --out như ví dụ để tách kết quả cá nhân. Trình phân tích html5lib kiểm tra lỗi phân tích cú pháp, không thay thế toàn bộ kiểm định chuẩn HTML hoặc tiếp cận thủ công.
