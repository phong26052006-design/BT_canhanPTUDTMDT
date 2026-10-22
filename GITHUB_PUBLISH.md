# Công khai mã nguồn và báo cáo

## Buổi 2 — xác minh ngày 22/10/2026

- Cùng repository Public: https://github.com/phong26052006-design/BT_canhanPTUDTMDT
- Nhánh mặc định/đích push: main. Nhánh làm việc trong môi trường là work; đã push HEAD lên main, không force push.
- Commit mã Buổi 2 hoàn thiện: `afdd5c8a42352d0ca484881719483fa0c93c7efa`; kế thừa bản Buổi 1 `dbb6bc2`.
- API cây tệp được kiểm tra sau push; HTML, css/style.css, hồ sơ và minh chứng Buổi 2 có trên GitHub.
- Báo cáo Word Buổi 2 được bổ sung vào bao-cao/; các cập nhật tài liệu tiếp theo giữ nguyên mã giao diện đã kiểm thử. Log công khai ở evidence/buoi2/publication.json.
- Bản Word được cập nhật sau [lượt rà soát cuối](docs/buoi2/RA_SOAT_CUOI.md): đính chính Box Model, chuẩn hóa trình bày và bổ sung bằng chứng kiểm tra; giữ cùng đường dẫn báo cáo.
- API đọc Pages ngày 22/10 trả 404; **chưa xác nhận có website Pages hoạt động**. Không coi repository Public là đã có website trực tiếp.

## Báo cáo

- [Word Buổi 2](bao-cao/BaiTap_Buoi2_TruongThanhPhong_31241024967.docx)
- [Word Buổi 1](bao-cao/BaiTap_Buoi1_TruongThanhPhong_31241024967_HoanThien.docx)

## GitHub Pages nếu cần triển khai

1. Mở repository → Settings → Pages.
2. Chọn Deploy from a branch.
3. Chọn main và / (root), Save.
4. Chờ thành công, mở URL GitHub cấp; kiểm tra CSS, ảnh, bộ lọc và liên kết ảnh.

HTML nằm ở gốc, có .nojekyll, tài nguyên dùng đường dẫn tương đối. URL dự kiến: https://phong26052006-design.github.io/BT_canhanPTUDTMDT/ — chưa coi là đang hoạt động khi chưa mở kiểm tra thành công.

## Lịch sử trạng thái

Ngày 20/10, thao tác tạo Pages qua API bị từ chối 403 “Resource not accessible by integration”; push mã vẫn thành công. Ngày 22/10 chỉ kiểm tra trạng thái đọc, không nhận rằng đã được cấp thêm quyền tạo Pages. Không cần gửi mật khẩu/token trong hội thoại để xem bài HTML/CSS.

Tài liệu: https://docs.github.com/en/pages
