// src/pages/Cart.jsx
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context.jsx/cartcontext";
import CartItem from "../cartItem";
import { Link } from "react-router-dom";
import { ToggleContext } from "../context.jsx/ToogleBtn";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, changeQty, totalItems, totalPrice } = useContext(CartContext);
  const { isDark } = useContext(ToggleContext);

  useEffect(() => {}, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
  };

  const qtyVariants = {
    scale: [1, 1.2, 1],
    transition: { type: "spring", stiffness: 500, damping: 10 }
  };

  return (
    <motion.div
      className={`container ${isDark ? "text-white" : "text-dark"}`}
      style={{
        marginTop: "90px",
        minHeight: "80vh",
        backgroundColor: "transparent", // 🔹 black background removed
        transition: "all 0.3s ease",
      }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cart.length === 0 ? (
        <motion.div
          className={`card p-4 text-center ${isDark ? "bg-dark text-white border-light" : "bg-white text-dark border"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 0.5)",
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-2">Your cart is empty.</p>
          <Link className={`btn ${isDark ? "btn-light" : "btn-primary"} btn-sm`} to="/">
            Go shopping
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Clear All Button */}
          <div className="mb-3 d-flex justify-content-end">
            <button
              className={`btn btn-sm ${isDark ? "btn-light text-dark" : "btn-danger text-white"}`}
              onClick={() => cart.forEach(item => removeFromCart(item.id))}
            >
              Clear All
            </button>
          </div>

          <div className="row g-3">
            {/* Cart Items */}
            <div className="col-lg-8">
              <motion.div
                className="d-flex flex-column gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit="exit"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)",
                        borderColor: "rgba(0, 123, 255, 0.5)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CartItem
                        item={item}
                        onRemove={removeFromCart}
                        onChangeQty={(id, qty) => {
                          if (qty < 1) removeFromCart(id);
                          else changeQty(id, qty);
                        }}
                        isDark={isDark}
                        qtyAnimation={qtyVariants}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Summary Card */}
            <div className="col-lg-4">
              <motion.div
                className={`card p-3 ${isDark ? "bg-dark text-white border-light" : "bg-white text-dark border"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0, 123, 255, 0.6)",
                  borderColor: "rgba(0, 123, 255, 0.6)",
                }}
                transition={{ duration: 0.3 }}
              >
                <h6>Summary</h6>
                <div className="d-flex justify-content-between">
                  <small>Items:</small>
                  <small>{totalItems}</small>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                >
                  <Link className={`btn ${isDark ? "btn-light" : "btn-success"} w-100`} to="/checkout">
                    Proceed to Checkout
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
