# Giải thích mã nguồn — Phong Select Buổi 2

Trang tiếp tục từ Buổi 1, không viết lại website. Tài liệu đầy đủ ở [câu hỏi kiến thức](docs/buoi2/CAU_HOI_KIEN_THUC.md), [sửa mã trực tiếp](docs/buoi2/SUA_MA_TRUC_TIEP.md) và [thay đổi](docs/buoi2/RA_SOAT_VA_THAY_DOI.md).

## Cấu trúc và đường dẫn chính

- index.html chứa ngữ nghĩa và nội dung tĩnh; CSS chính là css/style.css.
- root style.css chỉ @import tệp chính để tương thích đường dẫn Buổi 1, không phải bản CSS thứ hai cần sửa.
- Sản phẩm: ul.product-grid > li.product-item > article.product-card. Data-category nằm trên li.
- Menu: nav.main-nav > ul.main-nav-list > li > a.
- product-title là h3; product-toggle là summary; product-details là details. Tên class plan-* trong Buổi 1 đã đổi cho phù hợp sản phẩm.

## Bộ lọc kế thừa hoạt động thế nào?

Radio cùng name biểu diễn nhóm chọn; mặc định checked ở Tất cả. CSS :has() kiểm tra radio, ẩn li không khớp:

```css
#san-pham:has(#filter-input:checked)
  .product-item:not([data-category="input"]) {
  display: none;
}
```

Ẩn li để bỏ cả ô Grid. Nút reset ở trong form khôi phục radio mặc định; summary mở details bằng hành vi HTML gốc. Không có JavaScript ứng dụng. Số đếm được khai báo sẵn cho bốn mục, không tự đếm qua JSON.

## Box Model và bố cục

product-card có margin:0, viền 1px, radius 18px; product-content có padding 24px, điện thoại 20px. Mô tả margin-bottom 20px; khoảng giữa thẻ do Grid gap 24px. Border-box tính padding/viền vào kích thước đã định của chính phần tử.

Flexbox cột trong card/content và margin-top:auto ở khối giá thay các min-height cạnh tranh. Summary dùng flex hàng, space-between, center và gap 12px. Grid chia 4/2/1 cột ở >1100 / >580–1100 / ≤580 px; ảnh giữ 4/3 và contain.

## Hover/focus

product-toggle chuyển màu 180ms, hover nền xanh/chữ trắng; focus-visible viền 3px offset 3px. Chế độ reduced-motion đưa transition về 0s. Kiểm tra cụ thể trong TEST_RESULTS.md; không dùng một kết quả tự động để nhận tuân thủ tiếp cận toàn diện.

Giải thích Buổi 1 được giữ trong [lịch sử commit dbb6bc2](https://github.com/phong26052006-design/BT_canhanPTUDTMDT/blob/dbb6bc2/GIAI_THICH_MA_NGUON.md).
