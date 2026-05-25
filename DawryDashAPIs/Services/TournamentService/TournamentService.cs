using AutoMapper;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Repositories;
using DawryDashAPIs.Services.TeamsServices;
using Microsoft.AspNetCore.Mvc;

namespace DawryDashAPIs.Services.TournamentService
{
    public class TournamentService : ITournanemtService
    {
        GenericRepo<Tournament> tournamentRepo;
        IMapper map;
        public TournamentService(GenericRepo<Tournament> _tournamentRepo, IMapper _map) 
        {
            tournamentRepo = _tournamentRepo;
            map = _map;
        }

        public DisplayTournamentDTO GetById(int id)
        {
            Tournament tournament = tournamentRepo.GetById(id);
            if (tournament != null)
            {
                return map.Map<DisplayTournamentDTO>(tournament);
            }
            return null;
        }


        public Tournament Add(AddTournamentDTO DTO)
        {
            if(DTO == null)
            {
                return null;
            }
            else
            {
                Tournament tournament = map.Map<Tournament>(DTO);
                tournamentRepo.Add(tournament);
                tournamentRepo.Save();
                return tournament;
            }
        }
        public List<Tournament> GetFirst4ActiveTournaments()
        {
            return tournamentRepo.GetAll().Where(t => t.Status == Enums.EventStatus.Preparing).Take(4).ToList();
            //return null;
        }
    }
}