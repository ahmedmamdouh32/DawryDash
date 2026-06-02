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

        [MaxLength(100)]
        public string? Slogan { set; get; }

        [MaxLength(4)]
        [MinLength(2)]
        public string TeamAbbreviation { set; get; }

        [MaxLength(20)]
        public string PrimaryColor { set; get; }

        [MaxLength(20)]
        public string SecondaryColor { set; get; }

        [MaxLength(500)]
        public string? Description { set; get; }

        public int MembersCount { set; get; } = 1;

        public int TotalMatchesPlayed { set; get;}

        public int TotalWins { set; get; }
        
        public int TotalLosses { set; get; }

        public int TotalGoalsScored { set; get; }

        public string? CaptainId { get; set; }

        public ApplicationUser? Captain { get; set; }

        public virtual ICollection<TeamUser> TeamUsers { set; get; } = new List<TeamUser>();

        public virtual ICollection<TournamentTeam> TournamentTeams { get; set; } = new List<TournamentTeam>();

    }
}