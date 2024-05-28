import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro-instalacion'

const Admin = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
            if (props.firebaseRol !== "Admin") {
                navigate('/Reservas');
            } else {
                navigate('/admin');
            }
        } else {
            navigate('/login');
        }
    }, [props.firebaseRol, navigate]);

    React.useEffect(() => {
        setLoading(false); // Carga finalizado
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Muestra un mensaje 
    }

    return (
        <div>
            {user && <Registro />}
        </div>
    );
};


export default Admin