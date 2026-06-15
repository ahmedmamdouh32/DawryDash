using AutoMapper;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Services;
using DawryDashAPIs.Services.TeamService;
using DawryDashAPIs.Services.TeamsServices;
using DawryDashAPIs.Services.TournamentService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DawryDashAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        ITournanemtService tournamentService;

        IMapper map;
        public TournamentController(ITournanemtService _tournamentService, IMapper _map)
        {
            tournamentService = _tournamentService;
            map = _map;
        }


        [EndpointSummary("Get By Id")]
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var tournament = tournamentService.GetById(id);
            return tournament == null ? NotFound() : Ok(tournament);
        }


        [EndpointSummary("Adding a new Tournament")]
        [HttpPost]
        public async Task<IActionResult> Add([FromForm]AddTournamentDTO DTO)
        {
            ServiceResult<Tournament> result = await tournamentService.Add(DTO);
            if(result.Success == true)
            {
                return CreatedAtAction(
                    nameof(GetById),
                    new { id = result.Data.Id },
                    map.Map<DisplayTournamentDTO>(result.Data)
                );
            }
            else
            {
                return BadRequest(result.Message);
            }
            
        }


        [EndpointSummary("Get tournaments created by user")]
        [HttpGet("Creator")]
        public IActionResult GetCreatorTournaments(string userId)
        {
            var tournaments = tournamentService.UserCreatedTournaments(userId);
            return tournaments == null ? NotFound() : Ok(tournaments);
        }


        [EndpointSummary("Get tournaments user has joined")]
        [HttpGet("User")]
        public IActionResult GetUserTournaments(string userId)
        {
            var tournaments = tournamentService.UserJoinedTournaments(userId);
            return tournaments == null ? NotFound() : Ok(tournaments);
        }
    }
}
