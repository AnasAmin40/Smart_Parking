using System.Drawing.Printing;
using System.Net.Http.Headers;
using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.MSIdentity.Shared;
using Newtonsoft.Json;
using Parking_API.Model;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;

namespace Parking_Management_System.Service.AdminPage
{
    public class SlotServiceMVC : IslotsMVC
    {
        private readonly HttpClient _httpClient;

        public SlotServiceMVC(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("SlotsClient");
        }

        public async Task<List<SlotDTO>> GetAllSlot()
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync("");
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();
                var apiRespones = JsonConvert.DeserializeObject<List<SlotDTO>>(result);
                return apiRespones ?? new List<SlotDTO>();
            }
            catch (Exception)
            {
                return new List<SlotDTO>();
            }
        }

        public async Task<List<SlotDTO>> GetAllSlot(int? locationId)
        {
            try
            {
                string endpoint = locationId.HasValue ? $"GetSlotByLocation?locationId={locationId}" : "";

                HttpResponseMessage response = await _httpClient.GetAsync(endpoint);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();
                var apiRespones = JsonConvert.DeserializeObject<AllSlotApiResponse>(result);
                return apiRespones?.Value ?? new List<SlotDTO>();
            }
            catch (Exception)
            {
                return new List<SlotDTO>();
            }
        }

        public async Task AddSlot([FromBody]SlotDTO slot)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"AddSlot", slot);
            response.EnsureSuccessStatusCode();
        }

        public async Task<SlotDTO> EditSlot(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(id.ToString());
            response.EnsureSuccessStatusCode();

            var result =await response.Content.ReadAsStringAsync();
            var apiResponse = JsonConvert.DeserializeObject<SingleSlotResponse>(result);
            return apiResponse?.Value ?? new SlotDTO();
           
        }

        public async Task UpdateSlot(int id , [FromBody] SlotDTO slot)
        {
            HttpResponseMessage responseMessage = await _httpClient.PutAsJsonAsync($"UpdateSlot/{id}",slot);
            responseMessage.EnsureSuccessStatusCode();
        }

        
    }
    
}
