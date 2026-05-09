using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Services.TeamService;
using DawryDashAPIs.Services.TeamsServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DawryDashAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        ITeamService teamService;
        public TeamController(ITeamService _teamService)
        {
            teamService = _teamService;
        }

        [HttpGet]
        public ActionResult<List<DisplayTeamDTO>> GetAll()
        {
            var teams = teamService.GetAll();
            return Ok(teams);
        }

        [HttpPost]
        public IActionResult Add(AddTeamDTO teamDTO)
        {
            Team createdTeam = teamService.Add(teamDTO);
            return CreatedAtAction(
                   nameof(GetById),
                   new { id = createdTeam.Id },
                   new DisplayTeamDTO { Name =createdTeam.Name,
                       Id =createdTeam.Id, 
                       ImgUrl = createdTeam.ImgUrl, 
                       TournamentId = createdTeam.TournamentId}
               );
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var team  = teamService.GetById(id);
            return team == null ? NotFound() : Ok(team);
        }

    }
}
