using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Repositories;
using DawryDashAPIs.Services.TeamService;

namespace DawryDashAPIs.Services.TeamsServices
{
    public class TeamService : ITeamService
    {
        GenericRepo<Team> repo;
        public TeamService(GenericRepo<Team> _repo)
        {
            repo = _repo;
        }

        public List<DisplayTeamDTO> GetAll()
        {
            List<Team> teams = repo.GetAll();
            return teams.Select(t => new DisplayTeamDTO
            {
                Name = t.Name,
                Id = t.Id,
                ImgUrl = t.ImgUrl ?? "not found"
            }).ToList();
        }


        public Team Add(AddTeamDTO teamDTO)
        {
            if (teamDTO == null)
                return null;
            else
            {
                Team team = new();
                team.Name = teamDTO.Name;
                team.ImgUrl = teamDTO.ImgUrl ?? "not found";
                team.TournamentId = teamDTO.TournamentID;
                repo.Add(team);
                repo.Save();
                return team;
            }
        }

        public DisplayTeamDTO GetById(int id)
        {
            Team team = repo.GetById(id);
            if(team == null)
            {
                return null;
            }

            return new DisplayTeamDTO
            {
                Id = team.Id,
                Name = team.Name,
                TournamentId = team.TournamentId,
                ImgUrl = team.ImgUrl ?? "not found"
            };
        }
    }
}
