using Newtonsoft.Json;
using Parking_API.Model;


namespace Parking_Management_System.Models.DeserializeObjectResponces
{
    public class ResponseGetOnlyLocation
    {
        [JsonProperty("value")]
        public List<GetonlyLocation>? Value { get; set; }
        
    }
    public class ResponseGetFreeSlots
    {
        [JsonProperty("value")]
        public List<CheckFreeslots>? Value { get; set; }

    }

    public class GetBillListResponse
    {
        [JsonProperty("value")]
        public List<BillDTO>? Value { get; set; }

    }
        
    public class GetActiveBookingListResponse
    {
        [JsonProperty("value")]
        public List<CheckActiveBooking>? Value { get; set; }

    }

    public class GetBookingHistoryListResponse
    {
        [JsonProperty("value")]
        public List<BookingHistory>? Value { get; set; }

    }

    public class Counter
    {
        [JsonProperty("value")]
        public int Value { get; set; }
    }

    public class ProfitTotal
    {
        [JsonProperty("value")]
        public float Value { get; set; }
    }

    public class AllSlotApiResponse
    {
        [JsonProperty("value")]
        public List<SlotDTO>? Value { get; set; }
    } 
    
    

    public class BookingApiResponse
    {
        [JsonProperty("value")]
        public List<BookingDTO>? Value { get; set; }
    }

    public class LocationApiResponse
    {
        [JsonProperty("value")]
        public List<LocationDTO>? Value { get; set; }
    }

    public class RoleApiResponse
    {
        [JsonProperty("value")]
        public List<RoleDTO>? Value { get; set; }

    }

    public class SingleLocationApiResponse
    {
        [JsonProperty("value")]
        public LocationDTO? Value { get; set; }
    }

    public class SingleRoleApiResponse
    {
        [JsonProperty("value")]
        public RoleDTO? Value { get; set; }

    }
    public class SingleSlotResponse
    {
        [JsonProperty("value")]
        public SlotDTO? Value { get; set; }
    }

    public class SingleUserApiResponse
    {
        [JsonProperty("value")]
        public UserDTO? Value { get; set; }
    }

    public class UserApiResponse
    {
        [JsonProperty("Value")]
        public List<UserDTO>? Value { get; set; }
    }

    public class SlotAvailabilityResponse
    {
        [JsonProperty("value")]
        public List<SlotAvailabilityDto>? Value { get; set; }
    }
}
