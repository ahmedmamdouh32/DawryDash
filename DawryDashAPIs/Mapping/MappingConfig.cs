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
            CreateMap<CreateTeamDTO, Team>();
            CreateMap<UpdateTeamDTO, Team>();
            CreateMap<Team, TeamCardDTO>();
            CreateMap<Team, TeamDetailsForMembersDTO>().ForMember(
                dest => dest.WinRate,
                opt => opt.MapFrom(src => src.TotalMatchesPlayed > 0
                    ? Math.Round((src.TotalWins / (double)src.TotalMatchesPlayed) * 100, 2)
                    : 0)
            );


            //TeamUser Mapping
            CreateMap<TeamUser, AddTeamMemberDTO>();


            //Match Mapping
            CreateMap<AddMatchDTO, Match>();
            CreateMap<Match, DisplayMatchDTO>();
            CreateMap<MatchScoreDTO, Match>();
            CreateMap<MatchTeamsDTO, Match>();

            //Tournament Mapping
            CreateMap<AddTournamentDTO, Tournament>();
            CreateMap<Tournament, DisplayTournamentDTO>();
            CreateMap<Tournament, TournamentCardDTO>()
                .ForMember(
                    dest => dest.startDate,
                    opt => opt.MapFrom(src =>
                        src.StartDate.HasValue
                            ? src.StartDate.Value.ToString("MMMM dd")
                            : null
                    )
                );

            //User Mapping
            CreateMap<AddUserDTO, ApplicationUser>();
            CreateMap<ApplicationUser, UserDashboardDTO>();
            CreateMap<ApplicationUser, UserCardDTO>();


        }
    }
}
