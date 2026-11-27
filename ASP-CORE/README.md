# Phong Cinema ASP NET Core MVC

Bài cá nhân ASP.NET Core theo `BaiTap_CaNhan_ASP_CORE_LMS.pdf` (41 trang).

- Sinh viên: **Trương Thanh Phong — 31241024967**
- Lớp: **26C1INF50902702**
- Kho môn học: https://github.com/phong26052006-design/BT_canhanPTUDTMDT
- [Mã nguồn và báo cáo ASP-CORE](https://github.com/phong26052006-design/BT_canhanPTUDTMDT/tree/main/ASP-CORE)
- Local: http://localhost:5193
- Trạng thái Somee/GitHub: xem [STATUS.md](STATUS.md), cập nhật theo kết quả thực tế.

## Công nghệ và chức năng

.NET SDK 10.0.404, ASP.NET Core MVC/Identity 10.0.15, EF Core SQL Server 10.0.15,
Bootstrap 5, jQuery Validate, Session và Newtonsoft.Json. CSDL local là **SQL Server
2022 Express LocalDB**, không dùng SQLite thay cho SQL Server.

Ứng dụng có danh mục phim, tìm kiếm/lọc thể loại; CRUD phim/thể loại dành cho Admin;
upload ảnh và ảnh mặc định; giỏ hàng Session; cập nhật/xóa số lượng; Checkout lưu đơn,
chi tiết và thông tin giao hàng trong một transaction; xác nhận đơn và dịch vụ email.
Đăng ký mới tạo tài khoản khách hàng, cần xác nhận email; không tự cấp quyền Admin.

Đây là cửa hàng đĩa phim **mô phỏng**, không xử lý tiền hoặc thẻ thật. Nội dung và ảnh
bìa được tạo cho bài học. Seed ban đầu gồm 6 phim thuộc 3 thể loại, có thể thêm qua UI.

## Cấu trúc

```text
ASP-CORE/
  SourceCode/
    global.json                 Ghim SDK 10
    dotnet-tools.json           EF và scaffolding tools cục bộ
    MvcMovie_Core/31241024967_TruongThanhPhong/
      Areas/Identity/           Các trang tài khoản đã scaffold
      Controllers/              Movies, Genres, Orders
      Data/                     DbContext, SeedData, 4 migrations
      Models/                   Movie, Genre, HoaDon, ChiTietHoaDon, ShippingDetail
      Services/                 CartService, ImageStorage
      Extension/                SessionExtensions, EmailServiceNew
      ViewComponents/           Tóm tắt giỏ hàng
      Views/                    Razor views
      wwwroot/                  CSS, JS, poster và thư viện cục bộ
      Database-Verify.sql       Truy vấn kiểm tra SQL Server
  Report/BaiTap_CaNhan_ASP_CORE_LMS.docx
    images/                     Ảnh và biên bản kiểm chứng ngày 28/11/2026
  Run-Local.ps1
  Open-VSCode.ps1
```

## Chạy trên máy Windows

1. Cài **.NET 10 SDK**, VS Code, C# Dev Kit, extension mssql và SQL Server LocalDB.
   Local của LocalWP phục vụ WordPress/PHP; ứng dụng này chạy bằng `dotnet run`.
2. Tạo instance SQL local (trên máy Phong đã tạo sẵn):

```powershell
& 'C:\Program Files\Microsoft SQL Server\160\Tools\Binn\SqlLocalDB.exe' create PTUDTMDT_AspCore -s
```

3. Mở terminal trong `ASP-CORE/SourceCode/MvcMovie_Core/31241024967_TruongThanhPhong`.

```powershell
dotnet --version
dotnet tool restore
dotnet restore
dotnet ef database update
dotnet run --no-launch-profile -- --seed
dotnet run --launch-profile http
```

Trên máy hiện tại có SDK portable được kiểm tra SHA512 từ Microsoft tại
`work/asp-core-canhan-20261117/dotnet`. Chạy `ASP-CORE/Run-Local.ps1 -Seed` để script
tự chọn SDK này; trên máy khác hãy cài SDK chính thức. Không cần sao chép SDK vào GitHub.
`Open-VSCode.ps1` mở thư mục SourceCode với SDK portable trong PATH của tiến trình mới.

Local mặc định dùng HTTP Development. Nếu muốn HTTPS, tự chạy
`dotnet dev-certs https --trust`, xác nhận hộp thoại của hệ điều hành, rồi
`dotnet run --launch-profile https`. Chưa có ảnh xác nhận hộp thoại trust trong báo cáo.

## Tạo tài khoản quản trị

Seed chỉ tạo Admin khi có hai cấu hình sau. Đặt email và mật khẩu riêng của bạn bằng
user-secrets hoặc biến môi trường, chạy seed, rồi xóa giá trị bootstrap nếu không cần.
Không đưa mật khẩu vào source, README hay báo cáo công khai.

```powershell
dotnet user-secrets set 'BootstrapAdmin:Email' 'YOUR_ADMIN_EMAIL'
dotnet user-secrets set 'BootstrapAdmin:Password' 'YOUR_STRONG_LOCAL_PASSWORD'
dotnet run --no-launch-profile -- --seed
dotnet user-secrets remove 'BootstrapAdmin:Password'
dotnet user-secrets remove 'BootstrapAdmin:Email'
```

Tài khoản thử nghiệm hiện tại trên máy được lưu riêng trong thư mục work, ngoài mã
nguồn nộp bài. Không có mật khẩu Admin mặc định được đưa lên kho.

## Cấu hình SQL Server và email

`appsettings.json` chỉ chứa kết nối LocalDB bằng Windows Authentication. Với Somee,
đặt `ConnectionStrings:DefaultConnection` qua môi trường, user-secrets khi chạy CLI,
hoặc tệp cấu hình Production riêng trên hosting. Dùng `appsettings.example.json` làm
mẫu; không đưa tệp Production chứa mật khẩu vào GitHub. Chạy migrations lên đúng CSDL
Somee trước khi mở website. Đề yêu cầu `TrustServerCertificate=True`; cấu hình này là
chấp nhận chứng chỉ SQL của môi trường lab, không phải cấu hình TLS khuyến nghị chung.

Ở Development, `Email:Mode=Pickup` tạo `.eml` trong
`%LOCALAPPDATA%/PhongCinema/MailPickup`. Có thể mở thư xác nhận tài khoản và theo liên
kết. **Pickup không có nghĩa đã gửi email thật.** Không đưa các `.eml` lên kho.

SMTP thật dùng `Email:Mode=Smtp`, `From`, `Host`, `Port`, `EnableSsl`, `Username`,
`Password`. Gmail cần App Password do chủ tài khoản tự cấu hình; không dùng mật khẩu
Gmail thường. Nếu SMTP lỗi, đơn vẫn lưu và UI thông báo chưa gửi email. Tài khoản đăng
ký nhưng chưa nhận được thư có thể dùng chức năng gửi lại xác nhận khi SMTP hoạt động.
Chưa kiểm chứng gửi đến hộp thư Internet nếu STATUS.md không ghi kết quả thành công.

## Thiết kế dữ liệu và xử lý khác mã mẫu

- `Genre 1—n Movie`; chỉ dùng **GenreID** làm khóa ngoại, tránh hai giá trị Genre/GenreID
  mâu thuẫn. Kiểm tra thể loại tồn tại trên máy chủ.
- `HoaDon 1—n ChiTietHoaDon`; `HoaDon 1—1 ShippingDetail` qua FK có unique index.
- Chi tiết giữ **TenMovie, DonGia** tại thời điểm đặt. Tổng tiền tính lại từ giá SQL
  Server và số lượng hợp lệ; không nhận giá/tổng từ trình duyệt.
- Session chỉ chứa ID và số lượng, không serialize vòng navigation EF. Dữ liệu giỏ
  không trở thành hóa đơn trước Checkout. Timeout 100 phút; bản dùng bộ nhớ một instance,
  restart tiến trình sẽ mất giỏ và quyền mở receipt của khách. Đơn vẫn còn trong SQL.
- Mua/cập nhật/xóa/Checkout là POST có antiforgery; PRG sau khi ghi dữ liệu. Token theo
  Session và unique index CheckoutToken ngăn gửi lặp tạo nhiều đơn.
- Ngày hợp lệ là **từ hôm nay**, so sánh theo ngày ở UTC+7. Đây là cách làm rõ mã mẫu
  `>= DateTime.UtcNow` vốn làm ngày hôm nay lúc 00:00 bị loại. Cửa hàng mô phỏng bán
  trước các phim sắp phát hành để giữ đúng ràng buộc của đề.
- Giá nguyên VND, tối thiểu 5.000; xếp hạng 1–5. Form giá HTML dùng số nguyên, xếp hạng
  theo dấu phẩy vi-VN; validation phía client và server được đối chiếu.
- Upload tối đa 2 MB, whitelist đuôi ảnh và kiểm tra magic bytes, tên GUID; không tin
  PicturePath được gửi từ hidden field. Khi sửa, lấy ảnh cũ từ DB. Không nhận SVG/HTML.
  Kiểm tra chữ ký không thay thế hoàn toàn việc decode/quét ảnh trong hệ thống sản xuất.
- Chặn xóa thể loại có phim và phim đã xuất hiện trong đơn để bảo toàn liên kết/lịch sử.

## Publish lên Somee miễn phí

Gói tại https://somee.com/FreeAspNetHosting.aspx công bố hỗ trợ ASP.NET Core 10, 150 MB
web, 30 MB SQL và quảng cáo bắt buộc tại thời điểm kiểm tra. Không ẩn quảng cáo.
Điều kiện duy trì/inactivity xem trực tiếp trong tài khoản và điều khoản Somee.

```powershell
dotnet publish -c Release -r win-x86 --self-contained false -p:DeploymentBuild=true -o ./publish
```

RID win-x86 tương ứng với application pool 32 bit của website Somee đã cấp.
`DeploymentBuild=true` loại các package chỉ dùng khi scaffold và EF tooling.
Nén nội dung publish với web.config ở gốc khi triển khai thủ công. Trên Somee, đặt thông
tin kết nối riêng trong cấu hình IIS được bảo vệ. Bản framework dependent cần runtime
ASP.NET Core 10 trên hosting.

Ngày 28/11/2026 đã cấp website và CSDL Somee, áp dụng bốn migrations và seed danh mục.
Mục `STATUS.md` ghi riêng tình trạng tải ứng dụng và xác minh website. GitHub lưu mã
nguồn. Ứng dụng ASP.NET Core chạy trên máy local hoặc máy chủ IIS có runtime tương ứng.

## Nguồn

- Đề giảng viên: các trang 2–6 (môi trường/SQL/Identity), 7–19 (model/CRUD/upload),
  19–35 (giỏ/Checkout/email), 35–40 (hosting/GitHub/báo cáo/rubric).
- https://dotnet.microsoft.com/en-us/download/dotnet/10.0
- https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb
- https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-10.0
- https://github.com/advisories/GHSA-g4vj-cjjj-v7hg — các NuGet dependency của công cụ
  scaffold được nâng đến 6.12.5, không che cảnh báo bằng cách tắt audit.

Việc triển khai, kiểm thử và soạn báo cáo có hỗ trợ bằng công cụ AI. Các minh chứng
được lấy từ ứng dụng thật của bài, không dùng ảnh của người khác. Sinh viên cần đọc,
chạy lại và hiểu luồng xử lý trước khi nộp và trình bày.
