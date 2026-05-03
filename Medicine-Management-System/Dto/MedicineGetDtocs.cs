namespace Medicine_Management_System.Dto
{
    public class MedicineGetDtocs
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Expirate_Date { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Brand { get; set; }
    }
}
