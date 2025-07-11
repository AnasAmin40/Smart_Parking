using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Parking_API.Interface;
using Parking_API.Model;

namespace Parking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocation _iLocation;
        public LocationController(ILocation location)
        {
            _iLocation = location;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLocations()
        {
            var locations = await _iLocation.GetAllLocations();
            return Ok(locations);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetLocationById(int Id)
        {
            var location = await _iLocation.GetLocationById(Id);
            if (location == null)
            {
                return NotFound(new { message = "Location not found" });
            }

            return Ok(location);
        }

        [HttpPost("AddLocation")]
        public async Task<IActionResult> AddLocation(ParkingLocation locationData)
        {
            if (locationData == null)
            {
                return BadRequest(new { message = "Location data cannot be null" });
            }


            var result = await _iLocation.CreateLocation(locationData);
            if (result is BadRequestResult)
            {
                return BadRequest(new { message = "Failed to create location" });
            }
            return Ok(result);
        }

        [HttpPut("UpdateLocation/{id}")]
        public async Task<IActionResult> UpdateLocation(int id, ParkingLocation LocationData)
        {
            if (LocationData == null || id <= 0)
            {
                return BadRequest(new { message = "Invalid location data or ID" });
            }
            var result = await _iLocation.UpdateLocation(id, LocationData);
            if (result is NotFoundResult)
            {
                return NotFound(new { message = "Location not found" });
            }
            else if (result is BadRequestResult)
            {
                return BadRequest(new { message = "Failed to update location" });
            }
            return Ok(new { message = "Updated Location" });
        }


        [HttpDelete("DeleteLocation/{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { message = "Invalid location ID" });
            }
            var result = await _iLocation.DeleteLocation(id);
            if (result is NotFoundResult)
            {
                return NotFound(new { message = "Location not found" });
            }
            else if (result is BadRequestResult)
            {
                return BadRequest(new { message = "Failed to delete location" });
            }
            return Ok(new { message = "Location deleted successfully" });
        }



        [HttpGet("CountLocation")]
        public async Task<IActionResult> CountLocation()
        {
            var count = await _iLocation.CountLocation();
            
            return Ok(count);
        }

    }
}
