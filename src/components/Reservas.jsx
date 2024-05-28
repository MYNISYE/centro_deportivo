import React from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Reservas = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

const [lista, setLista] = React.useState([]);
const [busqueda, setBusqueda] = React.useState('');

React.useEffect(() => {
  const obtenerDatos = async () => {
    try {
      const data = await db.collection('Instalaciones').get();
      const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const instalacionDisponibles = arrayData.filter((instalacion) => instalacion.Disponibilidad === true);
      setLista(instalacionDisponibles);
    } catch (error) {
      console.error(error);
    }
  };
  obtenerDatos();
}, []);

const ReservarInstalacion = async (elemento) => {
  try {
    const usuario = user.email;
    const datos = await db.collection(usuario).add({
      idInstalacion: elemento.id,
      Nombres: elemento.Nombre,
      NumeroSalon: elemento.NumeroSalon,
      Descripcion: elemento.Descripcion,
  });
  await db.collection('Instalaciones').doc(elemento.id).update({
    Disponibilidad: false,
  });
  const listaFiltrada = lista.filter((nuevalista) => nuevalista.id !== elemento.id);
    setLista(listaFiltrada);
  } catch (error) {
     console.error(error);
  }
};

const BuscarInstalacion = (e) => {
  setBusqueda(e.target.value);
};

const listaFiltrada = lista.filter((elemento) =>
  elemento.Nombre.toLowerCase().includes(busqueda.toLowerCase())
);

return (
  <div>
    <div className="titulo-seccion">
      <h3>Reservar Instalaciones</h3>
    </div>

    <div className="busqueda">
      <h4>Filtrar Instalaciones:</h4>
      <input className='form-control' type="text" placeholder="Buscar Instalacion" value={busqueda} onChange={BuscarInstalacion}/>
    </div>

    <div className="contenedor-cards">
      <div className="card-grid">
        {listaFiltrada.length === 0 ? (
          <p>No se encontraron Instalaciones.</p>
        ) : (
          listaFiltrada.map((elemento) => (
            <div className="card" key={elemento.id}>
              <div className="card-body">
                <h5 className="card-title">Nombre: {elemento.Nombre}</h5>
                <p className="card-text">Numero de instalacion: {elemento.NumeroSalon}</p>
                <p className="card-text">Descripción: {elemento.Descripcion}</p>
            </div>
              <div className="card-footer">
                <button
                  onClick={() => ReservarInstalacion(elemento)}
                  className="btn btn-primary me-2"
                >
                Reservar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default Reservas;