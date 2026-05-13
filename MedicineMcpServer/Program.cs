using MedicineMcpServer.Services;
using MedicineMcpServer.Tools;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHttpClient<MedicineApiService>(client => {
    client.BaseAddress = new Uri("http://host.docker.internal:7292/");
});

builder.Services.AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<MedicineTools>();

await builder.Build().RunAsync();