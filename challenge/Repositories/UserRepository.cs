using challenge.Models;
using challenge.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace challenge.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(ChallengeContext context) : base(context)
        {
        }

        public List<User> GetAll()
        {
            return FindAll().ToList();
        }

        public User FindById(int id)
        {
            return FindByCondition(user => user.Id == id).FirstOrDefault();
        }

        public User FindByEmail(string email)
        {
            return FindByCondition(user => user.Email == email).FirstOrDefault();
        }

        public void NewUser(User user)
        {
            user.Password = EncryptPass(user.Password);
            Create(user);
            SaveChanges();
        }
        public void UpdateUser(User user, User update)
        {
            user.Name = update.Name;
            user.LastName = update.LastName;
            user.Age = update.Age;
            user.Email = update.Email;
            user.Password = EncryptPass(update.Password);
            Update(user);
            SaveChanges();
        }

        public void DeleteUser(User user)
        {
            Delete(user);
            SaveChanges();
        }

        public string EncryptPass(string password)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(password));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
    }
}
