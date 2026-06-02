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

        public void AddTeamUser(int teamId, string userId, bool isCaptain)
        {
            TeamUser teamUser = new();
            teamUser.UserId = userId;
            teamUser.TeamId = teamId;
            teamUser.IsCaptain = isCaptain;
            _dbContext.TeamUsers.Add(teamUser);
        }


    }
}
