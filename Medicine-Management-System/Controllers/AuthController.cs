using Medicine_Management_System.Dto;
using Medicine_Management_System.Models;
using Medicine_Management_System.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Medicine_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;
        public AuthController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            TokenService tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);

            if (userExists != null)
                return BadRequest("User already exists");

            ApplicationUser user = new()
            {
                Email = model.Email,
                UserName = model.Email,
                FullName = model.FullName,
                SecurityStamp = Guid.NewGuid().ToString(),
                CreatedDate = DateTime.Now,
                IsActive = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Default Role
            string defaultRole = RoleConstant.Pharmacist;

            // Create Role if not exists
            if (!await _roleManager.RoleExistsAsync(defaultRole))
            {
                await _roleManager.CreateAsync(
                    new IdentityRole(defaultRole));
            }

            // Assign Role
            await _userManager.AddToRoleAsync(user, defaultRole);

            return Ok(new
            {
                Message = "User registered successfully",
                Role = defaultRole
            });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return Unauthorized();

            var validPassword = await _userManager
                .CheckPasswordAsync(user, model.Password);

            if (!validPassword)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            var token = await _tokenService.CreateToken(user, roles);

            return Ok(new
            {
                Token = token,
                Roles = roles,
                Name = user.FullName,
                Expiration = DateTime.Now.AddHours(1)
            });
        }
    }
}
