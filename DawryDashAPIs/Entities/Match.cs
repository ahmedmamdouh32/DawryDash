using DawryDashAPIs.Enums;
using System.Diagnostics.Contracts;

namespace DawryDashAPIs.Entities
{
    public class Match
    {
        public int Id { set; get; }

        public int? FirstTeamId { set; get; }
        public Team? FirstTeam { get; set; }

        public int? SecondTeamId { set; get; }
        public Team? SecondTeam { get; set; }

        public int? FirstTeamScore { set; get; }
        public int? SecondTeamScore { set; get; }

        public MatchStatus Status { set; get; } = MatchStatus.Waiting;
        public DateTime? StartDate { set; get;}
        public int Round { set; get; }
        public int MatchOrder { set; get; }

        public int TournamentId { set; get; }
        public Tournament Tournament { set; get; }
        public int? WinnerTeamId { get; set; }
        public Team? WinnerTeam { get; set; }

        public int? NextMatchId { set; get; }
        public Match? NextMatch { set; get; }
        public int? NextMatchSlot {set; get; }
    }
}