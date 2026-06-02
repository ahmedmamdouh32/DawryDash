using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.TeamService
{
    public interface ITeamService
    {
        List<DisplayTeamDTO> GetAll();
        Task<ServiceResult<Team>> Add(CreateTeamDTO teamDTO);
        TeamDetailsForMembersDTO GetTeamDetailsForMembers(int teamId);
        List<TeamMemberDTO> GetTeamMembers(int teamId);
        bool DeleteById(int id);
        bool Update(UpdateTeamDTO teamDTO, int id);
        List<Team> getTeamsByUserId(string userId);

    }
}
