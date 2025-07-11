using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Parking_API.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParkingLocationTable",
                columns: table => new
                {
                    ParkingLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalSlots = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingLocationTable", x => x.ParkingLocationId);
                });

            migrationBuilder.CreateTable(
                name: "RolesTable",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Roles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesTable", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "ParkingSlotTable",
                columns: table => new
                {
                    SlotId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SlotNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    SlotType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PricePerHour = table.Column<int>(type: "int", nullable: true),
                    ParkingLocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingSlotTable", x => x.SlotId);
                    table.ForeignKey(
                        name: "FK_ParkingSlotTable_ParkingLocationTable_ParkingLocationId",
                        column: x => x.ParkingLocationId,
                        principalTable: "ParkingLocationTable",
                        principalColumn: "ParkingLocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersTable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobileNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfirmPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersTable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersTable_RolesTable_RoleId",
                        column: x => x.RoleId,
                        principalTable: "RolesTable",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VehicleEntryExitTable",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vehicleNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vehicleType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntryTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExitTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BillAmount = table.Column<double>(type: "float", nullable: true),
                    parkingSlotId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleEntryExitTable", x => x.id);
                    table.ForeignKey(
                        name: "FK_VehicleEntryExitTable_ParkingSlotTable_parkingSlotId",
                        column: x => x.parkingSlotId,
                        principalTable: "ParkingSlotTable",
                        principalColumn: "SlotId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookingTable",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExitTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DurationHours = table.Column<int>(type: "int", nullable: true),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ParkingLocationId = table.Column<int>(type: "int", nullable: false),
                    SlotId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingTable", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_BookingTable_ParkingLocationTable_ParkingLocationId",
                        column: x => x.ParkingLocationId,
                        principalTable: "ParkingLocationTable",
                        principalColumn: "ParkingLocationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BookingTable_ParkingSlotTable_SlotId",
                        column: x => x.SlotId,
                        principalTable: "ParkingSlotTable",
                        principalColumn: "SlotId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BookingTable_UsersTable_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersTable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BillingTable",
                columns: table => new
                {
                    BillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DurationInHours = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ParkingLocationId = table.Column<int>(type: "int", nullable: false),
                    SlotId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingTable", x => x.BillId);
                    table.ForeignKey(
                        name: "FK_BillingTable_BookingTable_BookingId",
                        column: x => x.BookingId,
                        principalTable: "BookingTable",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillingTable_ParkingLocationTable_ParkingLocationId",
                        column: x => x.ParkingLocationId,
                        principalTable: "ParkingLocationTable",
                        principalColumn: "ParkingLocationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BillingTable_ParkingSlotTable_SlotId",
                        column: x => x.SlotId,
                        principalTable: "ParkingSlotTable",
                        principalColumn: "SlotId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BillingTable_UsersTable_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersTable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillingTable_BookingId",
                table: "BillingTable",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingTable_ParkingLocationId",
                table: "BillingTable",
                column: "ParkingLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingTable_SlotId",
                table: "BillingTable",
                column: "SlotId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingTable_UserId",
                table: "BillingTable",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingTable_ParkingLocationId",
                table: "BookingTable",
                column: "ParkingLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingTable_SlotId",
                table: "BookingTable",
                column: "SlotId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingTable_UserId",
                table: "BookingTable",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSlotTable_ParkingLocationId",
                table: "ParkingSlotTable",
                column: "ParkingLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersTable_RoleId",
                table: "UsersTable",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleEntryExitTable_parkingSlotId",
                table: "VehicleEntryExitTable",
                column: "parkingSlotId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillingTable");

            migrationBuilder.DropTable(
                name: "VehicleEntryExitTable");

            migrationBuilder.DropTable(
                name: "BookingTable");

            migrationBuilder.DropTable(
                name: "ParkingSlotTable");

            migrationBuilder.DropTable(
                name: "UsersTable");

            migrationBuilder.DropTable(
                name: "ParkingLocationTable");

            migrationBuilder.DropTable(
                name: "RolesTable");
        }
    }
}
