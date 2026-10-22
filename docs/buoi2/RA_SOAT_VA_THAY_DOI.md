# Buổi 2 — Rà soát và thay đổi

Ngày 22/10/2026. Bản gốc: commit `dbb6bc2` của cùng repository Phong Select. Khu vực trọng tâm: danh sách và thẻ sản phẩm; menu/bộ lọc được kiểm tra để giữ chức năng kế thừa.

## 1. Thành phần đã có từ Buổi 1

HTML có doctype, lang=vi, UTF-8, viewport; header, nav, main, section, article, footer; một h1, các h2/h3; ảnh có alt; liên kết fragment có đích; ul/ol ở nội dung; details/summary và form lọc. CSS có font/màu nền, border-box, Flexbox, Grid, media query và một số trạng thái focus. Không ghi sai rằng bài cũ thiếu toàn bộ ngữ nghĩa, alt hoặc responsive.

## 2. Ba vấn đề/cơ hội cải thiện được xác định

| Vấn đề | Phân loại và bằng chứng trước | Hướng cải thiện | Kết quả mong muốn/đã kiểm tra |
|---|---|---|---|
| Các min-height cuối CSS ghi đè quy tắc màn hình nhỏ, tạo khoảng trống cứng trong thẻ. | Bất nhất CSS đã xác nhận: tại 768 px, mô tả và khối giá vẫn min-height 72/118 px, dù nhóm media trước đó định 44/108 px. | Bỏ các min-height cạnh tranh; dùng Flexbox cột và margin-top:auto ở khối giá; giữ các media sau quy tắc gốc. | Mô tả đo khoảng 47,59 px theo nội dung thay 72 px; không dùng chiều cao cứng để căn thẻ. |
| Tập sản phẩm và tập liên kết menu chưa thể hiện bằng danh sách. | Cơ hội cải thiện ngữ nghĩa: div chứa bốn article; nav chứa trực tiếp ba a. Đây không phải lỗi HTML bắt buộc. | Dùng ul/li đúng nội dung; giữ article và nav; reset list-style, margin, padding. | DOM có bốn li sản phẩm và ba li menu, không marker/khoảng lề mặc định. |
| Nền thao tác Xem thông tin đổi tức thời khi hover. | Cơ hội cải thiện phản hồi: summary có transition-duration:0s, dù biểu tượng + có chuyển đổi riêng. Focus đã có, không nhận là thiếu hoàn toàn. | Transition màu 180ms; hover xanh/trắng; focus-visible viền 3 px; giữ giảm chuyển động. | Hover không đổi chiều cao 48 px; focus thấy bằng bàn phím; reduce đưa transition về 0s. |

Ảnh thực tế trước sửa ở `evidence/buoi2/before/`, kèm baseline-check.json và mã băm. Đề xuất có lý do nhưng chưa phải bằng chứng tăng hiệu quả mua sắm.

## 3. Thay đổi mã cuối

- Chuyển CSS chính vào `css/style.css`, link từ HTML đúng đường dẫn. Giữ `style.css` ở gốc làm @import tương thích cho đường dẫn cũ; không tải đồng thời cả hai từ HTML.
- Sản phẩm: `ul.product-grid > li.product-item > article.product-card`. Data-category nằm trên li; CSS lọc ẩn li. Không để li trống tiếp tục chiếm ô.
- Menu: nav chứa ul.main-nav-list; Flexbox đặt ở ul; các liên kết vẫn trỏ đến vị trí cũ.
- Dùng class product-title, product-details, product-toggle, product-detail-content, product-disclaimer thay các tên plan còn sót từ mẫu trước. Đây là cải thiện khả năng đọc mã.
- Box Model: thẻ margin:0, border:1px, radius:18px; vùng nội dung padding:24px, điện thoại 20px; mô tả margin-bottom:20px; lưới gap:24px.
- Flexbox dùng trên thẻ/nội dung để căn khối giá và trên thao tác để căn nhãn/+; thử ba justify-content, giữ space-between.
- Grid vẫn dùng dữ liệu bốn sản phẩm cũ; đã thử hai/ba cột, cuối cùng giữ 4/2/1. Ảnh contain tỷ lệ 4/3 để không cắt minh họa.
- Hover/focus/transition có trạng thái rõ; reduced-motion giữ hiệu lực bằng quy tắc đã kế thừa.
- Không thêm JavaScript, framework, nút mua giả, backend hoặc sản phẩm mới.

## 4. Lỗi cần tránh khi kiểm tra

Selector `.product-card:not([data-category=...])` thuộc cấu trúc cũ. Nếu bọc thêm li mà vẫn chỉ ẩn article, có nguy cơ giữ ô rỗng. Mã cuối chuyển điều kiện sang li và đã thử hồi quy. Đây là rủi ro được phòng tránh khi sửa, không ghi thành lỗi đã quan sát nếu chưa thực sự tái hiện.

Quy tắc media phía sau có thể ghi đè quy tắc gốc. Khi luyện sửa padding, cột hoặc gap cần kiểm tra đúng chiều rộng và Computed trong trình duyệt.

## 5. Phần cá nhân

Các thay đổi và thử nghiệm trong phiên này do trợ lý thực hiện. Sinh viên phải tự mở, phát hiện/sửa ít nhất một điểm và giải thích đoạn mã theo mục 11 của đề. Chưa có xác nhận thay hoạt động đó; ghi kết quả thật ở TU_KIEM_TRA.md.

Liên kết sản phẩm **Xem hình lớn** trong phần thông tin mở rộng trỏ tới đúng SVG của từng hàng và mở tab mới; class `.product-card .product-image-link` minh họa định dạng thẻ a thành thao tác đơn giản. Không tạo trang chi tiết giả hoặc liên kết mua hàng chưa có chức năng.
