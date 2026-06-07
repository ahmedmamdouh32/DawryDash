using DawryDashAPIs.Enums;

namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class AddTeamMemberDTO
    {
        public string id { set; get; }
        public PlayerPosition position { set; get; }
        public int? tshirtNumber { set; get; }
        public bool isCaptain { set; get; }
    }
}



