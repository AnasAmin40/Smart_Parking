using System.Text.Json.Serialization;

namespace Parking_API.Model
{
    public class VehicleEntryExit
    {
        public int id { get; set; }
        public string? vehicleNumber { get; set; }
        public string? vehicleType { get; set; }
        public DateTime EntryTime { get; set; }
        public DateTime? ExitTime { get; set; }
        public double? BillAmount { get; set; }


        public int parkingSlotId { get; set; }
        [JsonIgnore]
        public ParkingSlot? ParkingSlot { get; set; }



    }
}
