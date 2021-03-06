import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png'
import { useState, useEffect } from 'react';

function App() {

  const baseUrl = "https://localhost:44322/api/Students";

  const [data, setData] = useState([]);

  const [updateData, setUpdateData] = useState(true);

  const [modalInsert, setModalInsert] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);


  const [studentSelected, setStudentSelected] = useState(
    {
      id: '',
      name: '',
      emal: '',
      age: ''
    }
  )

  const selectStudent = (student, option) => {
    setStudentSelected(student);
    (option === "Edit") ?
      openCloseModalEdit() : openCloseModalDelete();
  }

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  }
  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const pedidosGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidosPost = async () => {
    delete studentSelected.id;
    studentSelected.age = parseInt(studentSelected.age);
    await axios.post(baseUrl, studentSelected)
      .then(response => {
        setData(data.concat(response.data));
        setUpdateData(true);
        openCloseModalInsert();
      }).catch(error => {
        console.log(error);
      })
  }
  const pedidosPut = async () => {
    studentSelected.age = parseInt(studentSelected.age);
    await axios.put(baseUrl + "/" + studentSelected.id, studentSelected)
      .then(response => {
        var resposta = response.data;
        var dataAux = data;
        dataAux.map(student => {
          if (student.id === studentSelected.id) {
            student.name = resposta.name;
            student.email = resposta.email;
            student.age = resposta.age;
          }
        });
        setUpdateData(true);
        openCloseModalEdit();
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoDelete = async () => {
    await axios.delete(baseUrl + "/" + studentSelected.id)
      .then(response => {
        setData(data.filter(student => student.id !== response.data));
        setUpdateData(true);
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (updateData) {
      pedidosGet();
    }
    setUpdateData(false);
  }, [updateData])

  const handleChange = e => {
    const { name, value } = e.target;
    setStudentSelected({
      ...studentSelected, [name]: value
    });
    console.log(studentSelected)
  }

  return (
    <div className="student-container">
      <br />
      <h3>Cadastro Alunos</h3>
      <header className="App-header">
        <img src={logoCadastro} alt="Cadastro" />
        <button className='btn btn-success' onClick={() => openCloseModalInsert()}>Incluir Novo Aluno</button>
      </header>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Idade</th>
            <th scope="col">Opera????o</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button className="btn btn-dark" onClick={() => selectStudent(student, "Edit")}>Editar</button> {" "}
                <button className="btn btn-dark" onClick={() => selectStudent(student, "Delete")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsert}>
        <ModalHeader>Incluir Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <br />
            <input type="text" className="form-control" name='name' onChange={handleChange} />
            <br />
            <label>Email: </label>
            <br />
            <input type="text" className="form-control" name='email' onChange={handleChange} />
            <br />
            <label>Idade: </label>
            <br />
            <input type="text" className="form-control" name='age' onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-dark" onClick={() => pedidosPost()}>Incluir</button> {""}
          <button className="btn btn-dark" onClick={() => openCloseModalInsert()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <br />
            <input type="text" className="form-control" readOnly value={studentSelected && studentSelected.id} />
            <br />
            <label>Nome: </label>
            <br />
            <input type="text" className="form-control" name='name' onChange={handleChange}
              value={studentSelected && studentSelected.name} />
            <br />
            <label>Email: </label>
            <br />
            <input type="text" className="form-control" name='email' onChange={handleChange}
              value={studentSelected && studentSelected.email} />
            <br />
            <label>Idade: </label>
            <br />
            <input type="text" className="form-control" name='age' onChange={handleChange}
              value={studentSelected && studentSelected.age} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-dark" onClick={() => pedidosPut()}>Editar</button> {""}
          <button className="btn btn-dark" onClick={() => openCloseModalEdit()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          Confirmar a exclus??o deste(a) aluno(a): {studentSelected && studentSelected.name}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-dark" onClick={() => pedidoDelete()}> Sim </button>
          <button className="btn btn-dark" onClick={() => openCloseModalDelete()}> N??o </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}


export default App;
