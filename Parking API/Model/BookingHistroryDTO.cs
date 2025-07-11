namespace Parking_API.Model
{
    public class BookingHistoryDto
    {
        public int BookingId { get; set; }
        public string? LocationName { get; set; }
        public string? SlotNumber { get; set; }
        public string? SlotType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? ExitTime { get; set; }
        public string? Status { get; set; }
        
    }
    
}
