namespace Parking_Management_System.Service;

using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Parking_Management_System.Interface;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;


public class RoleService : IRole
{
    private readonly HttpClient _httpClient;

    public RoleService(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient("RoleClient");
    }

    

    public async Task<List<RoleDTO>> GetAllRoles(string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);


            HttpResponseMessage response = await _httpClient.GetAsync("");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();

            var apiResponse = JsonConvert.DeserializeObject<RoleApiResponse>(result);

            return apiResponse?.Value ?? new List<RoleDTO>();

        }
        catch (Exception)
        {
            return new List<RoleDTO>();
        }
    }



    public async Task<RoleDTO> GetRoleById(int id, string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.GetAsync(id.ToString());
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();

            var apiResponse = JsonConvert.DeserializeObject<SingleRoleApiResponse>(result);
            return apiResponse?.Value ?? new RoleDTO();

        }
        catch (Exception)
        {
            return new RoleDTO();
        }
    }

    public async Task AddRole(RoleDTO data, string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync<RoleDTO>($"AddRole", data);

            response.EnsureSuccessStatusCode();
        }
        catch (Exception)
        {
            throw;
        }
    }


    public async Task EditRole(int id,[FromBody] RoleDTO data, string Token)

    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync($"UpdateRole/{id}", data);
            response.EnsureSuccessStatusCode();
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task DeleteRole(int id, string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.DeleteAsync($"DeleteRole/{id}");
            response.EnsureSuccessStatusCode();
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> RoleStatus(int id, string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            var request = new HttpRequestMessage(HttpMethod.Patch, $"{id}/toggle");
            HttpResponseMessage response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }
        catch (Exception)
        {
            throw;
        }
    }
    public async Task<List<RoleDTO>> ActiveRoles(string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.GetAsync("ActiveRole");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var Apiresponse = JsonConvert.DeserializeObject<List<RoleDTO>>(result);
            return Apiresponse ?? new List<RoleDTO>();
        }
        catch (Exception)
        {
            return new List<RoleDTO>();
        }
    }
    public async Task<List<RoleDTO>> InActiveRoles(string Token)
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            HttpResponseMessage response = await _httpClient.GetAsync("InActiveRole");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var Apiresponse = JsonConvert.DeserializeObject<List<RoleDTO>>(result);
            return Apiresponse ?? new List<RoleDTO>();
        }
        catch (Exception)
        {
            return new List<RoleDTO>();
        }
    }

}





