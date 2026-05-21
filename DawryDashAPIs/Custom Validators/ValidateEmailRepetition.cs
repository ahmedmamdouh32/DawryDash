using DawryDashAPIs.Entities;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.Custom_Validators
{
    public class ValidateEmailRepetition : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            
            var userManager = (UserManager<ApplicationUser>) validationContext.GetService(typeof(UserManager<ApplicationUser>));

            string email = value?.ToString();

            var user = userManager.FindByEmailAsync(email).Result;

            if (user != null)
                return new ValidationResult("Email already exists.");

            return ValidationResult.Success;
        }
    }
    
}
