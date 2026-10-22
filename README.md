# E-commerce UI Improvement — Phong Select

**Trương Thanh Phong · EE0002 · Buổi 2: HTML5 & CSS3 · 22/10/2026**

## 1. Giới thiệu

Bài Buổi 2 tiếp tục **cùng website và repository Buổi 1**, tập trung danh sách/thẻ của bốn phụ kiện góc làm việc. Giữ thương hiệu, dữ liệu, SVG và bộ lọc; cải thiện cấu trúc danh sách, tổ chức CSS, Box Model, Flexbox và phản hồi hover/focus.

[Hồ sơ Buổi 2](docs/buoi2/README.md) · [Câu hỏi kiến thức](docs/buoi2/CAU_HOI_KIEN_THUC.md) · [Luyện sửa trực tiếp](docs/buoi2/SUA_MA_TRUC_TIEP.md)

## 2. Website tham khảo và phạm vi

- Lazada Việt Nam: https://www.lazada.vn/
- Năm khu vực khảo sát Buổi 1: trang chủ, danh mục, chi tiết, tìm kiếm và giỏ hàng. [Nguồn và giới hạn](evidence/khao-sat/README.md).
- Buổi 2 tiếp tục khu vực **danh sách và thẻ sản phẩm**, kiểm tra menu/bộ lọc để tránh mất chức năng cũ. Không khảo sát lại Lazada để thay thế bằng chứng ngày 20/10.
- Thiết kế và SVG của Phong Select độc lập; sản phẩm/giá/thông số là giả định, không dùng ảnh sản phẩm hoặc mã nguồn Lazada.

## 3. Chức năng hiện có

- Bốn sản phẩm có ảnh, tên, giá trước/sau ưu đãi, mức giảm, tiền tiết kiệm và thao tác Xem thông tin.
- Lọc Tất cả/Chuột & bàn phím/Âm thanh/Phụ kiện: kết quả 4/2/1/1; Đặt lại về 4. CSS ẩn cả li để không giữ ô rỗng.
- Details/summary mở/đóng bằng chuột hoặc Enter. Nút xem thông tin có hành vi thật.
- Lưới 4/2/1 cột, không tràn ngang trong bảy độ rộng đã thử 320–1440 px.
- Menu liên kết vị trí trong trang, hover đổi màu, focus-visible có viền, tôn trọng giảm chuyển động.

Chưa có tìm từ khóa tùy ý, lọc kết hợp, tài khoản, giỏ hàng, backend hoặc thanh toán. products.json chỉ đối chiếu, không tự đổ dữ liệu/tính giá ra trang. Không có JavaScript ứng dụng, framework CSS, font hoặc CDN ngoài.

## 4. Kỹ thuật thực hành Buổi 2

| Nội dung | Áp dụng |
|---|---|
| HTML5 ngữ nghĩa | Giữ header/nav/main/section/article/footer; danh sách ul/li cho sản phẩm/menu, một h1, h2/h3 hợp lý, ảnh có alt. |
| CSS ngoài | HTML link css/style.css; root style.css là @import tương thích đường dẫn cũ. |
| Selector | body/img; .product-card; .product-card .product-title/.product-toggle. |
| Box Model | Viền 1 px, radius 18 px, padding nội dung 24/20 px, margin mô tả 20 px, border-box, gap lưới 24 px. |
| Flexbox | Menu; cột trong thẻ; hai span trong thao tác với space-between, align-items:center, gap:12px. |
| Grid | Đã thử hai/ba cột; cuối giữ bốn/hai/một; ảnh contain tỷ lệ 4/3. |
| Hover/focus | Transition màu 180 ms, viền focus 3 px, chiều cao thao tác 48 px không nhảy bố cục. |

## 5. Cách chạy

Mở index.html bằng Chrome/Edge hiện đại có CSS :has(). Cách đã dùng kiểm thử trong môi trường: mở Terminal tại thư mục dự án, chạy:

```bash
python3 -m http.server 8892 --bind 127.0.0.1
```

Sau đó mở máy chủ cục bộ trên chính máy đó. Không cần npm install, build hoặc API key. Công cụ kiểm tra Python ở tools/ là tùy chọn, không cần để xem website; xem [tools/README.md](tools/README.md).

## 6. Thay đổi và bằng chứng

