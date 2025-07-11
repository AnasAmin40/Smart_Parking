using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Parking_API.Model
{
    public class ParkingLocation
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
        public ICollection<ParkingSlot>? ParkingSlots{ get; set; }


    }
}
