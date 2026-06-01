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

        public async Task<ServiceResult<Team>> Add(CreateTeamDTO teamDTO)
        {
            if (teamDTO == null)
            {
                return new ServiceResult<Team>
                {
                    Success = false,
                    Message = "Team data is required."
                };
            }
            Team team = map.Map<Team>(teamDTO);

            string? imagePath = null;

            if (teamDTO.Image != null)
            {
                string fileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(teamDTO.Image.FileName);

                string folder =
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot/images/teams");

                string fullPath =
                    Path.Combine(folder, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                   await teamDTO.Image.CopyToAsync(stream);
                }

                imagePath = "/images/teams/" + fileName;
                team.ImgUrl = "https://localhost:7042/" + imagePath;
            }

            

            repo.Add(team);
            repo.Save();
            userTeamRepo.AddTeamAndUser(teamId : team.Id, userId: teamDTO.userId);
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