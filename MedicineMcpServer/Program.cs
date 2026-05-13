using MedicineMcpServer.Services;
using MedicineMcpServer.Tools;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder();
builder.Services.AddHttpClient<MedicineApiService>(client => {
    client.BaseAddress = new Uri("http://host.docker.internal:7292/");
});

builder.Services.AddMcpServer()
    .WithHttpTransport(option => {
        option.Stateless = true;
    })
    .WithTools<MedicineTools>();

var app = builder.Build();
app.MapMcp();
app.Run();
