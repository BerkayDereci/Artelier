FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Node.js kurulumu
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

COPY ["Artelier.Web/Artelier.Web.csproj", "Artelier.Web/"]
RUN dotnet restore "Artelier.Web/Artelier.Web.csproj"
COPY . .
WORKDIR "/src/Artelier.Web"

# Frontend build
RUN cd ClientApp && npm install && npm run build

# Backend build
RUN dotnet build "Artelier.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Artelier.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Artelier.Web.dll"] 