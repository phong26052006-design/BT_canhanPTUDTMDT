# Giải thích mã nguồn và chuẩn bị trình bày

## 1. HTML tổ chức trang

- html lang="vi": khai báo ngôn ngữ chính.
- meta viewport: giúp trình duyệt mobile dùng độ rộng thiết bị phù hợp.
- link rel="stylesheet": nối index.html với style.css.
- header/nav: nhận diện trang và điều hướng tới các phần có id.
- main: nội dung chính; skip link đưa người dùng bàn phím tới đây.
- section: nhóm giới thiệu, sản phẩm, cải tiến và thông tin bài tập.
- article: một sản phẩm độc lập, có heading h3.
- img: hình sản phẩm; alt diễn tả hình; width/height giúp trình duyệt biết tỷ lệ ảnh.
- s: giá trước ưu đãi không còn là giá đang áp dụng.
- details/summary: thành phần HTML tương tác có sẵn, mở/đóng thông tin gói.
- dl/dt/dd: nhãn và giá trị trong phần thông tin bài tập.
- SVG mũi tên aria-hidden: hình trang trí; tên liên kết vẫn có nghĩa khi không đọc icon.

Một h1 mô tả toàn trang; h2 chia khu vực; h3 đặt tên sản phẩm/nội dung con.

## 2. CSS dùng chung

:root chứa biến màu, độ rộng và bán kính; sửa một biến có thể cập nhật nhiều vị trí.

box-sizing: border-box khiến width tính cả padding và border, tránh cộng kích thước ngoài ý muốn.

.container giới hạn nội dung tối đa và chừa lề hai bên. minmax(0, 1fr) giúp cột được thu hẹp theo phần không gian chia đều, giảm nguy cơ nội dung dài đẩy cột rộng ra.

Flexbox dùng cho hàng điều hướng, dòng giá và hàng nhãn/giá trị. Grid dùng cho bố cục có nhiều cột/thẻ.

## 3. Responsive

- Mặc định: bốn cột trong product-grid.
- Đến 1100 px: hai cột.
- Đến 760 px: phần hero và thông tin bài tập chuyển về một cột.
- Đến 580 px: danh sách sản phẩm một cột; tăng không gian đọc của từng thẻ.
- Các độ rộng 1440/1024/768/390/375/320 px đã được kiểm tra bằng trình duyệt trong môi trường hỗ trợ.

Media query theo max-width nghĩa là các quy tắc trong khối được áp dụng khi viewport không vượt ngưỡng. Thứ tự khai báo vẫn quan trọng nếu nhiều quy tắc cùng khớp.

## 4. Thao tác không dùng JavaScript

summary là nhãn mở/đóng của details. Trình duyệt quản lý trạng thái open. CSS chọn .plan-details[open] để xoay dấu cộng khi nội dung mở. Mã không tạo đơn, không tính tiền động và không gọi API.

Các liên kết có href="#..." đưa tới id tương ứng trong cùng trang; liên kết tới GitHub mở tab mới và có rel phù hợp.

## 5. Kiểm tra giá minh họa

| Gói | Trước ưu đãi | Hiện tại | Tiết kiệm | Tỷ lệ |
|---|---:|---:|---:|---:|
| ReviewFlow | 75.000 | 60.000 | 15.000 | 20% |
| BuildPilot | 150.000 | 120.000 | 30.000 | 20% |
| SafeDeps | 100.000 | 85.000 | 15.000 | 15% |
| InsightKit | Không áp dụng | 0 | Không áp dụng | Không áp dụng |

Công thức: tỷ lệ giảm = (giá trước ưu đãi − giá hiện tại) / giá trước ưu đãi × 100%. Trong bài, các giá trị tĩnh được tính sẵn, không có chương trình thanh toán.

## 6. Khả năng tiếp cận

alt cung cấp mô tả thay ảnh. focus-visible giúp người dùng bàn phím nhận ra phần tử đang chọn. Skip link giảm số lần Tab qua header. prefers-reduced-motion: reduce tắt cuộn mượt và transition khi người dùng yêu cầu giảm chuyển động.

Kiểm tra tự động chỉ phát hiện một số loại vấn đề; cần đọc lại thông báo, thử bàn phím và kiểm tra với thiết bị/công nghệ hỗ trợ phù hợp trước khi tuyên bố đáp ứng tiêu chuẩn đầy đủ.

## 7. Một số câu hỏi trình bày

**Vì sao không thêm giỏ hàng thật?** Phạm vi đề chỉ HTML/CSS; cải tiến được chọn là thẻ sản phẩm. Một giỏ hàng có dữ liệu/giao dịch cần thêm logic, nằm ngoài phạm vi.

**Vì sao sản phẩm khác GitHub Marketplace?** Bản mẫu được tạo độc lập; dùng ví dụ hư cấu và SVG riêng để tránh sao chép, đồng thời thực hành cách tổ chức thông tin.

**Tại sao phải ghi đơn vị cạnh giá?** Giá theo người dùng/tháng khác giá cả nhóm hoặc cả năm; đặt cạnh nhau giúp diễn tả đúng phạm vi.

**Có thể nhận định mobile GitHub Marketplace bị lỗi không?** Không. Mạng chặn CSS gốc nên chưa có căn cứ kiểm tra layout đầy đủ; đề xuất chỉ dựa trên nội dung/cấu trúc đã quan sát.

**Repository và GitHub Pages khác nhau thế nào?** Repository lưu mã và lịch sử; Pages phục vụ HTML/CSS để mở giao diện trực tiếp.

**AI đã làm gì?** Phân tích, tạo code/SVG, kiểm tra và tài liệu. Phần sinh viên tự thao tác và tự điều chỉnh cần được xác nhận thật, không suy ra từ sản phẩm đã có.
