using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Models;

namespace Parking_Management_System.Controllers.AdminPage
{
    public class ToSlotsController : Controller
    {
        private readonly IslotsMVC _Islots;
        public ToSlotsController(IslotsMVC islotsMVC)
        {
            _Islots = islotsMVC;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSlots(int? locationId)
        {
            var AllSlots =  await _Islots.GetAllSlot(locationId);
            return new JsonResult(AllSlots);
        }

        [HttpPost]
        public async Task<IActionResult> AddSlot([FromBody] SlotDTO slot)
        {
            if (slot == null)
            {
                return BadRequest();
            }

            var newSlot = _Islots.AddSlot(slot);
            return Ok(new {message="Slot Added Successfully"});
        }


        public async Task<IActionResult> EditSlot(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var slot = await _Islots.EditSlot(id);
            return new JsonResult(slot);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSlot(int id, [FromBody]SlotDTO slot)
        {
            if (slot == null)
            {
                return BadRequest();
            }

            await _Islots.UpdateSlot(slot.SlotId, slot);
            return Ok(new { message = "Update Slot Successfully" });
        }
        
    }
}
