using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.DTOs.UserDTOs;

namespace DawryDashAPIs.DTOs.DashboardDTO
{
    public class DashboardHomeDTO
    {
        public UserDashboardDTO user { set; get; }
        public List<TeamCardDTO> latestTeams{ set; get; }
        public List<TournamentCardDTO> activeTournaments { set; get; }
    }
}
