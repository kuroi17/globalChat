using SignalRChatApp.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseDefaultFiles(); // Must come before UseStaticFiles
app.UseStaticFiles();

app.UseRouting();

app.MapHub<ChatHub>("/chatHub");

app.Run();
