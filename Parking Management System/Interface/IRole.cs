using Parking_Management_System.Models;

namespace Parking_Management_System.Interface
{
    public interface IRole
    {
        Task<List<RoleDTO>> GetAllRoles(string Token);
        Task<RoleDTO> GetRoleById(int id, string Token);
        Task AddRole(RoleDTO data, string Token);
        Task EditRole(int id, RoleDTO data, string Token);
        Task DeleteRole(int id, string Token);
        Task<bool> RoleStatus(int id, string Token);
        Task<List<RoleDTO>> ActiveRoles(string Token);
        Task<List<RoleDTO>> InActiveRoles(string Token);


    }
}
