using DawryDashAPIs.DTOs.TeamsDTOs;
using DawryDashAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace DawryDashAPIs.Repositories
{
    public class UserTeamRepo
    {
        public dbContext _dbContext;
        public UserTeamRepo(dbContext _dbcontext)
        {
            this._dbContext = _dbcontext;
        }

        public IQueryable<Team> GetTeamsByUserId(string userId)
        {
            return _dbContext.TeamUsers.Where(tu => tu.UserId == userId).Include(t => t.Team).Select(tu => tu.Team);
        }


        public IQueryable<TeamMemberDTO> GetTeamMembers(int teamId)
        {
            return _dbContext.TeamUsers.Where(tu => tu.TeamId == teamId).Include(u => u.User).
                Select(r => new TeamMemberDTO { 
                    userId = r.User.Id,
                    username = r.User.UserName,
                    Fullname = r.User.FullName,
                    ImgUrl = r.User.ImgUrl,
                    Position = r.Position.ToString(),
                    TshirtNumber = r.userNumber,
                    IsCaptain = r.IsCaptain
                });
        }

        public void AddTeamUser(TeamUser tUser)
        {
            _dbContext.TeamUsers.Add(tUser);
        }


    }
}
