# Advanced Front End

**Trương Thanh Phong · 31241024967 · 26C1INF50902702**  
Học phần Phát triển ứng dụng thương mại điện tử · TS Nguyễn Mạnh Tuấn

Bài thực hành chọn **nhóm 1 và nhóm 2**. Nhóm 1 hoàn thành 19 nội dung Lab 07 trên 18 trang bài. Bài 7.13 dùng chung mã với 7.12 theo hướng dẫn. Nhóm 2 gồm cửa hàng Phong Select, bộ phân tích LMS bằng jQuery và game Chuyến bay giấy.

## Chạy trên máy

Mở thư mục chứa `CSS-NangCao` trong VS Code, chạy Live Server hoặc mở terminal tại thư mục cha và chạy:

```powershell
python -m http.server 8882 --bind 127.0.0.1
```

Mở [trang portfolio local](http://127.0.0.1:8882/CSS-NangCao/). Các bài chạy qua HTTP. Game nạp JavaScript module và thư viện được lưu cùng bài. Nếu cổng 8882 đang được dùng, chọn cổng khác rồi sửa phần cổng trên URL.

## Cấu trúc và cách kiểm tra

| Vị trí | Nội dung |
|---|---|
| `index.html` | Portfolio, thông tin sinh viên, 19 liên kết và phần tổng kết |
| `Lab07/Exercise01/` đến `Exercise19/` | Các trang bài và CSS. Exercise 7.13 nằm trong `Exercise12/` |
| `Lab07/bootstrap/`, `Lab07/images/` | Bootstrap 3.3.7 và tài nguyên từ mã khởi đầu |
| `UngDung/CuaHang/` | Phong Select. Tìm/lọc, carousel, thẻ giảm giá và New/Best seller, xZoom, progress bar, Star Rating, giỏ và trạng thái đơn mô phỏng |
| `UngDung/LMS/` | jQuery đọc HTML, đánh số bài tập theo thứ tự LMS và tổng hợp hạn nộp theo chủ đề |
| `UngDung/Game/` | Game Canvas, máy bay giấy và tháp gió, ArrowDown, các cấp độ và chiến thắng |
| `vendor/` và `fonts/` | Thư viện trò chơi và cửa hàng, được nạp cục bộ |
| `minh-chung/` | Ảnh Chrome local và kết quả kiểm tra. Ảnh có tiền tố `ma-` là trích đoạn mã nguồn được mở trong trình duyệt |
| `bao-cao/` | Báo cáo Word theo cấu trúc của đề |

**Lab 07.** Quan sát 7.1–7.4 để phân biệt luồng và stacking context. Chuyển float trái/phải ở 7.5 và thu cửa sổ khi xem 7.7. So sánh 7.12/7.13 ở 480 px và 481 px. Hover hoặc Tab ở 7.15–7.17. Đổi chế độ hoạt ảnh ở 7.18 và kiểm tra hàng lồng nhau ở 7.19.

**Phong Select.** Mở bàn phím K75, chọn ảnh cận cảnh rồi rê chuột qua ảnh. Thử thêm 2 sản phẩm, thay số lượng và tạo đơn mô phỏng. Mở “Xem trạng thái đơn” để xem mã đơn. Giỏ, đơn, tồn kho mô phỏng và nhận xét nằm trong `localStorage` của trình duyệt. Sử dụng cùng origin trong suốt buổi trình bày. Thanh tiến trình biểu thị hàng còn lại trên sức chứa của kho, ví dụ 18/24 tương ứng 75%.

**LMS.** Chọn tệp HTML đã lưu từ trang lớp học hoặc dán HTML vào ô nhập. Nút dữ liệu mẫu giúp xem cách dùng. Bộ phân tích tính các hoạt động kiểu `assign`, đúng selector của đề. Moodle có thể hiển thị cả Turnitin và các loại hoạt động khác. Chúng thuộc loại module riêng. Chỉ các trường ngày `Due`, `Hạn nộp` hoặc thuộc tính hạn nộp rõ ràng được dùng. Hạn vắng mặt được ghi là chưa hiển thị. Dữ liệu lớp được đối chiếu ngày 22/11/2026 và lưu trong tệp HTML riêng ngoài thư mục này.

**Game.** Bấm Bắt đầu và nhấn **↓** để nâng máy bay giấy. Trên thiết bị cảm ứng, dùng nút Nâng máy bay. Nhấn **P** hoặc nút Tạm dừng để nghỉ. Điểm 5/20/40 chuyển sang Level 2/3/4. Bước mô phỏng theo cấp là 40/30/25/20 ms. `requestAnimationFrame` và nội suy giúp chuyển động mượt giữa hai bước. Khi qua 50 cổng, game dừng và hiển thị chiến thắng. Điểm cao chỉ lưu trên trình duyệt.

## Triển khai và bàn giao

Kho môn học dự kiến là [BT_canhanPTUDTMDT](https://github.com/phong26052006-design/BT_canhanPTUDTMDT). Gói local đã được tổ chức dưới `CSS-NangCao` với đường dẫn tương đối. URL Pages của bài sẽ được ghi sau khi có bản triển khai kiểm chứng được. Dữ liệu HTML rút gọn và ảnh thống kê thật của lớp chỉ nằm trong bộ bàn giao local. Bản công bố có thể dùng ảnh kết quả với dữ liệu mô phỏng.

Việc phân tích, triển khai và chuẩn bị báo cáo có hỗ trợ AI. Đoạn tự đánh giá trên portfolio là bản gợi ý. Sinh viên cần đọc và sửa lại cho phù hợp trải nghiệm cá nhân.

## Nguồn đã đối chiếu

- Đề chính `BaiTap_CaNhan_Advance_FE_1.pdf`, 2 trang. SHA-256 `de02d787e58c79c1b633281ccec8ef3811aa2919a40081d890e8a7094948ed72`.
- [Hướng dẫn CSS nâng cao](https://drive.google.com/file/d/1JauEArZUR7UaORz1Jyg47yP7NYC6_mEy/view), 9 trang. [Hướng dẫn ứng dụng responsive và jQuery](https://drive.google.com/file/d/1PRxaYmj2HKGV0JK9pFLqhHTWJs_ohsBp/view), 3 trang. [Hướng dẫn cửa hàng Bootstrap](https://drive.google.com/file/d/1PO0UX2Wnx7u4Q1acoCDxlQumsNo0hO8s/view).
- [Lab 07 của Connolly và Hoar](https://github.com/funwebdev-2nd-ed/ch07-lab-start), commit `8f96dde522ee04fc4bd7e3ce34b561aba9138eda`. Lab07.pdf gồm 22 trang. Tài nguyên du lịch và mã khởi đầu thuộc bộ Lab của tác giả.
- [xZoom](https://payalord.github.io/xZoom/) 1.0.15, [Bootstrap 3.4 Progress](https://getbootstrap.com/docs/3.4/components/#progress) 3.4.1, [Bootstrap Star Rating](https://github.com/kartik-v/bootstrap-star-rating) 4.1.2, jQuery 3.7.1. Exercise 7.19 giữ Bootstrap 3.3.7 của bộ mã khởi đầu.
- [Hướng dẫn bài game](https://freetuts.net/viet-game-flappy-bird-don-gian-voi-html-css-va-jquery-713.html). Phiên bản bài làm có đồ họa Canvas và mã điều khiển riêng. Hình phụ kiện kế thừa từ Phong Select buổi 2.
