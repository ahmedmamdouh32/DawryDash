using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DawryDashAPIs.Migrations
{
    /// <inheritdoc />
    public partial class v7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "TeamUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "userNumber",
                table: "TeamUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalGoalsScored",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalLosses",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalMatchesPlayed",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalWins",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "TeamUsers");

            migrationBuilder.DropColumn(
                name: "userNumber",
                table: "TeamUsers");

            migrationBuilder.DropColumn(
                name: "TotalGoalsScored",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TotalLosses",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TotalMatchesPlayed",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TotalWins",
                table: "Teams");
        }
    }
}
