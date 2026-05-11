using AutoMapper;
using DawryDashAPIs.DTOs.MatchDTOs;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Repositories;

namespace DawryDashAPIs.Services.MatchService
{
    public class MatchService : IMatchService
    {
        GenericRepo<Match> matchRepo;
        IMapper map;
        public MatchService(GenericRepo<Match> _matchRepo, IMapper _map)
        {
            matchRepo = _matchRepo;
            map = _map;
        }

        public Match Add(AddMatchDTO matchDTO)
        {
            if (matchDTO == null)
            {
                return null;
            }
            else
            {
                Match match = map.Map<Match>(matchDTO);
                matchRepo.Add(match);
                matchRepo.Save();
                return match;
            }
        }

        public bool UpdateMatchScore(MatchScoreDTO matchDTO, int id)
        {
            Match match = matchRepo.GetById(id);
            if (match == null)
                return false;
            map.Map(matchDTO, match);
            if(matchDTO.FirstTeamScore > matchDTO.SecondTeamScore)
            {
                match.WinnerTeamId = match.FirstTeamId;
            }
            else if(matchDTO.FirstTeamScore < matchDTO.SecondTeamScore)
            {
                match.WinnerTeamId = match.SecondTeamId;
            }
            else
            {
                match.WinnerTeamId = null;
            }
            matchRepo.Update(match);
            matchRepo.Save();
            return true;
        }

        public bool UpdateMatchTeams(MatchTeamsDTO matchDTO, int id)
        {
            Match match = matchRepo.GetById(id);
            if (match == null)
                return false;
            map.Map(matchDTO, match);
            matchRepo.Update(match);
            matchRepo.Save();
            return true;
        }


        public DisplayMatchDTO GetById(int id)
        {
            Match match = matchRepo.GetById(id);
            if (match != null)
            {
                return map.Map<DisplayMatchDTO>(match);
            }
            return null;
        }

       
    }
}
