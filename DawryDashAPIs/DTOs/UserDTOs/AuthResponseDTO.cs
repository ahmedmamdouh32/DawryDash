namespace DawryDashAPIs.DTOs.UserDTOs
{
    public class AuthResponseDTO
    {
        public string token { get; set; } = string.Empty;
        public string userName { get; set; } = string.Empty;
        public string fullName { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string userId { set; get; } = string.Empty;
        public string imgUrl { set; get; } = string.Empty;
    }
}
