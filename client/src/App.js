import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);




  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre, edad: edad, pais: pais, cargo: cargo, anios: anios
    }).then(() => {
      getEmpleados();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado " + nombre + " fue registrado con exito!</i>",
        icon: 'success',
        timer: 3000
      });
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id, nombre: nombre, edad: edad, pais: pais, cargo: cargo, anios: anios
    }).then(() => {
      getEmpleados();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitoso!</strong>",
        html: "<i>El empleado " + nombre + " fue actualizado con exito!</i>",
        icon: 'success',
        timer: 3000
      });


    });
  }

  const deleteEmpleado = (val) => {
    Swal.fire({
      title: '¿Confirmar eliminado?',
      html: "<i>¿Desea Eliminar el empleado " + val.nombre + "?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiar();

          Swal.fire(
            'Eliminado!',
            val.nombre + ' fue eliminado.',
            'success'
          );

        });

        
      }
    });

  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
      limpiar();
    });
  }

  const limpiar = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);
  }


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">Gestion de empleados</div>
        <div className="card-body">

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Nombre:
            </span>
            <input
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value)
              }
              }
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"

            />
          </div>

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Edad:
            </span>
            <input
              value={edad}
              onChange={(event) => {
                setNombre(event.target.value)
              }
              }
              type="number"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"

            />
          </div>

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Pais:
            </span>
            <input
              value={pais}
              onChange={(event) => {
                setPais(event.target.value)
              }
              }

              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"

            />
          </div>

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Cargo:
            </span>
            <input
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value)
              }
              }

              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"

            />
          </div>

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Años de Experiencia:
            </span>
            <input
              value={anios}
              onChange={(event) => {
                setAnios(event.target.value)
              }
              }

              type="number"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"

            />
          </div>

        </div>
        <div className="card-footer text-body-secondary">
          {

            editar ? <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
            </div>

              : <button className='btn btn-success' onClick={add}>Registrar</button>

          }

        </div>
      </div>



      <div className="card text-center">
        <div className="card-header">Tabla de empleados</div>
        <div className="card-body">
          <table className="table table-success table-striped">

            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Cargo</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                empleadosList.map((val, key) => {
                  return <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>

                    <td>

                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                          onClick={() => {
                            editarEmpleado(val);
                          }}
                          type="button" className="btn btn-primary">
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            deleteEmpleado(val);
                          }}

                          type="button" className="btn btn-danger">
                          Eliminar
                        </button>

                      </div>


                    </td>


                  </tr>
                })
              }
            </tbody>

          </table>
        </div>

        <div className="card-footer text-body-secondary">
          <button className='btn btn-success' onClick={getEmpleados}>Cargar</button>
        </div>
      </div>




    </div>

  );
}

export default App;
