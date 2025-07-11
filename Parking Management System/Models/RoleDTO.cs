using System.ComponentModel.DataAnnotations;

namespace Parking_Management_System.Models
{
    public class RoleDTO
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        public string? Roles { get; set; }
        public bool Active { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;
    }
}
