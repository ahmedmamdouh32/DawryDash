using AutoMapper;
using DawryDashAPIs.DTOs.MatchDTOs;
using DawryDashAPIs.Entities;
using DawryDashAPIs.Services.MatchService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;

namespace DawryDashAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        IMatchService matchService;
        IMapper map;
        public MatchController(IMatchService _matchService, IMapper _map)
        {
            matchService = _matchService;
            map = _map;
        }

        [EndpointSummary("Get Match by Id")]
        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute]int id)
        {
            DisplayMatchDTO matchDTO = matchService.GetById(id);
            return matchDTO == null ? NotFound() : Ok(matchDTO);
        }

        [EndpointSummary("Adding a new Match")]
        [HttpPost]
        public IActionResult Add([FromBody]AddMatchDTO matchDTO)
        {
            Match match = matchService.Add(matchDTO);
            return CreatedAtAction(nameof(GetById), new { id = match.Id }, map.Map<DisplayMatchDTO>(match));
        }

        [EndpointSummary("Update Match Score & Winner Team")]
        [HttpPatch("updateMatchScore/{matchId:int}")]
        public IActionResult SetMatchScore([FromRoute]int matchId, [FromBody]MatchScoreDTO matchDTO)
        {
            bool updated = matchService.UpdateMatchScore(matchDTO, matchId);
            return updated ? NoContent() : NotFound();
        }

        [EndpointSummary("Set Match's Teams")]
        [HttpPatch("updateMatchTeams/{matchId:int}")]
        public IActionResult SetMatchTeams(int matchId, MatchTeamsDTO matchDTO)
        {
            bool updated = matchService.UpdateMatchTeams(matchDTO, matchId);
            return updated ? NoContent() : NotFound();
        }
    }
}