using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MvcMoviePhong.Models;
namespace MvcMoviePhong.Data;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        var db = services.GetRequiredService<ApplicationDbContext>();
        await db.Database.MigrateAsync();
        var config = services.GetRequiredService<IConfiguration>();
        var roles = services.GetRequiredService<RoleManager<IdentityRole>>();
        if (!await roles.RoleExistsAsync("Admin"))
            await roles.CreateAsync(new("Admin"));
        var users = services.GetRequiredService<UserManager<IdentityUser>>();
        var email = config["BootstrapAdmin:Email"];
        var pass = config["BootstrapAdmin:Password"];
        if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(pass))
        {
            var admin = await users.FindByEmailAsync(email);
            if (admin == null)
            {
                admin = new()
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true
                };
                var result = await users.CreateAsync(admin, pass);
                if (!result.Succeeded)
                    throw new InvalidOperationException(string.Join(";", result.Errors.Select(x => x.Description)));
            }
            if (!await users.IsInRoleAsync(admin, "Admin"))
                await users.AddToRoleAsync(admin, "Admin");
        }
        if (!await db.Genres.AnyAsync())
        {
            db.Genres.AddRange(new Genre { Name = "Phiêu lưu" }, new Genre { Name = "Hoạt hình" }, new Genre { Name = "Tâm lý" });
            await db.SaveChangesAsync();
        }
        if (!await db.Movies.AnyAsync())
        {
            var genres = await db.Genres.OrderBy(g => g.ID).ToListAsync();
            var titles = new[] { "Hành trình sao Bắc", "Khu vườn mây", "Những ngày bên biển", "Chuyến tàu bình minh", "Thành phố đom đóm", "Bức thư mùa hạ" };
            var texts = new[] { "Một nhóm bạn khám phá bầu trời phương Bắc và tìm lại hướng đi của riêng mình.", "Cuộc phiêu lưu đầy màu sắc của những cư dân nhỏ bé trong khu vườn trên mây.", "Câu chuyện gia đình về sự lắng nghe, trưởng thành và những chuyến trở về.", "Trên chuyến tàu sớm, hai người xa lạ cùng đi tìm câu trả lời cho tương lai.", "Một bạn nhỏ và người bạn đom đóm mang ánh sáng trở lại thành phố.", "Một lá thư chưa gửi kết nối những ký ức và mở ra khởi đầu mới." };
            var prices = new decimal[] { 89000, 69000, 79000, 99000, 59000, 85000 };
            for (int i = 0; i < 6; i++)
                db.Movies.Add(new Movie { Title = titles[i], Summary = texts[i], GenreID = genres[i % 3].ID, ReleaseDate = BusinessDate.Today.AddDays(10 + i * 7), Price = prices[i], Rated = 4 + (i % 3) * 0.3, PicturePath = $"/images/poster-{i + 1}.jpg" });
            await db.SaveChangesAsync();
        }
        Console.WriteLine($"SQL Server seed: {await db.Movies.CountAsync()} phim, {await db.Genres.CountAsync()} thể loại.");
    }
}
