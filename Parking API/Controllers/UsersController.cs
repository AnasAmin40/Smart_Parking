using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Parking_API.Interface;
using Parking_API.Model;
using Parking_API.Model.Update;

namespace Parking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Interface.IUser _Iuser;
        public UsersController(Interface.IUser db)
        {
            _Iuser = db;
        }

        [HttpGet]

        //[Authorize(Roles = "Admin,User,SuperAdmin")]
        public async Task<IActionResult> GetallUserData()
        {
           var user = await _Iuser.GetallUserData();
            return Ok(user);
        }

        [HttpGet("{id}")]
        ////[Authorize(Roles = "Admin,User,SuperAdmin")]
        public async Task<IActionResult> GetUserById(int id)
        {
            if (id == 0)
            {
                return BadRequest(new { message = "User ID cannot be zero" });
            }

            var user = await _Iuser.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("AddUser")]
        //[Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> AddNewUser(Users data)
        {
            if (data == null)
            {
                return BadRequest(new { message = "User data cannot be null" });
            }
            
            await _Iuser.AddNewUser(data);
            return Ok(new { message = "User added successfully", user = data });

        }

        [HttpPost("AddNewUserByUser")]
        public async Task<IActionResult> AddNewUserByUser(Users data)
        {
            //if (data == null)
            //{
            //    return BadRequest(new { message = "User data cannot be null" });
            //}
            await _Iuser.AddNewUserByUser(data);
            return Ok(new { message = "User added successfully", user = data });
        }



        [HttpPut("UpdateUser/{id}")]
        ////[Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUser data)
        {
            if (data == null || id <= 0)
            {
                return BadRequest();
            }
            if (data != null)
            {
                await _Iuser.UpdateUserData(id, data);
            }

           

            return Ok(new { message = "User updated successfully"});
        }

        [HttpDelete("DeleteUser/{id}")]
        ////[Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { message = "User ID cannot be zero or negative" });
            }

            await _Iuser.DeleteUser(id);

            return Ok(new { message = "User Data Delete is Successfully: "});

        }


        

















        //[HttpPatch("UpdateUserStatus/{id}")]
        ////[Authorize(Roles = "Admin,SuperAdmin")]
        //public async Task<IActionResult> UpdateUserStatus(int id)
        //{
        //    if (id <= 0)
        //    {
        //        return BadRequest();
        //    }

        //    var userData = await _db.UsersTable.FirstOrDefaultAsync(u => u.Id == id);

        //    if(userData == null)
        //    {
        //        return NotFound(new { message = "User not found" });
        //    }

        //    userData.Active = !userData.Active; // Toggle the Active status
        //    await _db.SaveChangesAsync();
        //    return Ok(new { message = "User status updated successfully", User = userData });
        //}

        //[HttpGet("ActiveUser")]
        ////[Authorize(Roles = "Admin,User,SuperAdmin")]
        //public async Task<IActionResult> ActiveUser()
        //{
        //    var ActiveUserData = await _db.UsersTable.Include(x => x.Role).Where(a => a.Active).ToListAsync();
        //    if(ActiveUserData == null || !ActiveUserData.Any())
        //    {
        //        return NotFound(new { message = "No active users found" });
        //    }
        //    return Ok(ActiveUserData);
        //}

        //[HttpGet("InactiveUsers")]
        ////[Authorize(Roles = "Admin,User,SuperAdmin")]
        //public async Task<IActionResult> InactiveUsers()
        //{
        //    var InActiveUserData = await _db.UsersTable.Include(x => x.Role).Where(a => !a.Active).ToListAsync();
        //    if (InActiveUserData == null || !InActiveUserData.Any())
        //    {
        //        return NotFound(new { message = "No InActive users found" });
        //    }
        //    return Ok(InActiveUserData);
        //}
    }

}
