using Newtonsoft.Json;
namespace MvcMoviePhong.Extension;

public static class SessionExtensions
{
    public static void Set<T>(this ISession s, string key, T value) => s.SetString(key, JsonConvert.SerializeObject(value));
    public static T Get<T>(this ISession s, string key) where T : new() => s.GetString(key) is string value ? JsonConvert.DeserializeObject<T>(value) ?? new T() : new T();
}
