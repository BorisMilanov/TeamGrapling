using System.ComponentModel.DataAnnotations;

namespace TeamGrapling.Api.DTOs;

public class MemberDto
{
    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [RegularExpression("^(white|blue|purple|brown|black)$", ErrorMessage = "Invalid belt value.")]
    public string Belt { get; set; } = "white";
}
