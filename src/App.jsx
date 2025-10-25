// ✅ App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// import { CartProvider } from "./component/context/CartContext.jsx";
import { CartProvider } from "./component/context/CartContext.jsx";
import Header from "./component/header";
import Home from "./component/pages/Home";
import Cart from "./component/pages/cart";
import Checkout from "./component/pages/checkout";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </CartProvider>
  );
};

export default App;
