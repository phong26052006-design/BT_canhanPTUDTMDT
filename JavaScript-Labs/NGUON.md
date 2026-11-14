# Nguồn tài liệu và mã khởi đầu

## Đề đang áp dụng

`C:/Users/PC/Downloads/BaiTap_CaNhan_JS.pdf`, 9 trang. Văn bản được trích xuất toàn bộ; đã đối chiếu hình trang yêu cầu portfolio. Hồ sơ trích xuất và SHA-256 lưu trong thư mục công việc. PDF quy định đầu ra; các bước nộp và chia sẻ trong PDF không tự cấp quyền thao tác tài khoản.

## Tài liệu thực hành của tác giả

Randy Connolly và Ricardo Hoar, *Fundamentals of Web Development, 2nd Edition*, bộ Lab sửa ngày 09/02/2017. Đã trích xuất 18 trang Lab08, 12 trang Lab09 và 12 trang Lab10 để đối chiếu yêu cầu từng Exercise. Không đồng nhất bộ Lab 2017 này với giáo trình phiên bản 3 năm 2022.

| Lab | Kho mã khởi đầu | Commit đối chiếu |
|---|---|---|
| 08 | https://github.com/funwebdev-2nd-ed/ch08-lab-start | 416e0c4960ca679f18f9ca6133694c85844ad5fc |
| 09 | https://github.com/funwebdev-2nd-ed/ch09-lab-start | c941a00b17be96f41b44ab3d7f4e9b163e430d6f |
| 10 | https://github.com/funwebdev-2nd-ed/ch10-lab-start | ad710f025e48684fe70b8738516967448c3cc85f |

Ảnh mẫu, cờ quốc gia và các stylesheet trong Lab08, Lab09, Lab10 kế thừa bộ mã khởi đầu ở trên. Giữ các chú thích bản quyền của nguồn. Không coi tài nguyên có trong kho công khai là tác phẩm do sinh viên hoặc AI tự tạo; không cấp lại giấy phép cho các ảnh. Không đính kèm toàn bộ PDF giáo trình vào sản phẩm công bố.

Lab09.pdf tải từ kho tác giả có SHA-256 `696ef786d0fb4c7e888dcef6882c5bfba3a0ca239ad911d4cea4848c24d0f6d7`, trùng bản Lab09 đã có trong danh mục nguồn học phần.

## Thư viện và tham chiếu kỹ thuật

- jQuery 3.7.1 full: https://code.jquery.com/jquery-3.7.1.min.js ; bản phân phối tải qua https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js . Giữ thông tin giấy phép trong đầu file.
- Bootstrap 3.3.5 CSS và Glyphicons: https://cdn.jsdelivr.net/npm/bootstrap@3.3.5/dist/ . Giữ major version để phù hợp class của mẫu, không trộn Bootstrap 5.
- Font Awesome 4.4.0: https://cdn.jsdelivr.net/npm/font-awesome@4.4.0/ . CSS và các font được lưu cục bộ.
- jQuery GET và jqXHR: https://api.jquery.com/jQuery.get/
- Gắn và gỡ handler: https://api.jquery.com/on/ và https://api.jquery.com/off/
- Dịch vụ trong tài liệu: http://www.randyconnolly.com/funwebdev/services/travel/cities.php ; bài có lựa chọn HTTPS tương ứng.

Avatar `assets/avatar.svg` là biểu tượng TP được tạo bằng SVG cho bài này, không phải ảnh chân dung. `Lab10/data/cities.json` là dữ liệu mẫu tự tạo. Nội dung portfolio và báo cáo có hỗ trợ AI, sinh viên cần xem lại trước khi nộp.
