using AutoMapper;
using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DawryDashAPIs.Services.UserService
{
    public class UserService : IUserService
    {
        IMapper map;
        UserManager<ApplicationUser> userManager;

        public UserService(IMapper _map, UserManager<ApplicationUser> _userManager)
        {
            map = _map;
            userManager = _userManager;
        }

        public ServiceResult<ApplicationUser> Register(AddUserDTO DTO)
        {
            ApplicationUser user = map.Map<ApplicationUser>(DTO);

            string userName;

            string baseUserName = DTO.fullname.Replace(" ", "").ToLower();

            do
            {
                string suffix = Guid.NewGuid().ToString("N").Substring(0, 6);
                userName = $"{baseUserName}_{suffix}";
            }
            while (userManager.FindByNameAsync(userName).Result != null);

            user.UserName = userName;

            var result =  userManager.CreateAsync(user, DTO.password).Result;

            if (result.Succeeded)
            {
                result = userManager.AddToRoleAsync(user, "user").Result;
                if (result.Succeeded)
                {
                    return new ServiceResult<ApplicationUser> { 
                        Success = true,
                        Message = "User Added Successfully", 
                        Data = user };
                }
                else
                {
                    return new ServiceResult<ApplicationUser>
                    {
                        Success = false,
                        Message = string.Join(", ", result.Errors.Select(e => e.Description))
                    };
                }
            }
            else
            {
                return new ServiceResult<ApplicationUser>
                {
                    Success = false,
                    Message = string.Join(", ", result.Errors.Select(e => e.Description))
                };
            }
        }


        public ServiceResult<ApplicationUser> AuthenticateUser(LoginUserDTO DTO)
        {
            var user = userManager.FindByEmailAsync(DTO.email).Result;
            if (user != null)
            {
                var passwordValid = userManager.CheckPasswordAsync(user, DTO.password).Result;
                if (passwordValid)
                {
                    return new ServiceResult<ApplicationUser>
                    {
                        Success = true,
                        Message = "User Authentication Passed",
                        Data = user
                    };
                }
            }

            return new ServiceResult<ApplicationUser>
            {
                Success = false,
                Message = "Invalid Email or Password",
            };
        }
    }
}
