# Công khai mã nguồn và GitHub Pages

## Trạng thái đã xác minh ngày 20/10/2026

- Repository **Public**, nhánh mặc định **main**.
- URL mã nguồn: https://github.com/phong26052006-design/BT_canhanPTUDTMDT
- Commit triển khai mã Phong Select: `9fc845b417f218ee803ed6b2dc37c63484766c1b`.
- Git push lên main thành công; README, HTML/CSS, SVG và minh chứng đã có trên GitHub.
- **GitHub Pages chưa được bật.** GET cấu hình trả 404. Yêu cầu tạo Pages qua API trả 403 `Resource not accessible by integration`: quyền tích hợp hiện tại cho phép đẩy mã nhưng không cho tạo site Pages. Không dùng lỗi này để kết luận repository không Public.

## Thao tác còn lại trong tài khoản GitHub

1. Mở repository → **Settings → Pages**.
2. Trong **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn nhánh **main**, thư mục **/ (root)**, rồi **Save**.
4. Chờ trạng thái triển khai thành công; mở URL GitHub hiển thị, kiểm tra CSS, ảnh và bộ lọc.

Đường dẫn dự kiến: https://phong26052006-design.github.io/BT_canhanPTUDTMDT/

Chỉ coi đường dẫn trên là website đã hoạt động sau khi Pages triển khai và mở thành công. `index.html` ở gốc, `.nojekyll` có sẵn, tài nguyên dùng đường dẫn tương đối nên mã đã chuẩn bị cho Pages. Pages là phần công khai giao diện tùy chọn; repository Public đã hoàn tất yêu cầu công khai mã.

Tài liệu: https://docs.github.com/en/pages

Log trạng thái không chứa thông tin xác thực: `evidence/publication.json`.
