using System;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Interface;
using Parking_API.Model;
using Parking_API.Model.Update;

namespace Parking_API.Services
{
    public class BookingSerivces : IBooking
    {
        private readonly ApplicationDbContext _db;

        public BookingSerivces(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _db.BookingTable
                .Include(x => x.User)
                .Include(x => x.ParkingSlot)
                .Include(x => x.ParkingLocation)
                .ToListAsync();

            if (bookings == null || !bookings.Any())
                return new NotFoundResult();

            return new OkObjectResult(bookings);
        }

        public async Task<IActionResult> CreateBooking([FromBody] BookingRequest bookingData)
        {
            if (bookingData == null || string.IsNullOrEmpty(bookingData.SlotType))
                return new BadRequestResult();

            //bool slotIsValid = bookingData.SlotId != 0;
            //ParkingSlot? availableSlot = null;

            //if (!slotIsValid)
            //{
            //    availableSlot = await _db.ParkingSlotTable
            //        .Where(s => s.ParkingLocationId == bookingData.LocationId && s.SlotType == bookingData.SlotType )
            //        .FirstOrDefaultAsync();

            //    if (availableSlot == null)
            //        return new NotFoundObjectResult("No available slots found for the specified type and location.");

            //    bookingData.SlotId = availableSlot.SlotId;
            //}
            //else
            //{
            //    var existingSlot = await _db.ParkingSlotTable
            //        .FirstOrDefaultAsync(s => s.SlotId == bookingData.SlotId && s.Status == false && s.SlotType == bookingData.SlotType);

            //    if (existingSlot == null)
            //        return new NotFoundObjectResult("The specified slot is not available or does not exist.");
            //}

            DateTime startTime = (bookingData.StartTime.HasValue && bookingData.StartTime > DateTime.Now)
                ? bookingData.StartTime.Value
                : DateTime.Now;

            DateTime? endTime = bookingData.EndTime;
            if (!endTime.HasValue && bookingData.DurationHours.HasValue && bookingData.DurationHours != 0)
                endTime = startTime.AddHours(bookingData.DurationHours.Value);

            if (endTime.HasValue && endTime < startTime)
                return new BadRequestObjectResult("End time cannot be earlier than start time.");

            var slotData = await _db.ParkingSlotTable.FirstOrDefaultAsync(s => s.SlotId == bookingData.SlotId);
            decimal? totalAmount = null;

            if (slotData?.PricePerHour != null && endTime.HasValue)
            {
                var duration = (endTime.Value - startTime).TotalHours;
                totalAmount = (decimal)(duration * slotData.PricePerHour.Value);
            }

            var booking = new Booking()
            {
                UserId = bookingData.UserId,
                ParkingLocationId = bookingData.LocationId,
                SlotId = bookingData.SlotId,
                StartTime = startTime,
                ExitTime = endTime,
                DurationHours = bookingData.DurationHours,
                TotalCost = totalAmount,
                Status = "Upcoming",
                IsPaid = false
            };

            _db.BookingTable.Add(booking);
            await _db.SaveChangesAsync();

            return new OkObjectResult(booking);
        }

        public async Task<IActionResult> CompleteBooking(int id, Booking bookingData)
        {
            if (bookingData == null || id == 0)
                return new BadRequestResult();

            var existingBooking = await _db.BookingTable.FirstOrDefaultAsync(x => x.BookingId == id);
            var slot = await _db.ParkingSlotTable.FirstOrDefaultAsync(x => x.SlotId == bookingData.SlotId);

            if (existingBooking == null || slot == null)
                return new NotFoundResult();

            DateTime now = DateTime.Now;
            if (existingBooking.ExitTime == null)
                existingBooking.ExitTime = now;

            if (existingBooking.ExitTime >= existingBooking.StartTime)
            {
                int duration = (int)Math.Ceiling((existingBooking.ExitTime.Value - existingBooking.StartTime).TotalHours);
                existingBooking.DurationHours = duration;
                existingBooking.TotalCost = duration * slot.PricePerHour;
            }

            existingBooking.Status = "Completed";

            var bill = new Billing()
            {
                DurationInHours = existingBooking.DurationHours,
                Amount = existingBooking.TotalCost,
                Status = true,
                CreatedAt = now,
                BookingId = id,
                UserId = existingBooking.UserId,
                ParkingLocationId = existingBooking.ParkingLocationId,
                SlotId = existingBooking.SlotId
            };

            _db.BillingTable.Add(bill);
            _db.BookingTable.Update(existingBooking);
            await _db.SaveChangesAsync();

            return new OkObjectResult(existingBooking);
        }

