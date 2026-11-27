using Microsoft.AspNetCore.Mvc;
using MvcMoviePhong.Services;
namespace MvcMoviePhong.ViewComponents;

public class CartSummaryViewComponent(CartService cart) : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync() => View(await cart.GetAsync(HttpContext.Session));
}
