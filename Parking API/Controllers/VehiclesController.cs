using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Model;

namespace Parking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public VehiclesController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicles()
        {
            var vehicles = await _db.VehicleEntryExitTable.ToListAsync();
            return Ok(vehicles);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetVehicleById(int Id)
        {
            var vehicle = await _db.VehicleEntryExitTable.FindAsync(Id);
            if (vehicle == null)
            {
                return NotFound(new { message = "Vehicle not found" });
            }
            return Ok(vehicle);
        }


        //[HttpPost("AddVehicle")]
        //public async Task<IActionResult> AddVehicle(VehicleEntryExit vehicleData)
        //{
            

        //    if (vehicleData == null)
        //    {
        //        return BadRequest(new { message = "Vehicle data cannot be null" });
        //    }

        //    var freeSlot = await _db.ParkingSlotTable
        //         .Where(x => !x.IsOccupied  && x.SlotType==vehicleData.vehicleType)
        //         .OrderBy(x => x.Id)
        //         .FirstOrDefaultAsync();

        //    if (freeSlot == null)
        //    {
        //        return BadRequest(new { message = "No free slots available" });
        //    }

        //    freeSlot.IsOccupied = true;
        //    vehicleData.parkingSlotId = freeSlot.Id; // Assign the free slot to the vehicle


        //    //if(slot == null || slot.IsOccupied)
        //    //{
        //    //    return BadRequest(new { message = "This Slot is not available" });
        //    //}


        //    vehicleData.EntryTime = DateTime.UtcNow;
        //    vehicleData.ExitTime = null; 
        //    vehicleData.BillAmount = 0; 
        //    _db.VehicleEntryExitTable.Add(vehicleData);
        //    await _db.SaveChangesAsync();
        //    return Ok(vehicleData);
        //}


        //[HttpPut("ExitVehicle/{id}")]
        //public async Task<IActionResult> ExitsTimeAddTime(int id ,[FromBody] VehicleEntryExit UpdateData)
        //{
        //    if(id <=0 || UpdateData == null)
        //    {
        //        return BadRequest(new { message = "Invalid vehicle ID or data" });
        //    }

        //    var vehicle = await  _db.VehicleEntryExitTable.FindAsync(id);
        //    if(vehicle == null)
        //    {
        //        return NotFound(new { message = "Vehicle not found" });
        //    }
            
        //    var slot = await _db.ParkingSlotTable.FindAsync(vehicle.parkingSlotId);
        //    if(slot != null)
        //    {
        //        slot.IsOccupied = false;
        //        _db.ParkingSlotTable.Update(slot);
        //    }

        //    vehicle.ExitTime = DateTime.UtcNow;

        //    double ratePerHour = 0;
        //    var duration = (vehicle.ExitTime.Value - vehicle.EntryTime).TotalHours;
        //    if (vehicle.vehicleType == "Bike")
        //    {
        //        ratePerHour = 25;
        //        if (duration < 1)
        //        {
        //            duration = 1; 
        //        }
        //    }
        //    else if (vehicle.vehicleType == "Car")
        //    {
        //        ratePerHour = 50;
        //        if (duration < 2)
        //        {
        //            duration = 2; 
        //        }
        //    }
        //    else if (vehicle.vehicleType == "Truck")
        //    {
        //        ratePerHour = 70;
        //        if (duration < 3)
        //        {
        //            duration = 3; 
        //        }
        //    }
        //    else
        //    {
        //        return BadRequest(new { message = "Invalid vehicle type" });
        //    }


            
        //    vehicle.BillAmount = Math.Ceiling(duration) * ratePerHour;



        //    _db.VehicleEntryExitTable.Update(vehicle);
        //    await _db.SaveChangesAsync();
        //    return Ok(new
        //    {
        //        message = "Vehicle exit time Update succssfully.",
        //        billAmount = vehicle.BillAmount,
        //        exitTime = vehicle.ExitTime
        //    });
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteVehicle(int id)
        //{
        //    if(id <= 0)
        //    {
        //        return BadRequest(new { message = "Invalid vehicle ID" });
        //    }

        //    var vehicle = await _db.VehicleEntryExitTable.FindAsync(id);
        //    if (vehicle == null)
        //    {
        //        return NotFound(new { message = "Vehicle not found" });
        //    }
        //    var slot = await _db.ParkingSlotTable.FindAsync(vehicle.parkingSlotId);
        //    if (slot != null)
        //    {
        //        slot.IsOccupied = false; 
        //        _db.ParkingSlotTable.Update(slot);
        //    }
        //    _db.VehicleEntryExitTable.Remove(vehicle);
        //    await _db.SaveChangesAsync();
        //    return Ok(new { message = "Vehicle deleted successfully" });
        //}
    }
}
