using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Parking_API.Model
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? MobileNumber { get; set; }


        [Required, DataType(DataType.Password)]
        public string? Password { get; set; }

        [Required, DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string? ConfirmPassword { get; set; }

        [Required]
        public bool Active { get; set; }

        public int RoleId { get; set; }

        [JsonIgnore]
        public Role? Role { get; set; } 

    }
}
