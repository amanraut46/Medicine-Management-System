using Medicine_Management_System.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Medicine_Management_System
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Medicine> Medicines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Medicine>().HasData(
                new Medicine
                {
                    Id = 1,
                    Name = "Paracetamol",
                    Expirate_Date = new DateTime(2026, 5, 31),
                    Quantity = 100,
                    Price = 2.5,
                    Brand = "Cipla",
                    Note = "Fever"
                },
                new Medicine
                {
                    Id = 2,
                    Name = "Amoxicillin",
                    Expirate_Date = new DateTime(2026, 6, 30),
                    Quantity = 50,
                    Price = 5,
                    Brand = "Sun Pharma",
                    Note = "Antibiotic"
                },
                new Medicine
                {
                    Id = 3,
                    Name = "Paracetamol",
                    Expirate_Date = new DateTime(2027, 12, 31),
                    Quantity = 100,
                    Price = 2.5,
                    Brand = "Cipla",
                    Note = "Pain relief"
                },
                new Medicine
                {
                    Id = 4,
                    Name = "Amoxicillin",
                    Expirate_Date = new DateTime(2026, 6, 30),
                    Quantity = 9, // low stock
                    Price = 5,
                    Brand = "Sun Pharma",
                    Note = "Antibiotic"
                },
                new Medicine
                {
                    Id = 5,
                    Name = "Ibuprofen",
                    Expirate_Date = new DateTime(2026, 5, 10),
                    Quantity = 75,
                    Price = 3.2,
                    Brand = "Dr Reddy's",
                    Note = "Anti-inflammatory"
                }
            );
        }
    }
}
