// ✅ App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// import { CartProvider } from "./component/context/CartContext.jsx";
import { CartProvider } from "./component/context/CartContext.jsx";
import Header from "./component/Header.jsx";
import Home from "./component/pages/Home.jsx";
import Cart from "./component/pages/Cart.jsx";
import Checkout from "./component/pages/Checkout.jsx";

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
