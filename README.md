# E-commerce UI Improvement — DevShelf

Bài tập cá nhân Chương 1, học phần Phát triển ứng dụng Web/TMĐT.

**Sinh viên:** Trương Thanh Phong · **Lớp:** EE0002.

## 1. Giới thiệu

DevShelf là một trang danh sách công cụ số, tập trung cải tiến cách trình bày **giá, chu kỳ, phạm vi sử dụng và ưu đãi trên thẻ sản phẩm**. Sản phẩm, giá, quyền lợi và tên thương hiệu trong bản mẫu đều là dữ liệu minh họa.

## 2. Website tham khảo

- Tên: GitHub Marketplace.
- URL: https://github.com/marketplace
- Nhóm kinh doanh: ứng dụng, tiện ích và dịch vụ hỗ trợ quy trình phát triển phần mềm.
- Khách hàng mục tiêu theo phân tích: lập trình viên, nhóm phát triển và tổ chức sử dụng GitHub.
- Khu vực khảo sát: trang chủ; danh mục Code review; chi tiết Codecov; kết quả tìm kiếm codecov; phần chọn gói/đăng ký.
- Thời điểm quan sát: 18/10/2026.

Các trang danh sách được kiểm tra có tên, mô tả, loại ứng dụng; giá chi tiết được quan sát tại trang ứng dụng. Từ đó, bản mẫu đề xuất đưa thông tin giá và đơn vị sử dụng lên ngay thẻ để hỗ trợ so sánh.

**Giới hạn khảo sát:** môi trường truy cập được HTML nhưng chặn một số CSS/ảnh của website gốc. Vì vậy, các nhận xét chỉ áp dụng cho nội dung/cấu trúc đã kiểm chứng; không kết luận lỗi bố cục hay trải nghiệm mobile của GitHub Marketplace. Luồng đăng ký chuyển tới đăng nhập; không đăng nhập, cài ứng dụng hoặc thực hiện giao dịch. Không khẳng định có giỏ hàng nhiều ứng dụng.

Văn bản quan sát đã được lưu tại [evidence/](evidence/), mã nguồn S01–S06.

## 3. Chức năng của bản mẫu

- Hiển thị bốn sản phẩm, mỗi sản phẩm có hình, tên, mô tả, giá và thao tác.
- Giá và chu kỳ được đặt cùng nhóm; nêu phạm vi sử dụng của gói.
- Hiển thị đúng giá trước ưu đãi, tỷ lệ và số tiền giảm của ba gói trả phí.
- Phân biệt một gói miễn phí.
- Mở/đóng thông tin từng gói bằng chuột hoặc bàn phím qua details/summary.
- Các liên kết điều hướng đưa tới khu vực tương ứng trong cùng trang.
- Responsive: bốn cột trên màn hình rộng, hai cột trên tablet, một cột trên điện thoại.

Không có giỏ hàng giao dịch, đăng nhập, thanh toán, backend hoặc CSDL. Nút “Xem thông tin gói” chỉ mở nội dung có sẵn, không mua/cài đặt dịch vụ.

## 4. Công nghệ và cấu trúc

HTML5, CSS3, SVG tự tạo. Không có JavaScript, framework, CDN, thư viện hoặc bước build bắt buộc.

~~~
index.html
style.css
images/
  reviewflow.svg
  buildpilot.svg
  safedeps.svg
  insightkit.svg
  favicon.svg
  README.md
evidence/
README.md
AI_USAGE.md
GIAI_THICH_MA_NGUON.md
TEST_RESULTS.md
TU_KIEM_TRA.md
GITHUB_PUBLISH.md
~~~

## 5. Cách chạy

Cách thông thường: mở index.html bằng trình duyệt trên máy cá nhân.

Nếu môi trường chặn giao thức file hoặc muốn dùng máy chủ tĩnh, mở terminal tại thư mục chứa index.html và chạy:

~~~bash
python3 -m http.server 8000
~~~

Sau đó truy cập máy chủ vừa khởi động bằng trình duyệt. Không cần cài gói Python hoặc Node. Trong môi trường kiểm tra, trang đã được xác minh qua HTTP; cách mở file trực tiếp bị chính sách Chromium chặn nên chưa được xác nhận tại đây.

## 6. Cải tiến đã thực hiện

1. Nhóm giá bán, chu kỳ và phạm vi sử dụng ở cùng vị trí trên cả bốn thẻ.
2. Trình bày giá trước ưu đãi bằng s, nêu mức giảm và số tiền tiết kiệm; không tạo ưu đãi giả cho gói miễn phí.
3. Dùng CSS Grid và media query để đổi số cột theo độ rộng.
4. Dùng details/summary để thao tác được mà không cần JavaScript.
5. Bổ sung alt cho ảnh, focus-visible, skip link và hỗ trợ reduced motion.
6. Sau khi xem ảnh render, thay ký tự mũi tên bị thiếu glyph bằng SVG.
7. Sau khi chạy axe-core, tăng tương phản màu của ba số thứ tự trong khối giới thiệu.

Các bước 6–7 do trợ lý phát hiện và chỉnh trong phiên hỗ trợ, không được ghi nhận thành thao tác sinh viên đã tự làm.

## 7. Hỗ trợ từ AI và kiểm tra

AI hỗ trợ phân tích, tạo HTML/CSS/SVG, kiểm tra bằng Chromium/Playwright và soạn tài liệu. Chi tiết có trong [AI_USAGE.md](AI_USAGE.md).

Kết quả thực tế, giới hạn kiểm tra và việc còn cần sinh viên xác nhận được ghi trong [TEST_RESULTS.md](TEST_RESULTS.md) và [TU_KIEM_TRA.md](TU_KIEM_TRA.md). Các kiểm tra tự động không chứng nhận toàn bộ khả năng tiếp cận hoặc khả năng sử dụng.

## 8. GitHub và công khai bài

Repository dự kiến dùng: https://github.com/phong26052006-design/BT_canhanPTUDTMDT

Thực trạng công bố và cách bật GitHub Pages xem tại [GITHUB_PUBLISH.md](GITHUB_PUBLISH.md). Chỉ sử dụng đường dẫn website khi đã kiểm tra triển khai thành công.

Mã số sinh viên được đặt trong báo cáo bàn giao riêng; bản web công khai chỉ hiển thị họ tên và lớp.
