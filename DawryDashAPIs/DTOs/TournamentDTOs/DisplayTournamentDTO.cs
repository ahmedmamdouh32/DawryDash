using DawryDashAPIs.Enums;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.TournamentDTOs
{
    public class DisplayTournamentDTO
    {
        public int Id { set; get; }

        public string Name { set; get; }

        public string? Description { set; get; }

        public string? ImgUrl { set; get; }

        public DateTime CreationDate { set; get; }

        public DateTime? StartDate { set; get; }

        public string? Address { set; get; }

        public int? Duration { set; get; } //duration by day

        public int MatchDurationMinutes { set; get; } 

        public EventStatus Status { set; get; }

        public int MaxTeams { set; get; }

        public int TeamsEntered { set; get; }
    }
}
