namespace Parking_API.Model
{
    public class SlotAvailabilityDto
    {
        public int SlotId { get; set; }
        public string? SlotNumber { get; set; }
        public bool isAvaible { get; set; }
       
        public List<BookingConflictInfo> Bookingconflicts { get; set; }
    }

    public class BookingConflictInfo
    {
        public DateTime? BookingStartTime { get; set; }
        public DateTime? BookingEndTime { get; set; }
        public string? Status { get; set; }
    }
}
    