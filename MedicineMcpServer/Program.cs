using MedicineMcpServer.Services;
using MedicineMcpServer.Tools;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHttpClient<MedicineApiService>(client => {
    client.BaseAddress = new Uri("https://localhost:7292/");
});

builder.Services.AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<MedicineTools>();

var app = builder.Build();

app.Run();