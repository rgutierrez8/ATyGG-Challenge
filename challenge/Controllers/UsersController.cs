using challenge.Models;
using challenge.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace challenge.Controllers
{
    [Route("Users")]
  
    public class UsersController : Controller
    {
        private readonly IUserRepository _repository;

        public UsersController(IUserRepository repository)
        {
            _repository = repository;
        }

       
        [HttpGet("/AllUsers", Name = "GetAllUsers")]
        public IActionResult GetAll()
        {
            try
            {
                var users = _repository.GetAll();
                return Ok(users);
            }
            catch(Exception e)
            {
                return StatusCode(500, "Internal error");
            }
        }

        [HttpGet("/FindUser/{id}", Name = "GetUser")]
        public IActionResult FindUser(int id)
        {
            try
            {
                var user = _repository.FindById(id);
                return Ok(user);
            }
            catch(Exception e)
            {
                return StatusCode(500, "Internal error");
            }
        }

        [HttpPost("/newUser")]
        public IActionResult NewUser([FromBody] User user)
        {
            try
            {
                _repository.NewUser(user);
                return CreatedAtRoute("GetUser", new { id = user.Id}, user);
            }
            catch(Exception e)
            {
                return StatusCode(500, "Internal error");
            }
        }
        [HttpPut("/updateUser/{id}")]
        public IActionResult Update(int id, [FromBody]  User updateUser)
        {
            try
            {
                var user = _repository.FindById(id);
                if(user != null)
                {
                    _repository.UpdateUser(user, updateUser);
                    return CreatedAtRoute("GetUser", new { id = user.Id }, user);
                }
                return BadRequest();

            }
            catch(Exception e)
            {
                return StatusCode(500, "Internal error");
            }
        }

        [HttpDelete("/deleteUser/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                User user = _repository.FindById(id);

                if(user != null)
                {
                    _repository.DeleteUser(user);
                    return Ok(id);
                }
                return BadRequest();
            }
            catch(Exception e)
            {
                return StatusCode(500, "Internal error");
            }
        }

    }
}
