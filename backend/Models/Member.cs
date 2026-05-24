namespace TeamGrapling.Api.Models;

public class Member
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Belt { get; set; } = "white"; // white | blue | purple | brown | black
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
