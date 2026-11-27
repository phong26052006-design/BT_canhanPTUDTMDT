using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcMoviePhong.Data;
namespace MvcMoviePhong.Controllers;

[Authorize(Roles = "Admin")]
public class OrdersController(ApplicationDbContext db) : Controller
{
    public async Task<IActionResult> Index() => View(await db.HoaDons.Include(o => o.ChiTietHoaDons).Include(o => o.ShippingDetail).AsNoTracking().OrderByDescending(o => o.NgayLap).ToListAsync());
}
