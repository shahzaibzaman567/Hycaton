// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const STORAGE_KEY = "mini_store_cart_v1";
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === product.id);
      if (exist) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const changeQty = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, p) => s + p.qty, 0);
  const totalPrice = cart.reduce((s, p) => s + p.qty * p.price, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, changeQty, clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
