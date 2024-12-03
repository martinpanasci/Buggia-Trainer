import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Crear un hook para consumir el contexto
export const useCart = () => useContext(CartContext);

// Crear el proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar el carrito desde localStorage al inicio
    const storedCart = localStorage.getItem('carrito');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sincronizar el carrito con localStorage cuando se actualiza
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar productos al carrito
  const addToCart = (item) => {
    setCartItems((prev) => {
      // Validar si el producto ya existe en el carrito
      const isProductInCart = prev.some((cartItem) => cartItem.id === item.id);  
      if (isProductInCart) {
        alert('Este producto ya está en tu carrito.');
        return prev; // Si ya existe, no hacemos cambios
      }        
      return [...prev, item]; // Agregar el nuevo producto
    });
  };



  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
