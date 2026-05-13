using MedicineMcpServer.Services;
using ModelContextProtocol.Server;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MedicineMcpServer.Tools
{
    [McpServerToolType]
    public class MedicineTools
    {
        private readonly MedicineApiService _service;
        public MedicineTools(MedicineApiService service)
        {
            this._service = service;
        }
        [McpServerTool, Description("Get all medicines")]
        public async Task<string> GetMedicines()
        {
            return await _service.GetMedicinesAsync();
        }
        [McpServerTool, Description("Get medicine by id")]
        public async Task<string> GetMedicineById(int id)
        {
            return await _service.GetMedicineByIdAsync(id);
        }
        [McpServerTool, Description("Delete medicine")]
        public async Task<string> DeleteMedicine(int id)
        {
            return await _service.DeleteMedicineAsync(id);
        }
        [McpServerTool, Description("Create medicine")]
        public async Task<string> CreateMedicine(
        string name,
        string note,
        DateTime expirate_Date,
        int quantity,
        decimal price,
        string brand)
        {
            var medicine = new
            {
                Name = name,
                Quantity = quantity,
                Price = price,
                Brand = brand,
                Note = note,
                Expirate_Date = expirate_Date
            };

            return await _service.CreateMedicineAsync(medicine);
        }
        [McpServerTool, Description("Update medicine")]
        public async Task<string> UpdateMedicine(
        int id,
        string name,
        string note,
        DateTime expirate_Date,
        int quantity,
        decimal price,
        string brand)
        {
            var medicine = new
            {
                Id = id,
                Name = name,
                Quantity = quantity,
                Price = price,
                Brand = brand,
                Note = note,
                Expirate_Date = expirate_Date
            };

            return await _service.UpdateMedicineAsync(id, medicine);
        }
    }
}
