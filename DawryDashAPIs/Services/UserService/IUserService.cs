using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.UserService
{
    public interface IUserService
    {
        ServiceResult<ApplicationUser> Register(AddUserDTO DTO);
        ServiceResult<ApplicationUser> AuthenticateUser(LoginUserDTO DTO);
        ApplicationUser GetUserData(string userId);


    }
}
