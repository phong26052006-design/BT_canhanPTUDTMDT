# Buổi 2 — Báo cáo sử dụng AI

Ngày 22/10/2026 · Công cụ: OpenAI ChatGPT/Codex · Dự án tiếp tục: Phong Select.

## 1. Yêu cầu thực tế của người dùng

> Đây là bài tập cá nhân buổi 2 của tôi. Bạn hãy nghiên cứu và phân tích, sau đó thực hiện làm việc hoàn thành lần lượt tất cả các bài tập và công việc được giao ở trong bài tập cá nhân buổi 2 của tôi. Bạn hãy hoàn thành nó một cách kĩ lưỡng chi tiết và hoàn thiện chính xác nhất nhé.

Người dùng cung cấp BaiTap_CaNhan_Buoi2.pdf gồm 23 trang. Trợ lý đã đọc nội dung và infographic, đối chiếu tám bước thực hành, bảy câu hỏi chính, bảy câu tự kiểm tra HTML/Flexbox, năm tình huống sửa mã và tám sản phẩm cần nộp. Phần sản phẩm cần nộp dẫn nhầm “bảy câu ở phần 5”; bài trả lời đúng bảy câu tại mục 12.

## 2. Đầu vào và cách ghi nhận

Mã gốc là index.html/style.css của commit `dbb6bc2`, cùng images/ và products.json. Bản gốc được giữ trong lịch sử Git và chụp trước sửa. Trợ lý làm việc trực tiếp trên tệp và kiểm tra bằng trình duyệt tự động; không khai đã thao tác VS Code hoặc Chrome DevTools GUI thay sinh viên.

Chín mục dưới là **khung prompt của đề được trợ lý áp dụng trong quá trình triển khai**, không phải chín tin nhắn độc lập do sinh viên gửi. Mã đầu vào có thể đối chiếu ở commit gốc; mã cuối trong cùng repository. Không tạo ảnh hội thoại giả.

## 3. Chín khung prompt và kết quả

### Prompt 1 — Phân tích mã hiện tại

> Phân tích index.html và style.css của Phong Select ở commit dbb6bc2. Nêu thành phần đã có, ít nhất ba vấn đề/cơ hội cải thiện, hướng sửa và thứ tự thực hiện bằng HTML5/CSS3. Không tạo website mới, không viết lại toàn bộ; phân biệt lỗi đã xác nhận và đề xuất cải thiện.

Kết quả: đã có HTML ngữ nghĩa, alt, Grid, Flexbox và responsive. Xác nhận min-height cuối CSS ghi đè giá trị của media tại 768 px; đề xuất ul/li cho tập sản phẩm/menu và transition cho nền summary vốn 0s. Không gán lỗi “thiếu alt/thiếu header/chưa responsive” cho bài cũ.

### Prompt 2 — Kiểm tra HTML5

> Rà soát doctype, lang, charset, viewport, header/nav/main/section/article/footer, h1–h3, img/alt, a và danh sách. Sửa cấu trúc tập sản phẩm theo nội dung thực tế; giữ article cho từng thẻ, không thêm phần tử vô nghĩa. Giải thích lý do và kiểm tra thẻ đóng/lồng nhau.

Kết quả: sản phẩm thành ul > li > article; menu thành nav > ul > li > a; có class rõ cho tên và thao tác; alt đầu tiên cụ thể hơn. Trình phân tích html5lib ghi nhận 0 lỗi phân tích; kiểm tra DOM cho một h1, không nhảy cấp/ID trùng, bốn li và ba mục menu.

### Prompt 3 — Liên kết CSS ngoài

> CSS Buổi 1 ở gốc style.css. Tạo css/style.css làm tệp chính, cập nhật link trong head, giữ đường dẫn cũ tương thích và tránh hai bản CSS đầy đủ cạnh tranh. Giữ font Arial, bảng màu hiện có, body margin:0, border-box và ảnh co theo vùng chứa; không Bootstrap/Tailwind.

Kết quả: HTML tải trực tiếp css/style.css; root style.css chỉ @import để tương thích nếu dùng đường dẫn cũ. Trình duyệt xác minh stylesheet tải và có cssRules, font/màu được áp dụng; không có thư viện CSS bên ngoài.

### Prompt 4 — Selector và Box Model

> Trên thẻ có sẵn, minh họa element selector, class selector và descendant selector. Dùng border/radius ở product-card, padding ở product-content và margin ở đoạn mô tả/khối giá; giải thích border-box theo số đo thực tế. Không tạo lại nội dung sản phẩm.

Kết quả: body/img là element selector; product-card là class selector; .product-card .product-title và .product-card .product-toggle là descendant selector. Đo tại 1366 px: thẻ 302 px, viền 1 px mỗi bên, vùng nội dung rộng ngoài 300 px, padding 24 px mỗi bên, nội dung 252 px. Tránh nhầm padding con là padding của article.

### Prompt 5 — Flexbox

> Dùng summary có hai span (nhãn và +) làm khu vực Flexbox nhỏ. Giải thích display:flex, justify-content, align-items và gap. Thử flex-start, center, space-between, ghi kết quả rồi chọn cấu hình phù hợp. Không viết lại header hay toàn trang.

