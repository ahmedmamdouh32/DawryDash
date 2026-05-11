using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.TeamService
{
    public interface ITeamService
    {
        List<DisplayTeamDTO> GetAll();
        Team Add(AddTeamDTO team);
        DisplayTeamDTO GetById(int id);
        bool DeleteById(int id);
        bool Update(UpdateTeamDTO teamDTO, int id);
    }
}
