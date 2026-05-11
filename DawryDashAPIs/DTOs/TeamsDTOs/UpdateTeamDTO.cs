using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class UpdateTeamDTO
    {
        [MaxLength(100, ErrorMessage = "Team Name Must be less than 100 letters")]
        public string Name { set; get; }

        [MaxLength(200, ErrorMessage = "Image Url is very long, Choose shorter one")]
        public string ImgUrl { set; get; }
    }
}
