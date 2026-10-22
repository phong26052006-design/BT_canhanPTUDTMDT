# Buổi 2 — Báo cáo kiểm thử

Ngày 22/10/2026. Trình duyệt Chromium 154.0.8037.57; Playwright; parser html5lib 1.1; axe-core 4.10.3. Trang chạy qua Python HTTP server từ checkout; không dùng thư viện đó trong sản phẩm.

## Bảng theo yêu cầu đề

| Nội dung kiểm tra | Kết quả | Ghi chú/bằng chứng |
|---|---|---|
| Trang HTML mở được | Đạt | HTTP 200; tiêu đề và bốn thẻ đúng. |
| CSS được áp dụng | Đạt | Link css/style.css, stylesheet có cssRules; font và Box Model đo được. |
| Hình ảnh hiển thị đúng | Đạt | Bốn SVG 640×480 tải đủ, có alt, tỷ lệ 4/3; object-fit:contain. |
| Liên kết hoạt động | Đạt trong phạm vi thử | Các fragment có đích; click menu tới #san-pham. Liên kết tham khảo bên ngoài không được tính là luồng mua hàng đã kiểm thử. |
| Bố cục không tràn nghiêm trọng | Đạt | Bảy độ rộng từ 320 đến 1440 px; documentWidth không vượt viewport. |
| Hover/focus hoạt động | Đạt | Hover đổi màu 180ms, cao 48px không đổi; focus-visible viền solid 3px/offset 3px. |
| Đã tự sửa ít nhất một vấn đề | Chờ sinh viên xác nhận | Trợ lý đã sửa CSS và kiểm tra; đề yêu cầu sinh viên tự làm, ghi thật trong TU_KIEM_TRA.md. |

## Các trường hợp kiểm tra thêm

| Nhóm | Kết quả thực tế |
|---|---|
| Bắt buộc theo gợi ý đề | 1366, 768, 390 px đều đạt. |
| Các chiều rộng khác | 1440, 1024, 375, 320 px đạt; lưới tổng thể 4/4/2/2/1/1/1 cột theo danh sách log. |
| Lọc kế thừa | 3 nhóm × 7 độ rộng = 21/21 đúng nhóm và số lượng; cả li và article được ẩn/hiện đúng. |
| Đặt lại | 7/7 trở về bốn thẻ. |
| Bàn phím | 4/4 details mở/đóng bằng Enter; radio bằng ArrowRight, reset bằng Enter. |
| HTML | 0 lỗi phân tích html5lib; một h1, không nhảy cấp/ID trùng; bốn li sản phẩm và ba li menu. Đây không thay cho mọi kiểm định chuẩn HTML. |
| Flexbox | Thử flex-start/center/space-between; giữ align-items:center và gap:12px. |
| Grid | Thử hai/ba cột; đổi tạm sang block để quan sát bỏ Grid; khôi phục 4/2/1 cuối. |
| Sửa trực tiếp | Đã thử padding28, giá đỏ, 2/3 cột, menu gap36 và alt mới; chỉ sửa DOM tạm, không ghi vào mã cuối. |
| Giá | Tên/giá hiện tại khớp products.json; bốn tỷ lệ giảm đúng. |
| Giảm chuyển động | Transition về 0s khi reduce. |
| Script/lỗi | 0 script ứng dụng; không pageerror/HTTP lỗi trong lượt thử. |
| Axe | 31 quy tắc đạt, 0 vi phạm phát hiện, 1 quy tắc chưa kết luận tự động. |

Quy tắc axe chưa kết luận liên quan bốn ký hiệu ₫ vì công cụ coi chỉ có ký tự phi văn bản. Màu thực tính là rgb(24,60,53) trên nền trắng; công thức độ chói tương đối cho **12,09:1**, vượt 4,5:1. Đây là đối chiếu bổ sung bốn ký hiệu, không phải chứng nhận WCAG đầy đủ. Chưa thử mọi trình đọc màn hình; thông báo aria-live khi đổi hiển thị bằng CSS chưa được xác minh trên từng công nghệ hỗ trợ.

## Vấn đề — nguyên nhân — cách sửa

| Vấn đề | Nguyên nhân đã xác nhận | Cách sửa và kiểm tra lại |
|---|---|---|
| Mô tả ở 768 px vẫn min-height72 thay vì44; khối giá118 thay vì108 | Quy tắc cùng selector ở cuối CSS ghi đè media trước đó. | Bỏ chiều cao tối thiểu cạnh tranh, dùng Flexbox cột và margin-top:auto; mô tả cuối khoảng47,59px theo nội dung. |
| Danh sách chưa thể hiện tập mục qua ul/li | Lựa chọn cấu trúc div/nav trực tiếp trong bản cũ; không phải lỗi cú pháp. | Bổ sung li đúng nội dung; reset khoảng cách danh sách; kiểm tra bốn mục và không lệch lề. |
| Nền summary đổi tức thời | Chưa có transition trên summary; hiệu ứng cũ chỉ ở biểu tượng. | Transition màu180ms, kiểm tra nền/chữ, focus và reduce. |

Sau thay đổi cấu trúc, lọc li thay article để phòng ô rỗng. Không ghi rủi ro này là lỗi nguồn đã xảy ra nếu chưa tái hiện. Không có lỗi chức năng còn chưa giải thích trong các trường hợp đã chạy.

Log và ảnh: [evidence/buoi2/after](../../evidence/buoi2/after/). Tái chạy: [tools/README.md](../../tools/README.md). Kiểm tra do trợ lý thực hiện; sinh viên bổ sung phần độc lập theo đề. Chưa kiểm tra thiết bị thật, mọi Safari/Firefox, dữ liệu lớn hoặc hiệu quả người mua.
