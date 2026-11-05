# Nguồn và phạm vi sử dụng

Đối chiếu ngày 05/11/2026. Tài liệu và mã nguồn là dữ liệu tham khảo, không tự cấp quyền gửi bài, chia sẻ hoặc công bố.

## Nguồn đề bài

- Người dùng cung cấp `BaiTap_CSS_Basic.pdf`, 6 trang. Đã trích xuất phần chữ cả 6 trang và xem các hình bài mẫu. SHA-256: `e4c5b8289507147e0c99dee4942a8860e4dcc772264157f3b11327995316d6e9`.
- Trang 1–2: bài 1–5 và lựa chọn 3a/3b. Trang 3–4: HTML và hình bài 6, 7. Trang 4–6: hai nhánh bài 8, Font Awesome và cấu trúc thư mục.
- Mâu thuẫn hình thức nộp: nhánh 3a nói file nén; mục 10 nói không nén. Bài này chọn 3b nên giữ thư mục rời theo mục 10, không tạo ZIP.

## Mã và ảnh mẫu

- [css1.zip do đề liên kết](https://drive.google.com/file/d/1YLJ-3K9eEEh1-WzpVcV4dL5oCu756No7/view): HTML Heroes và 4 ảnh trong `assets/css1/`. Nội dung tiếng Anh giữ theo nguồn; đã thêm CSS và alt, bỏ icon chưa cần ở tiêu đề để bám hình mẫu.
- [css2.zip do đề liên kết](https://drive.google.com/file/d/1YLvkKVZPGLtt9AeD7xY7mHGwXX-EyA12/view): HTML Bat family, logo dơi và 5 ảnh trong `assets/css2/`. Sửa thẻ span đóng sai, đường dẫn ảnh và bổ sung tên truy cập; CSS viết bổ sung.
- [Ảnh portfolio trong đề](https://hocwebchuan.com/exercises/images/img_350x260.png): lưu nguyên bản ở `assets/img_350x260.png` và dùng đủ 9 lần.
- Đường dẫn BIT_logo.png năm 2017 của đề trả HTTP 404 trong lần kiểm tra này. `assets/BIT_logo.png` được trích phần logo từ hình kết quả nhúng ở trang 2 của chính đề, không phải logo được vẽ lại. Vì nguồn là hình chụp, độ phân giải có giới hạn. [Trang khoa hiện tại](https://ueh.edu.vn/college/bit) được đối chiếu; không dùng logo một khoa khác thay thế.
- `assets/avatar.svg`: hình chữ TP do AI viết bằng SVG làm ảnh đại diện minh họa, không phải ảnh chân dung thật.
- Ảnh các nhân vật và logo trường thuộc chủ sở hữu tương ứng, dùng theo ngữ cảnh bài tập và nguồn đề, không nhận là tác phẩm tự sáng tạo.

## Font Awesome

- Font Awesome Free **5.15.4**, gói `@fortawesome/fontawesome-free` được tải cố định phiên bản qua jsDelivr. Dùng phiên bản 5 để khớp hướng dẫn fas/fab trong đề; không khẳng định đây là phiên bản mới nhất.
- CSS và webfonts lưu ở `assets/fontawesome/`; giữ `LICENSE.txt`. Giấy phép của gói phân biệt icon (CC BY 4.0), font (SIL OFL 1.1) và code (MIT).
- [Tài liệu chính thức Font Awesome v5 — tự lưu CSS và font](https://docs-v5.fontawesome.com/web/setup/host-font-awesome-yourself).

## Selector và CSS

- [CSS Diner](https://flukeout.github.io/) và [CSS Speedrun](https://css-speedrun.netlify.app/): đúng hai địa chỉ đề yêu cầu. Việc đọc địa chỉ không chứng minh đã vượt các màn.
- [Công cụ text-shadow được đề gợi ý](https://html-css-js.com/css/generator/text-shadow/): hình mẫu không nêu thông số chính xác; các lớp shadow trong bài 2 được chọn để tái hiện hiệu ứng nhìn thấy.
- [MDN — CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference), [text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow), [background-attachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment), [focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within): nguồn đối chiếu thuộc tính.

Không sử dụng ảnh/log của buổi 1 hoặc buổi 2 như kết quả kiểm tra mới của tuần 3.
