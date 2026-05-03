using AutoMapper;
using Medicine_Management_System.Dto;
using Medicine_Management_System.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Medicine_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;
        public MedicineController(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? sortBy = null, [FromQuery] string? sortDir = "asc")
        {
            try
            {
                IQueryable<Medicine> query = appDbContext.Medicines;
                if (!string.IsNullOrEmpty(sortBy))
                {
                    var prop = typeof(Medicine).GetProperty(sortBy, System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
                    if (prop != null)
                    {
                        query = sortDir?.ToLower() == "desc"
                            ? query.OrderByDescending(x => EF.Property<object>(x, prop.Name))
                            : query.OrderBy(x => EF.Property<object>(x, prop.Name));
                    }
                }
                var medicines = await query.ToListAsync();
                var result = mapper.Map<List<MedicineGetDtocs>>(medicines);
                if (result == null || result.Count == 0)
                {
                    return NotFound("No medicines found.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var medicine = await appDbContext.Medicines.FindAsync(id);
                if (medicine == null)
                {
                    return NotFound($"Medicine with ID {id} not found.");
                }
                var result = mapper.Map<MedicineDto>(medicine);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost("BulkPost")]
        public async Task<IActionResult> BulkPost(List<MedicineDto> medicineDtos)
        {
            try
            {
                var medicines = mapper.Map<List<Medicine>>(medicineDtos);
                await appDbContext.Medicines.AddRangeAsync(medicines);
                await appDbContext.SaveChangesAsync();
                var result = mapper.Map<List<MedicineDto>>(medicines);
                return CreatedAtAction(nameof(Get), result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MedicineDto medicineDto)
        {
            try
            {
                var medicine = mapper.Map<Medicine>(medicineDto);
                await appDbContext.Medicines.AddAsync(medicine);
                await appDbContext.SaveChangesAsync();
                var result = mapper.Map<MedicineDto>(medicine);
                return CreatedAtAction(nameof(GetById), new { id = medicine.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, MedicineDto medicineDto)
        {
            try
            {
                var existingMedicine = await appDbContext.Medicines.FindAsync(id);
                if (existingMedicine == null)
                {
                    return NotFound($"Medicine with ID {id} not found.");
                }
                mapper.Map(medicineDto, existingMedicine);
                appDbContext.Medicines.Update(existingMedicine);
                await appDbContext.SaveChangesAsync();
                var result = mapper.Map<MedicineDto>(existingMedicine);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var medicine = await appDbContext.Medicines.FindAsync(id);
                if (medicine == null)
                {
                    return NotFound($"Medicine with ID {id} not found.");
                }
                appDbContext.Medicines.Remove(medicine);
                await appDbContext.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search(string name)
        {
            try
            {
                var medicines = await appDbContext.Medicines.Where(m => m.Name.Contains(name)).ToListAsync();
                var result = mapper.Map<List<MedicineGetDtocs>>(medicines);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
