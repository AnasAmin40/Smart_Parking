using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Parking_API.Data;
using Parking_API.Interface;
using Parking_API.Model;

namespace Parking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "SuperAdminOnly")]
    public class RoleController : ControllerBase
    {
        private readonly IRole _iRole;

        public RoleController(IRole db)
        {
            _iRole = db;
        }


        [HttpGet]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _iRole.GetAllRoles();
            return Ok(roles);
        }



        [HttpGet("{Id}")]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetRoleById(int Id)
        {
           var role = await _iRole.GetRoleById(Id);
            return Ok(role);

        }

        [HttpPost("AddRole")]
        //[Authorize(Roles = "SuperAdmin")]
        //[Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddRole(Role data)
        {

            if (data.Roles == null || data.Roles.Trim() == "")
            {
                return BadRequest(new { message = "Role name cannot be empty" });
            }

            await _iRole.AddRole(data);

            return Ok(new {message ="Role is successfully Added"});
        }

        [HttpPut("UpdateRole/{id}")]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateRole(Role data, int id)
        {
            if (data == null)
            {
                return BadRequest(new { message = "Role data cannot be null" });
            }
           
            await _iRole.UpdateRole(id, data);
            return Ok(new {message = "Data is Update"});

        }

        [HttpDelete("DeleteRole/{id}")]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            if (id == 0)
            {
                return BadRequest(new { message = "Invalid role ID" });
            }

            await _iRole.DeleteRole(id);
            
            return Ok(new { message = "Role Deleted Successfully: "});
        }

        ////[Authorize(Roles = "Admin")]
        //[HttpPatch("{id}/toggle")]
        //[Authorize(Roles = "SuperAdmin")]
        //public async Task<IActionResult> ToggleRoleStatus(int id)
        //{
        //    var role = await _db.RolesTable.FindAsync(id);
        //    if (role == null)
        //    {
        //        return NotFound(new { message = "Role not found" });
        //    }
        //    role.Active = !role.Active;
        //    await _db.SaveChangesAsync();
        //    return Ok(new { message = $"Role '{role.Roles}' is now {(role.Active? "Active" : "Inactive")}.", role });
        //}

        //[HttpGet("ActiveRole")]
        ////[Authorize(Roles = "Admin,User")]
        //[Authorize(Roles = "SuperAdmin")]
        //public async Task<IActionResult> ActiveRole()
        //{
        //    var activeRoles = await _db.RolesTable.Where(x => x.Active).ToListAsync();
        //    if (activeRoles == null || !activeRoles.Any())
        //    {
        //        return NotFound(new { message = "No active Role found" });
        //    }

        //    return Ok(activeRoles);
        //}

        //[HttpGet("InActiveRole")]
        ////[Authorize(Roles = "SuperAdmin")]
        //public async Task<IActionResult> InActiveRole()
        //{
        //    var InactiveRoles = await _db.RolesTable.Where(x => !x.Active).ToListAsync();
        //    if (InactiveRoles == null || !InactiveRoles.Any())
        //    {
        //        return NotFound(new { message = "No InActive Role found" });
        //    }

        //    return Ok(InactiveRoles);
        //}
    }
}
