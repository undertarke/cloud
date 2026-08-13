var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// Dữ liệu lưu tạm trong RAM, không dùng database
var items = new List<Item>
{
    new(1, "Apple"),
    new(2, "Banana")
};

var nextId = 3;

// GET 1: Lấy toàn bộ items
app.MapGet("/items", () =>
{
    return Results.Ok(items);
});

// GET 2: Lấy item theo id
app.MapGet("/items/{id:int}", (int id) =>
{
    var item = items.FirstOrDefault(x => x.Id == id);

    return item is not null
        ? Results.Ok(item)
        : Results.NotFound();
});

// POST: Thêm item mới
app.MapPost("/items", (CreateItemRequest request) =>
{
    var item = new Item(nextId++, request.Name);

    items.Add(item);

    return Results.Created($"/api/items/{item.Id}", item);
});

app.Run();

record Item(int Id, string Name);

record CreateItemRequest(string Name);