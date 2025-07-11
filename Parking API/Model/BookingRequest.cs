namespace Parking_API.Model
{
    public class BookingRequest
    {
        public int UserId { get; set; }
        public int LocationId { get; set; }
        public int SlotId { get; set; } = 0;
        public string? SlotType { get; set; }
        public DateTime? StartTime { get; set; } 
        public DateTime? EndTime { get; set; }   
        public int? DurationHours { get; set; }
    }
}
