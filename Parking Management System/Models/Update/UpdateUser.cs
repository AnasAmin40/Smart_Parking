namespace Parking_Management_System.Models.Update
{
    public class UpdateUser
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? MobileNumber { get; set; }
        public bool Active { get; set; }
        public int RoleId { get; set; }
    }
}
