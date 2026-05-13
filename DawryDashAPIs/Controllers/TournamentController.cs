using AutoMapper;
using DawryDashAPIs.DTOs.TeamDTOs;
using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.DTOs.TournamentDTOs;
using DawryDashAPIs.Entities;
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


        [HttpPost]
        public IActionResult Add(AddTournamentDTO DTO)
        {
            Tournament createdTournament = tournamentService.Add(DTO);
            return CreatedAtAction(
                   nameof(GetById),
                   new { id = createdTournament.Id },
                   map.Map<DisplayTournamentDTO>(createdTournament)
            );
        }
    }
}
