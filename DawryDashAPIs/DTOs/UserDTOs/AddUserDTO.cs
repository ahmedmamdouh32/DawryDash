using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using DawryDashAPIs.Custom_Validators;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class AddUserDTO
    {
        //[MaxLength(256)]
        //public string username { set; get; } for user experience: generate username in automatically

        [MaxLength(256)]
        [Required]
        //[ValidateEmailRepetition]
        public string email { set; get; }


        [MaxLength(50)]
        [Required]
        public string fullname { set; get; }


        [Required]
        public string password { set; get; }
    }
}
