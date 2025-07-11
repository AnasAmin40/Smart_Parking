
﻿using Parking_API.Model;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Parking_Management_System.Models
{
    public class SlotDTO
    {
        [Key]
        public int SlotId { get; set; }
        public string? SlotNumber { get; set; }
       
        public string? SlotType { get; set; }
        public int? PricePerHour { get; set; } = null;
        public int ParkingLocationId { get; set; }

        //[JsonIgnore]
        public ParkingLocation? ParkingLocation { get; set; }

    }
}
