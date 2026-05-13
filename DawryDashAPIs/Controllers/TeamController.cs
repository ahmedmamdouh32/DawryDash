using AutoMapper;
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
        IMapper map;
        public TeamController(ITeamService _teamService, IMapper _map)
        {
            teamService = _teamService;
            map = _map;
        }

        [HttpGet]
        [EndpointSummary("Return All Teams")]
        public ActionResult<List<DisplayTeamDTO>> GetAll()
        {
            var teams = teamService.GetAll();
            return Ok(teams);
        }

        [EndpointSummary("Adding a new Team")]
        [HttpPost]
        public IActionResult Add(AddTeamDTO teamDTO)
        {
            var result = teamService.Add(teamDTO);
            if (result.Success)
            {
                return CreatedAtAction(
                       nameof(GetById),
                       new { id = result.Data.Id },
                       map.Map<DisplayTeamDTO>(result.Data)
                );
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [EndpointSummary("Get By Id")]
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var team  = teamService.GetById(id);
            return team == null ? NotFound() : Ok(team);
        }

        [EndpointSummary("delet a Team by its Id")]
        [HttpDelete("{id:int}")]
        public IActionResult DeleteById(int id)
        {
            bool deleted = teamService.DeleteById(id);
            return deleted == true ? NoContent() : NotFound();
        }

        [EndpointSummary("Update Team")]
        [HttpPut("{id:int}")]
        public IActionResult Update([FromBody]UpdateTeamDTO teamDTO, [FromRoute]int id)
        {
            bool updated = teamService.Update(teamDTO, id);

            return updated ? NoContent() : NotFound();
        }



    }
}