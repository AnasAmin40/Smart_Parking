using Newtonsoft.Json;

namespace Parking_API.Model.Selection
{
    public class SelectActiveOrUpdateBooking
    {
       
            public int BookingId { get; set; }

            public string? LocationName { get; set; }

            public string? SlotNumber { get; set; }

            public string? SlotType { get; set; }

            public DateTime StartTime { get; set; }

            public DateTime ExitTime { get; set; }

    }
}
