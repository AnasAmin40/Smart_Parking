using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;

namespace Parking_API.Interface
{
    public interface ILocation
    {
        Task<IActionResult> GetAllLocations();
        Task<IActionResult?> GetLocationById(int id);
        Task<IActionResult> CreateLocation(ParkingLocation location);
        Task<IActionResult> UpdateLocation(int id, ParkingLocation location);
        Task<IActionResult> DeleteLocation(int id);
        Task<IActionResult> CountLocation(); // ← Ye rakh liya
    }
}
