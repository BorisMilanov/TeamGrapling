namespace TeamGrapling.Api.Models;

public class CalendarEvent
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Type { get; set; } = "default"; // success | warning | processing | error | default
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
