
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TeamGrapling.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured"))),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero,
        };
    });

builder.Services.AddAuthorization();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Auto-create the SQLite database and seed admin
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // Create Members table if the DB existed before this model was added
    db.Database.ExecuteSqlRaw("""
        CREATE TABLE IF NOT EXISTS "Members" (
            "Id" INTEGER NOT NULL CONSTRAINT "PK_Members" PRIMARY KEY AUTOINCREMENT,
            "Name" TEXT NOT NULL,
            "Belt" TEXT NOT NULL DEFAULT 'white',
            "CreatedAt" TEXT NOT NULL
        )
        """);

    if (!db.Users.Any(u => u.Email == "admin@gmail.com"))
    {
        db.Users.Add(new TeamGrapling.Api.Models.User
        {
            Email = "admin@gmail.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("123try"),
            FirstName = "Admin",
            LastName = "Admin",
            Role = "admin",
        });
        db.SaveChanges();
    }
}

app.UseCors("FrontendPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
