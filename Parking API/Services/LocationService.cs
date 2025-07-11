using System.Runtime.CompilerServices;
using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Parking_API.Data;
using Parking_API.Interface;
using Parking_API.Model;

namespace Parking_API.Services
{
    public class LocationService : ILocation
    {
        private readonly ApplicationDbContext _db;

        public LocationService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> GetAllLocations()
        {
            var Location = await _db.ParkingLocationTable.ToListAsync();
            if (Location == null || !Location.Any())
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(Location);
        }

        public async Task<IActionResult?> GetLocationById(int id)
        {
            if (id == 0)
            {
                return null;
            }

            var location = await _db.ParkingLocationTable.FirstOrDefaultAsync(l => l.ParkingLocationId == id);

            if (location == null)
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(location);
        }

        public async Task<IActionResult> CreateLocation(ParkingLocation location)
        {
            if (location != null)
            {
                _db.ParkingLocationTable.Add(location);
                await _db.SaveChangesAsync();
                return new OkObjectResult(location);
            }
            else
            {
                return new BadRequestResult();
            }
        }

        public async Task<IActionResult> UpdateLocation(int id, ParkingLocation location)
        {
            if (id == 0 || location == null)
            {
                return new BadRequestResult();
            }

            var existingLocation = await _db.ParkingLocationTable.FindAsync(id);
            if (existingLocation == null)
            {
                return new NotFoundResult();
            }

            existingLocation.Name = location.Name;
            existingLocation.City = location.City;
            existingLocation.TotalSlots = location.TotalSlots;

            _db.ParkingLocationTable.Update(existingLocation);
            await _db.SaveChangesAsync();
            return new OkObjectResult(existingLocation);
        }

        public async Task<IActionResult> DeleteLocation(int id)
        {
            if (id == 0)
            {
                return null;
            }

            var Location = await _db.ParkingLocationTable.FindAsync(id);
            if (Location == null)
            {
                return new NotFoundResult();
            }

            _db.ParkingLocationTable.Remove(Location);
            await _db.SaveChangesAsync();
            return new OkObjectResult(new { message = "Location deleted successfully" });
        }

        public async Task<IActionResult> CountLocation()
        {
            int count = await _db.ParkingLocationTable.CountAsync();
            return new OkObjectResult(count);
        }
    }
}
