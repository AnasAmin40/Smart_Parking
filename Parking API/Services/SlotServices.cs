using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Interface;
using Parking_API.Model;

namespace Parking_API.Services
{
    public class SlotServices : ISlots
    {
        private readonly ApplicationDbContext _db;
        public SlotServices(ApplicationDbContext db)
        {
            this._db = db;
        }
        public Task<IActionResult> CreateSlot(ParkingSlot slot)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> DeleteSlot(int id)
        {
            throw new NotImplementedException();
        }

        
        public async Task<IActionResult> GetAllSlots(int? locationId)
        {

            var slots = _db.ParkingSlotTable.Include(x => x.ParkingLocation).AsQueryable();

            if (locationId != null)
            {
                slots = slots.Where(x => x.ParkingLocationId == locationId);
            }

            return new OkObjectResult(slots);
        }

        public async Task<IActionResult> GetAlllSlots(int? locationId)
        {
            // Start query including related ParkingLocation
            var query = _db.ParkingSlotTable.Include(x => x.ParkingLocation).AsQueryable();

            // If locationId is provided, filter by it
            if (locationId.HasValue && locationId.Value > 0)
            {
                query = query.Where(x => x.ParkingLocationId == locationId.Value);
            }

            // Execute query asynchronously and get list
            var slots = await query.ToListAsync();

            return new OkObjectResult(slots);
        }


        public Task<IActionResult?> GetSlotById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> UpdateSlot(int id, ParkingSlot slot)
        {
            throw new NotImplementedException();
        }
    }
}
