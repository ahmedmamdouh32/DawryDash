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
        public async Task<IActionResult> Add([FromForm]CreateTeamDTO teamDTO)
        {

            var result = await teamService.Add(teamDTO);
            if (result.Success)
            {
                //return CreatedAtAction(
                //       nameof(gettea),
                //       new { id = result.Data.Id },
                //       map.Map<DisplayTeamDTO>(result.Data)
                //);
                return Ok();
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [EndpointSummary("Get By Id")]
        [HttpGet("DetailsForMembers/{teamId:int}")]
        public IActionResult GetTeamDetailsForMembers(int teamId)
        {
            var team = teamService.GetTeamDetailsForMembers(teamId);
            return team == null ? NotFound() : Ok(team);
        }


        [EndpointSummary("Get By Id")]
        [HttpGet("{teamId:int}/Members")]
        public IActionResult GetTeamMembers(int teamId)
        {
            var members = teamService.GetTeamMembers(teamId);
            return members == null ? NotFound() : Ok(members);
        }



        [HttpPut("updateMembers/{teamId:int}")]
        public IActionResult AddTeamMembers([FromBody] List<AddTeamMemberDTO> members, int teamId)
        {
            teamService.UpdateMembers(members, teamId);
            return Ok();
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