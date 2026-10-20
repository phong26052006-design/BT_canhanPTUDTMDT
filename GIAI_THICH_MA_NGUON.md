# Giải thích mã nguồn Phong Select

## 1. Trình tự thiết kế

Chọn một trang danh sách thay vì sao chép toàn bộ sàn. Người mua đọc giới thiệu → đến danh sách → chọn nhóm → xem giá → mở thông tin. Bộ dữ liệu nhỏ gồm bốn sản phẩm giúp thử nghiệm bố cục và lọc mà không cần máy chủ ứng dụng.

## 2. HTML và nhiệm vụ

| Thành phần | Vai trò trong bài |
|---|---|
| `lang=vi`, `meta charset`, `meta viewport` | Tiếng Việt, mã hóa UTF-8, hiển thị theo thiết bị. |
| `header`, `nav`, `main`, `footer` | Chia vùng chức năng rõ để đọc mã và điều hướng. |
| `h1`, `h2`, `h3` | Một tiêu đề chính, tiêu đề khu vực, tên từng sản phẩm. |
| `section`, `article` | Nhóm danh sách và từng thẻ độc lập. |
| `fieldset`, `legend`, `label`, `input type=radio` | Nhóm lọc có nhãn, chỉ chọn một giá trị, hỗ trợ bàn phím gốc của trình duyệt. |
| `data-category` | Gắn nhóm cho thẻ để CSS chọn đúng. |
| `button type=reset` | Khôi phục radio có thuộc tính `checked` ban đầu. |
| `details`, `summary` | Mở/đóng thông tin, không cần JavaScript. |
| `img alt`, kích thước ảnh | Mô tả hình và giữ tỷ lệ, tránh ảnh méo hoặc mất nội dung thay thế. |
| `s`, `.sr-only` | Gạch giá trước ưu đãi và bổ sung mô tả cho trình đọc màn hình. |

## 3. Bộ lọc hoạt động thế nào?

```html
<input type="radio" name="group" id="filter-all" checked>
<input type="radio" name="group" id="filter-input">
<!-- Các input ở trong form; HTML thật có label và aria-controls. -->
<button type="reset">Đặt lại bộ lọc</button>
```

Các radio có cùng `name` nên trình duyệt chỉ giữ một lựa chọn. `checked` trên “Tất cả” là trạng thái mặc định. CSS dưới đây ẩn thẻ không thuộc nhóm đang chọn:

```css
#san-pham:has(#filter-input:checked)
  .product-card:not([data-category="input"]) {
  display: none;
}
```

`:has()` kiểm tra trạng thái con bên trong khu vực; `:not()` chọn các thẻ không khớp. Hai quy tắc tương tự cho âm thanh/phụ kiện. Các nhãn số kết quả được bật/tắt bằng CSS tương ứng. Nhấn “Đặt lại” khiến radio mặc định được chọn lại và cả bốn thẻ hiện ra. Đây là lọc trên bốn thẻ đã có trong HTML, không truy vấn cơ sở dữ liệu.

## 4. Bố cục và thích ứng

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
@media (max-width: 1100px) {
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 580px) {
  .product-grid { grid-template-columns: 1fr; }
}
@media (max-width: 380px) {
  .filter-options { grid-template-columns: 1fr; }
  .filter-option > span { font-size: 12px; }
}
```

`minmax(0,1fr)` cho cột co trong không gian thực có. `box-sizing:border-box` tính cả padding và viền trong kích thước. `max-width:100%`, tỷ lệ ảnh và `object-fit:contain` giữ hình đúng tỷ lệ. Biến CSS lưu màu/khoảng cách dùng chung. `:focus-visible` chỉ rõ vị trí bàn phím; `prefers-reduced-motion` tắt cuộn mượt khi người dùng yêu cầu giảm chuyển động.

## 5. Thao tác trên thẻ

```html
<details class="plan-details">
  <summary>Xem thông tin Bàn phím cơ K75</summary>
  <div class="plan-content">Thông tin sản phẩm mẫu...</div>
</details>
```

`summary` là thao tác mở/đóng mặc định do trình duyệt cung cấp, không cần `onclick`. Tên sản phẩm bổ sung trong nhãn giúp phân biệt bốn thao tác. Đây là nút xem thông tin, không phải đặt mua hoặc thêm giỏ.

## 6. Kiểm tra giá

Tiền tiết kiệm = giá trước ưu đãi − giá bán. Tỷ lệ giảm = tiền tiết kiệm / giá trước ưu đãi × 100. Ví dụ K75: 750.000 − 600.000 = 150.000 VND; 150.000 / 750.000 × 100 = 20%. Dữ liệu `products.json` để đối chiếu với HTML, không phải nguồn giá thật.

## 7. Hai điểm đã sửa sau khi chạy

1. Đổi nội dung nhãn trong HTML từ thuật ngữ “Thiết bị nhập” sang tên quen thuộc “Chuột & bàn phím”. `&amp;` là cách mã hóa ký tự `&` trong HTML.
2. Bổ sung media query ≤380 px cho bộ lọc một cột; tăng cỡ nhãn lên 12 px. Thay đổi CSS không đổi danh mục hoặc số kết quả, chỉ tăng chỗ cho nhãn.

## 8. Giới hạn kỹ thuật

CSS `:has()` cần trình duyệt hiện đại; chưa kiểm tra trình đọc màn hình hoặc mọi phiên bản Safari/Firefox. Việc đổi chuỗi số kết quả bằng CSS có `aria-live`, nhưng chưa xác minh mức thông báo trên từng trình đọc màn hình. Khi tăng dữ liệu, lọc nhiều tiêu chí, tìm từ khóa hoặc tồn kho thật, cần mô hình dữ liệu và logic phù hợp. Không suy ra khả năng bán hàng thực tế từ bản mẫu HTML/CSS.
