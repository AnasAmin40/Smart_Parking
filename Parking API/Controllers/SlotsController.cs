using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Interface;

//using Parking_API.Migrations;
using Parking_API.Model;

namespace Parking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotsController : ControllerBase
    {
        private readonly ISlots _iSlots;
        public SlotsController(ISlots slot)
        {
            _iSlots = slot;
        }

        [HttpGet("GetSlotByLocation")]
        public async Task<IActionResult> GetAllSlots(int location)
        {
            var slots = await _iSlots.GetAllSlots(location);
            return Ok(slots);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetSlotById(int Id)
        {
            var slot = await _iSlots.GetSlotById(Id);
            if (slot == null)
            {
                return NotFound(new { message = "Slot not found" });
            }
            return Ok(slot);
        }

        [HttpPost("AddSlot")]
        public async Task<IActionResult> AddSlot(ParkingSlot slotData)
        {
            if (slotData == null)
            {
                return BadRequest(new { message = "Slot data cannot be null" });
            }

            await _iSlots.CreateSlot(slotData);
            return Ok(new { message = "Slot added successfully", slot = slotData });
        }




        [HttpPut("UpdateSlot/{id}")]
        public async Task<IActionResult> UpdateSlot(int id, [FromBody] ParkingSlot SlotData)

        {
            if (SlotData == null)
            {
                return BadRequest(new { message = "Slot data cannot be null" });
            }

            var ExistingSlot = await _iSlots.UpdateSlot(id, SlotData);
            if (ExistingSlot == null)
            {
                return NotFound(new { message = "Slot not found" });
            }

            if (string.IsNullOrWhiteSpace(SlotData.SlotNumber))
            {
                return BadRequest(new { message = "Slot number cannot be empty" });
            }


            return Ok(new {message ="Slot Updated"});

            //if (await _db.ParkingSlotTable.AnyAsync(x => x.SlotNumber == SlotData.SlotNumber && x.Id != id))
            //{
            //    return BadRequest(new { message = "Slot number already exists" });
            //}


        }

        [HttpDelete("DeleteSlot/{id}")]
        public async Task<IActionResult> DeleteSlot(int id)
        {
            var slot = await _iSlots.DeleteSlot(id);
            if (slot == null)
            {
                return NotFound(new { message = "Slot not found" });
            }
            
            return Ok(new { message = "Slot deleted successfully" });
        }

        

        //[HttpPatch("UpdateSlotStatus/{id}")]
        //public async Task<IActionResult> UpdateSlotStatus(int id)
        //{
        //    var slot = await _db.ParkingSlotTable.FindAsync(id);
        //    if (slot == null)
        //    {
        //        return NotFound(new { message = "Slot not found" });
        //    }

        //    slot.IsOccupied = !slot.IsOccupied;
        //    _db.ParkingSlotTable.Update(slot);
        //    await _db.SaveChangesAsync();
        //    return Ok(new { message = "Slot status updated successfully"});
        //}
    }
}
