using challenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace challenge.Repositories.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User FindById(int id);
        User FindByEmail(string email);
        void NewUser(User user);
        void DeleteUser(User user);
        void UpdateUser(User user, User update);
        string EncryptPass(string password);
    }
}
