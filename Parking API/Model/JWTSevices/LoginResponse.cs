namespace Parking_API.Model.JWTSevices
{
    public class LoginResponse
    {
        public string? Token { get; set; }
        public Users usersTable { get; set; } = null!;
        public string? Username { get; set; }
        public int? userID { get; set; }
        public string? Message { get; set; }
        public bool IsSuccess { get; set; }
        public string? Role { get; set; }
    }
}
