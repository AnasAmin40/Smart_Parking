using Microsoft.EntityFrameworkCore;
using Parking_API.Model;
using System.ComponentModel.DataAnnotations;

namespace Parking_Management_System.Models
{
    public class BookingDTO
    {

        [Key]
        public int BookingId { get; set; }

        public DateTime StartTime { get; set; } = DateTime.UtcNow;
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
