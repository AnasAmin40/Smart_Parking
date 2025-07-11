using Humanizer.Localisation.TimeToClockNotation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using NuGet.Common;
using Parking_Management_System.Models;
using Parking_Management_System.Service;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using Microsoft.Identity.Client;
using Parking_Management_System.Interface;
using Parking_Management_System.Models.Update;

namespace Parking_Management_System.Controllers
{
    public class ToUserController : Controller
    {
        private readonly string _token;
        private readonly IUserMVC _iUser;
        private readonly IRole _iRole;
        public ToUserController(IUserMVC userInterface, IRole roleinterface, IHttpContextAccessor httpContextAccessor)
        {
            _iUser = userInterface;
            _iRole = roleinterface;
            _token = httpContextAccessor.HttpContext.Session.GetString("Token");
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult Users()
        {
            return View();
        }

        public async Task<IActionResult> GetAllUser()
        {
            var data = await _iUser.GetAllUser(_token);
            return new JsonResult(data);
        }

        public async Task<IActionResult> AddUserUsingAjax([FromBody] UserDTO userData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _iUser.AddUser(userData, _token);
                return new JsonResult("User added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding the User.", error = ex.Message });
            }
        }

        public async Task<IActionResult> AdduserByUser([FromBody] UserDTO userData)
        {
            ModelState.Remove("Active");
            ModelState.Remove("RoleId");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _iUser.AddUserByUser(userData, _token);
                return new JsonResult("User added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding the User.", error = ex.Message });
            }
        }

        public async Task<IActionResult> EditUserByAjax(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            try
            {
                UserDTO userData = await _iUser.GetUserById(id, _token);
                return new JsonResult(userData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching the User.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUserUsingAjax([FromBody] UpdateUser user)
        {
            if (user == null)
            {
                return BadRequest("Role data is null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                await _iUser.UpdateUserData(user.Id, user, _token);
                return new JsonResult("Update Data Successfully!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult Dashboard()
        {
            return View();
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult AvailableParking()
        {
            return View();
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult BookParkingSlot()
        {
            return View();
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult CurrentBooking()
        {
            return View();
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult UpcomingBooking()
        {
            return View();
        }

        [Authorize(Roles = "Admin,User")]
        public IActionResult BookingHistory()
        {
            return View();
        }

        //public async Task<IActionResult> DeleteUserUsingAjax(int id)
        //{
        //    if ((id==0))
        //    {
        //        return BadRequest();
        //    }
        //    try
        //    {
        //        var token = HttpContext.Session.GetString("Token");
        //        await _userService.DeleteUser(id, token);
        //        return new JsonResult("User Deleted Successfully!");
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        ////[Authorize(Roles = "Admin,SuperAdmin")]
        //public async Task<IActionResult> ChangeStatus(int id)
        //{
        //    UserDTO data = await _iUser.GetUserById(id, HttpContext.Session.GetString("Token"));

        //    var AllUser = await _iUser.GetAllUser(HttpContext.Session.GetString("Token"));

        //    int SuperAdminId = 15;
        //    if (data.RoleId == SuperAdminId)
        //    {
        //        var SuperAdmin = AllUser.Where(u => u.RoleId==SuperAdminId && u.Active ==true).ToList();

        //        var InActiveSuperAdmin = AllUser.Where(u => u.Active == false && u.Id == id).ToList();

        //        if (InActiveSuperAdmin.Count == 1)
        //        {
        //            await _iUser.ChangeActive(id, HttpContext.Session.GetString("Token"));
        //            return RedirectToAction("Index", "ToUser");
        //        }

        //        if(SuperAdmin.Count ==1)
        //        {
        //            TempData["Error"] = "One Super Admin must always be Active";
        //            return RedirectToAction("Index");
        //        }
        //    }
        //    await _iUser.ChangeActive(id, HttpContext.Session.GetString("Token"));
        //    return RedirectToAction("Index", "ToUser");
        //}
    }
}
