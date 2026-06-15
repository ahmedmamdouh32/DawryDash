using AutoMapper;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Repositories;
using DawryDashAPIs.Services.TeamsServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DawryDashAPIs.Services.TournamentService
{
    public class TournamentService : ITournanemtService
    {
        GenericRepo<Tournament> tournamentRepo;
        TournamentTeamRepo tournamentTeamRepo;
        UserTeamRepo userTeamRepo;
        UserManager<ApplicationUser> userManager;
        IMapper map;
        public TournamentService(UserManager<ApplicationUser> _userManager,GenericRepo<Tournament> _tournamentRepo, IMapper _map, UserTeamRepo _userTeamRepo,TournamentTeamRepo _tournamentTeamRepo) 
        {
            userManager = _userManager;
            tournamentRepo = _tournamentRepo;
            userTeamRepo = _userTeamRepo;
            tournamentTeamRepo = _tournamentTeamRepo;
            map = _map;
        }

        public DisplayTournamentDTO GetById(int id)
        {
            //Tournament tournament = tournamentRepo.GetById(id);
            var tournament = tournamentRepo.GetEntity().Include(e => e.Creator).FirstOrDefault(e => e.Id == id);
            if (tournament != null)
            {
                return map.Map<DisplayTournamentDTO>(tournament);
                //var creator = userManager.FindByIdAsync(result.CreatorId).Result;
                //result.CreatorFullname = creator.FullName;
                //result.CreatorImgUrl = creator.ImgUrl;
                //return result;
            }
            return null;
        }


        public async Task<ServiceResult<Tournament>> Add(AddTournamentDTO DTO)
        {
            if (DTO == null)
            {
                return new ServiceResult<Tournament>
                {
                    Success = false,
                    Message = "Tournament data is required."
                };
            }

            Tournament tournament= map.Map<Tournament>(DTO);

            string? imagePath = null;

            if (DTO.Image != null)
            {
                string fileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(DTO.Image.FileName);

                string folder =
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot/images/tournaments");

                string fullPath =
                    Path.Combine(folder, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await DTO.Image.CopyToAsync(stream);
                }

                imagePath = "/images/tournaments/" + fileName;
                tournament.ImgUrl = "https://localhost:7042/" + imagePath;
            }

            tournamentRepo.Add(tournament);
            tournamentRepo.Save();

            return new ServiceResult<Tournament>
            {
                Success = true,
                Message = "tournament added successfully.",
                Data = tournament
            };
        }
        public List<Tournament> GetFirst4ActiveTournaments()
        {
            return tournamentRepo.GetAll().Where(t => t.Status == Enums.EventStatus.Preparing).Take(4).ToList();
            //return null;
        }


       public List<TournamentCardDTO>  UserCreatedTournaments(string userId)
       {
            List<Tournament> tournaments = tournamentRepo.GetAll().Where(t => t.CreatorId == userId).ToList();
            return map.Map<List<TournamentCardDTO>>(tournaments);
       }


       public List<TournamentCardDTO> UserJoinedTournaments(string userId)
       {

            // First get all teams for the user
            var userTeams = userTeamRepo.GetTeamsByUserId(userId).ToList(); // Executes first query

            // Then get tournaments for each team (executes second query in memory)
            List<Tournament> result = userTeams
                .SelectMany(team => tournamentTeamRepo.GetTournamentsByTeamId(team.Id))
                .ToList();


            //var result = tournamentTeamRepo.GetTournamentsByTeamId(userTeamsIds);


            return map.Map<List<TournamentCardDTO>>(result);
       }


    }
}