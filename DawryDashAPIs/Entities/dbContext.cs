using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DawryDashAPIs.Entities
{
    public class dbContext : IdentityDbContext<ApplicationUser>
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {


        }

       
        public DbSet<Team> Teams { get; set; }

        public DbSet<TeamUser> TeamUsers { get; set; }

        public DbSet<Tournament> Tournaments { get; set; }

        public DbSet<TournamentTeam> TournamentTeams { get; set; }

        public DbSet<Match> Matches { get; set; }

       

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TeamUser>()
                .HasKey(tu => new { tu.TeamId, tu.UserId });

            builder.Entity<TournamentTeam>()
                .HasKey(tt => new { tt.TeamId, tt.TournamentId });

            //adding roles 
            builder.Entity<IdentityRole>().HasData(
               new IdentityRole() { Id = "1", Name = "user", NormalizedName = "USER", ConcurrencyStamp = "1" },
               new IdentityRole() { Id = "2", Name = "organizer", NormalizedName = "ORGANIZER", ConcurrencyStamp = "2" },
               new IdentityRole() { Id = "3", Name = "referee", NormalizedName = "REFEREE", ConcurrencyStamp = "3" }
               );
        }
    }
}

