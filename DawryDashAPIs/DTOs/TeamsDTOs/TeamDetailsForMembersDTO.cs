using DawryDashAPIs.Entities;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class TeamDetailsForMembersDTO
    {
        public int Id { set; get; }
        public string Name { set; get; } 
        public string? ImgUrl { set; get; }
        public string? Slogan { set; get; }
        public string TeamAbbreviation { set; get; }
        public string PrimaryColor { set; get; }
        public string SecondaryColor { set; get; }
        public int MembersCount { set; get; } = 1;
        public int TotalMatchesPlayed { set; get; }
        public int TotalWins { set; get; }
        public double WinRate { set; get; }
        public int TotalGoalsScored { set; get; }
        //public List<TeamMemberDTO>? Members { set; get; }
    }
}
