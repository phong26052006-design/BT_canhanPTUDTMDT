using System.ComponentModel.DataAnnotations;
namespace MvcMoviePhong.Models;

public class ShippingDetail
{
    public int ID
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
    [Required, StringLength(100, MinimumLength = 2), Display(Name = "Họ và tên")]
    public string Name
    {
        get; set;
    }
    [Required, StringLength(300, MinimumLength = 8), Display(Name = "Địa chỉ nhận hàng")]
    public string Address
    {
        get; set;
    }
    [Required, EmailAddress, StringLength(254), Display(Name = "Email")]
    public string Email
    {
        get; set;
    }
    [Required, RegularExpression(@"0[0-9]{9}", ErrorMessage = "Nhập số điện thoại Việt Nam gồm 10 chữ số, bắt đầu bằng 0."), Display(Name = "Số điện thoại")]
    public string Mobile
    {
        get; set;
    }
    [Required, DataType(DataType.Date), CheckDateGreaterThanToday, Display(Name = "Ngày nhận hàng dự kiến")] public DateTime ReleaseDate { get; set; } = BusinessDate.Today.AddDays(3);
}
