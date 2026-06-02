using DawryDashAPIs.Enums;

namespace DawryDashAPIs.Entities
{
    public class TeamUser
    {
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public int TeamId { get; set; }

        public Team Team { get; set; }

        public bool IsCaptain { get; set; }

        public int userNumber { set; get; }

        public PlayerPosition Position { set; get; }
    }
}
