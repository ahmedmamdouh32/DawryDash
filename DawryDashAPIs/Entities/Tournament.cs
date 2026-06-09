using DawryDashAPIs.Enums;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.Entities
{
    public class Tournament
    {
        public int Id { set; get; }

        [MaxLength(50)]
        public string Name { set; get; } = string.Empty;

        [MaxLength(300)]
        public string? Description { set; get; }

        public int? prize { set; get; }
        
        [MaxLength(200)]
        public string? ImgUrl { set; get; }

        public DateTime CreationDate { set; get; } = DateTime.UtcNow;
        public DateTime? StartDate { set; get; }

        [MaxLength(200)]
        public string? Address { set; get; }
        public int? Duration { set; get; } //duration by day
        public int MatchDurationMinutes { set; get; } = 15;
        public EventStatus Status { set; get; } = EventStatus.Preparing;


        public int MaxTeams { set; get; }
        public int TeamsEntered { set; get; } = 0;

        public string CreatorId { set; get; }
        public virtual ApplicationUser Creator { set; get; }
        public virtual ICollection<Match> Matches { set; get; } = new List<Match>();
        public virtual ICollection<TournamentTeam> TournamentTeams { get; set; }
    }
}
