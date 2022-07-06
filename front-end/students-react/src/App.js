import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png'
import { useState, useEffect } from 'react';

function App() {

  const baseUrl = "https://localhost:44322/api/Students";

  const [data, setData] = useState([]);

  const pedidosGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    pedidosGet();
  })

  return (
    <div className="App">
      <br />
      <h3>Cadastro</h3>
      <br />
      <header className="App-header">
        <button className='btn btn-success'>Incluir Novo Aluno</button>
      </header>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Idade</th>
            <th scope="col">Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student => (
            <tr key={student.id}>
              <th scope="row">1</th>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button className="btn btn-dark">Editar</button> {""}
                <button className="btn btn-dark">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
