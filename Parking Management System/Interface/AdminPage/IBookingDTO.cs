
using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;

namespace Parking_Management_System.Interface.AdminPage
{
    public interface IBookingDTO
    {
        Task<List<BookingDTO>> BookingList();
        Task AddNewBooking(BookingRequest booking);
        Task<List<GetonlyLocation>> OnlyLocation();
        Task<List<CheckFreeslots>> CheckFreeSlot(int locationid, string type);
        Task<List<SlotDTO>> AllSlot(int locationid, string slotType);
        Task<List<BillDTO>> BillList();
        Task<List<CheckActiveBooking>> GetActiveBooking(int userId);
        Task<List<CheckActiveBooking>> GetUpcomingBooking(int userId);
        Task<List<BookingHistory>> BookingHistory(int userId);
        Task<int> UpcomingBooking(int userid);
        Task<int> ActiveBooking(int userid);
        Task<int> EntriesBike();
        Task<int> EntriesCar();
        Task<int> AllActiveBooking();
        Task<int> ToIncome();
        Task AddOneHour(int bookingId);
        Task<List<SlotAvailabilityDto>> isAvailable(int LocationId, DateTime StartTime, DateTime EndTime, string Slottype);
        Task CancelBooking(int bookingId);
        Task PaidBooking(int bookingId);
    }
}
