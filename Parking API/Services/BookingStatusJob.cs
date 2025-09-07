using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Parking_API.Model;

namespace Parking_API.Services
{
    public class BookingStatusJob
    {
        private readonly ApplicationDbContext _db;

        public BookingStatusJob(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task UpdateExpiredBookings()
        {
            var now = DateTime.Now;

            // Upcoming to Active
            var upcoming = await _db.BookingTable
                .Where(x => x.StartTime <= now && x.Status == "Upcoming")
                .ToListAsync();

            var paidedBookings = await _db.BookingTable
                .Where(x => x.StartTime <= now && x.Status == "Upcoming" && x.IsPaid)
                .ToListAsync();

            foreach (var booking in paidedBookings)
            {
                booking.Status = "Active";
            }

            foreach (var booking in upcoming)
            {
                var time = (now - booking.StartTime).TotalMinutes;
                if (time >= 10)
                {
                    booking.Status = "Cancelled";
                }
            }

            // Active to Complete and Slot free
            var expriedBookings = await _db.BookingTable
                .Where(x => x.ExitTime <= now && x.Status == "Active")
                .ToListAsync();

            foreach (var booking in expriedBookings)
            {
                booking.Status = "Completed";

                var slot = await _db.ParkingSlotTable.FirstOrDefaultAsync(x => x.SlotId == booking.SlotId);


                var duration = (int)Math.Ceiling((booking.ExitTime.Value - booking.StartTime).TotalHours);
                booking.TotalCost = (decimal)(duration * slot.PricePerHour.Value);

                var random = new Random();
                var secondsAdd = random.Next(1, 55);

                var billing = new Billing
                {
                    BookingId = booking.BookingId,
                    UserId = booking.UserId,
                    ParkingLocationId = booking.ParkingLocationId,
                    SlotId = booking.SlotId,
                    DurationInHours = duration,
                    Amount = booking.TotalCost ?? 0,
                    CreatedAt = booking.ExitTime.Value.AddSeconds(secondsAdd),
                    Status = true
                };

                _db.BillingTable.Add(billing);
            }

            await _db.SaveChangesAsync();
        }
    }
}
