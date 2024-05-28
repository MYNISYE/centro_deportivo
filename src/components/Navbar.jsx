import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const navigate = useNavigate()
  const cerrarsesion = () => { auth.signOut().then(() => { navigate('/login') }) }
  return (
    <div className='navbar navbar-expand-lg navbar-light bg-red py-4 fixed shadow-lg p-3 mb-5'>
      {props.firebaseUser !== null ? (<Link className='navbar-brand text-light ' to="/">Unicosta - {props.firebaseUser.email} </Link>) : <Link className='navbar-brand bg-danger text-bg-primary' to="/">Unicosta </Link>}
      <div className='d-flex'>
        <Link className='btn btn-light' to="/">Inicio</Link>

        {props.firebaseUser !== null && props.firebaseRol === 'Admin' ? (
          <Link className='btn btn-light' to="/admin">Admin</Link>
        ) : null}

        {props.firebaseUser !== null && props.firebaseRol === 'Usuario' ? (
          <Link className='btn btn-light' to="/reservas">Reservar Instalacion</Link>
        ) : null}

        {props.firebaseUser !== null && props.firebaseRol === 'Usuario' ? (
          <Link className='btn btn-light' to="/Misreservas">Mis Reservas</Link>
        ) : null}

        {
          props.firebaseUser !== null ? (
            <button className='btn btn-light'
              onClick={cerrarsesion}
            >Cerrar Sesión</button>
          ) : (
            <Link className='btn btn-light' to="/login">Login</Link>
          )
        }
      </div>

    </div>
  )
}

export default Navbar
