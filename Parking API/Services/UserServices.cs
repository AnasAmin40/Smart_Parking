using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Interface;
using Parking_API.Model;
using Parking_API.Model.Update;
using System.Threading.Tasks;

namespace Parking_API.Services
{
    public class UserServices : IUser
    {
        private readonly ApplicationDbContext _db;
        public UserServices(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> GetallUserData()
        {
            var users = await _db.UsersTable.Include(x => x.Role).ToListAsync();
            if (users == null || !users.Any())
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(users);
        }

        public async Task<IActionResult> GetUserById(int id)
        {
            if (id == 0)
            {
                return new BadRequestResult();
            }
            var user = await _db.UsersTable.Include(x => x.Role).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(user);
        }

        public async Task<IActionResult> AddNewUser(Users data)
        {
            if (data == null)
            {
                return new BadRequestResult();
            }

            await _db.UsersTable.AddAsync(data);
            await _db.SaveChangesAsync();
            return new OkObjectResult(data);
        }

        public async Task<IActionResult> UpdateUserData(int id, UpdateUser data)
        {
            if (id == 0 || data == null)
            {
                return new BadRequestResult();
            }

            var existingUser = await _db.UsersTable.FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser != null)
            {
                existingUser.Name = data.Name;
                existingUser.Email = data.Email;
                existingUser.Active = data.Active;
                existingUser.MobileNumber = data.MobileNumber;
                existingUser.RoleId = data.RoleId;
                await _db.SaveChangesAsync();

                return new OkObjectResult(existingUser);
            }
            else
            {
                return new NotFoundResult();
            }
        }

        public async Task<IActionResult> AddNewUserByUser(Users data)
        {
            data.RoleId = 2;
            data.Active = true;
            await _db.UsersTable.AddAsync(data);
            await _db.SaveChangesAsync();
            return new OkObjectResult(data);
        }

        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id == 0)
            {
                return new BadRequestResult();
            }

            var user = await _db.UsersTable.FirstOrDefaultAsync(u => u.Id == id);

            if (user != null)
            {
                _db.UsersTable.Remove(user);
                await _db.SaveChangesAsync();
                return new OkObjectResult(new { message = "User deleted successfully" });
            }
            else
            {
                return new NotFoundResult();
            }
        }
    }
}
