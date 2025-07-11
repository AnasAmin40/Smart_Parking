using System.ComponentModel.DataAnnotations;
using System.Data;

using System.Text.Json.Serialization;
using Parking_API.Model;


namespace Parking_Management_System.Models
{
    public class UserDTO
    {
        [Key]
        public int Id { get; set; }


        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? MobileNumber { get; set; }

        //[JsonIgnore]
        [Required, DataType(DataType.Password)]
        public string? Password { get; set; }
        //[JsonIgnore]
        [Required, DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string? ConfirmPassword { get; set; }

        [Required]
        public bool Active { get; set; }

        public int RoleId { get; set; }
        //[JsonIgnore]
        public Role? Role { get; set; }

    }
}
