using AutoMapper;
using DawryDashAPIs.DTOs.MatchDTOs;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Mapping
{
    public class MappingConfig:Profile
    {
        public MappingConfig(){
            //Team Mapping
            CreateMap<Team, DisplayTeamDTO>();
            CreateMap<AddTeamDTO, Team>();
            CreateMap<UpdateTeamDTO, Team>();

            //Match Mapping
            CreateMap<AddMatchDTO, Match>();
            CreateMap<Match, DisplayMatchDTO>();
            CreateMap<MatchScoreDTO, Match>();
            CreateMap<MatchTeamsDTO, Match>();

            //Tournament Mapping
            CreateMap<AddTournamentDTO, Tournament>();
            CreateMap<Tournament, DisplayTournamentDTO>();

            //User Mapping
            CreateMap<AddUserDTO, ApplicationUser>();

        }
    }
}
