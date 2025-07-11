using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parking_Management_System.Interface;
using Parking_Management_System.Models;

namespace Parking_Management_System.Controllers
{
    public class ToAuthenticationController : Controller
    {
        private readonly IAuthenticationController _iauthentication;

        public ToAuthenticationController(IAuthenticationController authentication)
        {
            _iauthentication = authentication;
        }

        [HttpPost]
        public async Task<IActionResult> LoginData([FromBody] LoginRequestDTO loginData)
        {
            if (ModelState.IsValid)
            {
                LoginResponseDTO response = await _iauthentication.UserLogin(loginData);
                if (response != null && !string.IsNullOrEmpty(response.Token))
                {
                    var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                    identity.AddClaim(new Claim(ClaimTypes.Name, response.usersTable.Name ?? ""));
                    identity.AddClaim(new Claim(ClaimTypes.Role, response.usersTable.Role?.Roles ?? "User"));

                    var principal = new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                    HttpContext.Session.SetString("Token", response.Token);
                    return Json(new
                    {
                        success = true,
                        token = response.Token,
                        roles = response.usersTable.Role?.Roles,
                        userId = response.usersTable.Id,
                        Name = response.usersTable.Name,
                        message = "Login successful."
                    });
                }
                else
                {
                    return Json(new { success = false, message = "Invalid login attempt." });
                }
            }

            return Json(new { success = false, message = "Validation failed." });
        }

        public async Task<IActionResult> LogOut()
        {
            await HttpContext.SignOutAsync();
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }

        public IActionResult LoginPage()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult AdminDashBoard()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult ParkingLocations()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult ParkingSlots()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Bookings()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Billing()
        {
            return View();
        }

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
