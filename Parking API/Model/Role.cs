using System.ComponentModel.DataAnnotations;

namespace Parking_API.Model
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string? Roles { get; set; }
        public bool Active { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

    }
}
