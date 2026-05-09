
using DawryDashAPIs.Entities;
using DawryDashAPIs.Repositories;
using DawryDashAPIs.Services.TeamService;
using DawryDashAPIs.Services.TeamsServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DawryDashAPIs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<dbContext>(optionBuilder =>
            {
                optionBuilder.UseSqlServer(builder.Configuration.GetConnectionString("DawryDash"));
            });
            builder.Services.AddScoped<ITeamService, TeamService>();
            builder.Services.AddScoped<GenericRepo<Team>>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
