using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGeneration;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Models;

namespace Parking_Management_System.Controllers.AdminPage
{
    public class ToLocationController : Controller
    {
        private readonly ILocationMVC _iLocation;
        public ToLocationController(ILocationMVC locationMVC)
        {
            _iLocation = locationMVC;
        }
        
        public async Task<List<LocationDTO>> GetAllLocation()
        {
            return await _iLocation.GetAllLocation();
        }

        [HttpPost]
        public async Task<IActionResult> AddLocation([FromBody]LocationDTO Location)
        {
            if (Location == null)
            {
                return BadRequest("Location data is null");
            }

            await _iLocation.AddLocation(Location);
            return Ok(new { message = "Location Added Successfully" });
        }

        public async Task<IActionResult> GetLocationById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var locaiton = await _iLocation.GetLocationbyId(id);
            return new JsonResult(locaiton);
        }


        public async Task<IActionResult> UpdateLocation([FromBody] LocationDTO Location)
        {
            if(Location== null)
            {
                return BadRequest();
            }

            await _iLocation.UpdateLocation(Location.ParkingLocationId, Location);
            return Ok(new { message = "Update Location" });

        }

        public async Task<int> CountLocation()
        {
           return await _iLocation.CountLocation();
        }
    }
}
