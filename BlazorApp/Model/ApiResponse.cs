using System.Text.Json.Serialization;

namespace BlazorApp.Model
{
    public class ApiResponse<T>
    {
        [JsonPropertyName("value")]
        public T Value { get; set; }
    }

    public class CountResponse
    {
        [JsonPropertyName("value")]
        public int Value { get; set; }
    }
}
