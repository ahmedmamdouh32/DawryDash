using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.TournamentService
{
    public interface ITournanemtService
    {
        DisplayTournamentDTO GetById(int id);
        Task<ServiceResult<Tournament>> Add(AddTournamentDTO DTO);
        List<Tournament> GetFirst4ActiveTournaments();

        List<TournamentCardDTO> UserCreatedTournaments(string userId);
        List<TournamentCardDTO> UserJoinedTournaments(string userId);



    }
}
