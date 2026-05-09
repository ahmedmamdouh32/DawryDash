using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DawryDashAPIs.Entities
{
    public class Team
    {
        public int Id { set; get; }

        [MaxLength(100)]
        public string Name { set; get; } = string.Empty;

        [MaxLength(200)]
        public string? ImgUrl { set; get; }

        public int TournamentId { set; get; }
        public virtual Tournament Tournament { set; get; }
    }
}
