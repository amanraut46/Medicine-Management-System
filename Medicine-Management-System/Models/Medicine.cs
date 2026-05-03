using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Medicine_Management_System.Models
{
    [Table("Medicine")]
    public class Medicine
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column("Full Name")]
        public string Name { get; set; }
        [Required]
        public string Note { get; set; }
        [Required]
        public DateTime Expirate_Date { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Brand { get; set; }
    }
}
