# E-commerce UI Improvement — Phong Select

**Trương Thanh Phong · EE0002 · Bài tập cá nhân Chương 1**

## 1. Giới thiệu

Phong Select là bản mẫu một trang bán phụ kiện góc làm việc. Cải tiến tập trung vào danh sách sản phẩm: lọc theo nhóm ngay cạnh danh sách, thông tin giá nhất quán và bố cục thích ứng. Đây là thiết kế độc lập, tham khảo cách tổ chức mua sắm của Lazada Việt Nam.

## 2. Website tham khảo

- Tên: Lazada Việt Nam — https://www.lazada.vn/
- Khảo sát ngày 20/10/2026: trang chủ, danh mục laptop, chi tiết sản phẩm, tìm kiếm “bàn phím”, giỏ hàng khách chưa đăng nhập.
- [Ảnh và nguồn khảo sát](evidence/khao-sat/README.md). Danh mục và tìm kiếm có hộp xác minh; giỏ hàng quan sát được đang trống. Chưa xác minh luồng giỏ hàng có sản phẩm, thanh toán hay hiệu lực bộ lọc của Lazada.
- Không sử dụng logo, mã nguồn hay ảnh sản phẩm Lazada trong giao diện Phong Select.

## 3. Chức năng

- Bốn thẻ sản phẩm, mỗi thẻ có ảnh SVG tự tạo, tên, giá hiện tại, giá trước ưu đãi, tỷ lệ và số tiền giảm.
- Lọc ngay bằng radio: Tất cả (4), Chuột & bàn phím (2), Âm thanh (1), Phụ kiện (1).
- Nút **Đặt lại bộ lọc** khôi phục cả bốn thẻ.
- **Xem thông tin** mở/đóng nội dung bằng `details/summary`, dùng được bằng bàn phím.
- Lưới 4/2/1 cột; không tràn ngang tại sáu kích thước đã kiểm tra từ 320 đến 1440 px.

Sản phẩm, thông số và giá là dữ liệu giả định. Phạm vi là trang danh sách tĩnh; chưa có tìm kiếm từ khóa tùy ý, lọc giá/thương hiệu, giỏ hàng, đăng nhập, cơ sở dữ liệu hay thanh toán. Nút thao tác trên thẻ mở thông tin thực tế, không giả lập mua hàng thành công.

## 4. Công nghệ

HTML5, CSS3 (Grid, media query, `:has()`), SVG. Không JavaScript, framework, font ngoài hoặc thư viện chạy trên trang. Cần trình duyệt hiện đại hỗ trợ CSS `:has()`; đã kiểm tra bằng Chromium 154.

`products.json` là bảng dữ liệu đối chiếu giá, không được tải để dựng trang. Khi sửa giá cần cập nhật cả HTML và bảng dữ liệu.

## 5. Cách chạy

Tải mã nguồn rồi mở `index.html` bằng trình duyệt hiện đại. Cách đã được kiểm tra trong môi trường đám mây: mở Terminal tại thư mục dự án và chạy:

```bash
python3 -m http.server 8877 --bind 127.0.0.1
```

Sau đó mở địa chỉ máy chủ cục bộ trên chính máy đang chạy Python. Không cần `npm install`, build, tài khoản hay API key. Mở trực tiếp file trên máy cá nhân là cách dùng thông thường; lượt kiểm tra tự động trong môi trường này sử dụng HTTP.

## 6. Cải tiến đã thực hiện

Khảo sát Lazada cho thấy nhiều nhóm bộ lọc trong thanh bên. Với bộ dữ liệu bốn sản phẩm của bài tập, chọn bộ lọc nhóm gọn ở phía trên, có lựa chọn đang dùng và thao tác đặt lại. Đây là thử nghiệm thiết kế cho phạm vi nhỏ; chưa có nghiên cứu người dùng để khẳng định tốt hơn Lazada.

Sau lần chạy đầu, đổi “Thiết bị nhập” thành “Chuột & bàn phím”; chuyển bộ lọc sang một cột khi màn hình ≤380 px để nhãn đầy đủ có đủ chỗ. Xem [nhật ký thay đổi](evidence/iteration-log.json), [ảnh trước](evidence/filter-before.png), [ảnh sau](evidence/filter-after.png).

## 7. Hỗ trợ từ AI

Trợ lý OpenAI ChatGPT/Codex hỗ trợ khảo sát, đối chiếu, đề xuất, viết mã, minh họa SVG, kiểm tra và tài liệu trong phiên ngày 20/10/2026. [AI_USAGE.md](AI_USAGE.md) phân biệt yêu cầu thật với khung prompt triển khai. Không ghi thay rằng sinh viên đã tự chạy hoặc tự sửa.

Theo đề bài, sinh viên cần hoàn tất [TU_KIEM_TRA.md](TU_KIEM_TRA.md) bằng trải nghiệm của chính mình trước khi nộp. [GIAI_THICH_MA_NGUON.md](GIAI_THICH_MA_NGUON.md) hỗ trợ đọc và giải thích mã.

## 8. Kết quả và công khai

- [TEST_RESULTS.md](TEST_RESULTS.md): 6 kích thước, 18 tình huống lọc, đặt lại, bàn phím, giá và tiếp cận.
- Mã nguồn: https://github.com/phong26052006-design/BT_canhanPTUDTMDT
- Website: https://phong26052006-design.github.io/BT_canhanPTUDTMDT/
- Trạng thái triển khai được ghi tại [GITHUB_PUBLISH.md](GITHUB_PUBLISH.md).

## 9. Cấu trúc

```text
index.html                 Trang giao diện
style.css                  Toàn bộ trình bày và lọc bằng CSS
products.json              Dữ liệu giá để đối chiếu
images/                    4 hình sản phẩm và favicon tự tạo
evidence/                  Ảnh trước–sau, log kiểm tra
  khao-sat/                5 ảnh website tham khảo, nguồn và giới hạn
AI_USAGE.md                Nhật ký AI
GIAI_THICH_MA_NGUON.md      Giải thích HTML/CSS
TEST_RESULTS.md            Kết quả đã chạy
TU_KIEM_TRA.md             Phần sinh viên tự thực hiện
GITHUB_PUBLISH.md          Thông tin công khai
```

Lịch sử Git giữ bản DevShelf ngày 18/10/2026. Bản ngày 20/10 chuyển sang Lazada/Phong Select, có bằng chứng khảo sát thực tế mới. Các báo cáo riêng được gửi trong gói bài nộp, không công khai MSSV trên giao diện.
