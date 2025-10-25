// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context.jsx/cartcontext";
import { ToggleContext } from "../context.jsx/ToogleBtn";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Checkout.css"; // CSS file for placeholder styles

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { isDark } = useContext(ToggleContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill name and email.");
      return;
    }
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  // Motion Variants
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
  const listItemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };
  const hoverShadow = isDark ? "shadow-lg border border-light" : "shadow-sm border border-secondary";

  return (
    <motion.div
      className={`container ${isDark ? "text-white" : "text-dark"}`}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mb-3">Checkout</h3>
      <div className="row">
        {/* Shipping Details */}
        <motion.div className="col-lg-6 mb-3" variants={cardVariants} initial="hidden" animate="visible">
          <motion.div
            className={`card p-3 ${isDark ? "bg-dark text-white border-light" : "bg-white"} ${hoverShadow}`}
            whileHover={{ scale: 1.02 }}
          >
            <h6>Shipping Details</h6>
            <form className={isDark ? "dark-mode" : ""} onSubmit={handleSubmit}>
              {["name", "email", "address", "city", "zip"].map((field, index) => (
                <div className={`mb-2 ${field === "city" || field === "zip" ? "row g-2" : ""}`} key={index}>
                  {field === "city" || field === "zip" ? (
                    <>
                      <div className="col-6">
                        <input
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className={`form-control ${isDark ? "bg-dark text-white border-light" : ""}`}
                          placeholder="City"
                        />
                      </div>
                      <div className="col-6">
                        <input
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          className={`form-control ${isDark ? "bg-dark text-white border-light" : ""}`}
                          placeholder="ZIP"
                        />
                      </div>
                    </>
                  ) : (
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className={`form-control ${isDark ? "bg-dark text-white border-light" : ""}`}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      required={field === "name" || field === "email"}
                    />
                  )}
                </div>
              ))}
              <div className="mt-3">
                <button className="btn btn-primary w-100" type="submit">
                  Place Order
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Order Summary */}
        <motion.div className="col-lg-6" variants={cardVariants} initial="hidden" animate="visible">
          <motion.div
            className={`card p-3 ${isDark ? "bg-dark text-white border-light" : "bg-white"} ${hoverShadow}`}
            whileHover={{ scale: 1.02 }}
          >
            <h6>Order Summary</h6>
            {cart.length === 0 ? (
              <p className="text-muted">No items in cart.</p>
            ) : (
              <ul className="list-group mb-3">
                <AnimatePresence>
                  {cart.map(item => (
                    <motion.li
                      key={item.id}
                      className={`list-group-item d-flex justify-content-between align-items-center ${isDark ? "bg-dark text-white border-light" : ""} ${hoverShadow}`}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div style={{ maxWidth: 220 }}>
                        <div style={{ fontSize: 14 }}>{item.title}</div>
                        <small className="text-muted">{item.qty} x ${item.price.toFixed(2)}</small>
                      </div>
                      <div className="fw-bold">${(item.price * item.qty).toFixed(2)}</div>
                    </motion.li>
                  ))}
                </AnimatePresence>
                <div className="d-flex justify-content-between mt-2">
                  <div>Total</div>
                  <div className="fw-bold">${totalPrice.toFixed(2)}</div>
                </div>
              </ul>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Checkout;
