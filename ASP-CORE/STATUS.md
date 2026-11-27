# Trạng thái bài ASP NET Core

Cập nhật 28/11/2026. Kiểm thử local được thực hiện lại trên cơ sở dữ liệu PhongCinema_QA_20261128, tách khỏi cơ sở dữ liệu demo.

| Hạng mục | Kết quả đã quan sát |
|---|---|
| Build local | .NET SDK 10.0.404, build dự án 0 cảnh báo và 0 lỗi |
| SQL Server | LocalDB SQL Server 2022, đủ 4 migrations InitialCreate, Movie, HoaDon, Shipping |
| Dữ liệu local | 6 phim seed và 1 phim thêm qua giao diện, 3 thể loại |
| Kiểm thử HTTP | 61/61 |
| Identity và phân quyền | 9/9 |
| Kiểm tra SQL trực tiếp | 11/11 |
| Kiểm thử trình duyệt | 16/16, gồm 390/768 px, thêm phim bằng biểu mẫu, upload, giữ ảnh khi chỉnh sửa và checkout |
| Email local | Đã kiểm tra thư .eml và liên kết xác nhận tài khoản; chưa gửi Internet |
| Somee | Gói miễn phí đã cấp. Tạo website phongcinema-ueh.somee.com và SQL Server 2025 Express. Đã áp dụng đủ 4 migrations và seed 6 phim, 3 thể loại trên Somee. |
| Website công khai | Somee đang trả trang mặc định. Bản publish Windows x86 đã tạo. Chrome cần quyền chọn tệp local để tải bản publish lên trình quản lý tệp. HTTPS chưa xác minh. |
| GitHub ASP-CORE | [Mã nguồn, báo cáo và minh chứng trên nhánh main](https://github.com/phong26052006-design/BT_canhanPTUDTMDT/tree/main/ASP-CORE). |

Không coi tất cả vị trí ảnh màu đỏ trong PDF là đã đủ. Ảnh các bước trung gian,
hộp thoại trust HTTPS, Gmail App Password và các thao tác hosting chưa thực hiện
không được dựng lại bằng ảnh giả. Danh mục đối chiếu ảnh sẽ ghi riêng trong báo cáo.
