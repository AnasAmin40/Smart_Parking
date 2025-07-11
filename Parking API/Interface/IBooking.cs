using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;

namespace Parking_API.Interface
{
    public interface IBooking
    {
        Task<IActionResult> GetAllBookings();
        Task<IActionResult> GetBookingById(int bookingId);
        Task<IActionResult> CreateBooking(BookingRequest booking);
        Task<IActionResult> CompleteBooking(int id, Booking booking);
        Task<IActionResult> UpdateBooking(int id, Booking bookingData);
        Task<IActionResult> DeleteBooking(int bookingId);

        Task<IActionResult> GetLocation();
        Task<IActionResult> GetAvailableSlot(int locationId, string SlotType);
        Task<IActionResult> GetAllSlots(int locationid, string slotType);
        Task<IActionResult> GetBillList();
        Task<IActionResult> GetUserActiveBookings(int userId);
        Task<IActionResult> GetUpcomingBooking(int userId);
        Task<IActionResult> BookingHistory(int userId);
        Task<IActionResult> ActiveBookingCounter(int userid);
        Task<IActionResult> UpcomingBookingCounter(int userid);
        Task<int> CountTodayEntriesBike();
        Task<int> CountTodayEntriesCar();
        Task<int> ActiveBooking();
        Task<IActionResult> TodayIncome();
        Task<IActionResult> IncreaseOneHour(int bookingId);
        Task<List<SlotAvailabilityDto>> SlotIsAvailable(int LocationId, DateTime StartTime, DateTime EndTime, string Slottype);
        Task<IActionResult> CancelledBooking(int bookingId);
        Task<IActionResult> PaidBooking(int bookingId);
    }
}
