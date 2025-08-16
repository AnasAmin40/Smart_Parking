using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Parking_API.Interface;
using Parking_API.Model;

namespace Parking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBooking _iBooking;

        public BookingController(IBooking iBooking)
        {
            _iBooking = iBooking;
        }

        [HttpGet("AllBooking")]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _iBooking.GetAllBookings();
            return Ok(bookings);
        }

        [HttpGet("GetBookingById/{id}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var booking = await _iBooking.GetBookingById(id);
            return Ok(booking);
        }

        [HttpPost("CreateBooking")]
        public async Task<IActionResult> CreateBooking(BookingRequest bookingData)
        {

            if (bookingData.UserId == 0 || bookingData.LocationId == 0 || bookingData.SlotId == 0 || bookingData.SlotType == "")
                return BadRequest("User ID, Location ID, and Slot ID are required.");

            await _iBooking.CreateBooking(bookingData);
            var respone = new
            {
                message = "Booking Created Successfully",
                Sueccess = true
            };
            return Ok(respone);

        }

        [HttpPut("CompleteBooking/{id}")]
        public async Task<IActionResult> CompleteBooking(int id, Booking bookingData)
        {
            if (id == 0 || bookingData == null)
            {
                return BadRequest();
            }

            await _iBooking.CompleteBooking(id, bookingData);
            return Ok();
        }

        [HttpPut("UpdateBooking/{id}")]
        public async Task<IActionResult> UpdateBooking(int id, Booking bookingData)
        {
            if (id == 0 || bookingData == null)
            {
                return BadRequest();
            }

            await _iBooking.UpdateBooking(id, bookingData);
            return Ok(new { message = "Update Booking Data" });
        }

        [HttpDelete("DeleteBooking/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            await _iBooking.DeleteBooking(id);
            return Ok(new { message = "Delete Booking Data" });

        }

        [HttpGet("GetAllLocation")]
        public async Task<IActionResult> GetAllLocation()
        {
            var location = await _iBooking.GetLocation();
            return Ok(location);
        }


      

        [HttpGet("GetAllSlots/{locationid}")]
        public async Task<IActionResult> GetAllSlots(int locationid,string slotType)
        {
            var slots = await _iBooking.GetAllSlots(locationid,slotType);
            return Ok(slots);
        }

        [HttpGet("GetBillList")]
        public async Task<IActionResult> GetBillList()
        {
            var billlist = await _iBooking.GetBillList();
            return Ok(billlist);
        }

        [HttpGet("GetUserActiveBookings/{userId}")]
        public async Task<IActionResult> GetUserActiveBookings(int userId)
        {
            if (userId <= 0)
            {
                return BadRequest(new { message = "Invalid User ID" });
            }
            var activeBookings = await _iBooking.GetUserActiveBookings(userId);
            return Ok(activeBookings);
        }


        [HttpGet("GetUpcomingBooking/{userId}")]
        public async Task<IActionResult> GetUpcomingBooking(int userId)
        {
            if (userId <= 0)
            {
                return BadRequest(new { message = "Invalid User ID" });
            }
            var activeBookings = await _iBooking.GetUpcomingBooking(userId);
            return Ok(activeBookings);
        }


        [HttpGet("BookingHistory/{userId}")]
        public async Task<IActionResult> BookingHistory(int userId)
        {
            if (userId <= 0)
            {
                return BadRequest(new { message = "Invalid User ID" });
            }
            var bookingHistory = await _iBooking.BookingHistory(userId);
            return Ok(bookingHistory);
        }

        [HttpGet("ActiveBookingCounter/{userid}")]
        public async Task<IActionResult> ActiveBookingCounter(int userid)
        {
            var activeBookingCount = await _iBooking.ActiveBookingCounter(userid);
            return Ok(activeBookingCount);
        }

        [HttpGet("UpcomingBookingCounter/{userid}")]
        public async Task<IActionResult> UpcomingBookingCounter(int userid)
        {
            var activeBookingCount = await _iBooking.UpcomingBookingCounter(userid);
            return Ok(activeBookingCount);
        }


        [HttpGet("CountTodayEntriesBike")]
        public async Task<int> CountTodayEntriesBike()
        {
            var count = await _iBooking.CountTodayEntriesBike();
            return count;
        }

        [HttpGet("CountTodayEntriesCar")]
        public async Task<int> CountTodayEntriesCar()
        {
            var count = await _iBooking.CountTodayEntriesCar();
            return count;
        }


        [HttpGet("AllActiveBooking")]
        public async Task<int> ActiveBooking()
        {
            var activeBookingCount = await _iBooking.ActiveBooking();
            return activeBookingCount;
        }


        [HttpGet("TodayIncome")]
        public async Task<IActionResult> TodayIncome()
        {
            var income = await _iBooking.TodayIncome();
            return Ok(income);
        }

        [HttpPost("IncreaseHour/{bookingId}")]
        public async Task<IActionResult> IncreaseOneHour(int bookingId)
        {
            await _iBooking.IncreaseOneHour(bookingId);
            return Ok();
        }

        [HttpGet("IsAvailableSlot")]
        public async Task<IActionResult> SlotIsAvailable(int LocationId, DateTime StartTime, DateTime EndTime, string Slottype)
        {
            var slotsIsAvailable = await _iBooking.SlotIsAvailable(LocationId, StartTime, EndTime, Slottype);
            return Ok(slotsIsAvailable);

        }

        [HttpPut("CancelledBooking/{bookingId}")]
        public async Task<IActionResult> CancelledBooking(int bookingId)
        {
            await _iBooking.CancelledBooking(bookingId);
            return Ok();
        }

        [HttpPost("PaidBooking/{bookingId}")]
        public async Task<IActionResult> PaidBooking(int bookingId)
        {
            await _iBooking.PaidBooking(bookingId);
            return Ok();
        }

        [HttpGet("UpcomingCounter")]
        public async Task<int> UpcomingCounter(string Type)
        {
            var upcomingCarCount = await _iBooking.UpcomingCounter(Type);
            return upcomingCarCount;
        }

        [HttpGet("UpcomingBookingByType")]
        public async Task<IActionResult> UpcomingBookingByType(String Type)
        {
            var upcomingBookings = await _iBooking.UpcomingBookingByType(Type);
            return Ok(upcomingBookings);
        }
    }
}
