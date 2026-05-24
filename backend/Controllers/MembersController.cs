using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamGrapling.Api.Data;
using TeamGrapling.Api.DTOs;
using TeamGrapling.Api.Models;

namespace TeamGrapling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MembersController : ControllerBase
{
    private readonly AppDbContext _context;

    public MembersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var members = await _context.Members
            .OrderBy(m => m.Name)
            .ToListAsync();
        return Ok(members);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var member = await _context.Members.FindAsync(id);
        if (member is null) return NotFound();
        return Ok(member);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] MemberDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var member = new Member
        {
            Name = dto.Name.Trim(),
            Belt = dto.Belt,
        };

        _context.Members.Add(member);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = member.Id }, member);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] MemberDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var member = await _context.Members.FindAsync(id);
        if (member is null) return NotFound();

        member.Name = dto.Name.Trim();
        member.Belt = dto.Belt;

        await _context.SaveChangesAsync();
        return Ok(member);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var member = await _context.Members.FindAsync(id);
        if (member is null) return NotFound();

        _context.Members.Remove(member);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
