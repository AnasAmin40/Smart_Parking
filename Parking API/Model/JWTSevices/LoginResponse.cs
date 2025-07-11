namespace Parking_API.Model.JWTSevices
{
    public class LoginResponse
    {
        public string? Token { get; set; }
        public Users usersTable { get; set; } = null!;
    }
}
