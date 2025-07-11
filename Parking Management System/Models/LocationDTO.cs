using Parking_API.Model;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Parking_Management_System.Models
{
    public class LocationDTO
    {
        [Key]
        public int ParkingLocationId { get; set; }
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? City { get; set; }

        [Required]
        public int TotalSlots { get; set; }

        [JsonIgnore]
        public ICollection<ParkingSlot>? ParkingSlots { get; set; }
    }
}
