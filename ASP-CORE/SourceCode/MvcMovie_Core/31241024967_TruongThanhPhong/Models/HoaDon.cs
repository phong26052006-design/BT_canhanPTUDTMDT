using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MvcMoviePhong.Models;

public class HoaDon
{
    [Key]
    public int MaHoaDon
    {
        get; set;
    }
    public IList<ChiTietHoaDon> ChiTietHoaDons { get; set; } = new List<ChiTietHoaDon>();
    [Column(TypeName = "decimal(18,2)")]
    public decimal TongTien
    {
        get; set;
    }
    public DateTime NgayLap
    {
        get; set;
    }
    [Required, StringLength(64)]
    public string CheckoutToken
    {
        get; set;
    }
    public string MaKhachHang
    {
        get; set;
    }
    public ShippingDetail ShippingDetail
    {
        get; set;
    }
    public bool EmailSent
    {
        get; set;
    }
}
public class ChiTietHoaDon
{
    [Key]
    public int MaChiTietHoaDon
    {
        get; set;
    }
    public int MaHoaDon
    {
        get; set;
    }
    public HoaDon HoaDonObj
    {
        get; set;
    }
    public int MaMovie
    {
        get; set;
    }
    public Movie MovieObj
    {
        get; set;
    }
    [Range(1, 99)]
    public int SoLuong
    {
        get; set;
    }
    [Column(TypeName = "decimal(18,2)")]
    public decimal DonGia
    {
        get; set;
    }
    [Required, StringLength(200)]
    public string TenMovie
    {
        get; set;
    }
}
