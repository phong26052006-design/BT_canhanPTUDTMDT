# Minh chứng hai trò chơi CSS selector

Thực hiện ngày 11/11/2026 trên hai trang trò chơi gốc bằng giao diện trình duyệt.

- CSS Diner: 32/32 màn được game chấp nhận, 32 ảnh từng màn và 1 ảnh kết quả cuối.
- CSS Speedrun: phần Intro và 10/10 màn được game chấp nhận, 11 ảnh từng phần/màn và 1 ảnh kết quả cuối. Đồng hồ hiển thị 01:37:8; đây là thời gian thao tác của trợ lý, không dùng để khẳng định năng lực của sinh viên.
- Tổng 45 ảnh gốc chụp từ trình duyệt. Nhật ký CSV có 43 lượt vượt màn, selector và giải thích. JSON kiểm chứng có hash SHA-256 của từng ảnh.

Các thao tác do trợ lý AI thực hiện để bổ sung bài tập; sinh viên cần thực hành lại và hiểu selector. Không sửa tiến độ bằng localStorage, không dựng lại ảnh trò chơi.

Ảnh CSS Diner được chụp ngay sau khi game đánh dấu màn đã hoàn thành; tùy thời điểm chuyển cảnh, vùng nội dung có thể còn màn vừa giải hoặc đã sang màn tiếp theo. Dấu kiểm xanh trong menu là minh chứng màn đã qua. Trình duyệt tự dịch giao diện sang tiếng Việt; một số nhãn mã mẫu trong phần trợ giúp bị dịch, còn selector thực tế đã gửi được giữ chính xác trong nhật ký. CSS Speedrun chụp trước khi nhấn Enter để chuyển sang màn tiếp theo.

Lịch sử 05/11/2026: công cụ trình duyệt chưa hoạt động nên chưa chơi được. Trạng thái thiếu minh chứng đó đã được khắc phục trong phiên 11/11/2026, không dùng kết quả cũ để thay lần thực hiện mới.
