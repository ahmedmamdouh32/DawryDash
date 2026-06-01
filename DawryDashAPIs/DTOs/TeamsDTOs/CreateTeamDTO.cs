using DawryDashAPIs.Entities;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.DTOs.TeamsDTOs
{
    public class CreateTeamDTO
    {
        [Required(ErrorMessage ="User Id is required")]
        public string userId { set; get; } // to store the team and user in userTeam table

        [MaxLength(100, ErrorMessage ="Maximum team name length is 100 characters")]
        [Required(ErrorMessage ="Team name is required")]
        public string Name { set; get; }
      
        [MaxLength(100, ErrorMessage = "Maximum Slogan length is 100 characters")]
        public string? Slogan { set; get; }

        [MaxLength(4, ErrorMessage = "Maximum Team abbreviation length is 4 characters")]
        [MinLength(2, ErrorMessage = "Minimum Team abbreviation length is 2 characters")]
        public string TeamAbbreviation { set; get; }

        public string PrimaryColor { set; get; }

        public string SecondaryColor { set; get; }

        [MaxLength(500, ErrorMessage = "Maximum Team Description length is 500 characters")]
        public string? Description { set; get; }

        public IFormFile? Image { get; set; } //for receiving image

    }
}
