# Phong Select bài cá nhân buổi 2

Hoàn thiện HTML5 và CSS3 trên chính danh sách phụ kiện góc làm việc của buổi 1. Giữ bốn sản phẩm, giá và hình SVG; trọng tâm là cấu trúc danh sách, thẻ sản phẩm, Box Model và phản hồi tương tác. Không dùng Bootstrap, Tailwind, backend hoặc JavaScript chạy trên trang.

## Chạy bài

Mở `index.html` bằng Chrome/Edge hiện đại. Trong workspace hiện tại có thể xem **http://127.0.0.1:8878/buoi-2/**. Đường dẫn localhost chỉ hoạt động khi máy chủ cục bộ đang chạy, không phải website công khai.

Chọn nhóm để lọc; bấm **Đặt lại bộ lọc**; mở **Xem thông tin** và chọn **Xem hình lớn**. Có thể dùng Tab, phím mũi tên và Enter. CSS lọc kế thừa `:has()` từ buổi 1 nên cần browser hỗ trợ tính năng này.

## Website tham khảo và nguồn kế thừa

- Website tham khảo lịch sử: [Lazada Việt Nam](https://www.lazada.vn/).
- Nền: Phong Select buổi 1, snapshot `dbb6bc22bbf86fdf3914a5ebcc28eda82e0b8630` của [repository đã dùng](https://github.com/phong26052006-design/BT_canhanPTUDTMDT).
- Bản buổi 1 trong workspace được giữ nguyên. Không khảo sát lại Lazada hoặc tạo website mới trong buổi 2.

## Những thay đổi chính

1. Chuyển danh sách sản phẩm thành `ul > li > article`, menu thành `nav > ul > li > a`; giữ thứ bậc h1/h2/h3.
2. Chuyển stylesheet chính vào `css/style.css`; `style.css` ở gốc chỉ là đường dẫn tương thích cũ.
3. Thêm `.product-title`; đổi các tên `.plan-*` thành `.product-*`; định dạng rõ vùng nội dung, tiêu đề và giá phụ.
4. Thực hành Box Model: thẻ ngoài viền 1 px, padding 0; `.product-content` padding 24 px trên desktop, 23/22 px tại các breakpoint nhỏ hơn; tiêu đề margin-bottom 12 px.
5. Thực hành Flexbox ở menu: `display`, `justify-content`, `align-items`, `gap`; giữ Grid 4/2/1 cột và thử riêng 2/3 cột.
6. Thêm bốn liên kết ảnh SVG thực, hover, transition 180 ms và focus-visible 3 px. Giữ reduced-motion.
7. Cập nhật CSS lọc trên `.product-item` để ẩn cả ô Grid sau khi thêm `li`, tránh giữ ô trống.

## Minh chứng và kết quả

- [Báo cáo và bảy câu trả lời kiến thức](BAO_CAO.md).
- [Nhật ký sử dụng AI](AI_USAGE.md).
- [Hướng dẫn năm yêu cầu sửa mã trực tiếp và phiếu tự làm](SUA_MA_TRUC_TIEP.md).
- [Ảnh và log trước sau](evidence/README.md).
- [Log kiểm tra máy đọc](evidence/after/results.json).

Ngày 27/10/2026, **104/104 kiểm tra đạt** trên Chrome 155.0.8059.85: 10 độ rộng từ 320 đến 1366 px; bộ lọc/reset; ngữ nghĩa; bàn phím; liên kết ảnh; CSS/giá/Box Model; hover/focus; thử Flexbox/Grid và mở trực tiếp tệp. Chưa kiểm tra Safari/Firefox, trình đọc màn hình hoặc thiết bị thật; không coi kết quả này là chứng nhận WCAG.

## Công cụ AI và phần người học

ChatGPT/Codex hỗ trợ đọc đề, rà soát mã, thực hiện thay đổi, giải thích và kiểm thử. Các prompt trong nhật ký là khung tác vụ được áp dụng từ đề, không phải ảnh hay lịch sử hội thoại được dựng lại. Lượt kiểm thử này do trợ lý thực hiện.

Đề có yêu cầu sinh viên tự chạy, tự sửa và giải thích. Phiếu ở cuối `SUA_MA_TRUC_TIEP.md` để người học ghi thao tác của chính mình; chưa ghi thay rằng phần đó đã hoàn thành.

## Cấu trúc

```text
index.html
css/style.css              CSS chính
style.css                  Tương thích đường dẫn cũ
images/                    4 hình sản phẩm và favicon
products.json              Bảng giá đối chiếu, không tự render trang
README.md
BAO_CAO.md
AI_USAGE.md
SUA_MA_TRUC_TIEP.md
evidence/before/            Ảnh và audit nền buổi 1
evidence/after/             Ảnh và 104 kết quả kiểm tra buổi 2
tools/verify.mjs            Công cụ kiểm tra, không được trang web tải
```

Khi sửa giá, cập nhật HTML và `products.json` cùng lúc. Không có giỏ hàng, đăng nhập hoặc thanh toán; nút thao tác hiện tại dùng để xem thông tin và mở ảnh.

## GitHub

Bản buổi 2 nằm trong **cùng repository buổi 1**, ở thư mục riêng `buoi-2/`. Nhánh bàn giao là `codex/buoi2-html-css-2026-10-27`, dùng PR để người dùng xem trước khi hợp nhất vào main. Trạng thái xuất bản được ghi riêng trong hồ sơ bàn giao.

## Rà soát cuối ngày 28 tháng 10 năm 2026

Đã đối chiếu lại đề, bổ sung thử nghiệm align-items và chạy lại **106/106 kiểm tra đạt** trên Chrome 156.0.8078.48. [Log mới](evidence/final-20261028/results.json) và ảnh cùng thư mục tách riêng với minh chứng ngày 27/10. HTML/CSS và dữ liệu sản phẩm giữ nguyên trong lần rà soát cuối.

Công cụ verify.mjs ghi ngày thực tế theo Asia/Bangkok. Đặt EVIDENCE_DIR thành thư mục riêng khi chạy lại để giữ log cũ; SITE_URL chọn URL máy chủ và PLAYWRIGHT_PACKAGE_PATH chọn bản Playwright cài ở máy đang dùng. File DOCX bàn giao riêng gồm báo cáo, ảnh, nhật ký AI tiêu biểu và hướng dẫn sửa mã. [PR số 1](https://github.com/phong26052006-design/BT_canhanPTUDTMDT/pull/1) vẫn là bản nháp.
