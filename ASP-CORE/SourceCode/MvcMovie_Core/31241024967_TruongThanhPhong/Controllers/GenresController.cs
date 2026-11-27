using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcMoviePhong.Data;
using MvcMoviePhong.Models;
namespace MvcMoviePhong.Controllers;

[Authorize(Roles = "Admin")]
public class GenresController(ApplicationDbContext db) : Controller
{
    public async Task<IActionResult> Index() => View(await db.Genres.Include(g => g.Movies).AsNoTracking().OrderBy(g => g.Name).ToListAsync());
    public IActionResult Create() => View("Edit", new Genre());
    public async Task<IActionResult> Edit(int id)
    {
        var g = await db.Genres.FindAsync(id);
        return g == null ? NotFound() : View(g);
    }
    public async Task<IActionResult> Details(int id)
    {
        var g = await db.Genres.Include(g => g.Movies).AsNoTracking().SingleOrDefaultAsync(g => g.ID == id);
        return g == null ? NotFound() : View(g);
    }
    [HttpPost] public async Task<IActionResult> Create([Bind("Name")] Genre genre) => await Save(genre, true);
    [HttpPost]
    public async Task<IActionResult> Edit(int id, [Bind("ID,Name")] Genre genre)
    {
        if (id != genre.ID)
            return BadRequest();
        return await Save(genre, false);
    }
    async Task<IActionResult> Save(Genre genre, bool create)
    {
        genre.Name = genre.Name?.Trim();
        if (await db.Genres.AnyAsync(g => g.Name == genre.Name && g.ID != genre.ID))
            ModelState.AddModelError("Name", "Thể loại đã tồn tại.");
        if (ModelState.IsValid)
        {
            if (create)
                db.Genres.Add(genre);
            else
            {
                var old = await db.Genres.FindAsync(genre.ID);
                if (old == null)
                    return NotFound();
                old.Name = genre.Name;
            }
            try
            {
                await db.SaveChangesAsync();
                TempData["Success"] = "Đã lưu thể loại.";
                return RedirectToAction(nameof(Index));
            }
            catch (DbUpdateException) { ModelState.AddModelError("Name", "Tên thể loại đã được sử dụng."); }
        }
        return View("Edit", genre);
    }
    public async Task<IActionResult> Delete(int id)
    {
        var g = await db.Genres.Include(g => g.Movies).SingleOrDefaultAsync(g => g.ID == id);
        return g == null ? NotFound() : View(g);
    }
    [HttpPost, ActionName("Delete")]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var g = await db.Genres.FindAsync(id);
        if (g == null)
            return NotFound();
        if (await db.Movies.AnyAsync(m => m.GenreID == id))
        {
            TempData["Error"] = "Thể loại đang có phim. Hãy chuyển phim sang thể loại khác trước.";
            return RedirectToAction(nameof(Index));
        }
        db.Genres.Remove(g);
        try
        {
            await db.SaveChangesAsync();
            TempData["Success"] = "Đã xóa thể loại.";
        }
        catch (DbUpdateException) { TempData["Error"] = "Thể loại đang được sử dụng."; }
        return RedirectToAction(nameof(Index));
    }
}
