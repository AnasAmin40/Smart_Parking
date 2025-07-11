using Microsoft.EntityFrameworkCore;
using Parking_API.Model;

namespace Parking_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Users> UsersTable { get; set; }
        public DbSet<Role> RolesTable { get; set; }
        public DbSet<VehicleEntryExit> VehicleEntryExitTable { get; set; }
        public DbSet<ParkingSlot> ParkingSlotTable { get; set; }
        public DbSet<ParkingLocation> ParkingLocationTable { get; set; }
        public DbSet<Booking> BookingTable { get; set; }
        public DbSet<Billing> BillingTable { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Booking Relationships
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.ParkingLocation)
                .WithMany()
                .HasForeignKey(b => b.ParkingLocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.ParkingSlot)
                .WithMany()
                .HasForeignKey(b => b.SlotId)
                .OnDelete(DeleteBehavior.Restrict);

            // Billing Relationships (all defined cleanly)
            modelBuilder.Entity<Billing>()
                .HasOne(b => b.Booking)
                .WithMany()
                .HasForeignKey(b => b.BookingId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade only

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.ParkingLocation)
                .WithMany()
                .HasForeignKey(b => b.ParkingLocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.ParkingSlot)
                .WithMany()
                .HasForeignKey(b => b.SlotId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
