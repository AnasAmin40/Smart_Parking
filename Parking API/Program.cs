using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Parking_API.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Parking_API.Services;
using Parking_API.Interface;
using Hangfire;
using Hangfire.SqlServer;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Mydatabase"));
});
builder.Services.AddScoped<BookingStatusJob>(); // For the Booking time check
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<LocationService>();
builder.Services.AddScoped<SlotServices>();
builder.Services.AddScoped<BookingSerivces>();
builder.Services.AddScoped<IUser, UserServices>();
builder.Services.AddScoped<IRole, RoleServices>();
builder.Services.AddScoped<ILocation, LocationService>();
builder.Services.AddScoped<ISlots, SlotServices>();
builder.Services.AddScoped<IBooking, BookingSerivces>();




builder.Services.AddHangfire(x =>
    x.UseSqlServerStorage("Server=DESKTOP-8Q2L4SH;Database=SmartParkingSystem;Integrated Security=true;TrustServerCertificate=true")
);

builder.Services.AddHangfireServer();



var key = builder.Configuration.GetValue<string>("Jwt:key");
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseHangfireDashboard();

RecurringJob.AddOrUpdate<BookingStatusJob>(
    "booking_cleanup",
    job => job.UpdateExpiredBookings(),
    Cron.Minutely);


app.Run();
