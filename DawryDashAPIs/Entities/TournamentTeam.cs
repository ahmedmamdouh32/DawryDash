namespace DawryDashAPIs.Entities
{
    public class TournamentTeam
    {
        public int TournamentId { get; set; }

        public Tournament Tournament { get; set; }

        public int TeamId { get; set; }

        public Team Team { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}
