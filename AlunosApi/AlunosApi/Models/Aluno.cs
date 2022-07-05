﻿using System.ComponentModel.DataAnnotations;

namespace AlunosApi.Models
{
    public class Aluno
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }
        [Required]
        public int Idade { get; set; }

        public Aluno(int id, string name, string email, int idade)
        {
            Id = id;
            Name = name;
            Email = email;
            Idade = idade;
        }
    }
}
