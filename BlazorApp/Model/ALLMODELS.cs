namespace BlazorApp.Model
{
    public class LocationDTO
    {
        public int LocationId { get; set; }
        public string? LocationName { get; set; }
    }

    public class SlotAvailabilityDto
    {
        public int SlotId { get; set; }
        public string? SlotNumber { get; set; }
        public bool IsAvailable { get; set; }

        public List<BookingConflictInfo> Bookingconflicts { get; set; }
    }

    public class BookingConflictInfo
    {
        public DateTime? BookingStartTime { get; set; }
        public DateTime? BookingEndTime { get; set; }
        public string? Status { get; set; }
    }

    public class SlotDTO
    {
        public int SlotId { get; set; }
        public string? SlotNumber { get; set; }

        public string? SlotType { get; set; }
        public int? PricePerHour { get; set; } = null;
        public int ParkingLocationId { get; set; }

        //[JsonIgnore]
        public ParkingLocation? ParkingLocation { get; set; }

    }


    public class ParkingLocation
    {

        public int ParkingLocationId { get; set; }

        public string? Name { get; set; }


        public string? City { get; set; }

        public int TotalSlots { get; set; }


    }




   
}
