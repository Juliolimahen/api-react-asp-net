using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Aluno> Alunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().HasData(
            new Aluno(1, "Bob Brown", "bob@gmail.com", 26),
            new Aluno(2, "Maria Green", "maria@gmail.com", 34)
            );
        }
    }
}
