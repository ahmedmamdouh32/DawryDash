using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.ComponentModel.DataAnnotations;

namespace DawryDashAPIs.Custom_Validators
{
    public class ValidTeamsNumber : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            int number = (int)value;

            
            if(number > 32)
            {
                return new ValidationResult("Maximum number of teams is 32");
            }
            else if(number < 2)
            {
                return new ValidationResult("Minimum number of teams is 2");

            }

            bool isPowerOfTwo = (number & (number - 1)) == 0;

            if (!isPowerOfTwo)
            {
                return new ValidationResult(
                    "The number of teams must be a power of 2."
                );
            }

            return ValidationResult.Success;
        }
    }
}