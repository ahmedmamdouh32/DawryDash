namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class AddMembersToTeamDTO
    {
        public int TeamId { get; set; }

        public List<AddTeamMemberDTO> Members { get; set; } = new List<AddTeamMemberDTO>();
    }
}
