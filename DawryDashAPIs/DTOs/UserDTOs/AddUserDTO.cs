using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class AddUserDTO
    {
        public string username { set; get; }
        public string email { set; get; }
        public string fullname { set; get; }
        public string password { set; get; }
    }
}
