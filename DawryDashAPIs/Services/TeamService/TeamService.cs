using AutoMapper;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Repositories;
using DawryDashAPIs.Services.TeamService;
using Microsoft.AspNetCore.Identity;

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
            TeamUser user = new();
            user.TeamId = team.Id;
            user.UserId = teamDTO.userId;
            user.IsCaptain = true;
            user.Position = Enums.PlayerPosition.NotSet; //position and user number are not set yet

            userTeamRepo.AddTeamUser(user);
            repo.Save();

            return new ServiceResult<Team>
            {
                Success = true,
                Message = "Team added successfully.",
                Data = team
            };
        }



        public TeamDetailsForMembersDTO GetTeamDetailsForMembers (int teamId)
        {
            Team team = repo.GetById(teamId);
            if(team != null)
            {
                TeamDetailsForMembersDTO result = new();

                //storing team details
                result = map.Map<TeamDetailsForMembersDTO>(team);

                //storing members details
                //var members = userTeamRepo.GetTeamMembers(teamId);
                //result.Members = members.ToList();
                return result;
            }
            return null;
        }


        public List<TeamMemberDTO> GetTeamMembers(int teamId)
        {
            return userTeamRepo.GetTeamMembers(teamId).ToList(); 
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


        //to update team info (name, img)
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


       
        public void UpdateMembers(List<AddTeamMemberDTO> newMembers, int teamId)
        {
            var existingMembers = userTeamRepo.GetTeamUsers(teamId).ToList();

            Dictionary<string, AddTeamMemberDTO> newMembersDict = newMembers.ToDictionary(x => x.id);


            //update members count 
            var team = repo.GetById(teamId);
            team.MembersCount = newMembers.Count;


            foreach (TeamUser existingMember in existingMembers)
            {
                bool existsInNewList = newMembersDict.TryGetValue(
                    existingMember.UserId,
                    out AddTeamMemberDTO? newMember);

                // Member removed
                if (!existsInNewList)
                {
                    userTeamRepo.DeleteTeamUser(existingMember);
                    continue;
                }

                // Update existing member
                existingMember.Position = newMember!.position;
                existingMember.userNumber = newMember.tshirtNumber;
                existingMember.IsCaptain = newMember.isCaptain;

                // Remove processed member
                newMembersDict.Remove(existingMember.UserId);
            }

            // Remaining members are new
            foreach (AddTeamMemberDTO newMember in newMembersDict.Values)
            {
                TeamUser tUser = map.Map<TeamUser>(newMember);

                tUser.TeamId = teamId;

                userTeamRepo.AddTeamUser(tUser);
            }

            repo.Save();
        }

    }
}