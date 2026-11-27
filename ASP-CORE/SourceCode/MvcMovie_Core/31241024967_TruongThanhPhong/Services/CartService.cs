using Microsoft.EntityFrameworkCore;
using MvcMoviePhong.Data;
using MvcMoviePhong.Models;
using MvcMoviePhong.Extension;
namespace MvcMoviePhong.Services;

public class CartService(ApplicationDbContext db)
{
    public List<CartItem> Read(ISession s) => s.Get<List<CartItem>>("HoaDon");
    public void Save(ISession s, List<CartItem> items) => s.Set("HoaDon", items);
    public async Task<CartViewModel> GetAsync(ISession session)
    {
        var items = Read(session);
        var ids = items.Select(i => i.MovieId).ToArray();
        var movies = await db.Movies.AsNoTracking().Where(m => ids.Contains(m.ID)).ToListAsync();
        var valid = items.Where(i => i.Quantity is >= 1 and <= 99 && movies.Any(m => m.ID == i.MovieId)).GroupBy(i => i.MovieId).Select(g => g.First()).ToList();
        Save(session, valid);
        return new()
        {
            Lines = valid.Select(i => new CartLine { Movie = movies.Single(m => m.ID == i.MovieId), Quantity = i.Quantity }).ToList()
        };
    }
}
