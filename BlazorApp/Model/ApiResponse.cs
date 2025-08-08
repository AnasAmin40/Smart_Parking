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
    public class CountResponseOfIncome
    {
        //[JsonPropertyName("value")]
        public string Value { get; set; }
    }

    public class FullResponse
    {
        public int Value { get; set; }
        public List<object> Formatters { get; set; }
        public List<object> ContentTypes { get; set; }
        public object DeclaredType { get; set; }
        public int StatusCode { get; set; }
    }

    public class CountResponseWrapper
    {
        [JsonPropertyName("value")]
        public decimal Value { get; set; }

        public List<object> Formatters { get; set; }
        public List<string> ContentTypes { get; set; }
        public object DeclaredType { get; set; }
        public int StatusCode { get; set; }
    }

}
