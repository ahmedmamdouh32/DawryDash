using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class AddUserDTO
    {
        //[MaxLength(256)]
        //public string username { set; get; } for user experience: generate username in automatically

        [MaxLength(256)]
        public string email { set; get; }

        [MaxLength(50)]
        public string fullname { set; get; }
        public string password { set; get; }
    }
}
