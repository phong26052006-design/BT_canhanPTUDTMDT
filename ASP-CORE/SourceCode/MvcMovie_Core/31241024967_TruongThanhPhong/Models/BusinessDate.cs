using System.ComponentModel.DataAnnotations;

namespace MvcMoviePhong.Models;

public static class BusinessDate
{
    private static readonly TimeZoneInfo Vietnam = TimeZoneInfo.FindSystemTimeZoneById("Asia/Ho_Chi_Minh");
    public static DateTime Today => Local(DateTime.UtcNow).Date;
    public static DateTime Local(DateTime utc) => TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(utc, DateTimeKind.Utc), Vietnam);
}

public class WholeDongAttribute : ValidationAttribute
{
    public WholeDongAttribute() => ErrorMessage = "Giá bán phải là số nguyên VND.";
    public override bool IsValid(object value) => value is decimal number && decimal.Truncate(number) == number;
}
