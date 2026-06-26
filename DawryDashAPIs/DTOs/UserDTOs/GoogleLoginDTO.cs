using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class GoogleLoginDTO
    {
        [Required]
        public string IdToken { get; set; } = string.Empty;
    }
}
