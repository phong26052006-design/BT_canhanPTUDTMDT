using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using MvcMoviePhong.Data;
using MvcMoviePhong.Models;
using MvcMoviePhong.Services;
using MvcMoviePhong.Extension;
using System.Security.Claims;
using System.Net;
namespace MvcMoviePhong.Controllers;

public class MoviesController(ApplicationDbContext db, ImageStorage images, CartService cart, EmailServiceNew mail, ILogger<MoviesController> logger) : Controller
{
    public async Task<IActionResult> Index(string q, int? genre)
    {
        var query = db.Movies.Include(m => m.GenreObj).AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(m => m.Title.Contains(q));
        if (genre.HasValue)
            query = query.Where(m => m.GenreID == genre);
        ViewBag.Genres = await db.Genres.OrderBy(g => g.Name).ToListAsync();
        ViewBag.Query = q;
        ViewBag.Genre = genre;
        ViewBag.TotalMovies = await db.Movies.CountAsync();
        ViewBag.TotalGenres = await db.Genres.CountAsync();
        return View(await query.OrderBy(m => m.ID).ToListAsync());
    }
    public async Task<IActionResult> Details(int id)
    {
        var m = await db.Movies.Include(m => m.GenreObj).AsNoTracking().SingleOrDefaultAsync(m => m.ID == id);
        return m == null ? NotFound() : View(m);
    }
    [Authorize(Roles = "Admin")] public async Task<IActionResult> Manage() => View(await db.Movies.Include(m => m.GenreObj).AsNoTracking().OrderBy(m => m.ID).ToListAsync());
    async Task Genres(int? id = null) => ViewBag.GenreID = new SelectList(await db.Genres.OrderBy(g => g.Name).ToListAsync(), "ID", "Name", id);
    async Task ValidateGenre(Movie m)
    {
        if (!await db.Genres.AnyAsync(g => g.ID == m.GenreID))
            ModelState.AddModelError("GenreID", "Vui lòng chọn thể loại đang tồn tại.");
    }
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create()
    {
        await Genres();
        return View(new Movie { ReleaseDate = BusinessDate.Today.AddDays(7), Rated = 4, Price = 59000 });
    }
    [HttpPost, Authorize(Roles = "Admin"), RequestSizeLimit(3 * 1024 * 1024)]
    public async Task<IActionResult> Create([Bind("Title,Summary,ReleaseDate,GenreID,Price,Rated,PictureUpload")] Movie movie)
    {
        await ValidateGenre(movie);
        if (ModelState.IsValid)
        {
            try
            {
                movie.PicturePath = await images.SaveAsync(movie.PictureUpload) ?? ImageStorage.Default;
            }
            catch (Exception e) when (e is ArgumentException or EndOfStreamException) { ModelState.AddModelError("PictureUpload", e is EndOfStreamException ? "Tệp ảnh không hợp lệ." : e.Message); }
            if (ModelState.IsValid)
            {
                db.Movies.Add(movie);
                await db.SaveChangesAsync();
                TempData["Success"] = "Đã thêm phim mới.";
                return RedirectToAction(nameof(Manage));
            }
        }
        await Genres(movie.GenreID);
        return View(movie);
    }
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Edit(int id)
    {
        var m = await db.Movies.FindAsync(id);
        if (m == null)
            return NotFound();
        await Genres(m.GenreID);
        return View(m);
    }
    [HttpPost, Authorize(Roles = "Admin"), RequestSizeLimit(3 * 1024 * 1024)]
    public async Task<IActionResult> Edit(int id, [Bind("ID,Title,Summary,ReleaseDate,GenreID,Price,Rated,PictureUpload")] Movie input)
    {
        if (id != input.ID)
            return BadRequest();
        var movie = await db.Movies.FindAsync(id);
        if (movie == null)
            return NotFound();
        await ValidateGenre(input);
        if (ModelState.IsValid)
        {
            string uploaded = null;
            try
            {
                uploaded = await images.SaveAsync(input.PictureUpload);
            }
            catch (Exception e) when (e is ArgumentException or EndOfStreamException) { ModelState.AddModelError("PictureUpload", e is EndOfStreamException ? "Tệp ảnh không hợp lệ." : e.Message); }
            if (ModelState.IsValid)
            {
                var old = movie.PicturePath;
                movie.Title = input.Title;
                movie.Summary = input.Summary;
                movie.ReleaseDate = input.ReleaseDate;
                movie.GenreID = input.GenreID;
                movie.Price = input.Price;
                movie.Rated = input.Rated;
                if (uploaded != null)
                    movie.PicturePath = uploaded;
                await db.SaveChangesAsync();
                if (uploaded != null)
                    images.Delete(old);
                TempData["Success"] = "Đã lưu thay đổi.";
                return RedirectToAction(nameof(Manage));
            }
        }
        input.PicturePath = movie.PicturePath;
        await Genres(input.GenreID);
        return View(input);
    }
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var m = await db.Movies.Include(m => m.GenreObj).SingleOrDefaultAsync(m => m.ID == id);
        return m == null ? NotFound() : View(m);
    }
    [HttpPost, ActionName("Delete"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var m = await db.Movies.FindAsync(id);
        if (m == null)
            return NotFound();
        if (await db.ChiTietHoaDons.AnyAsync(d => d.MaMovie == id))
        {
            TempData["Error"] = "Phim đã có trong đơn hàng, không thể xóa để bảo toàn lịch sử.";
            return RedirectToAction(nameof(Manage));
        }
        db.Movies.Remove(m);
        try
        {
            await db.SaveChangesAsync();
            images.Delete(m.PicturePath);
            TempData["Success"] = "Đã xóa phim.";
        }
        catch (DbUpdateException) { TempData["Error"] = "Phim đang được sử dụng, không thể xóa."; }
        return RedirectToAction(nameof(Manage));
    }
    public async Task<IActionResult> Cart() => View("AddToCart", await cart.GetAsync(HttpContext.Session));
    [HttpGet] public IActionResult AddToCart() => RedirectToAction(nameof(Cart));
    [HttpPost]
    public async Task<IActionResult> AddToCart(int id)
    {
        if (!await db.Movies.AnyAsync(m => m.ID == id))
            return NotFound();
        var items = cart.Read(HttpContext.Session);
        var item = items.FirstOrDefault(i => i.MovieId == id);
        if (item == null)
            items.Add(new()
            {
                MovieId = id,
                Quantity = 1
            });
        else if (item.Quantity < 99)
            item.Quantity++;
        else
            TempData["Error"] = "Tối đa 99 bản mỗi phim.";
        cart.Save(HttpContext.Session, items);
        return RedirectToAction(nameof(Cart));
    }
    [HttpPost]
    public IActionResult UpdateCart(int id, int quantity)
    {
        if (quantity < 1 || quantity > 99 || !ModelState.IsValid)
        {
            TempData["Error"] = "Số lượng phải là số nguyên từ 1 đến 99.";
            return RedirectToAction(nameof(Cart));
        }
        var items = cart.Read(HttpContext.Session);
        var item = items.FirstOrDefault(i => i.MovieId == id);
        if (item == null)
            return NotFound();
        item.Quantity = quantity;
        cart.Save(HttpContext.Session, items);
        return RedirectToAction(nameof(Cart));
    }
    [HttpPost]
    public IActionResult RemoveFromCart(int maMovies)
    {
        var items = cart.Read(HttpContext.Session);
        items.RemoveAll(i => i.MovieId == maMovies);
        cart.Save(HttpContext.Session, items);
        return RedirectToAction(nameof(Cart));
    }
    [HttpGet]
    public async Task<IActionResult> Checkout()
    {
        var basket = await cart.GetAsync(HttpContext.Session);
        if (basket.Count == 0)
        {
            TempData["Error"] = "Giỏ hàng đang trống.";
            return RedirectToAction(nameof(Cart));
        }
        var token = HttpContext.Session.GetString("CheckoutToken");
        if (token == null)
        {
            token = Guid.NewGuid().ToString("N");
            HttpContext.Session.SetString("CheckoutToken", token);
        }
        return View(new CheckoutViewModel { Token = token, Cart = basket });
    }
    [HttpPost]
    public async Task<IActionResult> Checkout(CheckoutViewModel input)
    {
        var session = HttpContext.Session;
        var current = session.GetString("CheckoutToken");
        var completed = session.GetString("CompletedToken");
        if (input.Token != null && input.Token == completed)
            return RedirectToAction(nameof(CheckoutCompleted), new
            {
                token = input.Token
            });
        if (input.Token == null || input.Token != current)
            return BadRequest("Phiên Checkout đã hết hạn. Vui lòng mở lại biểu mẫu.");
        input.Cart = await cart.GetAsync(session);
        if (input.Cart.Count == 0)
        {
            TempData["Error"] = "Giỏ hàng đang trống.";
            return RedirectToAction(nameof(Cart));
        }
        if (!ModelState.IsValid)
            return View(input);
        // Re-read prices on server; transaction commits order, lines and address together.
        var shipping = new ShippingDetail { Name = input.Shipping.Name, Address = input.Shipping.Address, Email = input.Shipping.Email, Mobile = input.Shipping.Mobile, ReleaseDate = input.Shipping.ReleaseDate };
        var order = new HoaDon { CheckoutToken = input.Token, NgayLap = DateTime.UtcNow, MaKhachHang = User.FindFirstValue(ClaimTypes.NameIdentifier), ShippingDetail = shipping };
        foreach (var line in input.Cart.Lines)
            order.ChiTietHoaDons.Add(new()
            {
                MaMovie = line.Movie.ID,
                SoLuong = line.Quantity,
                DonGia = line.Movie.Price,
                TenMovie = line.Movie.Title
            });
        order.TongTien = order.ChiTietHoaDons.Sum(x => x.SoLuong * x.DonGia);
        using (var transaction = await db.Database.BeginTransactionAsync())
        {
            db.HoaDons.Add(order);
            try
            {
                await db.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sql && sql.Number is 2601 or 2627)
            {
                await transaction.RollbackAsync();
                db.ChangeTracker.Clear();
                var existing = await db.HoaDons.AsNoTracking().SingleOrDefaultAsync(o => o.CheckoutToken == input.Token);
                if (existing == null)
                    throw;
                session.SetString("CompletedToken", input.Token);
                session.Remove("HoaDon");
                session.Remove("CheckoutToken");
                return RedirectToAction(nameof(CheckoutCompleted), new
                {
                    token = input.Token
                });
            }
        }
        session.SetString("CompletedToken", input.Token);
        session.Remove("HoaDon");
        session.Remove("CheckoutToken");
        try
        {
            var lines = string.Join("", order.ChiTietHoaDons.Select(d => $"<li>{WebUtility.HtmlEncode(d.TenMovie)} × {d.SoLuong}: {(d.DonGia * d.SoLuong):N0} VND</li>"));
            await mail.SendEmailAsync(input.Shipping.Email, $"Phong Cinema xác nhận đơn PC{order.MaHoaDon:000000}", $"<h2>Đơn hàng đã được ghi nhận</h2><p>Xin chào {WebUtility.HtmlEncode(input.Shipping.Name)}.</p><ul>{lines}</ul><p>Tổng: {order.TongTien:N0} VND</p><p>Địa chỉ: {WebUtility.HtmlEncode(input.Shipping.Address)}</p><p>Đây là bài thực hành, không thu tiền thật.</p>");
            order.EmailSent = !mail.IsPickup;
            await db.SaveChangesAsync();
            TempData["EmailStatus"] = mail.IsPickup ? "Thư xác nhận được ghi vào thư mục thử nghiệm local, chưa gửi đến hộp thư thật." : "Đã gửi thư xác nhận qua SMTP.";
        }
        catch (Exception ex) { logger.LogWarning(ex, "Không gửi được email đơn {OrderId}", order.MaHoaDon); TempData["EmailStatus"] = "Đơn đã lưu. Email chưa gửi được; vui lòng liên hệ cửa hàng bằng mã đơn."; }
        return RedirectToAction(nameof(CheckoutCompleted), new
        {
            token = input.Token
        });
    }
    public async Task<IActionResult> CheckoutCompleted(string token)
    {
        if (token == null || token != HttpContext.Session.GetString("CompletedToken"))
            return NotFound();
        var order = await db.HoaDons.Include(o => o.ChiTietHoaDons).Include(o => o.ShippingDetail).AsNoTracking().SingleOrDefaultAsync(o => o.CheckoutToken == token);
        return order == null ? NotFound() : View(order);
    }
}
