using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.Entities
{
    public class ApplicationUser : IdentityUser
    {

        [MaxLength(50)]
        public string FullName { set; get; }

        [MaxLength(200)]
        public string? ImgUrl { set; get; }
        public virtual ICollection<TeamUser> TeamUsers { set; get; } = new List<TeamUser>();
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;


        public ICollection<Tournament> CreatedTournaments
        { get; set; } = new List<Tournament>();

    }
}
