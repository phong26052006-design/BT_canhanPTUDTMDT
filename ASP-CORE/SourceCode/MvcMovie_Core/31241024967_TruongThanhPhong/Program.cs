using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using MvcMoviePhong.Data;
using MvcMoviePhong.Extension;
using MvcMoviePhong.Services;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddDefaultIdentity<IdentityUser>(o => { o.SignIn.RequireConfirmedAccount = true; o.User.RequireUniqueEmail = true; o.Password.RequiredLength = 8; })
 .AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews(o => o.Filters.Add(new Microsoft.AspNetCore.Mvc.AutoValidateAntiforgeryTokenAttribute())).AddNewtonsoftJson();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(o => { o.IdleTimeout = TimeSpan.FromMinutes(100); o.Cookie.HttpOnly = true; o.Cookie.IsEssential = true; o.Cookie.SameSite = SameSiteMode.Lax; });
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<ImageStorage>();
builder.Services.AddScoped<EmailServiceNew>();
builder.Services.AddScoped<IEmailSender>(s => s.GetRequiredService<EmailServiceNew>());
var app = builder.Build();
if (app.Environment.IsDevelopment())
    app.UseMigrationsEndPoint();
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}
// Prices and input binding consistently use Vietnamese separators; forms use whole VND amounts.
var culture = CultureInfo.GetCultureInfo("vi-VN");
app.UseRequestLocalization(new RequestLocalizationOptions { DefaultRequestCulture = new("vi-VN"), SupportedCultures = [culture], SupportedUICultures = [culture] });
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.MapControllerRoute("default", "{controller=Movies}/{action=Index}/{id?}");
app.MapRazorPages();
if (args.Contains("--seed")) { using var scope = app.Services.CreateScope(); await SeedData.InitializeAsync(scope.ServiceProvider); return; }
app.Run();
public partial class Program
{
}
