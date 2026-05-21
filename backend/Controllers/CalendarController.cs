using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamGrapling.Api.Data;
using TeamGrapling.Api.DTOs;
using TeamGrapling.Api.Models;

namespace TeamGrapling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalendarController : ControllerBase
{
    private readonly AppDbContext _context;

    public CalendarController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var events = await _context.CalendarEvents
            .OrderBy(e => e.Date)
            .ToListAsync();
        return Ok(events);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ev = await _context.CalendarEvents.FindAsync(id);
        if (ev is null) return NotFound();
        return Ok(ev);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCalendarEventDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var ev = new CalendarEvent
        {
            Title = dto.Title,
            Date = dto.Date.ToUniversalTime(),
            Type = dto.Type,
        };

        _context.CalendarEvents.Add(ev);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = ev.Id }, ev);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCalendarEventDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var ev = await _context.CalendarEvents.FindAsync(id);
        if (ev is null) return NotFound();

        ev.Title = dto.Title;
        ev.Date = dto.Date.ToUniversalTime();
        ev.Type = dto.Type;

        await _context.SaveChangesAsync();
        return Ok(ev);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ev = await _context.CalendarEvents.FindAsync(id);
        if (ev is null) return NotFound();

        _context.CalendarEvents.Remove(ev);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
