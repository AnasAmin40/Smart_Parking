using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Parking_API.Data;
using Parking_API.Model.JWTSevices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Parking_API.Controllers.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly string _SecretKey;
        public UserAuthenticationController(ApplicationDbContext db, IConfiguration configuration)
        {
            _db = db;
            _SecretKey = configuration.GetValue<string>("Jwt:key");
        }

        [AllowAnonymous]
        [IgnoreAntiforgeryToken]
        [HttpPost("UserLogin")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest LoginData)
        {
            var user =await _db.UsersTable.Include(x=>x.Role).FirstOrDefaultAsync(x => x.Email == LoginData.Email && x.Password == LoginData.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }


            // Create JWT token

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name,user.Name ?? ""),
                    new Claim(ClaimTypes.Email,user.Email ?? ""),
                    new Claim(ClaimTypes.Role,user.Role?.Roles?? "user")
                }),

                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var Token = tokenHandler.CreateToken(tokenDescriptor);

            LoginResponse response = new LoginResponse()
            {
                Token = tokenHandler.WriteToken(Token),
                usersTable = user,
                IsSuccess = true,
                Message = "Login Successful",
                Role = user.Role?.Roles ?? "User",
                userID=user.Id,
                Username = user.Name
            };
            return Ok(response);
        }

        
    }
}
