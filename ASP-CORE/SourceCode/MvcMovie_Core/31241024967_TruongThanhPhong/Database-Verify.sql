-- Run in VS Code mssql connected to this assignment database. Read-only queries.
SELECT @@VERSION AS SqlServerVersion, DB_NAME() AS DatabaseName;
SELECT MigrationId, ProductVersion FROM __EFMigrationsHistory ORDER BY MigrationId;
SELECT name AS TableName FROM sys.tables ORDER BY name;
SELECT m.ID,m.Title,g.Name AS Genre,m.Price,m.Rated,m.PicturePath
FROM Movies m JOIN Genres g ON m.GenreID=g.ID ORDER BY m.ID;
SELECT g.ID,g.Name,COUNT(m.ID) AS MovieCount FROM Genres g
LEFT JOIN Movies m ON m.GenreID=g.ID GROUP BY g.ID,g.Name ORDER BY g.ID;
SELECT o.MaHoaDon,o.NgayLap,o.TongTien,s.Name,s.Mobile,s.ReleaseDate,
       SUM(d.SoLuong*d.DonGia) AS DetailTotal
FROM HoaDons o JOIN ShippingDetails s ON s.MaHoaDon=o.MaHoaDon
JOIN ChiTietHoaDons d ON d.MaHoaDon=o.MaHoaDon
GROUP BY o.MaHoaDon,o.NgayLap,o.TongTien,s.Name,s.Mobile,s.ReleaseDate;
-- Do not publish PasswordHash, tokens, customer addresses or real emails.
SELECT COUNT(*) AS IdentityUsers, SUM(CASE WHEN EmailConfirmed=1 THEN 1 ELSE 0 END) AS ConfirmedUsers FROM AspNetUsers;
