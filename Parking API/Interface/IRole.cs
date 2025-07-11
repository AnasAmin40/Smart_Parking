using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;

namespace Parking_API.Interface
{
    public interface IRole
    {
        Task<IActionResult> GetAllRoles();
        Task<IActionResult> GetRoleById(int id);
        Task<IActionResult> AddRole(Role data);
        Task<IActionResult> UpdateRole(int id, Role data);
        Task<IActionResult> DeleteRole(int id);
    }
}
