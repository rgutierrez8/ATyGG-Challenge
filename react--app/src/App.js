import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function App() {

  const url = 'https://localhost:44382';
  const [data, setData] = useState([]);
  const [modalNewUser, setModalNewUser] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  
  let loged = false;

  const [user, setUser] = useState({
    id: '',
    name: '',
    lastName: '',
    age: '',
    email: '',
    password: ''
  });

  const selectedUser = (user, action) =>{
    setUser(user);
    (action === "delete")? showModalDelete() : showModalUpdate();
  }

  const handleChange = e =>{
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const showModalNewUser = ()=>{
    setModalNewUser(!modalNewUser);
  }

  const showModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const showModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  }

  useEffect(() => {
    login();
  }, [])

  const getRequest = async () => {
    await axios.get(url + '/AllUsers')
    .then(response => {
      setData(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const postRequest = async () => {
    delete user.id;
    user.age = parseInt(user.age);
    await axios.post(url + '/newUser', user)
    .then(response => {
      showModalNewUser();
    })
    .catch(err => {
      console.log(err);
    })
  }

  const putRequest = async (id) => {
    await axios.put(url + '/updateUser/' + user.id, user)
    .then( response => {
      console.log(response.data);
      var resp = response.data;
      var dataAux = data;
      dataAux.map(dat => {
        if(dat.id === user.id){
          console.log(resp);
          dat.name = resp.name;
          dat.lastName = resp.lastName;
          dat.age = resp.age;
          dat.email = resp.email;
          dat.password = resp.password;
        }
      });
      showModalUpdate();
    })
    .catch(err => {
      console.log(err);
    })
  }

  const deleteRequest = async () => {
    await axios.delete(url + '/deleteUser/' + user.id)
    .then(response =>{
      setData(data.filter(dat => dat.id !== response.data));
      showModalDelete();
    })
    .catch(err => {
      console.log(err);
    })
  }

  const login = async () => {
    await axios.post(url + '/login', user)
    .then(response => {
      loged = true;
      getRequest();
    })
    .catch(err => {
      console.log(err);
    })
  }
  const l = ()=>{
    return <h2>hola</h2>;
  }


  return (
    <div className="App">
      <div className='form-inline'>
          <input type="text" class="login" name="email" placeholder="Email" required  onChange={handleChange}/>
          <input type="password" className="login" name="password" placeholder='Password' onChange={handleChange}/>
          <button className='btn btn-success lgin' onClick={()=>login()}>Ingresar</button>
          <button onClick={() => showModalNewUser()} className='btn btn-warning login'>Nuevo usuario</button>
        </div>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(dat => (
            <tr key={dat.id}>
              <td>{dat.name}</td>
              <td>{dat.lastName}</td>
              <td>{dat.age}</td>
              <td>{dat.email}</td>
              <td>{dat.password}</td>
              <td><button className="btn btn-danger" onClick={()=>selectedUser(dat, "delete")}>Eliminar</button></td>
              <td><button className="btn btn-warning" onClick={()=>selectedUser(dat, "update")}>Actualizar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={modalNewUser}>
        <ModalHeader>Nuevo usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label className="label label-primary" for="name">Nombre</label>
          <input type="text" className="form-control" name="name" placeholder="Nombre" required onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="lastName">Apellido</label>
              <input type="text" className="form-control" name="lastName" placeholder="Apellido" required onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="age">Edad</label>
              <input type="number" className="form-control" name="age" required onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="email">Email</label>
              <input type="text" className="form-control" name="email" placeholder="Email" required  onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="pass">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" required onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" id="btnSubmit" value="Actualizar" onClick={() => postRequest()}>Registrarse</button>
          <button className="btn btn-danger" id="btnCancel" value="Cancelar" onClick={() => showModalNewUser()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>Editar usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label className="label label-primary" for="name">Nombre</label>
          <input type="text" className="form-control" name="name" value={user && user.name} required onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="lastName">Apellido</label>
              <input type="text" className="form-control" name="lastName" value={user && user.lastName} required onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="age">Edad</label>
              <input type="number" className="form-control" name="age" value={user && user.age} required onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="email">Email</label>
              <input type="text" className="form-control" name="email" value={user && user.email} required  onChange={handleChange}/>
          </div>
          <div className="form-group">
              <label className="label label-primary" for="pass">Password</label>
              <input type="password" className="form-control" name="password" value={user && user.password} required onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>putRequest()}>Actualizar</button>
          <button className="btn btn-danger" onClick={()=>showModalUpdate()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
            <ModalBody>
              <p>¿Estás seguro de eliminar este usuario?</p>
              <button className="btn btn-success" onClick={() => deleteRequest()}>Confirmar</button>
              <button className="btn btn-danger" onClick={()=>showModalDelete()}>Cancelar</button>
            </ModalBody>
      </Modal>
    </div>
  );
}

export default App;
