using AutoMapper;
using DawryDashAPIs.DTOs.DashboardDTO;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Services.TeamService;
using DawryDashAPIs.Services.TeamsServices;
using DawryDashAPIs.Services.TournamentService;
using DawryDashAPIs.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DawryDashAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        ITeamService teamService;
        ITournanemtService tournamentService;
        IUserService userService;
        IMapper map;

        public DashboardController(ITeamService _teamService, ITournanemtService _tournamentService, IUserService _userService, IMapper _map)
        {
            teamService = _teamService;
            tournamentService = _tournamentService;
            userService = _userService;
            map = _map;
        }

        [Authorize]
        [HttpGet("{userId}")]
        public IActionResult GetDashboardHomeDetails(string userId)
        {
            DashboardHomeDTO result = new();
            result.user= map.Map<UserDashboardDTO>(userService.GetUserData(userId));
            result.latestTeams = map.Map<List<TeamCardDTO>>(teamService.getTeamsByUserId(userId));
            result.activeTournaments = map.Map<List<TournamentCardDTO>>(tournamentService.GetFirst4ActiveTournaments());
            return Ok(result);
        }
    }
}