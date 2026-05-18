using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DawryDashAPIs.Entities
{
    public class Team
    {
        public int Id { set; get; }

        [MaxLength(100)]
        public string Name { set; get; } = string.Empty;

        [MaxLength(200)]
        public string? ImgUrl { set; get; }

        public string CaptainId { get; set; }

        public ApplicationUser Captain { get; set; }

        public virtual ICollection<TeamUser> TeamUsers { set; get; } = new List<TeamUser>();

        public virtual ICollection<TournamentTeam> TournamentTeams { get; set; } = new List<TournamentTeam>();

    }
}