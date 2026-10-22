# Buổi 2 — Trả lời câu hỏi kiến thức

Trương Thanh Phong · EE0002 · 22/10/2026.

Các câu trả lời dựa trên **mã Phong Select hiện tại**, có AI hỗ trợ soạn và kiểm chứng. Sinh viên cần đọc mã, chạy và giải thích bằng cách hiểu của mình. Trong bảng sản phẩm cần nộp, đề dẫn “bảy câu hỏi ở phần 5”; bảy câu hỏi thực tế nằm ở **mục 12**, trang 21 của PDF. Bài trả lời đầy đủ đúng bảy câu đó, đồng thời trả lời câu hỏi tự kiểm tra ở các bước HTML và Flexbox.

## A. Bảy câu hỏi chính — mục 12 của đề

### Câu 1. Các phần tử HTML5 đã sử dụng và lý do lựa chọn

- `header`: chứa thương hiệu và điều hướng đầu trang.
- `nav`: xác định khu vực liên kết điều hướng chính, có `aria-label`.
- `main`: vùng nội dung chính; liên kết bỏ qua đầu trang trỏ tới vùng này.
- `section`: nhóm nội dung giới thiệu, sản phẩm, cải tiến và thông tin bài; mỗi nhóm có tiêu đề.
- `article.product-card`: một sản phẩm có nội dung tương đối độc lập: ảnh, tên, giá, mô tả và thao tác.
- `footer`: thông tin cuối trang và liên kết về đầu trang.
- `h1/h2/h3`: lần lượt là tiêu đề trang, khu vực và từng sản phẩm; chỉ có một h1 và không nhảy cấp trong lượt kiểm tra.
- `ul > li`: biểu diễn tập sản phẩm và các mục menu; bên trong mỗi li sản phẩm vẫn có article. Các đặc điểm trong phần thông tin mở rộng cũng là danh sách ul/li. Danh sách ol ở khu vực giới thiệu thể hiện ba ý có thứ tự.
- `img` có `alt`: hình sản phẩm và mô tả thay thế; các hình giữ chiều rộng/cao gốc 640 × 480.
- `a`: điều hướng tới vị trí có thật như `#san-pham`, `#cai-tien`, `#thong-tin`, không dùng href giả để mô phỏng mua hàng. Trong thông tin sản phẩm còn có a.product-image-link mở đúng hình SVG lớn của mặt hàng.
- `details/summary`: thao tác mở/đóng thông tin có hành vi gốc, dùng được bằng Enter.
- `form/fieldset/legend/label/input` và `button type=reset`: nhóm lọc có tên và lựa chọn, đặt lại được.

Ví dụ rút gọn từ cấu trúc thật:

```html
<ul id="product-grid" class="product-grid" role="list">
  <li class="product-item" data-category="input">
    <article class="product-card" aria-labelledby="ten-keyboard">
      <!-- Ảnh, h3, giá và details/summary của sản phẩm -->
    </article>
  </li>
</ul>
```

Không thêm header, nav hoặc section vào mọi thẻ chỉ để tăng số phần tử. Phần chỉ phục vụ bố cục như `.product-content` vẫn dùng div.

### Câu 2. Margin và padding; ví dụ từ thẻ sản phẩm

**Padding** tạo khoảng trống phía trong viền của hộp. `.product-content { padding:24px; }` chừa chỗ quanh nội dung; ở màn hình ≤580 px là 20 px. Padding đặt trên vùng nội dung con để ảnh vẫn sát phần viền trên của article.

**Margin** tạo khoảng cách phía ngoài viền của phần tử. `.product-description { margin-bottom:20px; }` tạo khoảng cách sau mô tả; `.price-block { margin-bottom:18px; }` tạo khoảng cách tới thao tác. `.product-card` đặt margin:0; khoảng cách giữa các thẻ do Grid gap:24px quản lý, tránh cộng dồn khoảng cách.

**Border** là viền: article có border:1px solid và border-radius:18px. **border-box** làm width bao gồm padding và border của chính hộp đó, tránh tăng chiều rộng ngoài dự tính.

Tại 1366 px, đo thực tế: article rộng 302 px; hai viền chiếm 2 px; vùng `.product-content` rộng ngoài 300 px; trừ padding 24 × 2 còn **252 px** cho nội dung. Không nói article có padding 24 px: padding nằm ở phần tử con `.product-content`.

### Câu 3. Flexbox dùng ở đâu; justify-content và align-items

Flexbox dùng ở `.header-content`, `.main-nav-list`, `.product-card`, `.product-content`, `.price` và thao tác `.product-toggle`.

Ví dụ tập trung của Buổi 2:

```css
.product-card .product-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
```

Phần tử cha summary chứa hai span: nhãn và ký hiệu +. Với hướng mặc định row, `justify-content` sắp xếp theo trục ngang; `align-items:center` căn theo trục dọc. `space-between` đẩy hai mục về hai đầu vùng nội dung. `gap:12px` là khoảng cách bố trí tối thiểu giữa chúng; khoảng cách nhìn thấy có thể lớn hơn do phần trống được space-between phân phối.

Đã thử `flex-start`, `center`, `space-between`: hai trường hợp đầu có khoảng cách giữa hai mục là 12 px; trường hợp cuối khoảng 129,73 px tại chiều rộng đo 1366 px. Thử nghiệm chỉ đổi style trong trình duyệt, không lưu ba cấu hình cạnh tranh vào CSS cuối.

Trong `.product-content`, hướng flex là column; `margin-top:auto` ở `.price-block` nhận phần trống còn lại để căn khối giá, thay cách đặt min-height cố định cho nhiều đoạn.

