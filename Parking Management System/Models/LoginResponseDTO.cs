namespace Parking_Management_System.Models
{
    public class LoginResponseDTO
    {
        public string? Token { get; set; }
        public UserDTO usersTable { get; set; } = null!;
    }
}
