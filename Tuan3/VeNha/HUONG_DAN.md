# Bài tập cá nhân tuần 3 — CSS cơ bản

**Sinh viên:** Trương Thanh Phong · **MSSV:** 31241024967 · **Ngày thực hiện:** 05/11/2026.

## Mở và xem bài

Mở `index.html` trong trình duyệt. Các đường dẫn ảnh, CSS và Font Awesome đều tương đối và có sẵn trong thư mục, nên các bài định dạng không cần Internet. Liên kết đến trò chơi, GitHub và Wikipedia cần mạng.

Cấu trúc nộp theo mục 10: `Tuan3/VeNha/`. Giữ nguyên tên và chữ hoa/thường của tệp. Không nén bài.

## Đối chiếu từng yêu cầu

| Mục đề | Tệp / kết quả | Ghi chú |
|---|---|---|
| 1, trang 1 | BaiTap1.html | Chưa có minh chứng vượt từng màn của hai trò chơi. Có hướng dẫn và nhật ký trống, không đánh dấu hoàn thành giả. |
| 2a, trang 1 | BaiTap2.html / .ueh | Blue, center, bold, underline, 30px. |
| 2b, trang 1 | BaiTap2.html / .faculty | Đúng chữ “Khoa CNTTD”; red alpha 0.5, right, italic, yellow dotted rounded border, gray, 15px. |
| 2c, trang 1 | BaiTap2.html / .shadow-text | Bóng nhiều lớp đỏ/đen/xanh tái hiện hình BIT-UEH. Đề không nêu các giá trị shadow cụ thể. |
| 2d, trang 1 | BaiTap2.html / .repeat-logo | Logo nền rộng 30px, giữ tỉ lệ, repeat và fixed. |
| 2e, trang 1 | BaiTap2.html / .overflow-box | 100 × 50px; ba ví dụ riêng hidden, ellipsis và nowrap. |
| 3, trang 1 | BaiTap3.html | Chọn 3b, làm đủ 4–7. Không chọn 3a. |
| 4, trang 1–2 | BaiTap4.html | Bốn li inline-block, nền aqua, chữ xanh gạch chân. |
| 5, trang 2 | BaiTap5.html | Logo 200px, center, strong xanh, hai liên kết dạng nút inline-block. |
| 6, trang 3–4 | BaiTap6.html | Đủ 7 mục và 9 ảnh; 3 cột desktop. Giữ class galerry của đề. |
| 7, trang 4 | BaiTap7.html | Wrapper viền, header trên; nav trái, main phải; footer dưới, bóng đổ. |
| 8a, trang 4–5 | BaiTap8a.html | Từ css1.zip; khung 960px desktop, 4 hero, relative/absolute, z-index. |
| 8b, trang 5–6 | BaiTap8b.html | Từ css2.zip; khung 1024px desktop, hover tăng rộng và hiện Read more gạch chân; có focus-within cho bàn phím. |
| 9, trang 6 | BaiTap9.html và thanh điều hướng | Font Awesome Free 5.15.4 lưu cục bộ; fas/fab; nhãn chữ, aria-hidden cho icon trang trí. |
| 10, trang 6 | index.html và thư mục hiện tại | Mục lục liên kết đủ bài, tên, MSSV, ảnh đại diện chữ TP, social link GitHub. Chưa tự công bố tuần 3 lên GitHub. |

## Những lựa chọn cần hiểu

- `color: rgba(255,0,0,.5)` làm mờ riêng chữ. `opacity:.5` trên cả đoạn sẽ làm mờ nền, viền và con cháu.
- `text-overflow: ellipsis` không tự làm xuất hiện ba chấm nếu chưa tạo điều kiện tràn một dòng và ẩn phần tràn.
- `white-space: nowrap` ngăn xuống dòng. Ví dụ iii cố ý cho chữ tràn trong vùng cuộn ngang; đây là nội dung minh họa của đề.
- `inline-block` vừa xếp ngang vừa nhận width. Khoảng trắng giữa các thẻ có thể tạo khe hở; bài 6 đặt font-size:0 cho danh sách ảnh rồi khôi phục cỡ chữ ở nơi cần thiết.
- Position absolute định vị theo tổ tiên có position khác static. z-index của mô tả lớn hơn ảnh tạo lớp chồng ở bài 8a.
- Bài 8b dùng opacity:0 cho Read more ở trạng thái thường để liên kết vẫn nhận Tab; focus-within hiện lại nó. Thiết bị không có hover sẽ thấy liên kết luôn.
- Width 960px và 1024px áp dụng khi đủ không gian; max-width và media query giúp bài xem được trên màn hình nhỏ.
- Bài 4 giữ href="#", bài 5–6 giữ href="./" theo HTML nguồn. Các danh mục portfolio là liên kết tĩnh theo đề, chưa phải chức năng lọc ảnh.
- HTML nguồn css2 có `<span>` đóng sai; đã sửa thành `</span>`. Ảnh được bổ sung alt, các liên kết Read more có tên truy cập xác định nhân vật.
- Thanh quay về mục lục và phần giải thích được tách khỏi vùng mô phỏng hình mẫu, không thay đổi nội dung bài mẫu.

## Cần hoàn tất trước khi nộp

1. Chơi hai trò chơi, chụp minh chứng **mỗi màn được chấp nhận**, cập nhật nhật ký và trang bài 1 theo thực tế.
2. Kiểm tra hiểu mã bằng cách tự thay cỡ chữ, số cột, z-index rồi phục hồi bản chuẩn.
3. Công bố thư mục trên nhánh GitHub dành cho tuần 3 khi được người dùng yêu cầu/ủy quyền cụ thể. Không tự nộp LMS hoặc gửi email cho giảng viên.

Kết quả kiểm tra mã được ghi trong `minh-chung/ket-qua-kiem-tra.json`. Các ảnh trong `minh-chung/giao-dien/` là ảnh kiểm tra bài HTML/CSS, **không phải ảnh vượt màn trò chơi**.

## Minh bạch hỗ trợ

AI hỗ trợ đọc đề, đối chiếu ảnh, lấy mã mẫu, viết CSS, tổ chức hồ sơ và chạy kiểm tra tự động. Không ghi những thao tác này thành trải nghiệm tự thực hiện của sinh viên. Minh chứng trò chơi và việc công bố GitHub được ghi riêng theo trạng thái thực tế.
