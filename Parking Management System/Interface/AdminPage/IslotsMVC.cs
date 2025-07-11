using Microsoft.AspNetCore.Mvc;
using Parking_Management_System.Models;

namespace Parking_Management_System.Interface.AdminPage
{
    public interface IslotsMVC
    {
        Task<List<SlotDTO>> GetAllSlot(int? locationId);
        Task AddSlot(SlotDTO slot);
        Task<SlotDTO> EditSlot(int id);
        Task UpdateSlot(int id, [FromBody] SlotDTO slot);
    }
}
