using challenge.Models;
using challenge.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace challenge.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        public AuthController(IUserRepository repository)
        {
            _repository = repository;
        }
        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] userDTO userDto)
        {
            try
            {
                var user = _repository.FindByEmail(userDto.Email);

                if (user != null && userDto.Email == user.Email && _repository.EncryptPass(userDto.Password) == user.Password)
                {
                    return Ok(user);
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal error");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
