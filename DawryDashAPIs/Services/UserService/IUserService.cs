using DawryDashAPIs.DTOs.UserDTOs;
using DawryDashAPIs.Entities;

namespace DawryDashAPIs.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResult<ApplicationUser>> Register(AddUserDTO DTO);
        ServiceResult<ApplicationUser> AuthenticateUser(LoginUserDTO DTO);
        ApplicationUser GetUserData(string userId);
        List<UserCardDTO> GetUsersByName(string name);
        Task<ServiceResult<ApplicationUser>> ChangePassword(ChangePasswordDTO dto);
        Task<ServiceResult<UserCardDTO>> UpdateUser(UpdateUserDTO dto);
        string GenerateJwtToken(ApplicationUser user);
        Task<ServiceResult<AuthResponseDTO>> GoogleLogin(GoogleLoginDTO dto);

    }
}
