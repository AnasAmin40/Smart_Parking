using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Parking_API.Migrations
{
    /// <inheritdoc />
    public partial class AddPaidBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "BookingTable",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "BookingTable");
        }
    }
}
