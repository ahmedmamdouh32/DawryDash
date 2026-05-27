using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Services.UserService;
using Microsoft.AspNetCore.Http;
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
        public IActionResult Register(AddUserDTO DTO)
        {
            if (DTO == null)
                return BadRequest();

            if (ModelState.IsValid)
            {
                var result =  userService.Register(DTO);
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
                    List<Claim> userClaims = new();
                    userClaims.Add(new Claim("fullname", result.Data.FullName));
                    userClaims.Add(new Claim("imgUrl", result.Data.ImgUrl ?? "not found"));

                    //secret key generation
                    string key = "this is a secret key whose length should be greater than 256/8";
                    var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
                    var signCredits = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    //token generation
                    var token = new JwtSecurityToken(
                        claims: userClaims,
                        expires: DateTime.Now.AddMonths(1),
                        signingCredentials: signCredits
                        );
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
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



        [HttpGet("message")]
        
        
        public IActionResult getData()
        {
            return Ok(new {message= "Data Received Successfully" });
        }

        [HttpGet("Pmessage/{number:int}")]
        public IActionResult getDataT([FromRoute]int number)
        {
            return Ok(number % 2 ==0 ? "even" : "odd");
        }

    }
}