### Câu 4. CSS Grid khác Flexbox; lý do chọn Grid

Flexbox tổ chức theo một trục chính, phù hợp menu, nhãn/biểu tượng hoặc nội dung dọc trong thẻ. Grid thiết lập đồng thời cấu trúc hàng/cột, phù hợp các thẻ cần nằm theo những cột thống nhất. Flexbox có thể xuống dòng, nhưng các dòng không tự dùng chung hệ cột như Grid.

`.product-grid` dùng `display:grid`, `grid-template-columns:repeat(4,minmax(0,1fr))`, `gap:24px`. Khi ≤1100 px chuyển hai cột; ≤580 px chuyển một cột. Đã thử hai và ba cột riêng; cấu hình cuối giữ 4/2/1 phù hợp bốn sản phẩm kế thừa từ Buổi 1.

`repeat()` lặp định nghĩa cột; `1fr` chia đều phần không gian còn lại; `minmax(0,1fr)` cho cột co lại trong vùng chứa. Gap tạo rãnh giữa hàng/cột.

### Câu 5. Nếu xóa display:grid

Trong cấu trúc thật, ul sẽ trở về bố cục block thông thường nếu không còn quy tắc đặt display:grid. Các li sản phẩm vốn là hộp flex dạng block sẽ xếp dọc, không còn chia thành các cột bằng nhau. `grid-template-columns` không còn tạo lưới; gap cũng không tạo các rãnh Grid như trước.

Đã thử bằng cách tạm đổi display:block trên chính ul. Hai mục đầu có cùng tọa độ trái và mục thứ hai nằm phía dưới mục thứ nhất. Đây là quan sát trong trình duyệt, không phải cấu hình cuối được lưu.

### Câu 6. Vì sao ảnh cần alt

Alt mô tả ý nghĩa của hình cho người không nhìn thấy ảnh, trình đọc màn hình hoặc khi ảnh không tải. Trong bài, alt đầu tiên là “Minh họa bàn phím cơ K75 nhỏ gọn, phím màu kem và điểm nhấn xanh”. Mô tả khớp hình SVG, không lấy tên tệp hoặc nhồi từ khóa.

Alt không thay thế việc kiểm tra đường dẫn src. Hình thuần trang trí có thể dùng alt rỗng phù hợp, nhưng bốn hình sản phẩm mang thông tin nên dùng mô tả có nội dung. SVG biểu tượng trang trí trong nút được ẩn khỏi công nghệ hỗ trợ bằng aria-hidden.

### Câu 7. Một đề xuất AI đã kiểm tra hoặc điều chỉnh

Đề xuất cụ thể là chuyển danh sách từ div chứa trực tiếp article thành **ul > li > article** để thể hiện tập sản phẩm. Khi áp dụng, selector lọc phải chọn `.product-item` trên li thay vì chỉ ẩn `.product-card` bên trong: nếu chỉ ẩn article, một li rỗng vẫn có thể chiếm ô Grid.

Mã cuối đã chuyển data-category và điều kiện lọc sang li, sau đó kiểm tra **21 tình huống lọc trên bảy chiều rộng**; số mục hiển thị và thẻ cùng đúng 2/1/1. Đây là kiểm chứng do trợ lý thực hiện. Sinh viên có thể dùng ví dụ này sau khi tự đọc, thao tác và giải thích; không khai rằng đã tự thực hiện nếu chưa làm.

## B. Bốn câu tự kiểm tra HTML — bước 2

1. **Vì sao dùng nav?** Nó đặt tên ngữ nghĩa cho vùng điều hướng; trong bài là ba liên kết đầu trang. Không dùng nav cho mọi nhóm liên kết nhỏ trong thẻ.
2. **Article khác div?** Article thể hiện đơn vị nội dung tương đối độc lập; div là vùng chứa không mang ngữ nghĩa chuyên biệt. Sản phẩm dùng article, phần bố trí ảnh/nội dung dùng div.
3. **Vì sao cần alt?** Tham khảo câu 6: cung cấp mô tả thay thế đúng nội dung, không chỉ để hết cảnh báo công cụ.
4. **Khi nào dùng ul/li?** Khi nội dung là tập các mục không có thứ tự bắt buộc: sản phẩm, menu, đặc điểm. Khi trình tự có ý nghĩa có thể dùng ol/li như ba ý trong khu vực giới thiệu.

## C. Ba câu tự kiểm tra Flexbox — bước 5

1. **Display:flex đặt ở đâu?** Đặt trên phần tử cha có các phần tử con trực tiếp cần bố trí; ví dụ summary chứa hai span hoặc ul.main-nav-list chứa ba li.
2. **Space-between bố trí thế nào?** Mục đầu ở đầu vùng nội dung, mục cuối ở cuối; phần trống được chia giữa các mục. Không tự thêm khoảng trống ở hai mép như space-around.
3. **Gap khác margin?** Gap đặt trên cha, tạo khoảng cách giữa các mục, không tạo khoảng cách ngoài mép container. Margin đặt trên từng phần tử và còn có thể tạo khoảng cách phía ngoài; trong thẻ có margin của đoạn mô tả. Không cộng margin vào li chỉ để lặp lại gap đã có.

## D. Ghi chú object-fit của phần Grid

`object-fit:cover` lấp đầy khung nhưng có thể cắt ảnh nếu tỷ lệ khác khung. Bài giữ `contain` với tỷ lệ 4/3 để hiển thị trọn hình minh họa 640×480. Việc chọn contain có lý do theo tài sản thực tế, không chép cover trong ví dụ rồi để sản phẩm bị cắt.
