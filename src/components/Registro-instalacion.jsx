import React from 'react'
import { db } from '../firebase'

const Registro = () => {
  //HOOKS
  const [lista, setLista] = React.useState([])
  const [nombre, setNombre] = React.useState('')
  const [Descripcion, setDescripcion] = React.useState('');
  const [NumeroSalon, setNumeroSalon] = React.useState('');
  const [id, setId] = React.useState('');

  const [modoedicion, setModoEdicion] = React.useState(false)

  const [error, setError] = React.useState(null)

  //LEER
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db.collection('Instalaciones').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setLista(arrayData)
      } catch (error) {
        console.error(error);
      }
    }
    obtenerDatos()
  }, [])

  //GUARDAR
  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!nombre) {
      setError("Ingrese el Nombre")
      return
    }
    if (!NumeroSalon) {
      setError("Ingrese el Numero de la instalacion")
      return
    }
    if (!Descripcion) {
      setError("Ingrese la Descripcion")
      return
    }

    //GUARDAR FIREBASE
    try {
      const dato = await db.collection('Instalaciones').add({
        Nombre: nombre,
        Disponibilidad: true,
        Descripcion: Descripcion,
        NumeroSalon: NumeroSalon,
      })
      setLista([
        ...lista,
        {
          Nombre: nombre,
          Disponibilidad: true,
          Descripcion: Descripcion,
          NumeroSalon: NumeroSalon,
          id: dato.id
        }
      ])
      setNombre('')
      setDescripcion('')
      setNumeroSalon('')
      setError(null)
    } catch (error) {
      console.error(error);
    }
  }


  //ELIMINAR

  const eliminarDato = async (id) => {
    if (modoedicion) {
      setError('No puede eliminar mientras edita el usuario.')
      return
    }
    try {
      //const db=firebase.firestore()
      await db.collection('Instalaciones').doc(id).delete()
      const listaFiltrada = lista.filter(elemento => elemento.id !== id)
      setLista(listaFiltrada)
    } catch (error) {
      console.error(error);
    }
  }


  //EDITAR
  const editar = (elemento) => {
    setModoEdicion(true)//activamos el modo edición
    setNombre(elemento.Nombre);
    setNumeroSalon(elemento.NumeroSalon);
    setDescripcion(elemento.Descripcion);
    setId(elemento.id)
  }

  const editarDatos = async (e) => {
    e.preventDefault()
    if (!nombre) {
      setError("Ingrese el Nombre")
      return
    }
    if (!NumeroSalon) {
      setError("Ingrese el Numero de la instalacion")
      return
    }
    if (!Descripcion) {
      setError("Ingrese la Descripcion")
      return
    }
    
    try {

      await db.collection('Instalaciones').doc(id).update({
        Nombre: nombre,
        Disponibilidad: true,
        Descripcion: Descripcion,
        NumeroSalon:NumeroSalon,
      })
      window.location.reload() 
      const listaEditada = lista.map(elemento => elemento.id === id ? { id, nombre, NumeroSalon, Descripcion } :
        elemento
      )
      //NUEVOS VALORES
      setLista(listaEditada)
      setModoEdicion(false)
      setNumeroSalon('')
      setDescripcion('')
      setError(null)
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className=''>
      {
        modoedicion ? <h2 className='text-center text-dark'>Editando Instalaciones</h2> :
          <h2 className='text-center text-dark'>Registro Instalaciones</h2>
      }
      <form onSubmit={modoedicion ? editarDatos : guardarDatos}>
        {
          error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) :
            null
        }
        <input type="text"
          placeholder='Ingrese el Nombre'
          className='form-control mb-2'
          onChange={(e) => {setNombre(e.target.value) }}
          value={nombre}
        />

        <input type="text"
          placeholder='Ingrese el Numero de salon'
          className='form-control mb-2'
          onChange={(e) => { setNumeroSalon(e.target.value) }}
          value={NumeroSalon}
        />

        <input type="text"
          placeholder='Ingrese la Descripción'
          className='form-control mb-2'
          onChange={(e) => { setDescripcion(e.target.value) }}
          value={Descripcion}
        />

        <div className='d-grid gap-2'>
          {
            modoedicion ? <button type='submit' className='btn btn-dark'>Editar</button> :
              <button type='submit' className='btn btn-dark'>Registrar</button>
          }

        </div>
      </form>
      <h2 className='text-center text-dark'>Listado de las Instalaciones</h2>
      <div className="card-grid">
        {lista.map((elemento) => (
          <div className="card border-dark mb-3" key={elemento.id}>
            <div className="card-body">
              <h5 className="card-title">Nombre: {elemento.Nombre}</h5>
              <p className="card-text">Numero de instalacion: {elemento.NumeroSalon}</p>
              <p className="card-text">Descripción: {elemento.Descripcion}</p>
              <p className="card-text">Disponibilidad: {elemento.Disponibilidad.toString()}</p>
            </div>
            <div className="card-footer">
              <button onClick={() => eliminarDato(elemento.id)} className="btn btn-danger me-2">
                Eliminar
              </button>
              <button onClick={() => editar(elemento)} className="btn btn-dark me-2">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Registro