using DawryDashAPIs.Custom_Validators;
using DawryDashAPIs.Enums;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace DawryDashAPIs.DTOs.TournamentDTOs
{
    public class AddTournamentDTO
    {
        [MaxLength(50,ErrorMessage ="Maximum length for Tournament name is 50")]
        public string Name { set; get; } = string.Empty;

        [MaxLength(300, ErrorMessage = "Maximum length for Tournament Description is 300")]
        public string? Description { set; get; }

        [MaxLength(200, ErrorMessage = "Maximum length for Image URL is 200")]
        public string? ImgUrl { set; get; }


        [Required(ErrorMessage ="This field is required")]
        [ValidTeamsNumber(ErrorMessage = "Invalid teams number, Choose a number of power 2")]
        public int MaxTeams { set; get; }

        public DateTime? StartDate { set; get; }

        [MaxLength(200)]
        public string? Address { set; get; }
        public int? Duration { set; get; } //duration by day
        public int MathcDurationMinutes { set; get; } = 15;
    }
}