        public async Task<IActionResult> CancelledBooking(int bookingId)
        {
            if (bookingId == 0)
                return new BadRequestResult();

            var booking = await _db.BookingTable.FirstOrDefaultAsync(x => x.BookingId == bookingId && (x.Status == "Upcoming" || x.Status == "Active"));
            if (booking == null)
                return new NotFoundResult();

            booking.Status = "Cancelled";
            _db.BookingTable.Update(booking);
            await _db.SaveChangesAsync();

            return new OkObjectResult(new { message = "Booking cancelled successfully" });
        }

        public async Task<IActionResult> UpdateBooking(int id, Booking bookingData)
        {
            if (bookingData == null || id == 0)
                return new BadRequestResult();

            var existingBooking = await _db.BookingTable.FirstOrDefaultAsync(x => x.BookingId == id);
            if (existingBooking == null)
                return new NotFoundResult();

            existingBooking.StartTime = bookingData.StartTime;
            existingBooking.ExitTime = bookingData.ExitTime;
            existingBooking.DurationHours = bookingData.DurationHours;
            existingBooking.TotalCost = bookingData.TotalCost;
            existingBooking.Status = bookingData.Status;
            existingBooking.UserId = bookingData.UserId;
            existingBooking.ParkingLocationId = bookingData.ParkingLocationId;
            existingBooking.SlotId = bookingData.SlotId;

            _db.BookingTable.Update(existingBooking);
            await _db.SaveChangesAsync();

            return new OkObjectResult(existingBooking);
        }

        public async Task<IActionResult> GetBookingById(int bookingId)
        {
            if (bookingId == 0)
                return new BadRequestResult();

            var booking = await _db.BookingTable
                .Include(x => x.ParkingSlot)
                .Include(x => x.ParkingLocation)
                .FirstOrDefaultAsync(x => x.BookingId == bookingId);

            return booking == null ? new NotFoundResult() : new OkObjectResult(booking);
        }

        public async Task<IActionResult> DeleteBooking(int bookingId)
        {
            if (bookingId == 0)
                return new BadRequestResult();

            var booking = await _db.BookingTable.FirstOrDefaultAsync(x => x.BookingId == bookingId);
            if (booking == null)
                return new NotFoundResult();

            _db.BookingTable.Remove(booking);
            await _db.SaveChangesAsync();

            return new OkObjectResult(new { message = "Booking deleted successfully" });
        }

        public async Task<IActionResult> PaidBooking(int bookingId)
        {
            if (bookingId == 0)
                return new BadRequestResult();

            var booking = await _db.BookingTable.FirstOrDefaultAsync(x => x.BookingId == bookingId && x.Status == "Upcoming");
            if (booking == null)
                return new NotFoundResult();

            if (booking.StartTime <= DateTime.Now)
                booking.Status = "Active";

            booking.IsPaid = true;

            var bill = new Billing()
            {
                DurationInHours = booking.DurationHours,
                Amount = booking.TotalCost,
                Status = true,
                CreatedAt = DateTime.Now,
                BookingId = bookingId,
                UserId = booking.UserId,
                ParkingLocationId = booking.ParkingLocationId,
                SlotId = booking.SlotId
            };

            _db.BillingTable.Add(bill);
            _db.BookingTable.Update(booking);
            await _db.SaveChangesAsync();

            return new OkObjectResult(new { message = "Paid Booking" });
        }

        public async Task<IActionResult> GetLocation()
        {
            var locations = await _db.ParkingLocationTable
                .Select(loc => new GetLocation
                {
                    LocationId = loc.ParkingLocationId,
                    LocationName = loc.Name
                })
                .ToListAsync();

            return new OkObjectResult(locations);
        }


        public Task<IActionResult> GetAvailableSlot(int locationId, string SlotType)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetAllSlots(int locationid, string slotType)
        {
            var slot = await _db.ParkingSlotTable.Where(x => x.ParkingLocationId == locationid && x.SlotType == slotType).ToListAsync();
            return new OkObjectResult(slot);
        }

        public async Task<IActionResult> GetBillList()
        {
            var bill = await _db.BillingTable
                .Include(x => x.User)
                .Include(x=>x.ParkingLocation)
                .Include(x=>x.ParkingSlot)
                .ToListAsync();
            return new OkObjectResult(bill);
        }

        public async Task<IActionResult> GetUserActiveBookings(int userId)
        {
            var Active = await _db.BookingTable
                .Include(a => a.ParkingLocation)
                .Include(a => a.ParkingSlot)
                .Where(x => x.UserId == userId && x.Status == "Active")
                .Select(s => new
                {
                    BookingId = s.BookingId,
                    LocationName = s.ParkingLocation.Name,
                    SlotNumber = s.ParkingSlot.SlotNumber,
                    SlotType = s.ParkingSlot.SlotType,
                    StartTime = s.StartTime,
                    ExitTime = s.ExitTime
                })
                .ToListAsync();

            return new OkObjectResult(Active);
        }

