using DawryDashAPIs.Enums;

namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class AddTeamMemberDTO
    {
        public string Id { set; get; }
        public PlayerPosition Position { set; get; }
        public int? TshirtNumber { set; get; }
        public bool IsCaptain { set; get; }
    }
}

