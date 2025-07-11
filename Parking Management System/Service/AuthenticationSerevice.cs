using System.Net.Http.Headers;
using System.Net.Http;
using Newtonsoft.Json;
using Parking_Management_System.Models;

using Parking_Management_System.Interface;

namespace Parking_Management_System.Service
{
    public class AuthenticationSerevice : IAuthenticationController
    {
        private readonly HttpClient _httpClient;
        public AuthenticationSerevice(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("AuthenticationClient");

        }

        public async Task<LoginResponseDTO> UserLogin(LoginRequestDTO loginData)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync("UserLogin", loginData);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                var apiResponse = JsonConvert.DeserializeObject<LoginResponseDTO>(result);
                return apiResponse ?? new LoginResponseDTO();
            }
            catch (Exception)
            {
                return new LoginResponseDTO();
            }
        }
    }
}
