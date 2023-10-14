using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

//builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
//{
//    build.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
//}));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();// For the wwwroot folder

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
    RequestPath = "/Uploads"
});

////Enable directory browsing
//app.UseDirectoryBrowser(new DirectoryBrowserOptions
//{
//    FileProvider = new PhysicalFileProvider(
//                Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
//    RequestPath = "/Uploads"
//});


app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
