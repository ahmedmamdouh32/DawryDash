using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class ChangePasswordDTO : LoginUserDTO
    {
        [Required]
        public string newPassword { set; get; }
    }
}
