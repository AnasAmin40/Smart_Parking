using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Parking_API.Model
{
    public class Billing
    {
        [Key]
        public int BillId { get; set; }
        public int? DurationInHours { get; set; }
        [Precision(18, 2)]
        public decimal? Amount { get; set; }
        public bool Status { get; set; } = false; // false for unpaid, true for paid
        public DateTime CreatedAt { get; set; }

        public int BookingId { get; set; }
        //[JsonIgnore]
        public Booking Booking { get; set; }

        public int UserId { get; set; }
        //[JsonIgnore]
        public Users? User { get; set; }


        public int ParkingLocationId { get; set; }
        //[JsonIgnore]
        public ParkingLocation? ParkingLocation { get; set; }


        //[JsonIgnore]
        [ForeignKey("SlotId")]
        public ParkingSlot? ParkingSlot { get; set; }
        public int SlotId { get; set; }
    }
}
