using AlunosApi.Models;
using AlunosApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //Retornar json
    //[Produces("application/json")]
    public class StudentsController : ControllerBase
    {
        private IStudentService _studentService;

        /// <summary>
        /// Injeção de dependência
        /// </summary>
        /// <param name="studentService"></param>
        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        /// <summary>
        /// ActionResult,retorna o response da api 
        /// </summary>
        /// <returns></returns>
        [HttpGet("Students")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudents()
        {
            try
            {
                var students = await _studentService.GetStudents();
                return Ok(students);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter alunos");
            }
        }

        [HttpGet("StudentsByName")]
        public async Task<ActionResult<IAsyncEnumerable<Student>>>
            GetStudentsByName([FromQuery] string name)
        {
            try
            {
                var students = await _studentService.GetStudentsByName(name);

                if (students == null)
                    return NotFound($"Não existem alunos com o critério{name}");

                return Ok(students);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }
        [HttpGet("{id:int}", Name = "GetStudent")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            try
            {
                var students = await _studentService.GetStudent(id);

                if (students == null)
                    return NotFound($"Não existem alunos com o Id = {id}");

                return Ok(students);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Student student)
        {
            try
            {
                await _studentService.CreateStudent(student);
                return CreatedAtRoute(nameof(GetStudent), new { id = student.Id }, student);
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, [FromBody] Student student)
        {
            try
            {
                if (student.Id == id)
                {
                    await _studentService.UpdateStudent(student);
                    //return NoContent();
                    return Ok($"Aluno com id {id} foi atualizado com sucesso");
                }
                else
                {
                    return BadRequest("Dados incosistentes");
                }
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var student = await _studentService.GetStudent(id);
                if (student != null)
                {
                    await _studentService.DeleteStudent(student);
                    //return NoContent();
                    return Ok($"Aluno com i{id} excluido");
                }
                else
                {
                    return Ok($"Aluno com i{id} não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request Invalido");
            }
        }
    }
}