# Kế hoạch — Ứng dụng quản lý công việc

Phần bổ sung 4 điểm của bài Advance Front End & Back End. Ứng dụng hỗ trợ thêm, sửa, xóa, cập nhật trạng thái và tổng hợp tiến độ. Node.js phục vụ giao diện và API cùng địa chỉ. SQLite lưu dữ liệu vào tệp trên máy.

## Chạy ứng dụng

Yêu cầu Node.js 24 trở lên. Mở Terminal tại thư mục này và chạy lệnh:

```powershell
node server.mjs --demo
```

Truy cập [http://127.0.0.1:8891/](http://127.0.0.1:8891/). Chế độ demo khởi tạo sáu công việc mẫu trong `data/demo.sqlite` vào lần chạy đầu. Thay đổi vẫn còn sau khi tải lại hoặc khởi động máy chủ. Dừng máy chủ bằng Ctrl+C.

Dùng `node server.mjs` để bắt đầu với danh sách trống trong `data/tasks.sqlite`. Hai chế độ sử dụng hai tệp riêng. Nếu cần chạy trên cổng khác trong PowerShell, đặt `$env:PORT = '8892'` trước khi khởi động. Không cần cài gói npm hoặc dịch vụ cơ sở dữ liệu riêng.

## Minh họa khi trình bày

1. Thêm một công việc có tiêu đề, nhóm, ưu tiên và ngày đến hạn. Quan sát tổng số tăng.
2. Bấm **Sửa** để thay đổi tiêu đề hoặc nội dung. Dùng ô trạng thái để chuyển từ **Cần làm** sang **Đang làm**, sau đó sang **Hoàn thành**.
3. Đối chiếu số lượng theo trạng thái và tỷ lệ hoàn thành trước và sau thao tác. Bộ lọc chỉ thu hẹp danh sách, còn thống kê áp dụng cho toàn bộ dữ liệu.
4. Tải lại trang để đối chiếu dữ liệu đã lưu. Xóa công việc vừa tạo qua hộp thoại xác nhận.
5. Chạy `node inspect-db.mjs` sau khi mở bản demo để xem cấu trúc bảng, bản ghi, số lượng theo trạng thái và kết quả kiểm tra tính toàn vẹn.

Một công việc được tính quá hạn khi có ngày đến hạn trước ngày hiện tại theo múi giờ Việt Nam và trạng thái chưa hoàn thành. Tỷ lệ hoàn thành bằng số việc hoàn thành chia cho tổng số việc, làm tròn đến phần trăm nguyên. Danh sách trống hiển thị 0%.

## Mã nguồn và dữ liệu

| Tệp | Vai trò |
| --- | --- |
| `server.mjs` | Máy chủ HTTP phục vụ tài nguyên tĩnh, kiểm tra dữ liệu và định tuyến API |
| `database.mjs` | Khởi tạo SQLite, chuẩn bị truy vấn, tổng hợp số lượng và tạo dữ liệu mẫu |
| `schema.sql` | Bảng `tasks`, khóa chính và ràng buộc dữ liệu |
| `public/index.html`, `style.css`, `app.js` | Giao diện, bố cục responsive và xử lý thao tác |
| `inspect-db.mjs` | Đọc cấu trúc và bản ghi SQLite ở chế độ chỉ đọc |

| Thao tác | API |
| --- | --- |
| Đọc danh sách và thống kê | `GET /api/tasks` |
| Thêm công việc | `POST /api/tasks` |
| Cập nhật nội dung | `PUT /api/tasks/:id` |
| Chuyển trạng thái | `PATCH /api/tasks/:id/status` |
| Xóa công việc | `DELETE /api/tasks/:id` |

Ứng dụng minh họa hệ thống cá nhân chạy trên máy, với giao diện, API và cơ sở dữ liệu thực. Máy chủ lắng nghe trên địa chỉ loopback. Đề tài kế thừa cách tạo máy chủ HTTP từ bài mẫu Node.js đã nộp và mở rộng bằng API JSON cùng truy vấn tham số trong [Node.js SQLite](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html).
