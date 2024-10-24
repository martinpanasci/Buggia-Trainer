import React, { useState, useEffect } from 'react';
import './styles/ShoppingCart.css'
import { jwtDecode } from 'jwt-decode';


const ShoppingCart = () => {

    const [cartItems, setCartItems] = useState([]);


    // Cargar los productos del carrito desde localStorage al iniciar
    useEffect(() => {
        const storedCart = localStorage.getItem('carrito');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (id) => {
        console.log(`Removing item with id: ${id}`);
        const updatedCart = cartItems.filter(item => item.id !== id);
        console.log(`Updated cart:`, updatedCart);
        setCartItems(updatedCart);
        localStorage.setItem('carrito', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('carrito'); // O localStorage.clear() si es el único dato en localStorage
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
    };

    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token); // Decodificar el token JWT para obtener el email
            const email = decodedToken.username;  

            // Transformar los productos del carrito para extraer los precios correctos
            const cartItemsWithPrice = cartItems.map(item => ({
                name: item.name,
                description: item.description,
                transaction_amount: parseFloat(item.price.replace('$', '')),  // Eliminar el símbolo '$' y convertir a número
                quantity: 1,  
                payer: {
                    email: email  
                },
                payment_method_id: 'visa',  // Puedes permitir que el usuario elija, aquí lo estamos fijando como 'visa' para el ejemplo
            }));
            console.log(cartItemsWithPrice);

            //const response = await fetch('http://localhost:3000/checkout', {
            const response = await fetch('https://49b6-201-178-211-155.ngrok-free.app/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' // Agrega el token en el encabezado
                },
                body: JSON.stringify(cartItemsWithPrice), // Envía el carrito como JSON
            });

            if (response.ok) {
                const message = await response.text();
                alert(message); // Mensaje de éxito
                clearCart(); // Vaciar el carrito después de la compra
            } else {
                const errorMessage = await response.text();
                alert(`Error al procesar la compra: ${errorMessage}`); // Mensaje de error detallado                
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la compra');
        }
    };

    return (
        <div className='ShoppingCart-container'>
            <h2>Carrito de Compras</h2>

            {cartItems.length === 0 ? (
                <p>Tu carrito esta vacio!</p>
            ) : (
                <div className='ShoppingCart'>
                    <div className='ShoppingCart-items'>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <img src={item.image} alt={item.name} width="100" />
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className="item-details">
                                        <p>Precio: {item.price}</p>
                                        <button onClick={() => removeFromCart(item.id)}>Elminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='ShoppingCart-btns'>
                        <h3>Total: ${getTotalPrice()}</h3>
                        <button onClick={clearCart}>Borrar Carrito</button>
                        <button onClick={handlePurchase}>Comprar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
