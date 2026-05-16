docker compose up -d --build

# docker run -d `
# --name sqlserver-container `
# --network medicine-network `
# -e "ACCEPT_EULA=Y" `
# -e "SA_PASSWORD=Password@123" `
# -p 1433:1433 `
# mcr.microsoft.com/mssql/server:2022-latest


docker run -d `
--name medicine-app `
--network medicine-network `
-p 5120:8080 `
-p 7292:8081 `
-e ASPNETCORE_URLS="https://+:8081;http://+:8080" `
-e ASPNETCORE_Kestrel__Certificates__Default__Password=Password123 `
-e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx `
-v ${env:USERPROFILE}\.aspnet\https:/https/ `
medicine-management-system

# docker ps

# docker network inspect medicine-network


# docker build -t react-ui .

# docker run -d `
# --name react-ui `
# --network medicine-network `
# -p 3000:3000 `
# react-ui