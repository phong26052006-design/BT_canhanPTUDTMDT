using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MvcMoviePhong.Models;

public class Movie
{
    public int ID
    {
        get; set;
    }
    [Required, StringLength(200, MinimumLength = 3), Display(Name = "Tiêu đề")]
    public string Title
    {
        get; set;
    }
    [StringLength(4000), Display(Name = "Tóm tắt")]
    public string Summary
    {
        get; set;
    }
    [DataType(DataType.Date), Display(Name = "Ngày phát hành"), CheckDateGreaterThanToday]
    public DateTime ReleaseDate
    {
        get; set;
    }
    [Required, Range(1, int.MaxValue), Display(Name = "Thể loại")]
    public int? GenreID
    {
        get; set;
    }
    public Genre GenreObj
    {
        get; set;
    }
    [WholeDong, Range(5000, 100000000), Column(TypeName = "decimal(18,2)"), Display(Name = "Giá bán VND")]
    public decimal Price
    {
        get; set;
    }
    [Range(1, 5), Display(Name = "Xếp hạng")]
    public double Rated
    {
        get; set;
    }
    public string PicturePath { get; set; } = "/images/no-image.jpg";
    [NotMapped, Display(Name = "Ảnh bìa")]
    public IFormFile PictureUpload
    {
        get; set;
    }
}
public class CheckDateGreaterThanTodayAttribute : ValidationAttribute
{
    public CheckDateGreaterThanTodayAttribute()
    {
        ErrorMessage = "Ngày phát hành phải từ hôm nay trở đi.";
    }
    public override bool IsValid(object value) => value is DateTime d && d.Date >= BusinessDate.Today;
}
