using System.ComponentModel.DataAnnotations;
namespace MvcMoviePhong.Models;

public class CartItem
{
    public int MovieId
    {
        get; set;
    }
    public int Quantity
    {
        get; set;
    }
}
public class CartLine
{
    public Movie Movie
    {
        get; set;
    }
    public int Quantity
    {
        get; set;
    }
    public decimal Total => Movie.Price * Quantity;
}
public class CartViewModel
{
    public List<CartLine> Lines { get; set; } = []; public decimal Total => Lines.Sum(x => x.Total); public int Count => Lines.Sum(x => x.Quantity);
}
public class CheckoutViewModel
{
    public ShippingDetail Shipping { get; set; } = new();
    [Required]
    public string Token
    {
        get; set;
    }
    public CartViewModel Cart { get; set; } = new();
}
