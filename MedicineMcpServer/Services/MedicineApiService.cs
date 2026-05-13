using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace MedicineMcpServer.Services
{
    public class MedicineApiService
    {
        private readonly HttpClient _httpClient;
        private ILogger<MedicineApiService> _logger;
        public MedicineApiService(HttpClient httpClient, ILogger<MedicineApiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }
        public async Task<string> GetMedicinesAsync()
        {
            _logger.LogInformation("Fetching medicines from API...");
            return await _httpClient.GetStringAsync("/api/Medicine");
        }

        public async Task<string> GetMedicineByIdAsync(int id)
        {
            _logger.LogInformation($"Fetching medicine with ID {id} from API...");
            return await _httpClient.GetStringAsync($"/api/Medicine/{id}");
        }

        public async Task<string> DeleteMedicineAsync(int id)
        {
            _logger.LogInformation($"Deleting medicine with ID {id} from API...");
            var response = await _httpClient.DeleteAsync($"/api/Medicine/{id}");

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> CreateMedicineAsync(object medicine)
        {
            _logger.LogInformation("Creating new medicine...");
            var json = JsonSerializer.Serialize(medicine);

            var content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync(
                "/api/Medicine",
                content);

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> UpdateMedicineAsync(
            int id,
            object medicine)
        {
            _logger.LogInformation($"Updating medicine with ID {id}...");
            var json = JsonSerializer.Serialize(medicine);

            var content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PutAsync(
                $"/api/Medicine/{id}",
                content);

            return await response.Content.ReadAsStringAsync();
        }
    }
}
