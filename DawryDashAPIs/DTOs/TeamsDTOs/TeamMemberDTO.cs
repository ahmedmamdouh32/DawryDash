using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class TeamMemberDTO
    {
        public string userId { set; get; }
        public string username { set; get; }
        public string Fullname { set; get; }
        public string ImgUrl { set; get; }
        public string Position { set; get; }
        public int? TshirtNumber { set; get; }
        public bool IsCaptain { set; get; } 
    }
}
