using AutoMapper;
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
        IMapper map;
        public TeamService(GenericRepo<Team> _repo, IMapper _map)
        {            
            repo = _repo;
            map = _map;
        }

        public List<DisplayTeamDTO> GetAll()
        {
            List<Team> teams = repo.GetAll();
            return teams.Select(t => map.Map<DisplayTeamDTO>(t)).ToList();
        }

        public Team Add(AddTeamDTO teamDTO)
        {
            if (teamDTO == null)
                return null;
            else
            {
                Team team = map.Map<Team>(teamDTO);
                repo.Add(team);
                repo.Save();
                return team;
            }
        }

        public DisplayTeamDTO GetById(int id)
        {
            Team team = repo.GetById(id);
            if(team != null)
            {
                return map.Map<DisplayTeamDTO>(team);
            }
            return null;
        }

        public bool DeleteById(int id) 
        {
            Team team = repo.GetById(id);
            if(team == null)
            {
                return false;
            }
            else
            {
                repo.Delete(team);
                repo.Save();
            }
            return true;
        }

        public bool Update(UpdateTeamDTO teamDTO, int id)
        {
            Team team = repo.GetById(id);
            if (team == null)
                return false;
            map.Map(teamDTO, team);
            repo.Update(team);
            repo.Save();
            return true;
        }




    }
}