# JavaScript Labs

**Trương Thanh Phong — 31241024967 — lớp 26C1INF50902702**  
Học phần: Phát triển ứng dụng thương mại điện tử. Giảng viên: TS Nguyễn Mạnh Tuấn.

## Mục tiêu và phạm vi

Thực hiện 29 Exercise trong bộ Lab của *Fundamentals of Web Development, 2nd Edition*: Lab 08 có 11 bài, Lab 09 có 8 bài và Lab 10 có 10 bài. Trang portfolio giới thiệu sinh viên, mục tiêu, kiến thức, liên kết và đoạn tự đánh giá 139 từ tính theo khoảng trắng.

Bộ này là bài cá nhân tuần 4 theo `BaiTap_CaNhan_JS.pdf` gồm 9 trang. Bài anh hùng diệt rồng là hoạt động buổi 4 trước đó, được giữ riêng và không dùng thay cho 3 Lab.

## Truy cập

- Trang chủ: `index.html`.
- Lab 08: `Lab08/index.html`.
- Lab 09: `Lab09/index.html`.
- Lab 10: `Lab10/index.html`.
- Repository: https://github.com/phong26052006-design/BT_canhanPTUDTMDT
- GitHub Pages dự kiến: https://phong26052006-design.github.io/BT_canhanPTUDTMDT/JavaScript-Labs/

