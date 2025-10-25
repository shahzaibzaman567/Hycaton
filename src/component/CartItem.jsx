import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { ToggleContext } from "./context.jsx/ToogleBtn";// ToggleContext import

const CartItem = ({ item, onRemove, onChangeQty }) => {
  const { isDark } = useContext(ToggleContext); // dark/light mode state

  return (
    <div className={`cart-item d-flex align-items-center p-2 mb-2 ${isDark ? "bg-dark text-white border border-light" : "bg-white text-dark border"}`}>
      <img
        src={item.image}
        alt={item.title}
        style={{ width: 70, height: 70, objectFit: "contain" }}
      />
      <div style={{ flex: 1 }} className="ms-2">
        <h6 className="mb-1" style={{ fontSize: 14 }}>{item.title}</h6>
        <div className="d-flex align-items-center gap-2">
          <div className="input-group input-group-sm" style={{ width: 120 }}>
            <button
              className={`btn btn-outline-secondary ${isDark ? "btn-outline-light" : ""}`}
              onClick={() => onChangeQty(item.id, item.qty - 1)}
            >
              -
            </button>
            <input
              type="text"
              className={`form-control text-center ${isDark ? "bg-dark text-white border-light" : ""}`}
              value={item.qty}
              readOnly
            />
            <button
              className={`btn btn-outline-secondary ${isDark ? "btn-outline-light" : ""}`}
              onClick={() => onChangeQty(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>
          <div className="ms-3 fw-bold">${(item.price * item.qty).toFixed(2)}</div>
        </div>
      </div>
      <button
        className={`btn btn-sm btn-outline-danger ${isDark ? "btn-outline-light" : ""}`}
        onClick={() => onRemove(item.id)}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
