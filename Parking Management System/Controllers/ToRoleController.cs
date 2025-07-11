using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parking_Management_System.Interface;
using Parking_Management_System.Models;

namespace Parking_Management_System.Controllers
{
    public class ToRoleController : Controller
    {
        private readonly string _token;
        private readonly IRole _irole;

        public ToRoleController(IRole role, IHttpContextAccessor httpContextAccessor)
        {
            _irole = role;
            _token = httpContextAccessor.HttpContext.Session.GetString("Token");
        }

        //[Authorize(Roles = "SuperAdmin")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Index()
        {
            List<RoleDTO> data = await _irole.GetAllRoles(_token);
            return View(data);
        }

        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetRoleList()
        {
            var data = await _irole.GetAllRoles(_token);
            return new JsonResult(data);
        }

        //For Ajax
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> AddNewRole([FromBody] RoleDTO data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _irole.AddRole(data, _token);
                return Ok(new { message = "Role Added Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding the role.", error = ex.Message });
            }
        }

        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> EditRolebyAjax(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            try
            {
                var token = HttpContext.Session.GetString("Token");
                var data = await _irole.GetRoleById(id, _token);
                return new JsonResult(data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //[Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> UpdateRoleByAjax([FromBody] RoleDTO updateRole)
        {
            if (updateRole == null)
            {
                return BadRequest("Role data is null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Invalid Data." });
            }
            try
            {
                var Token = HttpContext.Session.GetString("Token");
                await _irole.EditRole(updateRole.RoleId, updateRole, _token);
                return new JsonResult("Data is Updated Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteRoleWithAjax(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            try
            {
                var token = HttpContext.Session.GetString("Token");
                await _irole.DeleteRole(id, _token);
                return new JsonResult("Data Delete");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //[Authorize(Roles = "Admin,User")]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Details(int id)
        {
            RoleDTO data = await _irole.GetRoleById(id, HttpContext.Session.GetString("Token"));
            return new JsonResult("Data is Save");
        }

        //[Authorize(Roles = "Admin")]
        //[Authorize(Roles = "SuperAdmin")]
        public IActionResult Create()
        {
            return View();
        }

        //[Authorize(Roles = "Admin")]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateRole(RoleDTO data)
        {
            await _irole.AddRole(data, _token);
            return RedirectToAction("Index", "ToRole");
        }

        //[Authorize(Roles = "Admin")]
        //[Authorize(Roles = "SuperAdmin")]
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            RoleDTO data = await _irole.GetRoleById(id, _token);
            return View(data);
        }

        //[Authorize(Roles = "Admin")]
        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> EditRole(int id, RoleDTO data)
        {
            await _irole.EditRole(data.RoleId, data, _token);
            return RedirectToAction("Index", "ToRole");
        }

        [HttpGet]
        //[Authorize(Policy = "SuperAdminOnly")]
        //[Authorize(Roles = "Admin")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(int id)
        {
            RoleDTO data = await _irole.GetRoleById(id, _token);
            return View(data);
        }

        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteRole(int RoleId)
        {
            await _irole.DeleteRole(RoleId, _token);
            return RedirectToAction("Index", "ToRole");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        //[Authorize(Roles = "Admin")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> RoleStatus(int id)
        {
            await _irole.RoleStatus(id, _token);
            return RedirectToAction("Index", "ToRole");
        }

        //[Authorize]
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> ActiveRole()
        {
            List<RoleDTO> data = await _irole.ActiveRoles(_token);
            ViewBag.IsActive = true;
            return View("Index", data);
        }

        //[Authorize]
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> InActiveRole()
        {
            List<RoleDTO> data = await _irole.InActiveRoles(_token);
            ViewBag.IsActive = false;
            return View("Index", data);
        }
    }
}