Ba vấn đề/cơ hội được ghi nhận: min-height cuối CSS ghi đè media làm dư khoảng trống; tập sản phẩm/menu chưa biểu diễn bằng ul/li; nền summary chưa có transition. [Bảng rà soát và quyết định](docs/buoi2/RA_SOAT_VA_THAY_DOI.md).

- [Trước tại 768 px](evidence/buoi2/before/card-768.png) / [sau tại 768 px](evidence/buoi2/after/card-768.png).
- [Giao diện cuối](evidence/buoi2/after/catalog-1366.png), [điện thoại](evidence/buoi2/after/catalog-390.png).
- [Hover](evidence/buoi2/after/state-hover.png) / [focus](evidence/buoi2/after/state-focus.png).
- [Thử Grid hai cột](evidence/buoi2/after/grid-2-columns.png) / [ba cột](evidence/buoi2/after/grid-3-columns.png).

Các ảnh thí nghiệm được ghi riêng, không nhầm là cấu hình cuối. CSS đã thay min-height cứng bằng bố cục flex và cập nhật selector lọc theo cấu trúc li.

## 7. AI và kiểm tra

Trợ lý OpenAI ChatGPT/Codex hỗ trợ phân tích, sửa mã, kiểm tra và tài liệu. [Nhật ký chín khung prompt Buổi 2](docs/buoi2/AI_USAGE.md) phân biệt yêu cầu thật với khung triển khai của đề; không giả lập tin nhắn hoặc ảnh hội thoại của sinh viên.

[Kết quả kiểm thử](docs/buoi2/KIEM_THU.md): bảy độ rộng, 21 tình huống lọc, bảy lần đặt lại, bàn phím, CSS/ảnh/liên kết, Flexbox/Grid và năm tình huống sửa trực tiếp. HTML parser không báo lỗi phân tích. Axe có 31 quy tắc đạt, 0 vi phạm phát hiện, 1 quy tắc chưa kết luận tự động; bốn ký hiệu tiền tệ đã đối chiếu màu bổ sung. Không coi đây là chứng nhận WCAG đầy đủ.

Sinh viên cần tự chạy và tự sửa một điểm theo đề, ghi kết quả thật trong [TU_KIEM_TRA.md](TU_KIEM_TRA.md), hiểu và giải thích mã. Không ghi thay hoạt động cá nhân.

## 8. GitHub và bài Buổi 1

- Repository: https://github.com/phong26052006-design/BT_canhanPTUDTMDT
- Trạng thái công khai/Pages: [GITHUB_PUBLISH.md](GITHUB_PUBLISH.md). Không tự nhận Pages đã hoạt động.
- [Báo cáo Word Buổi 2](bao-cao/BaiTap_Buoi2_TruongThanhPhong_31241024967.docx).
- [Báo cáo Word Buổi 1](bao-cao/BaiTap_Buoi1_TruongThanhPhong_31241024967_HoanThien.docx).
- [Mã và tài liệu Buổi 1 tại commit dbb6bc2](https://github.com/phong26052006-design/BT_canhanPTUDTMDT/tree/dbb6bc2).

## 9. Cấu trúc hiện tại

```text
index.html                  Trang tiếp tục từ Buổi 1
css/style.css               CSS chính của Buổi 2
style.css                   Tương thích đường dẫn CSS cũ
images/                     SVG kế thừa tự tạo
products.json               Dữ liệu giá đối chiếu
docs/buoi2/                 Các bước, câu hỏi, sửa trực tiếp, AI, kiểm thử
evidence/buoi2/before/      Ảnh và đo hiện trạng
evidence/buoi2/after/       Ảnh sau, thí nghiệm và log
bao-cao/                    Báo cáo Word
tools/                      Công cụ kiểm tra tùy chọn
```

Liên kết sản phẩm **Xem hình lớn** trong phần thông tin mở rộng trỏ tới đúng SVG của từng hàng và mở tab mới; class `.product-card .product-image-link` minh họa định dạng thẻ a thành thao tác đơn giản. Không tạo trang chi tiết giả hoặc liên kết mua hàng chưa có chức năng.

## Rà soát cuối ngày 22/10/2026

Đã đính chính cách giải thích width:auto/border-box, chuẩn hóa trình bày và kiểm tra bổ sung 14 chiều rộng ở trạng thái đóng/mở. Bộ cơ sở 21 trường hợp lọc được chạy lại; xem [kết quả rà soát cuối](docs/buoi2/RA_SOAT_CUOI.md).
