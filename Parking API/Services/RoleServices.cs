using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Interface;
using Parking_API.Model;

namespace Parking_API.Services
{
    public class RoleServices : IRole
    {
        private readonly ApplicationDbContext _db;
        public RoleServices(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _db.RolesTable.ToListAsync();
            if (roles == null || !roles.Any())
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(roles);
        }

        public async Task<IActionResult> GetRoleById(int id)
        {
            if(id == 0)
            {
                return null;
            }

            var role = await _db.RolesTable.FirstOrDefaultAsync(r => r.RoleId == id);
            if (role == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(role);
        }


        public async Task<IActionResult> AddRole(Role data)
        {
            if (data == null)
            {
                return null;
            }

            await _db.RolesTable.AddAsync(data);
            await _db.SaveChangesAsync();
            return new OkObjectResult(data);
        }
        

        public async Task<IActionResult> UpdateRole(int id, Role data)
        {
            if(id==0 || data == null)
            {
                return null;
            }

            var existingRole = await _db.RolesTable.FirstOrDefaultAsync(r => r.RoleId == id);

            existingRole.Active = data.Active;
            existingRole.Roles = data.Roles;
            existingRole.CreatedTime = data.CreatedTime;
            _db.RolesTable.Update(existingRole);
            await _db.SaveChangesAsync();
            return new OkObjectResult(existingRole);

        }

        public async Task<IActionResult> DeleteRole(int id)
        {
            if (id == 0)
            {
                return null;
            }

            var DeleteRole = await _db.RolesTable.FirstOrDefaultAsync(x => x.RoleId == id);
            if(DeleteRole == null)
            {
                return null;
            }

            _db.RolesTable.Remove(DeleteRole);
            await _db.SaveChangesAsync();
            return new OkObjectResult(new {message="Deleted Role"});
        }

    }
}
