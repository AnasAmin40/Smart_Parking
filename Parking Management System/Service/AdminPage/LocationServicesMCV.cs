using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;

namespace Parking_Management_System.Service.AdminPage
{
    public class LocationServicesMCV : ILocationMVC
    {
        private readonly HttpClient _httpClient;
        public LocationServicesMCV(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("LocationClient");
        }

        public async Task<List<LocationDTO>> GetAllLocation()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("");
            response.EnsureSuccessStatusCode();

            var result = await  response.Content.ReadAsStringAsync();
            var apiresponse = JsonConvert.DeserializeObject<LocationApiResponse>(result);
            return apiresponse?.Value ?? new List<LocationDTO>();
        }

        public async Task AddLocation(LocationDTO Location)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"AddLocation", Location);
            response.EnsureSuccessStatusCode();
            
        }

        public async Task<LocationDTO> GetLocationbyId(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(id.ToString());
            response.EnsureSuccessStatusCode();

            var result =await response.Content.ReadAsStringAsync();
            var apiresponse = JsonConvert.DeserializeObject<SingleLocationApiResponse>(result);
            return apiresponse?.Value ?? new LocationDTO();
        }

        public async Task UpdateLocation(int id,[FromBody]LocationDTO Location)
        {
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync($"UpdateLocation/{id}",Location);
            response.EnsureSuccessStatusCode();
        }

        public async Task<int> CountLocation()
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"CountLocation");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var apiresponse = JsonConvert.DeserializeObject<Counter>(result);
            return apiresponse.Value;
        }
    }
}
