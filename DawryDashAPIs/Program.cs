using DawryDashAPIs.Entities;
using DawryDashAPIs.Mapping;
using DawryDashAPIs.Repositories;
using DawryDashAPIs.Services.MatchService;
using DawryDashAPIs.Services.TeamService;
using DawryDashAPIs.Services.TeamsServices;
using DawryDashAPIs.Services.TournamentService;
using DawryDashAPIs.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

namespace DawryDashAPIs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.

            builder.Services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters
                        .Add(new JsonStringEnumConverter());
                });            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(
               op =>
               {
                   op.Password.RequireNonAlphanumeric = false;
                   op.User.RequireUniqueEmail = true;

               }
           )
           .AddEntityFrameworkStores<dbContext>()
           .AddDefaultTokenProviders();


            builder.Services.AddDbContext<dbContext>(optionBuilder =>
            {
                optionBuilder.UseSqlServer(builder.Configuration.GetConnectionString("DawryDash"));
            });
            builder.Services.AddScoped<ITeamService, TeamService>();
            builder.Services.AddScoped<IMatchService, MatchService>();
            builder.Services.AddScoped<GenericRepo<Team>>();
            builder.Services.AddScoped<GenericRepo<Match>>();
            builder.Services.AddScoped<UserTeamRepo>();
            builder.Services.AddScoped<GenericRepo<Tournament>>();
            builder.Services.AddScoped<ITournanemtService, TournamentService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddAutoMapper(op => op.AddProfile<MappingConfig>());


            builder.Services.AddAuthentication(
            op =>
            {
                op.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(
                op =>
                {
                    //secret key 
                    string key = "this is a secret key whose length should be greater than 256/8";
                    var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
                    op.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        IssuerSigningKey = secretKey,
                        ValidateLifetime = true
                    };
                }
            );
           

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("AllowAll");

            app.MapControllers();

            app.Run();
        }
    }
}
