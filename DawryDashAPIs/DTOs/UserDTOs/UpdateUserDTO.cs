using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class UpdateUserDTO
    {
        [Required]
        public string email { set; get; }
        [Required]
        public string fullName { set; get; }
        [Required]
        public string userName { set; get; }
        public IFormFile? Image { get; set; } //for receiving image
    }
}
