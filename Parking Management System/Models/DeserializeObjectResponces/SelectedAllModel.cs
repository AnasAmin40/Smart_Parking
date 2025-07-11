using Newtonsoft.Json;

namespace Parking_Management_System.Models.DeserializeObjectResponces
{
    public class GetonlyLocation
    {
        public int LocationId { get; set; }
        public string? LocationName { get; set; }
    }

    public class CheckFreeslots
    {
        [JsonProperty("slotid")]
        public int SlotId { get; set; }

        [JsonProperty("slotnum")]
        public string? SlotNumber { get; set; }
    }

    public class CheckActiveBooking
    {
        [JsonProperty("bookingId")]
        public int BookingId { get; set; }

        [JsonProperty("locationName")]
        public string? LocationName { get; set; }

        [JsonProperty("slotNumber")]
        public string? SlotNumber { get; set; }

        [JsonProperty("slotType")]
        public string? SlotType { get; set; }
       
        [JsonProperty("startTime")]
        public DateTime StartTime { get; set; } 
        
        [JsonProperty("exitTime")]
        public DateTime ExitTime { get; set; }
       
    }


    public class BookingHistory
    {
        [JsonProperty("bookingId")]
        public int BookingId { get; set; }

        [JsonProperty("locationName")]
        public string? LocationName { get; set; }

        [JsonProperty("slotNumber")]
        public string? SlotNumber { get; set; }


        [JsonProperty("slotType")]
        public string? SlotType { get; set; }


        [JsonProperty("startTime")]
        public DateTime StartTime { get; set; }

        [JsonProperty("exitTime")]
        public DateTime ExitTime { get; set; }

        [JsonProperty("status")]
        public string? Status  { get; set; }
    }

}
