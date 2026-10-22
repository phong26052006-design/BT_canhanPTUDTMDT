# Buổi 2 — Kết quả rà soát cuối

Ngày 22/10/2026. Rà soát theo yêu cầu của người dùng trên bản `9126b9c`; mã giao diện vẫn là bản đã kiểm thử `afdd5c8`. Không thay đổi hành vi trang khi chưa phát hiện lỗi chức năng.

## 1. Điểm đã tìm thấy và sửa

| Hạng mục | Trước rà soát | Đính chính cuối |
|---|---|---|
| Giải thích Box Model khi tăng padding | Hướng dẫn sửa trực tiếp quy chiều rộng ngoài không đổi chỉ cho border-box. | Trong bố cục thật còn width:auto và cross-axis stretch của Flexbox. Đã sửa câu trả lời, hướng dẫn và báo cáo theo thí nghiệm cụ thể. |
| Trình bày văn bản | Một số chữ/số bị dính như `Chromium154`, `Tại1366`, `padding20`. | Chuẩn hóa khoảng trắng trong phần diễn giải; giữ nguyên code, đường dẫn và lời trích dẫn. |
| Phạm vi kiểm chứng | Bộ cũ chủ yếu đo bảy viewport và kiểm tra axe ở trạng thái đóng. | Bổ sung sát breakpoint, mở cả bốn thông tin, focus liên kết ảnh, đầy đủ bốn trường giá và thí nghiệm tách width/box-sizing. Đây là bổ sung kiểm chứng, không gán thành lỗi giao diện đã xảy ra. |

## 2. Thí nghiệm xác định nguyên nhân

Đo `.product-content` ở viewport 1366 px, phần chứa rộng 300 px:

| Width thử | Box sizing | Padding | Rộng ngoài | Rộng nội dung |
|---|---|---:|---:|---:|
| auto | border-box | 24 px | 300 px | 252 px |
| auto | content-box | 24 px | 300 px | 252 px |
| auto | content-box | 28 px | 300 px | 244 px |
| 100% | border-box | 28 px | 300 px | 244 px |
| 100% | content-box | 28 px | 356 px | 300 px |

Hai nhóm thử phân biệt cách bố trí width:auto với việc padding có nằm trong chiều rộng khai báo hay không. Không lưu các biến thể content-box/width:100% vào trang chính. Border-box vẫn là quy tắc nền tảng hợp lý của bài, nhưng không dùng nó giải thích mọi hiện tượng giữ kích thước.

## 3. Kiểm tra chức năng cuối

- Lượt mở rộng có 14 chiều rộng: 320, 360, 390, 480, 580, 581, 760, 761, 900, 1100, 1101, 1280, 1366, 1440 px. Không tràn ngang/không tràn nội dung trong các vùng được đo ở cả trạng thái đóng và mở thông tin.
- Focus-visible của liên kết hình hiện rõ; nhấn Space/Enter trên radio không làm mất lựa chọn hoặc tải lại trang trong lượt thử.
- Chạy lại bộ cơ sở: bảy chiều rộng và 21 tình huống lọc; kiểm tra bốn liên kết hình và năm dạng sửa trực tiếp.
- Kiểm tra cả giá bán, giá trước ưu đãi, tiền tiết kiệm và phần trăm hiển thị trong HTML với products.json; không chỉ tính phần trăm từ JSON.
- Axe được chạy khi thông tin đóng và khi mở cả bốn sản phẩm. Không phát hiện vi phạm ở các quy tắc áp dụng; bốn ký hiệu tiền tệ vẫn được đối chiếu màu riêng. Không nhận là chứng nhận WCAG toàn diện.

Log: [layout-audit.json](../../evidence/buoi2/final-review/layout-audit.json), [box-model-audit.json](../../evidence/buoi2/final-review/box-model-audit.json) và [core-ui-check.json](../../evidence/buoi2/final-review/core-ui-check.json). Ảnh cấu hình trang ở `evidence/buoi2/after/` vẫn đúng vì bốn tệp nguồn giao diện không thay đổi; log mới có SHA-256 để đối chiếu.

## 4. Hồ sơ bàn giao

Word, PDF, nội dung Markdown/HTML, hướng dẫn và ZIP được xuất lại từ các nội dung đã đính chính; mã băm và bản Word trên GitHub được kiểm tra sau cập nhật. Bản trước rà soát được giữ trong lịch sử Git và bản sao lưu của phiên làm việc.

Yêu cầu sinh viên tự chạy, tự phát hiện/sửa và giải thích vẫn cần thao tác cá nhân theo đề; không đánh dấu thay phần này.
