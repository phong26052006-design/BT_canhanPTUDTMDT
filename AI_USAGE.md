# AI Usage Log

## 1. Công cụ AI

OpenAI ChatGPT/Codex trong phiên hỗ trợ ngày 20/10/2026. Nhật ký này tóm tắt thao tác đã xảy ra; không phải bản chép nguyên văn một cuộc hội thoại riêng do sinh viên thực hiện.

## 2. Mục đích sử dụng

Đọc đề và bài tham khảo; khảo sát Lazada; phân biệt quan sát và giả thuyết; thiết kế một cải tiến nhỏ; tạo HTML/CSS và SVG; kiểm tra bằng trình duyệt; soạn tài liệu và hỗ trợ đưa mã lên GitHub.

## 3. Prompt và chỉ dẫn chính

### 3.1. Yêu cầu thật của người dùng

> đây là một kết quả làm bài của người đồng nghiệp của tôi, hãy tham khảo theo đó rồi làm bài tập của tôi cho tôi một cách hoàn chỉnh và chính xác chi tiết tỉ mỉ nhé.

Người dùng cũng cung cấp đề PDF và thông tin cá nhân để điền báo cáo. Bản tham khảo được dùng để hiểu cách trình bày; không sao chép danh tính, bài viết, mã hoặc ảnh hội thoại của người khác.

### 3.2. Khung phân tích được trợ lý áp dụng từ đề bài

> Phân tích Lazada Việt Nam (https://www.lazada.vn/) ở năm khu vực: trang chủ, danh mục, chi tiết sản phẩm, tìm kiếm và giỏ hàng. Với mỗi khu vực, nêu mục đích, thành phần, thuận tiện, vấn đề có thể phát sinh và đề xuất. Dùng ảnh L01–L05 ngày 20/10/2026; phân biệt quan sát với giả thuyết. Không khẳng định bộ lọc đã chạy đúng khi gặp xác minh; không suy ra dữ liệu đơn hàng từ giỏ trống.

### 3.3. Khung đề xuất trước khi hoàn thiện mã

> Đề xuất trang Phong Select bằng HTML5/CSS3 cho người mua tại Việt Nam. Chọn cải tiến danh sách: bộ lọc nhóm gọn, giá nhất quán, bốn sản phẩm giả định. Giải thích bố cục, HTML ngữ nghĩa, CSS Grid, trạng thái lọc và thích ứng máy tính/điện thoại. Xác định phạm vi hoạt động trước khi viết mã hoàn chỉnh.

### 3.4. Khung tạo và kiểm tra mã

> Tạo một trang gồm tiêu đề và ít nhất bốn thẻ có ảnh, tên, giá, thao tác. Tách CSS; dùng ảnh SVG tự tạo; không backend, cơ sở dữ liệu hoặc thư viện thừa. Bộ lọc radio, đặt lại và xem thông tin phải có hành vi thật. Kiểm tra sáu độ rộng, bàn phím, giá, ảnh và liên kết; ghi nhận điều chỉnh sau khi chạy và giải thích mã đã sửa.

Các mục 3.2–3.4 là khung công việc trợ lý sử dụng trong phiên này, không phải ba tin nhắn độc lập do sinh viên gửi. Không tạo ảnh chụp giả để minh chứng prompt.

## 4. Kết quả AI đề xuất và đối chiếu

| Khu vực | Kết quả đề xuất | Đối chiếu và quyết định |
|---|---|---|
| Trang chủ | Ưu tiên một thông điệp, bớt cạnh tranh giữa khuyến mãi | L01 có nhiều khối khuyến mãi; giữ như giả thuyết thiết kế, không kết luận người dùng thực sự bị rối. |
| Danh mục | Đưa bộ lọc ngắn gần danh sách, trạng thái rõ | L02 có thanh bên và “VIEW LESS”; loại nhận xét “không có thu gọn”. Chỉ triển khai lọc nhóm nhỏ trong bản mẫu. |
| Chi tiết | Gom giá bán, giá cũ, mức giảm | L03 đã có các loại giá; sửa thành “duy trì thứ bậc nhất quán và bổ sung tiền tiết kiệm ở bản mẫu”, không nói Lazada thiếu giá. |
| Tìm kiếm | Gợi ý lọc theo nhóm và đặt lại | L04 hiển thị từ khóa và kết quả nhưng có xác minh; chưa đo độ chính xác hoặc thời gian tìm. Bản mẫu lọc nhóm, không nhận là công cụ tìm kiếm. |
| Giỏ hàng | Giữ hướng quay lại mua sắm rõ ở trạng thái trống | L05 đang trống, có Sign in/Sign up và Go Shopping. Loại kết luận về lỗi tổng tiền, sửa số lượng hoặc thiếu voucher vì chưa kiểm chứng. |

## 5. Kiểm tra và điều chỉnh đã thực hiện

Trợ lý dùng Chromium 154, Playwright và axe-core để kiểm tra. Nguồn: `evidence/ui-check.json`, `TEST_RESULTS.md`.

- 6 độ rộng 1440, 1024, 768, 390, 375, 320 px; không tràn ngang.
- 18 trường hợp lọc theo nhóm và 6 lần đặt lại; số sản phẩm đúng 2/1/1 và trở về 4.
- Mở/đóng bốn chi tiết bằng Enter; radio bằng phím mũi tên; đặt lại bằng Enter.
- Đổi nhãn “Thiết bị nhập” → “Chuột & bàn phím”; bộ lọc một cột khi ≤380 px. Người thực hiện các thay đổi này là trợ lý, chưa phải xác nhận sinh viên tự sửa.
- Kiểm tra phép tính bốn mức giá; đối chiếu thủ công bốn ký hiệu ₫ mà công cụ tự động chưa kết luận, tương phản 12,09:1.

## 6. Các phần mã sinh viên cần hiểu và giải thích

`header/nav/main/section/article`, thứ bậc tiêu đề, `fieldset/legend/radio`, `:checked`/`:has()`, `data-category`, `display:none`, `type=reset`, `details/summary`, Grid, media query, `alt`, `focus-visible`, giá trước/sau ưu đãi.

Chi tiết ở `GIAI_THICH_MA_NGUON.md`. Chưa có xác nhận sinh viên đã tự giải thích các phần này. Ghi kết quả cá nhân ở `TU_KIEM_TRA.md`, không tích thay các ô còn trống.

## Buổi 2 — 22/10/2026

Tiếp tục cùng Phong Select. [Nhật ký Buổi 2](docs/buoi2/AI_USAGE.md) ghi đủ chín khung prompt của đề, kết quả, kiểm chứng và phần cá nhân. Nội dung phía trên là nhật ký lịch sử Buổi 1 ngày20/10; cấu trúc/class hiện tại xem GIAI_THICH_MA_NGUON.md. Không thay lịch sử bằng lời khai sinh viên tự làm.