        public async Task<IActionResult> GetUpcomingBooking(int userId)
        {
            var upcoming = await _db.BookingTable
                .Include(a => a.ParkingLocation)
                .Include(a => a.ParkingSlot)
                .Where(x => x.UserId == userId && x.Status == "Upcoming")
                .Select(s => new
                {
                    BookingId = s.BookingId,
                    LocationName = s.ParkingLocation.Name,
                    SlotNumber = s.ParkingSlot.SlotNumber,
                    SlotType = s.ParkingSlot.SlotType,
                    StartTime = s.StartTime,
                    ExitTime = s.ExitTime
                })
                .ToListAsync();

            return new OkObjectResult(upcoming);
        }



        public async Task<IActionResult> BookingHistory(int userId)
        {
            if (userId <= 0)
            {
                return new BadRequestObjectResult(new { message = "Invalid User ID" });
            }

            var history = await _db.BookingTable
                .Include(x => x.ParkingLocation)
                .Include(x => x.ParkingSlot)
                .Where(x => x.UserId == userId)
                .Select(s => new BookingHistoryDto
                {
                    BookingId = s.BookingId,
                    SlotType = s.ParkingSlot != null ? s.ParkingSlot.SlotType : null,
                    StartTime = s.StartTime,
                    ExitTime = s.ExitTime,
                    Status = s.Status,
                    LocationName = s.ParkingLocation != null ? s.ParkingLocation.Name : null,
                    SlotNumber = s.ParkingSlot != null ? s.ParkingSlot.SlotNumber : null,
                })
                .ToListAsync();

            return new OkObjectResult(history);
        }

        public async Task<IActionResult> ActiveBookingCounter(int userid)
        {
            int activeBookingCount = await _db.BookingTable
                .Where(b => b.UserId == userid && b.Status == "Active")
                .CountAsync();

           
            return new OkObjectResult(activeBookingCount);
        }

        public async Task<IActionResult> UpcomingBookingCounter(int userid)
        {
            int upcomingBookingCount = await _db.BookingTable
                .Where(b => b.UserId == userid && b.Status == "Upcoming")
                .CountAsync();


            return new OkObjectResult(upcomingBookingCount);
        }

        public async Task<int> CountTodayEntriesBike()
        {
            var today = DateTime.Today;

            var TodayEntriesBike = await _db.BookingTable.Include(x => x.ParkingSlot)
                .Where(b => b.StartTime.Date == today && b.Status == "Completed" && b.ParkingSlot.SlotType == "Bike")
                .CountAsync();

            return TodayEntriesBike;
        }

        public async Task<int> CountTodayEntriesCar()
        {
            var today = DateTime.Today;

            var TodayEntriesCar = await _db.BookingTable
                .Where(b => b.StartTime.Date == today && b.Status == "Completed" && (  b.ParkingSlot.SlotType == "Car" || b.ParkingSlot.SlotType == "VIP_Car"))
                .CountAsync();

            return TodayEntriesCar;
        }

        public async Task<int> ActiveBooking()
        {
           var activebooking = await _db.BookingTable
                .Where(b => b.Status == "Active")
                .CountAsync();
            return activebooking;
        }

        public async Task<IActionResult> TodayIncome()
        {
            var today = DateTime.Today;

            var totalIncome = await _db.BillingTable
                .Where(b => b.CreatedAt.Date == today)
                .SumAsync(b => (decimal?)b.Amount) ?? 0;

            return new OkObjectResult(totalIncome);
        }

        public Task<IActionResult> IncreaseOneHour(int bookingId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<SlotAvailabilityDto>> SlotIsAvailable(int LocationId, DateTime StartTime, DateTime EndTime, string Slottype)
        {
            var slots = await _db.ParkingSlotTable
                .Where(x => x.ParkingLocationId == LocationId && x.SlotType == Slottype)
                .ToListAsync();

            var slotIds = slots.Select(x => x.SlotId).ToList();

            var conflictingBookings = await _db.BookingTable
                .Where(x => slotIds.Contains(x.SlotId) &&
                            (x.Status == "Active" || x.Status == "Upcoming") &&
                            (
                                (StartTime >= x.StartTime && StartTime <= x.ExitTime) ||
                                (EndTime >= x.StartTime && EndTime <= x.ExitTime) ||
                                (StartTime <= x.StartTime && EndTime >= x.ExitTime)
                            ))
                .ToListAsync();

            var result = slots.Select(slot =>
            {
                var conflicts = conflictingBookings.Where(x => x.SlotId == slot.SlotId)
                .Select(a => new BookingConflictInfo
                {
                    BookingStartTime = a.StartTime,
                    BookingEndTime = a.ExitTime,
                    Status = a.Status
                }).ToList();

                return new SlotAvailabilityDto
                {
                    SlotId = slot.SlotId,
                    SlotNumber = slot.SlotNumber,
                    isAvaible = !conflicts.Any(),
                    Bookingconflicts = conflicts
                };
            }).ToList();

            return result;
        }

    }
}
