using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Medicine_Management_System.Migrations
{
    /// <inheritdoc />
    public partial class dataadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Medicine",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(name: "Full Name", type: "nvarchar(max)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expirate_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicine", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Medicine",
                columns: new[] { "Id", "Brand", "Expirate_Date", "Full Name", "Note", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, "Cipla", new DateTime(2026, 5, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Paracetamol", "Fever", 2.5, 100 },
                    { 2, "Sun Pharma", new DateTime(2026, 6, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Amoxicillin", "Antibiotic", 5.0, 50 },
                    { 3, "Cipla", new DateTime(2027, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Paracetamol", "Pain relief", 2.5, 100 },
                    { 4, "Sun Pharma", new DateTime(2026, 6, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Amoxicillin", "Antibiotic", 5.0, 9 },
                    { 5, "Dr Reddy's", new DateTime(2026, 5, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ibuprofen", "Anti-inflammatory", 3.2000000000000002, 75 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medicine");
        }
    }
}
