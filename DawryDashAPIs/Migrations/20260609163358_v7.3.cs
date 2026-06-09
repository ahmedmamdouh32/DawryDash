using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DawryDashAPIs.Migrations
{
    /// <inheritdoc />
    public partial class v73 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "prize",
                table: "Tournaments",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "prize",
                table: "Tournaments");
        }
    }
}
