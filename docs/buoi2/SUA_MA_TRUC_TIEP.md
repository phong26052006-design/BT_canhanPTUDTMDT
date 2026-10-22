# Buổi 2 — Năm tình huống sửa mã trực tiếp

Mở `index.html` và **css/style.css**. `style.css` ở gốc chỉ là tệp tương thích đường dẫn Buổi 1, không phải nơi sửa chính. Dự đoán kết quả trước, sửa một giá trị, lưu rồi tải lại trang. Các thử nghiệm trong `evidence/buoi2/after/ui-check.json` đã do trợ lý chạy trên DOM/CSS của trình duyệt; sinh viên cần tự luyện trong editor.

## 1. Thay khoảng cách bên trong thẻ

Tìm `.product-content { ... padding:24px; }`, đổi thành `padding:28px`. Tại 1366 px, vùng nội dung giảm từ 252 xuống 244 px, còn khung rộng ngoài vẫn 300 px. Trong bố cục hiện tại, phần tử có `width:auto` và được Flexbox kéo giãn theo chiều ngang; không quy việc giữ chiều rộng ngoài chỉ cho `border-box`. Ở màn hình ≤580 px còn quy tắc padding:20px phía sau: nếu muốn thay riêng điện thoại phải sửa quy tắc media đó, tránh tưởng CSS không áp dụng.

Để phân biệt hai cơ chế, đã thử riêng `width:100%` với padding 28 px: border-box cho chiều rộng ngoài 300 px; content-box cho 356 px vì cộng thêm 56 px padding. Đây là thí nghiệm tạm, không phải cấu hình lưu trong trang.

Kiểm tra: chữ cách mép nhiều hơn, ảnh vẫn sát viền vì padding ở vùng nội dung; không xuất hiện cuộn ngang. Hoàn nguyên về 24 px sau thử nếu không chọn làm thay đổi cuối.

## 2. Đổi màu giá

Tìm `.price-value`, bổ sung `color:#b33126` hoặc dùng `.product-card .price-value { color:#b33126; }`. Kết quả dự kiến chỉ giá hiện tại đổi sang đỏ đậm; giá cũ và mô tả không đổi. Kiểm tra màu trong Computed và độ tương phản trên nền trắng. Đã thử và đọc được rgb(179,49,38). Cấu hình cuối vẫn dùng xanh đậm kế thừa từ trang.

## 3. Thay số cột

Tại quy tắc gốc `.product-grid`, thử:

```css
grid-template-columns: repeat(2, minmax(0, 1fr));
```

Sau đó thử repeat(3,...). Đã quan sát hai cột khoảng 628 px và ba cột khoảng 410,66 px ở viewport 1366 px. Gap vẫn 24 px. Ở màn hình ≤1100 hoặc ≤580, quy tắc media phía sau có thể ghi đè số cột; muốn xem thử gốc hãy dùng màn hình rộng hoặc sửa đúng media.

Không xóa display:grid khi chỉ muốn đổi số cột. Cấu hình cuối là 4/2/1; ảnh thử hai và ba cột được ghi riêng.

## 4. Đổi khoảng cách menu

Tìm `.main-nav-list { ... gap:8px 27px; }`, đổi thành `gap:8px 36px` để tăng khoảng cách ngang. `.main-nav-list` mới là cha flex chứa ba li; `.main-nav` là vùng nav bao ngoài. Kiểm tra các liên kết tách xa hơn và vẫn xuống dòng khi cần. Quy tắc cho màn hình nhỏ có thể ghi đè gap; kiểm tra đúng viewport.

## 5. Bổ sung/sửa alt

Trong img đầu tiên, đổi alt thành một mô tả đúng hình, ví dụ “Bàn phím cơ K75 mẫu, phím màu kem và xanh”. Giữ nguyên src. Kiểm tra trong DOM rằng alt đã đổi; giao diện nhìn thấy có thể không đổi vì ảnh vẫn tải bình thường. Không tạo alt bằng giá bán hoặc thông tin không có trong hình.

## Quy trình giải thích trước giảng viên

1. Chỉ phần tử/class cần sửa và tệp chứa nó.
2. Nêu thuộc tính, giá trị hiện tại, giá trị dự định thay và dự đoán.
3. Sửa, lưu, tải lại; kiểm tra đúng media query và trạng thái hover/focus nếu có.
4. Đối chiếu với dự đoán, giải thích vì sao nếu khác.
5. Ghi thay đổi cá nhân và bằng chứng vào TU_KIEM_TRA.md; commit nếu giữ làm bản chính.
