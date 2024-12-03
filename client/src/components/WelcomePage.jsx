import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCart } from './CartContext';
import './styles/Myroutines.css';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [routines, setRoutines] = useState([]);
    const [userId, setUserId] = useState(null);
    const { clearCart } = useCart();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;
    const role = decodedToken.role;

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        navigate('/'); // Redirigir a la página de inicio de sesión
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
        }

        // Manejar los parámetros de redirección
        const message = searchParams.get('message');
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const clearCartParam = searchParams.get('clear_cart');

        if (message === 'success') {
            console.log(`¡Compra exitosa! ID del pago: ${paymentId}, Estado: ${status}`);
            if (clearCartParam === 'true') {
                clearCart(); // Llamar a la función para vaciar el carrito
            }
        } else if (message === 'failure') {
            alert('El pago no se completó. Intenta nuevamente.');
        } else if (message === 'pending') {
            alert('El pago está pendiente. Te notificaremos cuando se complete.');
        }
    }, [searchParams, clearCart]);

    // Obtener rutinas del usuario
    useEffect(() => {
        if (userId) {
            const fetchRoutines = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/getUserRoutines/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();

                    // Obtener los programas asociados a las rutinas
                    const routinesWithPrograms = await Promise.all(
                        data.map(async (routine) => {
                            const programResponse = await fetch(`http://localhost:3000/getProgramImgByRoutineId/${routine.id}`);
                            const programData = await programResponse.json();
                            return { ...routine, program: programData };
                        })
                    );

                    setRoutines(routinesWithPrograms); // Guardamos las rutinas con los programas asociados
                } catch (error) {
                    console.error('Error fetching routines:', error);
                }
            };

            fetchRoutines();
        }
    }, [userId]);


    // Función para navegar a la vista de detalles de la rutina
    const handleViewDetails = (routineId) => {
        navigate(`/overview/${routineId}`);
    };


    return (
        <div className="welcome-page-container">
            <div className="welcome-page">
                <h2 className="welcome-title">Bienvenido: {email}</h2>
                {role === 'admin' && (
                    <button onClick={() => navigate('/form')} className="admin-button">
                        Admin Panel
                    </button>
                )}
                <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </div>
            <div className="my-user-routines">
                <h2>Mis Rutinas</h2>
                <div className="my-routine-cards">
                    {routines.length > 0 ? (
                        routines.map(routine => (
                            <div key={routine.id} className="my-routine-card">
                                <div className="card-content">
                                    {/* Mostrar la imagen del programa */}
                                    {routine.program?.image && (
                                        <img
                                            src={routine.program.image}
                                            alt={routine.program.description || 'Imagen del programa'}
                                            className="program-image"
                                        />
                                    )}
                                    <h3>{routine.name}</h3>
                                    <p>{routine.description}</p>
                                </div>
                                <button onClick={() => handleViewDetails(routine.id)} className="details-button">Ver Detalles</button>
                            </div>
                        ))
                    ) : (
                        <p>No tienes rutinas asignadas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;