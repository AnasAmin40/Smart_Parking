using Parking_Management_System.Models;
using Parking_Management_System.Models.Update;

namespace Parking_Management_System.Interface
{
    public interface IUserMVC
    {
        Task<List<UserDTO>> GetAllUser(String Token);
        Task AddUser(UserDTO data, String Token);
        Task<UserDTO> GetUserById(int id, String Token);
        Task UpdateUserData(int id, UpdateUser data, String Token);
        Task AddUserByUser(UserDTO data, String Token);

    }
}
