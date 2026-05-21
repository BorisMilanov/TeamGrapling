using System.ComponentModel.DataAnnotations;

namespace TeamGrapling.Api.DTOs;

public class CreateCalendarEventDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public DateTime Date { get; set; }

    public string Type { get; set; } = "default";
}

public class UpdateCalendarEventDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public DateTime Date { get; set; }

    public string Type { get; set; } = "default";
}
