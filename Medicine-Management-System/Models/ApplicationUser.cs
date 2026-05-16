using Microsoft.AspNetCore.Identity;

namespace Medicine_Management_System.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }


        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
