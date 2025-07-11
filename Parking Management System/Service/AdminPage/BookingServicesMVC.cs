using System.Collections.Generic;
using System.Drawing.Printing;
using System.Net.Http.Json;
using System.Net.NetworkInformation;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Parking_API.Model;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;

namespace Parking_Management_System.Service.AdminPage
{
    public class BookingServicesMVC : IBookingDTO
    {
        private readonly HttpClient _httpClient;
        public BookingServicesMVC(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("BookingClient");
        }

        public async Task<List<BookingDTO>> BookingList()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"AllBooking");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result =await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<BookingApiResponse>(result);
            return response?.Value ?? new List<BookingDTO>();
        }

        public async Task AddNewBooking([FromBody] BookingRequest booking)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.PostAsJsonAsync("CreateBooking", booking);
            httpResponseMessage.EnsureSuccessStatusCode();
        }

        public async Task<List<GetonlyLocation>> OnlyLocation()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"GetAllLocation");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<ResponseGetOnlyLocation>(result);
            return response?.Value ?? new List<GetonlyLocation>();
        }


        public async Task<List<CheckFreeslots>> CheckFreeSlot(int locationid, string type)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"GetAvailableSlot?locationId={locationid}&SlotType={Uri.EscapeDataString(type)}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<ResponseGetFreeSlots>(result);
            return response?.Value ?? new List<CheckFreeslots>();
        }
        
        public async Task<List<SlotDTO>> AllSlot(int locationid, string slotType)
        {

           
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"GetAllSlots/{locationid}?slotType={slotType}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<AllSlotApiResponse>(result);
            return response?.Value ?? new List<SlotDTO>();
        }

        public async Task<List<BillDTO>> BillList()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"GetBillList");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<GetBillListResponse>(result);
            return response?.Value ?? new List<BillDTO>();
        }

        public async Task<List<CheckActiveBooking>> GetActiveBooking(int userId)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"GetUserActiveBookings/{userId}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<GetActiveBookingListResponse>(result);
            return response?.Value ?? new List<CheckActiveBooking>();
        } 
        
        public async Task<List<CheckActiveBooking>> GetUpcomingBooking(int userId)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"GetUpcomingBooking/{userId}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<GetActiveBookingListResponse>(result);
            return response?.Value ?? new List<CheckActiveBooking>();
        }

        public async Task<List<BookingHistory>> BookingHistory(int userId)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"BookingHistory/{userId}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<GetBookingHistoryListResponse>(result);
            return response?.Value ?? new List<BookingHistory>();
        }


        public async Task<int> ActiveBooking(int userid)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"ActiveBookingCounter/{userid}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<Counter>(result);
            if (response == null)
                throw new Exception("Deserialization failed. Check API response format.");
            return response.Value;
        }

        public async Task<int> UpcomingBooking(int userid)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"UpcomingBookingCounter/{userid}");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<Counter>(result);
            if (response == null)
                throw new Exception("Deserialization failed. Check API response format.");
            return response.Value;
        }

        public async Task<int> EntriesBike()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"CountTodayEntriesBike");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<int>(result);
            
            return response;
        }

        public async Task<int> EntriesCar()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"CountTodayEntriesCar");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<int>(result);

            return response;
        }

        public async Task<int> AllActiveBooking()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"AllActiveBooking");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<int>(result);

            return response;
        }

        public async Task<int> ToIncome()
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync($"TodayIncome");
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<ProfitTotal>(result);
            if (response == null)
                throw new Exception("Deserialization failed. Check API response format.");
            return (int)response.Value;
        }

        public async Task AddOneHour(int bookingId)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.PostAsync($"IncreaseHour/{bookingId}",null);
            httpResponseMessage.EnsureSuccessStatusCode();
        }

        public async Task<List<SlotAvailabilityDto>> isAvailable(int LocationId, DateTime StartTime , DateTime EndTime , string Slottype)
        {
            //string url = $"IsAvailableSlot?LocationId={LocationId}&StartTime={StartTime:0}&EndTime={EndTime:0}&Slottype={Slottype}";

            string url = $"IsAvailableSlot?LocationId={LocationId}" +
                 $"&StartTime={Uri.EscapeDataString(StartTime.ToString("O"))}" +
                 $"&EndTime={Uri.EscapeDataString(EndTime.ToString("O"))}" +
                 $"&Slottype={Uri.EscapeDataString(Slottype)}";


            HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync(url);
            httpResponseMessage.EnsureSuccessStatusCode();

            var result = await httpResponseMessage.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<List<SlotAvailabilityDto>>(result);
            return response ?? new List<SlotAvailabilityDto>();

        }

        public async Task CancelBooking(int bookingId)
        {
            HttpResponseMessage httpResponseMessage = await _httpClient.PutAsync($"CancelledBooking/{bookingId}",null);
            httpResponseMessage.EnsureSuccessStatusCode();
        }

        public async Task PaidBooking(int bookingId)
        {
            HttpResponseMessage responseMessage = await _httpClient.PostAsync($"PaidBooking/{bookingId}",null);
            responseMessage.EnsureSuccessStatusCode();
        }

    }
}
