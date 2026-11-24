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

**Lab 07.** Quan sát 7.1–7.4 để phân biệt luồng hiển thị và ngữ cảnh xếp chồng. Chuyển float trái/phải ở 7.5 và thu cửa sổ ở 7.7. Exercise 7.12/7.13 dùng hai truy vấn bù nhau, với bố cục hẹp đến 480 px và bố cục rộng trên 480 px. Ở 7.17, nhãn bộ lọc phản ánh giá trị CSS đã áp dụng.

**Phong Select.** Mở bàn phím K75, chọn ảnh cận cảnh rồi rê chuột qua ảnh. Thêm hai sản phẩm và tạo đơn mô phỏng. Mục “Xem trạng thái đơn” hiển thị mã và tổng tiền theo đơn giá lưu tại thời điểm tạo. Dữ liệu cũ thiếu đơn giá dùng giá hiện hành trong danh mục. Thanh tiến trình biểu thị tỷ lệ tồn kho trên sức chứa, ví dụ 18/24 tương ứng 75%. Dữ liệu mô phỏng có phạm vi lưu trữ của trình duyệt.

**LMS.** Chọn tệp HTML đã lưu hoặc dán HTML vào ô nhập. Nút dữ liệu mẫu minh họa quy trình. Bộ phân tích giữ thứ tự hoạt động Moodle kiểu `assign` và nhận hạn nộp từ thuộc tính rõ nghĩa hoặc dòng có nhãn `Due`, `Hạn nộp` hay nhãn tương đương. Ngày mở bài và ngày khóa nộp là các mốc riêng. Bản HTML đối chiếu ghi lại trạng thái lớp ngày 22/11/2026.

**Game.** Bấm Bắt đầu và nhấn **↓** để nâng máy bay giấy. Trên thiết bị cảm ứng, dùng nút Nâng máy bay. Nhấn **P** hoặc nút Tạm dừng để nghỉ. Điểm 5/20/40 chuyển sang Level 2/3/4. Bước mô phỏng theo cấp là 40/30/25/20 ms. `requestAnimationFrame` và nội suy giúp chuyển động mượt giữa hai bước. Khi qua 50 cổng, game dừng và hiển thị chiến thắng. Điểm cao chỉ lưu trên trình duyệt.

## Triển khai và bàn giao

Kho môn học: [BT_canhanPTUDTMDT](https://github.com/phong26052006-design/BT_canhanPTUDTMDT). Bản công khai đã được kiểm tra tại [GitHub Pages — Advanced Front End](https://phong26052006-design.github.io/BT_canhanPTUDTMDT/CSS-NangCao/). Báo cáo Word và PDF được bàn giao riêng, không nằm trong thư mục mã nguồn công khai. Dữ liệu HTML rút gọn và ảnh thống kê thật của lớp chỉ nằm trong bộ bàn giao local. Bản công bố dùng nội dung mô phỏng cho ứng dụng LMS.

Việc phân tích, triển khai và chuẩn bị báo cáo có hỗ trợ AI. Đoạn tự đánh giá trên portfolio là bản gợi ý. Sinh viên cần đọc và sửa lại cho phù hợp trải nghiệm cá nhân.

## Nguồn đã đối chiếu

- Đề chính `BaiTap_CaNhan_Advance_FE_1.pdf`, 2 trang. SHA-256 `de02d787e58c79c1b633281ccec8ef3811aa2919a40081d890e8a7094948ed72`.
- [Hướng dẫn CSS nâng cao](https://drive.google.com/file/d/1JauEArZUR7UaORz1Jyg47yP7NYC6_mEy/view), 9 trang. [Hướng dẫn ứng dụng responsive và jQuery](https://drive.google.com/file/d/1PRxaYmj2HKGV0JK9pFLqhHTWJs_ohsBp/view), 3 trang. [Hướng dẫn cửa hàng Bootstrap](https://drive.google.com/file/d/1PO0UX2Wnx7u4Q1acoCDxlQumsNo0hO8s/view).
- [Lab 07 của Connolly và Hoar](https://github.com/funwebdev-2nd-ed/ch07-lab-start), commit `8f96dde522ee04fc4bd7e3ce34b561aba9138eda`. Lab07.pdf gồm 22 trang. Tài nguyên du lịch và mã khởi đầu thuộc bộ Lab của tác giả.
- [xZoom](https://payalord.github.io/xZoom/) 1.0.15, [Bootstrap 3.4 Progress](https://getbootstrap.com/docs/3.4/components/#progress) 3.4.1, [Bootstrap Star Rating](https://github.com/kartik-v/bootstrap-star-rating) 4.1.2, jQuery 3.7.1. Exercise 7.19 giữ Bootstrap 3.3.7 của bộ mã khởi đầu.
- [Hướng dẫn bài game](https://freetuts.net/viet-game-flappy-bird-don-gian-voi-html-css-va-jquery-713.html). Phiên bản bài làm có đồ họa Canvas và mã điều khiển riêng. Hình phụ kiện kế thừa từ Phong Select buổi 2.
