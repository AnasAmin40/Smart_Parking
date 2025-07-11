using Parking_Management_System.Models;

namespace Parking_Management_System.Interface.AdminPage
{
    public interface ILocationMVC
    {
        Task<List<LocationDTO>> GetAllLocation();
        Task AddLocation(LocationDTO Location);
        Task<LocationDTO> GetLocationbyId(int id);
        Task UpdateLocation(int id, LocationDTO Location);
        Task<int> CountLocation();
    }
}
