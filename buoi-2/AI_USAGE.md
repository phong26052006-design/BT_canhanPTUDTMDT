# Nhật ký AI buổi 2

Ngày thực hiện: **27/10/2026**. Công cụ: ChatGPT/Codex. Đầu vào là đề `BaiTap_CaNhan_Buoi2.pdf`, mã Phong Select đã khôi phục từ buổi 1 và yêu cầu trực tiếp của người dùng về hoàn thiện bài cá nhân tuần 2.

## Yêu cầu thật và cách dùng prompt

Người dùng yêu cầu nghiên cứu đề rõ ràng, thực hiện và hoàn thiện bài chuyên nghiệp, chính xác. Sau khi có bản mã đã kiểm tra và URL xem cục bộ, người dùng xác nhận **“Cho phép tạo nhánh và PR”** trong repository buổi 1, giữ nguyên main.

Chín khung dưới đây diễn đạt các tác vụ được trợ lý áp dụng từ đề, không được ghi như chín tin nhắn riêng do sinh viên đã gửi. Không có ảnh hội thoại AI dựng lại.

| Mã | Khung tác vụ đã áp dụng | Kết quả và đối chiếu |
|---|---|---|
| P1 | Đọc HTML/CSS buổi 1, xác định thành phần và ít nhất ba điểm cần cải thiện; chưa tạo trang mới. | Xác nhận đã có semantic landmarks, Grid và bộ lọc. Chọn cải thiện danh sách, tên class, liên kết ảnh và tổ chức CSS; không nhận định rằng buổi 1 thiếu CSS hay không responsive. |
| P2 | Kiểm tra h1/h2/h3, header/nav/main/section/article/footer, img/alt/a và danh sách; sửa đúng phạm vi. | Thêm ul/li cho sản phẩm/menu, giữ article cho từng sản phẩm; kiểm tra một h1, không trùng id và bốn ảnh có alt. |
| P3 | Đưa CSS vào css/style.css, kiểm tra đường dẫn, font/màu và giới hạn ảnh. | HTML tải trực tiếp CSS chính; kiểm cả HTTP và file://. Không thêm framework. |
| P4 | Thực hành selector và Box Model trên thẻ hiện có; giải thích margin/padding/border-box. | Element selector body/img; class .product-title; descendant .product-card .product-image-link. Đo cả thẻ ngoài và .product-content để tránh nhầm padding 24 px thuộc thẻ ngoài. |
| P5 | Thử Flexbox trên menu với justify-content, align-items và gap. | So sánh flex-start/space-between ở cùng chiều rộng 620 px. Thu tọa độ và ảnh, không lấy cấu hình thử làm cấu hình cuối. |
| P6 | Thử Grid 2/3 cột, giải thích repeat/minmax/gap và cách giữ ảnh. | Cả hai cấu hình thử hoạt động; bản cuối giữ 4/2/1 cột. Dùng contain để thấy đủ hình SVG; giải thích cover có thể cắt ảnh. |
| P7 | Thêm hover nhẹ, transition và focus-visible cho liên kết/nút hiện có. | Liên kết ảnh có thay màu nền, transition 180 ms và outline 3 px khi dùng bàn phím; reduced-motion loại transition. |
| P8 | Kiểm tra giao diện và đề xuất sửa ít thay đổi nhất. | Tăng chữ giá phụ từ 11 lên 12 px; khi có li, chuyển selector ẩn sang .product-item. Kiểm tra không giữ ô trống sau khi lọc. |
| P9 | Cập nhật README gồm kế thừa, kỹ thuật, cách chạy, thay đổi, AI và GitHub. | Dẫn tới báo cáo, ảnh trước/sau, log thực tế và giới hạn; không bịa website đã triển khai hoặc người học đã tự sửa. |

## Những nhận định đã giữ hoặc điều chỉnh

- **Giữ:** ul/li biểu đạt tập sản phẩm là danh sách, bên trong article là nội dung sản phẩm độc lập. Đây là cải thiện ngữ nghĩa, không khẳng định div trước đó làm trang không chạy.
- **Điều chỉnh:** không thay toàn bộ website bằng mẫu áo/quần trong PDF. Các ví dụ đó là minh họa, còn bài này giữ nguyên phụ kiện Phong Select.
- **Điều chỉnh:** không gán padding 24 px cho `.product-card`. Giá trị này thuộc `.product-content`; số đo thực tế nằm ở log.
- **Điều chỉnh:** ví dụ đề dùng `object-fit: cover`; bài dùng `contain` để không cắt hình minh họa. Giải thích cả hai giá trị trong báo cáo.
- **Giữ:** CSS filter phải ẩn `.product-item` vì đó là Grid item mới. Chỉ ẩn article sẽ có thể để lại ô trống; đã kiểm tra vị trí sản phẩm đầu sau khi lọc.
- **Không sử dụng:** nút mua/giỏ hàng giả hoặc liên kết trang chi tiết chưa tồn tại. `details/summary` và link SVG đều có hành vi thật.
- **Không khẳng định:** AI đã tự làm thay bằng chứng “sinh viên tự sửa”, đã khảo sát Lazada mới, hoặc test Chrome chứng minh đạt trên mọi browser.

## Phần được kiểm tra thực tế

Playwright chạy trên Chrome 155, 104 kiểm tra đạt. Có đo computed style, kiểm tra filter/reset bằng chuột và bàn phím, mở link ảnh trong tab mới, chụp trước/sau, thử bố cục và mở trực tiếp tệp. Đây là hoạt động của trợ lý trong phiên hỗ trợ, không phải tự khai hoạt động của sinh viên.

## Phần cần hiểu và tự thực hành

Người học cần theo được cấu trúc ul/li/article; giải thích vì sao CSS đặt trên cha; phân biệt padding vùng nội dung với viền thẻ; sửa một thuộc tính trong CSS và dự đoán ảnh hưởng breakpoint; giải thích bộ lọc kế thừa `:has()`. Có năm bài sửa trực tiếp và phiếu ghi nhận trong `SUA_MA_TRUC_TIEP.md`.

## Rà soát cuối ngày 28 tháng 10 năm 2026

Người dùng yêu cầu rà soát sai sót còn lại và xuất DOCX. Đã đối chiếu lại đề gốc, bổ sung thử thay đổi align-items, sửa công cụ để ghi ngày thực tế và tách thư mục minh chứng. Lượt mới đạt 106/106 trên Chrome 156; log ở evidence/final-20261028/results.json. Kết quả 104/104 ở trên là lịch sử ngày 27/10. Không khai thay phần sinh viên tự sửa mã.
