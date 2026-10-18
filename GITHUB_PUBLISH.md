# Công khai mã nguồn và GitHub Pages

## Repository

Repository dùng cho bài này:

https://github.com/phong26052006-design/BT_canhanPTUDTMDT

Trong lần kiểm tra trước khi đẩy mã, URL trả HTTP 200 và metadata repository_public=true. Kết quả push thực tế được ghi ở hồ sơ bàn giao; không chỉ dựa vào việc đã có thư mục Git trên máy.

## Đẩy mã từ bản sao trên máy cá nhân

Nếu repository đã có mã, clone/sync trước rồi mới sửa. Không khởi tạo một lịch sử không liên quan và không dùng force push để vượt xung đột.

~~~bash
git status
git add index.html style.css images README.md AI_USAGE.md GIAI_THICH_MA_NGUON.md TEST_RESULTS.md TU_KIEM_TRA.md GITHUB_PUBLISH.md .gitignore .nojekyll evidence
git commit -m "Improve responsive product cards and document verification"
git push
~~~

Các lệnh trên giả định đang làm việc trong repository đã clone và đã có tracking branch. Trường hợp clone chưa có tracking/nhánh, kiểm tra origin và branch trước khi đặt upstream.

Không ghi token vào URL, không commit credential và không chia sẻ token trong chat.

## Bật Pages bằng giao diện GitHub

1. Mở repository, vào Settings → Pages.
2. Chọn Deploy from a branch.
3. Chọn nhánh main, thư mục /(root).
4. Save và chờ GitHub triển khai.
5. Mở URL mà GitHub cung cấp; kiểm tra CSS, bốn hình và thao tác mở chi tiết.

URL theo quy ước có thể là:

https://phong26052006-design.github.io/BT_canhanPTUDTMDT/

Đây là URL dự kiến, chỉ được ghi nhận là đã hoạt động sau khi triển khai và kiểm tra thành công. Dự án dùng đường dẫn tương đối cho CSS/ảnh để phù hợp đường dẫn repository.

Pages trong bài này là bản mẫu giáo dục tĩnh, không vận hành dịch vụ bán hàng, thu thập tài khoản hay thanh toán.
