using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;
using Parking_API.Model.Update;

namespace Parking_API.Interface
{
    public interface IUser
        
    {

        Task<IActionResult> GetallUserData();
        Task<IActionResult> GetUserById(int id);
        Task<IActionResult> AddNewUser(Users data);
        Task<IActionResult> AddNewUserByUser(Users data);
        Task<IActionResult> UpdateUserData(int id, UpdateUser data);
        Task<IActionResult> DeleteUser(int id);

    }
}
