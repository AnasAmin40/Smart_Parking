using System.Text.Json.Serialization;
using Parking_API.Model;

namespace Parking_Management_System.Models
{
    public class VehicleDTO
    {
        public int id { get; set; }
        public string? vehicleNumber { get; set; }
        public string? vehicleType { get; set; }
        public DateTime EntryTime { get; set; }
        public DateTime? ExitTime { get; set; }
        public double? BillAmount { get; set; }


        public int parkingSlotId { get; set; }
        [JsonIgnore]
        public SlotDTO? SlotDtO { get; set; }
    }
}