**Trạng thái ngày 15/11/2026:** người dùng đã cho phép công bố tuần 4. Mã nguồn, ảnh minh chứng và báo cáo đã được đưa lên [nhánh main](https://github.com/phong26052006-design/BT_canhanPTUDTMDT/tree/main/JavaScript-Labs), giữ nguyên các file cũ. GitHub Pages đang chờ cấu hình bằng phiên đăng nhập của chủ repository; đường dẫn Pages ở trên chưa được xác nhận hoạt động. Không nộp LMS tự động.

## Chạy qua HTTP

Từ thư mục cha chứa `JavaScript-Labs`, dùng một máy chủ tĩnh, ví dụ:

```text
python -m http.server 8000 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8000/JavaScript-Labs/`. Có thể dùng Live Server của VS Code nếu đã cài. Hai bài GET cần HTTP; mở bằng `file://` có thể bị trình duyệt chặn tải JSON.

## Cấu trúc

```text
JavaScript-Labs/
  index.html
  css/                 Giao diện portfolio và lớp điều hướng bài thực hành
  js/main.js           Tìm kiếm bài trong từng Lab
  assets/              Avatar biểu tượng và danh mục 29 Exercise
  vendor/              jQuery 3.7.1, Bootstrap 3.3.5 CSS, Font Awesome 4.4.0
  fonts/               Phông Glyphicons của Bootstrap
  Lab08/Exercise01/ ... Exercise11/
  Lab09/Exercise01/ ... Exercise08/
  Lab10/Exercise01/ ... Exercise10/
  Lab10/data/cities.json
  minh-chung/          Ảnh trình duyệt và kết quả kiểm tra
  bao-cao/             Báo cáo Word
  NGUON.md
```

Mỗi Exercise có `index.html`, JavaScript tương ứng và README ngắn. Bài 8.2 nhúng script trực tiếp trong `head`; `main.js` lưu bản đối chiếu. Bài 8.3–8.5 dùng `hello.js` theo tên trong hướng dẫn. Ảnh và CSS gốc dùng chung trong từng Lab; không cần CDN khi chạy.

## Nội dung từng Lab

**Lab 08:** bật/tắt JavaScript; embedded/external script; noscript; Console; String, Date, Math; mảng và lịch 30 ngày; hàm và scope; callback tính thuế; constructor, this và mảng Country.

**Lab 09:** chọn DOM và thuộc tính; quan hệ node; tạo và xóa phần tử; click và hover; chờ load; debugger; focus/blur; kiểm tra form không rỗng. Mẫu form không gửi hoặc lưu mật khẩu, và không tạo tài khoản thật.

**Lab 10:** nạp jQuery; selector cơ bản/nâng cao; on/off và chuỗi handler; bảy cách chèn DOM; sáu hiệu ứng fade/slide; preview ảnh; animate nối tiếp; HTTP GET JSON; done/fail/always và loader.

Danh sách và số trang nguồn từng bài nằm trong `assets/exercises.json`.

## Các điều chỉnh có chủ đích

1. Giữ kiến thức, DOM ID và tài nguyên liên quan của bộ mã khởi đầu; thêm thông tin cá nhân, điều hướng, hướng dẫn kiểm tra và bố cục điện thoại.
2. Dùng jQuery **3.7.1 bản đầy đủ** cục bộ để có AJAX và animation. Bộ khởi đầu dùng 3.1.x qua HTTP; đây không phải tuyên bố 3.7.1 là phiên bản mới nhất.
3. Bài 8.1 kiểm tra cùng hành vi bật/tắt JS bằng trang cục bộ. Không phụ thuộc trang PHP thử nghiệm cũ. Kiểm thử sử dụng browser context tách biệt, không đổi thiết lập trình duyệt cá nhân.
4. Bài 8.5 tái hiện lỗi `doccumment` có bắt lỗi; thông báo `console.error` là yêu cầu minh họa. Bài 8.8 giữ `box` cục bộ và minh họa ReferenceError có bắt lỗi thay vì để biến rò rỉ ra global.
5. Bài 9.6 có câu lệnh `debugger` trong handler. Lần kiểm tra dừng thật và đọc `e.target.id` bằng Chrome DevTools Protocol; JSON lưu kết quả, ảnh chụp trang thể hiện sự kiện sau khi Resume. Ảnh này không được mô tả là ảnh giao diện DevTools.
6. Sửa label trùng ID, bổ sung ID form thiếu, dùng `textContent`/`.text()` cho dữ liệu và không gửi mật khẩu qua GET.
7. Bài 10.5 có bộ chọn bảy phương thức để có thể xem lại từng bước. Bài 10.8 giữ chuỗi ba animation, giới hạn chuyển động trong khung trên điện thoại và dùng top 240px thay cho tọa độ tuyệt đối 400px của ví dụ.
8. Bài 10.9–10.10 cho chọn dịch vụ gốc qua HTTPS, dữ liệu mẫu cục bộ hoặc URL không tồn tại để kiểm tra HTTP 404. Môi trường Python báo lỗi chứng chỉ khi thử HTTPS của dịch vụ gốc ngày 15/11/2026. Lần thử bằng Chrome cũng ghi nhận `net::ERR_CERT_AUTHORITY_INVALID`, được lưu trong `minh-chung/dich-vu-goc.json`. Dữ liệu mẫu 8 thành phố do bài làm tạo, không được gắn nhãn là dữ liệu tải từ tác giả. Chọn dịch vụ gốc bị lỗi sẽ hiển thị lỗi, không tự thay bằng dữ liệu mẫu.

## Minh chứng và sử dụng AI

Ảnh được chụp từ các trang của bộ mã này khi kiểm tra bằng Chrome headless qua HTTP, không lấy ảnh kết quả của sinh viên khác hoặc minh họa Internet. Ảnh du lịch/tác phẩm trong bài là tài nguyên mẫu của tác giả, có nguồn riêng; chúng không thay thế ảnh chụp kết quả thực hành.

AI hỗ trợ đọc yêu cầu, triển khai mã, chạy kiểm thử và soạn báo cáo. Sinh viên cần tự đọc, chạy lại và giải thích được từng Exercise. Phần giới thiệu và tự đánh giá trên portfolio là bản nháp AI hỗ trợ, cần sinh viên sửa và xác nhận theo trải nghiệm của mình trước khi nộp.

Xem `minh-chung/ket-qua-kiem-tra.json` để biết thời điểm, từng phép kiểm tra, log lỗi chủ đích và lần dừng debugger thực tế. Không dùng kết quả tuần trước làm kiểm tra mới.
