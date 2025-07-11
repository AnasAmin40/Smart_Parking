using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Parking_API.Model
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime? ExitTime { get; set; }
        public int? DurationHours { get; set; }

        [Precision(18, 2)]
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
}
