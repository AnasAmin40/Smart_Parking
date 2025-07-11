using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Parking_API.Migrations
{
    /// <inheritdoc />
    public partial class AddPricePerHour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PricePerHour",
                table: "ParkingSlotTable",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PricePerHour",
                table: "ParkingSlotTable");
        }
    }
}
