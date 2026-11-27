using System.ComponentModel.DataAnnotations;
namespace MvcMoviePhong.Models;

public class Genre
{
    public int ID
    {
        get; set;
    }
    [Required, StringLength(200, MinimumLength = 2), Display(Name = "Tên thể loại")]
    public string Name
    {
        get; set;
    }
    public IList<Movie> Movies { get; set; } = new List<Movie>();
}
