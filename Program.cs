var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

var app = builder.Build();

// Dữ liệu lưu tạm trong RAM
var items = new List<Item>
{
    new(1, "Apple"),
    new(2, "Banana")
};

var nextId = 3;

// Health check
app.MapGet("/", () => "Hello Cloud Run");

// GET: lấy toàn bộ items
app.MapGet("/items", () =>
{
    return Results.Ok(items);
});

// GET: lấy item theo id
app.MapGet("/items/{id:int}", (int id) =>
{
    var item = items.FirstOrDefault(x => x.Id == id);

    return item is not null
        ? Results.Ok(item)
        : Results.NotFound();
});

// POST: thêm item
app.MapPost("/items", (CreateItemRequest request) =>
{
    var item = new Item(nextId++, request.Name);

    items.Add(item);

    return Results.Created($"/items/{item.Id}", item);
});

// Chỉ gọi Run 1 lần và phải nằm cuối cùng
app.Run($"http://0.0.0.0:{port}");

record Item(int Id, string Name);

record CreateItemRequest(string Name);