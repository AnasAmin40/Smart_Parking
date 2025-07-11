using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;

namespace Parking_API.Interface
{
    public interface ISlots
    {
        Task<IActionResult> GetAllSlots(int? locationid);
        Task<IActionResult?> GetSlotById(int id);
        Task<IActionResult> CreateSlot(ParkingSlot slot);
        Task<IActionResult> UpdateSlot(int id, ParkingSlot slot);
        Task<IActionResult> DeleteSlot(int id);
    }
}
