using DawryDashAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace DawryDashAPIs.Repositories
{
    public class TournamentTeamRepo
    {
        public dbContext _dbContext;
        public TournamentTeamRepo(dbContext _dbcontext)
        {
            this._dbContext = _dbcontext;
        }


        public IQueryable<Tournament> GetTournamentsByTeamId(int teamId)
        {
            return _dbContext.TournamentTeams.Where(tt=>tt.TeamId == teamId).Include(tt=>tt.Tournament).Select(tt => tt.Tournament);
            //return _dbContext.TournamentTeams
            //    .Where(tt => tt.TeamId == teamId)
            //    .Include(tt => tt.Tournament)
            //    .Select(tt => tt.Tournament)
            //    .GroupBy(t => t.Id)  // Group by unique ID
            //    .Select(g => g.First());  // Take first from each group
        }
    }
}
