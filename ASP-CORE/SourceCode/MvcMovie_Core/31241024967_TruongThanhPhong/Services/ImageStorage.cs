namespace MvcMoviePhong.Services;

public class ImageStorage(IWebHostEnvironment env)
{
    public const string Default = "/images/no-image.jpg";
    public async Task<string> SaveAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return null;
        if (file.Length > 2 * 1024 * 1024)
            throw new ArgumentException("Ảnh tối đa 2 MB.");
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" }.Contains(ext))
            throw new ArgumentException("Chỉ nhận JPG, PNG, GIF hoặc WebP.");
        var head = new byte[12];
        using (var input = file.OpenReadStream())
        {
            await input.ReadExactlyAsync(head);
        }
        bool valid = ext switch
        {
            ".jpg" or ".jpeg" => head[0] == 0xff && head[1] == 0xd8 && head[2] == 0xff,
            ".png" => head.Take(8).SequenceEqual(new byte[] { 137, 80, 78, 71, 13, 10, 26, 10 }),
            ".gif" => System.Text.Encoding.ASCII.GetString(head, 0, 6) is "GIF87a" or "GIF89a",
            ".webp" => System.Text.Encoding.ASCII.GetString(head, 0, 4) == "RIFF" && System.Text.Encoding.ASCII.GetString(head, 8, 4) == "WEBP",
            _ => false
        };
        if (!valid)
            throw new ArgumentException("Nội dung tệp không đúng định dạng ảnh.");
        var name = Guid.NewGuid().ToString("N") + ext;
        var dir = Path.Combine(env.WebRootPath, "images", "uploads");
        Directory.CreateDirectory(dir);
        await using var stream = new FileStream(Path.Combine(dir, name), FileMode.CreateNew);
        await file.CopyToAsync(stream);
        return "/images/uploads/" + name;
    }
    public void Delete(string path)
    {
        if (path?.StartsWith("/images/uploads/") == true && Path.GetFileName(path) == path[16..])
        {
            var f = Path.Combine(env.WebRootPath, "images", "uploads", Path.GetFileName(path));
            if (File.Exists(f))
                File.Delete(f);
        }
    }
}
