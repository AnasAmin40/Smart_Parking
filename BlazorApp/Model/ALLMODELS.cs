using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    public class CheckBookingCount
    {
        public int BookingId { get; set; }
        public string? LocationName { get; set; }
        public string? SlotNumber { get; set; }
        public string? SlotType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime ExitTime { get; set; }
    }


    public class Booking
    {

        public int BookingId { get; set; }
        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime? ExitTime { get; set; }
        public int? DurationHours { get; set; }
        public decimal? TotalCost { get; set; }
        public string? Status { get; set; }
        public bool IsPaid { get; set; } = false;
        public int UserId { get; set; }
        public Users? User { get; set; }
        public int ParkingLocationId { get; set; }
        public ParkingLocation? ParkingLocation { get; set; }
        public int SlotId { get; set; }
        public ParkingSlot? ParkingSlot { get; set; }
    }


    public class Users
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? MobileNumber { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public bool Active { get; set; }
        public int RoleId { get; set; }
        public Role? Role { get; set; }

    }


    public class Role
    {
        public int RoleId { get; set; }
        public string? Roles { get; set; }
        public bool Active { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

    }

    public class ParkingSlot
    {
        public int SlotId { get; set; }
        public string? SlotNumber { get; set; }
        public string? SlotType { get; set; }
        public int? PricePerHour { get; set; } = null;
        public int ParkingLocationId { get; set; }
        public ParkingLocation? ParkingLocation { get; set; }
    }


    public class Billing
    {
        
        public int BillId { get; set; }
        public int DurationInHours { get; set; }
        
        public decimal Amount { get; set; }
        public bool Status { get; set; } = false; // false for unpaid, true for paid
        public DateTime CreatedAt { get; set; }

        public int BookingId { get; set; }
        //[JsonIgnore]
        public Booking? Booking { get; set; }

        public int UserId { get; set; }
        //[JsonIgnore]
        public Users? User { get; set; }


        public int ParkingLocationId { get; set; }
        //[JsonIgnore]
        public ParkingLocation? ParkingLocation { get; set; }


        
        [ForeignKey("SlotId")]
        public ParkingSlot? ParkingSlot { get; set; }
        public int SlotId { get; set; }
    }
}
