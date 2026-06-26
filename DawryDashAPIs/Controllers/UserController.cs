using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DawryDashAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService userService;
        public UserController(IUserService _userService)
        {
            userService = _userService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(AddUserDTO DTO)
        {
            if (DTO == null)
                return BadRequest();

            if (ModelState.IsValid)
            {
                var result =  await userService.Register(DTO);
                if (result.Success)
                {
                    return Ok(new { success = result.Success, message = result.Message });
                }
                else
                {
                    return BadRequest(new { success = result.Success, message = result.Message });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpPost("Login")]
        public IActionResult Login(LoginUserDTO DTO)
        {
            if (ModelState.IsValid)
            {
                var result = userService.AuthenticateUser(DTO);
                if (result.Success)
                {
                    string encodedToken = userService.GenerateJwtToken(result.Data);
                    return Ok(
                        new
                        {
                            success = true,
                            token = encodedToken,
                            userId = result.Data.Id,
                            userName = result.Data.UserName,
                            fullName = result.Data.FullName,
                            imgUrl = result.Data.ImgUrl
                        });
                }
                else
                {
                    return BadRequest(
                        new 
                        {
                            success = false,
                            message = result.Message
                        });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }



        [EndpointSummary("Login with Google")]
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin( GoogleLoginDTO dto)
        {
            var result = await userService.GoogleLogin(dto);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Data);
        }




        [HttpGet("GetUsersByName/{name}")]
        public IActionResult GetUsersByName(string name)
        {
            List<UserCardDTO> result = userService.GetUsersByName(name);
            return Ok(result);
        }


        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO dto)
        {
            var result = await userService.ChangePassword(dto);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }


        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromForm]UpdateUserDTO dto)
        {
            var result = await userService.UpdateUser(dto);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }
    }
}
