using DawryDashAPIs.DTOs.MatchDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.MatchService
{
    public interface IMatchService
    {
        Match Add(AddMatchDTO matchDTO);

        DisplayMatchDTO GetById(int id);

        bool UpdateMatchScore(MatchScoreDTO matchDTO, int id);
        bool UpdateMatchTeams(MatchTeamsDTO matchDTO, int id);

    }
}
