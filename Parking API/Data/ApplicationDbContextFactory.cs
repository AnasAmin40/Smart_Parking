using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace Parking_API.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-8Q2L4SH;Database=SmartParkingSystem;Integrated Security=true;TrustServerCertificate=true");

            
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }

}
