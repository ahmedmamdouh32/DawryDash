using DawryDashAPIs.Enums;

namespace DawryDashAPIs.DTOs.TournamentDTOs
{
    public class TournamentCardDTO
    {
        public int Id { set; get; }
        public EventStatus Status { set; get; }
        public string Name { set; get; }
        public string startDate { set; get; }
        public string ImgUrl { set; get; }
        public int MaxTeams { set; get; }
        public int TeamsEntered { set; get; }
    }
}