Kết quả: ba cấu hình được thử trên DOM; giữ space-between, align-items:center, gap:12px. Gap tối thiểu 12 px, khoảng thực tế với space-between lớn hơn do phân phối khoảng trống. Flexbox cột trong thẻ và margin-top:auto thay min-height cứng để căn khối giá.

### Prompt 6 — Grid

> Dùng danh sách bốn sản phẩm cũ, thử hai và ba cột bằng repeat/minmax, điều chỉnh gap, giữ hình đúng tỷ lệ. Giải thích display:grid, grid-template-columns, repeat, gap và object-fit:cover; chọn cover/contain phù hợp ảnh thật và nêu lý do.

Kết quả: có ảnh thử hai/ba cột; cuối cùng giữ 4/2/1 theo màn hình. Dùng contain và tỷ lệ 4/3 để không cắt SVG. Thử display:block để quan sát câu hỏi khi bỏ Grid. Không gán các thí nghiệm DOM này là cấu hình chính đã lưu.

### Prompt 7 — Hover và focus

> Bổ sung chuyển màu hover nhẹ cho product-toggle, transition 180ms, focus-visible rõ khi dùng bàn phím; không làm đổi kích thước thao tác. Kiểm tra chế độ giảm chuyển động và tương phản, giữ hành vi details/summary.

Kết quả: nền trắng/chữ xanh chuyển thành nền xanh/chữ trắng, chiều cao vẫn 48 px. Focus viền solid 3 px, offset 3 px. Reduced-motion đưa transition về 0s. Công cụ tiếp cận và đối chiếu màu bổ sung được ghi riêng, không nhận là chứng nhận WCAG.

### Prompt 8 — Kiểm tra và sửa ít thay đổi

> Mô tả ở 768 px vẫn min-height 72px dù media trước đặt 44px; khối giá vẫn 118px thay 108px. Xác định nguyên nhân từ thứ tự CSS, đề xuất sửa tối thiểu và kiểm tra lại. Phân biệt điều đã đo và rủi ro cần phòng tránh khi đổi HTML.

Kết quả: các khai báo cùng selector ở cuối file đã ghi đè quy tắc media. Bỏ các min-height cạnh tranh, dùng bố cục flex. Sau sửa mô tả khoảng 47,59 px theo nội dung. Đồng thời chuyển lọc sang li để phòng ô trống sau khi thêm ul/li. Kiểm tra bảy chiều rộng, 21 tình huống lọc, đặt lại, ảnh, liên kết và bàn phím đều đạt trong lượt thử.

### Prompt 9 — Hoàn thiện README

> Cập nhật README cho Buổi 2, nêu rõ tiếp tục Phong Select từ Buổi 1; khu vực cải thiện; HTML/selector/Box Model/Flexbox/Grid/hover/focus; cách chạy; thay đổi; AI và cách kiểm chứng; đường dẫn repo/website nếu đã triển khai. Không bịa trạng thái Pages hoặc phần sinh viên chưa tự làm.

Kết quả: README trỏ tới hồ sơ Buổi 2, câu hỏi kiến thức, bài sửa trực tiếp, kiểm thử và báo cáo; giữ liên kết hồ sơ Buổi 1. Repo và Pages có trạng thái riêng; hoạt động cá nhân chưa được xác nhận thay.

## 4. Kiểm chứng và quyết định

| Hạng mục | Quyết định |
|---|---|
| Tạo lại toàn bộ website | Không dùng; kế thừa bốn sản phẩm, hình, giá, thương hiệu và chức năng cũ. |
| Thêm JavaScript hoặc framework CSS | Không dùng trong giao diện; chưa đến phạm vi Buổi 3. |
| Dùng ul/li cho danh sách | Giữ, sau kiểm tra cấu trúc và hồi quy lọc trên li. |
| Tiếp tục dùng min-height cứng để căn nhiều phần | Thay bằng Flexbox sau đo hiện trạng và kiểm tra lại. |
| Sao chép object-fit:cover | Điều chỉnh thành contain cho SVG để giữ toàn hình; vẫn giải thích cover trong bài kiến thức. |
| Khẳng định hover/focus cũ hoàn toàn thiếu | Loại; trước đã có hover/focus, Buổi 2 cải thiện transition và phản hồi màu cụ thể. |
| Số đếm/giá tự cập nhật từ JSON | Không khẳng định; JSON để đối chiếu, HTML hiện tại tĩnh. |
| Khai sinh viên đã tự sửa hoặc tự chạy | Không; để phiếu ghi nhận cá nhân cho sinh viên hoàn thành thật. |

## 5. Phân công thực tế và phần cần tự làm

Trợ lý hỗ trợ đọc đề, phân tích, viết/sửa mã và SVG kế thừa, chạy công cụ, chụp ảnh, soạn đáp án/tài liệu và cập nhật GitHub. Playwright, html5lib và axe là công cụ kiểm tra bên ngoài trang, không là thư viện ứng dụng; trang có 0 script ứng dụng.

Sinh viên cần tự mở trên máy của mình, thử giao diện, tự phát hiện/sửa ít nhất một điểm, giải thích mã và luyện năm dạng sửa trực tiếp. Ghi ngày, thay đổi, lý do và kết quả thực trong TU_KIEM_TRA.md. Các câu trả lời kiến thức là tài liệu hỗ trợ học từ mã thật, cần được sinh viên hiểu và diễn đạt lại.
