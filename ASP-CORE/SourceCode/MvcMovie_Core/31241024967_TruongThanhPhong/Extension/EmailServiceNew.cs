using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity.UI.Services;
namespace MvcMoviePhong.Extension;

public class EmailServiceNew(IConfiguration config, IWebHostEnvironment env) : IEmailSender
{
    public bool IsPickup => !string.Equals(config["Email:Mode"], "Smtp", StringComparison.OrdinalIgnoreCase);
    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        using var message = new MailMessage(config["Email:From"] ?? "no-reply@phongcinema.test", email, subject, htmlMessage) { IsBodyHtml = true, BodyEncoding = System.Text.Encoding.UTF8, SubjectEncoding = System.Text.Encoding.UTF8 };
        using var client = new SmtpClient();
        if (IsPickup)
        {
            if (!env.IsDevelopment())
                throw new InvalidOperationException("Production requires Email:Mode=Smtp and SMTP secrets.");
            var dir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "PhongCinema", "MailPickup");
            Directory.CreateDirectory(dir);
            client.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
            client.PickupDirectoryLocation = dir;
        }
        else
        {
            client.Host = config["Email:Host"] ?? "smtp.gmail.com";
            client.Port = config.GetValue("Email:Port", 587);
            client.EnableSsl = config.GetValue("Email:EnableSsl", true);
            client.Credentials = new NetworkCredential(config["Email:Username"], config["Email:Password"]);
        }
        await client.SendMailAsync(message);
    }
}
