using Microsoft.EntityFrameworkCore;

namespace DawryDashAPIs.Entities
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {


        }

       


        //tables
        public virtual DbSet<Tournament> Tournaments{ get; set; }
        public virtual DbSet<Team> Teams{ get; set; }
        public virtual DbSet<Match> Matches { get; set; }
    }
}
