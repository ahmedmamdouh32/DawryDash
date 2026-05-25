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
        
        GenericRepo<Tournament> tournamentRepo;

        UserTeamRepo userTeamRepo;

        IMapper map;
        public TeamService(GenericRepo<Team> _repo, GenericRepo<Tournament> _tournamentRepo, IMapper _map, UserTeamRepo _userTeamRepo)
        {            
            repo = _repo;
            tournamentRepo = _tournamentRepo;
            map = _map;
            userTeamRepo = _userTeamRepo;
        }

        public List<DisplayTeamDTO> GetAll()
        {
            List<Team> teams = repo.GetAll().ToList();
            return teams.Select(t => map.Map<DisplayTeamDTO>(t)).ToList();
        }

        public ServiceResult<Team> Add(AddTeamDTO teamDTO)
        {
            if (teamDTO == null)
            {
                return new ServiceResult<Team>
                {
                    Success = false,
                    Message = "Team data is required."
                };
            }
            
            Tournament tournament = tournamentRepo.GetById(teamDTO.TournamentID);

            if(tournament == null)
            {
                return new ServiceResult<Team>
                {
                    Success = false,
                    Message = "Tournament not found."
                };
            }
            
            if(tournament.TeamsEntered >= tournament.MaxTeams)
            {
                return new ServiceResult<Team>
                {
                    Success = false,
                    Message = "Tournament is already full."
                };
            }

            Team team = map.Map<Team>(teamDTO);
            repo.Add(team);
            tournament.TeamsEntered++;
            repo.Save();
            return new ServiceResult<Team>
            {
                Success = true,
                Message = "Team added successfully.",
                Data = team
            };
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

        public List<Team> getTeamsByUserId(string userId)
        {
            return userTeamRepo.GetTeamsByUserId(userId)?.ToList();
        }




    }
}