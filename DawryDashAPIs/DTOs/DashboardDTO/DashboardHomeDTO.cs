using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.DTOs.UserDTOs;

namespace DawryDashAPIs.DTOs.DashboardDTO
{
    public class DashboardHomeDTO
    {
        public UserDashboardDTO userDashboardDTO { set; get; }
        public List<TeamCardDTO> Teams{ set; get; }
        public List<TournamentCardDTO> Tournaments { set; get; }
    }
}
