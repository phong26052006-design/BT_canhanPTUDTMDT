using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MvcMoviePhong.Models;
namespace MvcMoviePhong.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext(options)
{
    public DbSet<Movie> Movies
    {
        get; set;
    }
    public DbSet<Genre> Genres
    {
        get; set;
    }
    public DbSet<HoaDon> HoaDons
    {
        get; set;
    }
    public DbSet<ChiTietHoaDon> ChiTietHoaDons
    {
        get; set;
    }
    public DbSet<ShippingDetail> ShippingDetails
    {
        get; set;
    }
    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);
        b.Entity<Genre>().HasIndex(g => g.Name).IsUnique();
        b.Entity<Movie>().HasOne(m => m.GenreObj).WithMany(g => g.Movies).HasForeignKey(m => m.GenreID).OnDelete(DeleteBehavior.Restrict);
        b.Entity<HoaDon>().HasIndex(o => o.CheckoutToken).IsUnique();
        b.Entity<ChiTietHoaDon>().HasOne(d => d.HoaDonObj).WithMany(o => o.ChiTietHoaDons).HasForeignKey(d => d.MaHoaDon);
        b.Entity<ChiTietHoaDon>().HasOne(d => d.MovieObj).WithMany().HasForeignKey(d => d.MaMovie).OnDelete(DeleteBehavior.Restrict);
        b.Entity<ShippingDetail>().HasOne(s => s.HoaDonObj).WithOne(o => o.ShippingDetail).HasForeignKey<ShippingDetail>(s => s.MaHoaDon);
    }
}

