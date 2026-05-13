using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace MedicineMcpServer.Services
{
    public class MedicineApiService
    {
        private readonly HttpClient _httpClient;
        public MedicineApiService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
        }
        public async Task<string> GetMedicinesAsync()
        {
            return await _httpClient.GetStringAsync("/api/Medicine");
        }

        public async Task<string> GetMedicineByIdAsync(int id)
        {
            return await _httpClient.GetStringAsync($"/api/Medicine/{id}");
        }

        public async Task<string> DeleteMedicineAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"/api/Medicine/{id}");

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> CreateMedicineAsync(object medicine)
        {
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
