using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.TournamentService
{
    public interface ITournanemtService
    {
        DisplayTournamentDTO GetById(int id);
        Tournament Add(AddTournamentDTO DTO);
    }
}
