using DawryDashAPIs.Entities;
using Microsoft.EntityFrameworkCore;

namespace DawryDashAPIs.Repositories
{
    public class GenericRepo<TEntity> where TEntity : class
    {

        public dbContext _dbContext;
        public GenericRepo(dbContext _dbcontext)
        {
            this._dbContext = _dbcontext;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>();
        }

        public TEntity GetById(int id)
        {
            return _dbContext.Set<TEntity>().Find(id);
        }

        public void Add(TEntity obj)
        {
            _dbContext.Set<TEntity>().Add(obj);
        }

        public void Update(TEntity obj)
        {
            _dbContext.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(TEntity obj)
        {
            //TEntity obj = _dbContext.Set<TEntity>().Find(id);
            _dbContext.Set<TEntity>().Remove(obj);
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
