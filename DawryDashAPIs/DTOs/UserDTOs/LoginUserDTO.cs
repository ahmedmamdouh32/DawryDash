using DawryDashAPIs.Custom_Validators;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class LoginUserDTO
    {
        [MaxLength(256)]
        [Required]
        public string email { set; get; }

        [Required]
        public string password { set; get; }
    }
}
