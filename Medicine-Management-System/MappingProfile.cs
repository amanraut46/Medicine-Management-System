using AutoMapper;
using Medicine_Management_System.Dto;
using Medicine_Management_System.Models;

namespace Medicine_Management_System
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Medicine, MedicineDto>();
            CreateMap<MedicineDto, Medicine>();
            CreateMap<Medicine, MedicineGetDtocs>().ReverseMap();
        }
    }
}
