import React, { useState } from 'react';
import './styles/ShoppingCart.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from './CartContext';
import { jwtDecode } from 'jwt-decode';

const ShoppingCart = () => {    
    initMercadoPago('APP_USR-9cd45816-387a-4b77-a014-76e07671a2c2', { locale: 'es-AR' });
    const { cartItems, removeFromCart } = useCart();
    const [preferenceId, setPreferenceId] = useState(null); 

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
    };

    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debes iniciar sesión para comprar.');
                window.location.href = '/login';
                return;
            }

            // Decodificar el token JWT para obtener el email del usuario
            const decodedToken = jwtDecode(token);
            const email = decodedToken.username;
            const userId = decodedToken.user_id;

            // Crear los datos de los productos en el formato requerido por Mercado Pago
            const items = cartItems.map(item => ({
                title: item.name, // Título del producto
                description: item.description || 'Sin descripción', // Descripción (opcional)
                unit_price: parseFloat(item.price.replace('$', '')), // Precio como número
                quantity: 1, // Cantidad (puedes ajustarlo si tu carrito tiene cantidades)
                routine_id: item.routine_id
            }));

            // Configurar los datos del pagador
            const payer = {
                email
            };

            const routineIds = cartItems.map(item => item.routine_id);
            const metadata = {
                user_id: userId,
                routine_ids: routineIds // Envía un array con todos los IDs de rutinas
            };

            // Configurar las URLs de retorno
            const back_urls = {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending'
            };

            // Enviar los datos al backend
            const response = await fetch('http://localhost:3000/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items, payer, back_urls, metadata }) // Enviar el carrito y las URLs
            });

            if (response.ok) {
                const data = await response.json();
                setPreferenceId(data.preferenceId); // Guardar la Preference ID para el botón de Wallet
                console.log('Preference ID:', data.preferenceId);
            } else {
                const errorMessage = await response.text();
                alert(`Error al procesar la compra: ${errorMessage}`);
                console.log(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la compra.');
        }
    };


    return (
        <div className='ShoppingCart-container'>
            <h2>Carrito de Compras</h2>

            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío!</p>
            ) : (
                <div className='ShoppingCart'>
                    <div className='ShoppingCart-items'>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <a href={`programa/${item.routine_id}`}>
                                        <img src={item.image} alt={item.name} width="100" />
                                    </a>
                                    <h3>{item.name}</h3>
                                    <p>{/*item.description*/}</p>
                                    <div className="item-details">
                                        <p>Precio: {item.price}</p>
                                        <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='ShoppingCart-btns'>
                        <h3>Total: ${getTotalPrice()}</h3>
                        <button className='ShoppingCart-btns-button' onClick={handlePurchase}>Generar link <br /> Mercado Pago</button>

                        {preferenceId && (
                            <div id="wallet_container">
                                <Wallet initialization={{ preferenceId }} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
