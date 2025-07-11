using Amazon.Runtime.Internal.Transform;
using Microsoft.AspNetCore.Mvc;
using Parking_API.Model;
using Parking_API.Services;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Models;
using Parking_Management_System.Models.DeserializeObjectResponces;

namespace Parking_Management_System.Controllers.AdminPage
{
    public class ToBookingController : Controller
    {
        private readonly IBookingDTO _iBooking;
        public ToBookingController(IBookingDTO bookingDTO)
        {
            _iBooking = bookingDTO;
        }

        public async Task<IActionResult> GetAllBooking()
        {
            var bookings = await _iBooking.BookingList();
            return new JsonResult(bookings);
        }

        [HttpPost]
        public async Task<IActionResult> NewBooking([FromBody] BookingRequest booking)
        {
            if(booking == null)
            {
                return BadRequest();
            }
            await _iBooking.AddNewBooking(booking);
            return Ok(new { success=true,
                message="New Booking Adding Successfully"
            });

        }


        public async Task<IActionResult> OnlyGetLocation()
        {
            var locations = await _iBooking.OnlyLocation();
            return new JsonResult(locations);
        }

        public async Task<List<CheckFreeslots>> CheckFreeSlot(int locationId, string Type)
        {
            var slots = await _iBooking.CheckFreeSlot(locationId, Type);
            return slots;
        }

        public async Task<List<SlotDTO>> AllSlot(int locationid,string slotType)
        {
            var slots = await _iBooking.AllSlot(locationid, slotType);
            return slots;
        }



        public async Task<IActionResult> GetBillList()
        {
            var Bill = await _iBooking.BillList();
            return new JsonResult(Bill);
        }

        public async Task<List<CheckActiveBooking>> GetActiveBooking(int userId)
        {
            if (userId <= 0)
            {
                return new List<CheckActiveBooking>();
            }
            var activeBookings = await _iBooking.GetActiveBooking(userId);
            return activeBookings;
        }

        public async Task<List<CheckActiveBooking>> GetUpcomingBooking(int userId)
        {
            if (userId <= 0)
            {
                return new List<CheckActiveBooking>();
            }
            var UpcomingBookings = await _iBooking.GetUpcomingBooking(userId);
            return UpcomingBookings;
        }

        public async Task<List<BookingHistory>> BookingHistory(int userId)
        {
            if (userId <= 0)
            {
                return new List<BookingHistory>();
            }
            var bookingHistory = await _iBooking.BookingHistory(userId);
            return bookingHistory;
        }

        public async Task<int> ActiveBooing(int userid)
        {
            return await _iBooking.ActiveBooking(userid);
        }

        public async Task<int> UpcomingBooing(int userid)
        {
            return await _iBooking.UpcomingBooking(userid);
        }

        public async Task<int> EntriesBike()
        {
            return await _iBooking.EntriesBike();
        }

        public async Task<int> EntriesCar()
        {
            return await _iBooking.EntriesCar();
        }

        public async Task<int> AllActiveBooking()
        {
            return await _iBooking.AllActiveBooking();
        }

        public async Task<int> ToIncome()
        {
            return await _iBooking.ToIncome();
        }

        public async Task<IActionResult> AddOneHour(int bookingId)
        {
            if (bookingId == 0)
            {
                return BadRequest();
            }
            await _iBooking.AddOneHour(bookingId);
            return Ok();
        }
        public async Task<List<SlotAvailabilityDto>> IsAvailable(int LocationId, DateTime StartTime, DateTime EndTime, string Slottype)
        {
            var slots = await _iBooking.isAvailable(LocationId, StartTime, EndTime, Slottype);
            return slots;
        }
        public async Task CancelBooking(int bookingId)
        {
            await _iBooking.CancelBooking(bookingId);
        }

        
        public async Task<IActionResult> PaidBooking(int bookingId)
        {     
            await _iBooking.PaidBooking(bookingId);
            return Ok(new
            {
                success = true,
                message = "Booking Paid"
            });
                
        }


    }
}
