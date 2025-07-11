using Parking_Management_System.Models;

namespace Parking_Management_System.Interface
{
    public interface IAuthenticationController
    {
        Task<LoginResponseDTO> UserLogin(LoginRequestDTO loginData);
    }
}
