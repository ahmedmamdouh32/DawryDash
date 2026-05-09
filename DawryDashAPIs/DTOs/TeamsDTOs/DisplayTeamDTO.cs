namespace DawryDashAPIs.DTOs.TeamDTOs
{
    public class DisplayTeamDTO
    {
        public int Id { set; get; }

        private string _name;
        public string Name
        {
            get
            {
                if (string.IsNullOrEmpty(_name))
                    return _name;

                return char.ToUpper(_name[0]) + _name.Substring(1);
            }

            set
            {
                _name = value;
            }
        }
        public string ImgUrl { set; get; }
        public int TournamentId { set; get; }
    }
}
