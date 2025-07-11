using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Parking_Management_System.Interface;
using Parking_Management_System.Interface.AdminPage;
using Parking_Management_System.Service.AdminPage;
using Parking_Management_System.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddScoped<RoleService>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AuthenticationSerevice>();
builder.Services.AddScoped<LocationServicesMCV>();
builder.Services.AddScoped<SlotServiceMVC>();
builder.Services.AddScoped<BookingServicesMVC>();
builder.Services.AddScoped<IRole, RoleService>();
builder.Services.AddScoped<IUserMVC, UserService>();
builder.Services.AddScoped<IAuthenticationController, AuthenticationSerevice>();
builder.Services.AddScoped<ILocationMVC, LocationServicesMCV>();
builder.Services.AddScoped<IslotsMVC, SlotServiceMVC>();
builder.Services.AddScoped<IBookingDTO, BookingServicesMVC>();




builder.Services.AddDistributedMemoryCache();
builder.Services.AddHttpContextAccessor();


builder.Services.AddHttpClient("RoleClient", client =>
{
    client.BaseAddress = new Uri("http://localhost:5266/api/Role/");
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});


builder.Services.AddHttpClient("AuthenticationClient", client =>
{
    client.BaseAddress = new Uri("http://localhost:5266/api/UserAuthentication/");
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddHttpClient("UserClient", client =>
{
    client.BaseAddress = new Uri("http://localhost:5266/api/Users/");
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddHttpClient("LocationClient", client =>
{
    client.BaseAddress = new Uri("http://localhost:5266/api/Location/");
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddHttpClient("SlotsClient", client =>
{
    client.BaseAddress = new Uri("http://localhost:5266/api/Slots/");
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});

builder.Services.AddHttpClient("BookingClient", client =>
{
    client.BaseAddress = new Uri("http://localhost:5266/api/Booking/");
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});




builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
{

    option.LoginPath = "/ToAuthentication/LoginPage"; // Set the login path

    option.LogoutPath = "/ToAuthentication/LogOut"; // Set the logout path
    option.AccessDeniedPath = "/ToAuthentication/AccessDenied"; // Set the access denied path
    option.ExpireTimeSpan = TimeSpan.FromMinutes(30); // Set the cookie expiration time
    option.SlidingExpiration = true; // Enable sliding expiration
    option.Cookie.HttpOnly = true; // Make the cookie HTTP only
    option.Cookie.IsEssential = true; // Make the cookie essential for session management
});





builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Set session timeout
    options.Cookie.HttpOnly = true; // Make the session cookie HTTP only
    options.Cookie.IsEssential = true; // Make the session cookie essential
});


var app = builder.Build();



if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
