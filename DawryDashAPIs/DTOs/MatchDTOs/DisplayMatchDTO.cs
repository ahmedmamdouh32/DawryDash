using DawryDashAPIs.Entities;
using DawryDashAPIs.Enums;

namespace DawryDashAPIs.DTOs.MatchDTOs
{
    public class DisplayMatchDTO
    {
        public int Id { set; get; }

        public int? FirstTeamId { set; get; }
        public int? SecondTeamId { set; get; }

        public int? FirstTeamScore { set; get; }
        public int? SecondTeamScore { set; get; }
        public MatchStatus Status { set; get; }
        public DateTime? StartDate { set; get; }
        public int Round { set; get; }
        public int MatchOrder { set; get; }

        public int TournamentId { set; get; }
        public int? WinnerTeamId { get; set; }
        public int? NextMatchId { set; get; }
        public int? NextMatchSlot { set; get; }
    }
}
