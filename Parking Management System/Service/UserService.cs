using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using NuGet.Common;
using Parking_API.Interface;
using Parking_API.Model;
using Parking_Management_System.Interface;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;
using Parking_Management_System.Models.Update;

namespace Parking_Management_System.Service
{
    public class UserService : IUserMVC
    {
        private readonly HttpClient _httpClient;
        
        public UserService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("UserClient");

        }

        public async Task<List<UserDTO>> GetAllUser(String Token)
        {


            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.GetAsync("");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var apiResponse = JsonConvert.DeserializeObject<UserApiResponse>(result);
            return apiResponse?.Value ?? new List<UserDTO>();


        }

        public async Task<UserDTO> GetUserById(int id, String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                HttpResponseMessage response = await _httpClient.GetAsync(id.ToString());
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();

                var apiresponse = JsonConvert.DeserializeObject<SingleUserApiResponse>(result);
                return apiresponse?.Value ?? new UserDTO();

            }
            catch (Exception)
            {
                return new UserDTO();
            }
        }

        public async Task AddUser(UserDTO data, String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"AddUser", data);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception)

            {

                throw;
            }
        }


        public async Task AddUserByUser(UserDTO data, String Token)

        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);

                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"AddNewUserByUser", data);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateUserData(int id, UpdateUser data, String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                HttpResponseMessage response = await _httpClient.PutAsJsonAsync($"UpdateUser/{id}", data);

                response.EnsureSuccessStatusCode();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteUser(int id, String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                HttpResponseMessage response = await _httpClient.DeleteAsync($"DeleteUser/{id}");
                response.EnsureSuccessStatusCode();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> ChangeActive(int id, String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                var request = new HttpRequestMessage(HttpMethod.Patch, $"UpdateUserStatus/{id}");
                HttpResponseMessage response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();
                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<UserDTO>> ActiveUser(String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                HttpResponseMessage response = await _httpClient.GetAsync($"ActiveUser");
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                var apiResponse = JsonConvert.DeserializeObject<List<UserDTO>>(result);
                return apiResponse ?? new List<UserDTO>();
            }
            catch (Exception)
            {
                return new List<UserDTO>();
            }
        }

        public async Task<List<UserDTO>> InActiveUser(String Token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                HttpResponseMessage response = await _httpClient.GetAsync($"InactiveUsers");
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                var apiResponse = JsonConvert.DeserializeObject<List<UserDTO>>(result);
                return apiResponse ?? new List<UserDTO>();
            }
            catch (Exception)
            {
                return new List<UserDTO>();
            }
        }


        

        public Task<IActionResult> GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> AddNewUser(Users data)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> UpdateUserData(int id, Users data)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> GetallUserData()
        {
            throw new NotImplementedException();
        }
    }
}
