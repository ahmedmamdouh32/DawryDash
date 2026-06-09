using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DawryDashAPIs.Migrations
{
    /// <inheritdoc />
    public partial class v72 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MathcDurationMinutes",
                table: "Tournaments",
                newName: "MatchDurationMinutes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MatchDurationMinutes",
                table: "Tournaments",
                newName: "MathcDurationMinutes");
        }
    }
}
