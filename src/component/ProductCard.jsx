import React, { useContext } from "react";
import { ToggleContext } from "./context/ToogleBtn";// dark/light context

const ProductCard = ({ product, onAdd }) => {
  const { isDark } = useContext(ToggleContext);

  return (
    <div className={`card h-100 ${isDark ? "bg-dark text-white border-light" : ""}`}>
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top product-img p-3"
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title" style={{ minHeight: "48px" }}>
          {product.title}
        </h6>
        <p className={`mb-2 fw-bold ${isDark ? "text-white" : "text-primary"}`}>
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <button
            className={`btn btn-sm btn-animated ${isDark ? "btn-outline-light" : "btn-outline-primary"}`}
            onClick={() => onAdd(product)}
          >
            Add to Cart
          </button>
          <small className={`text-muted ${isDark ? "text-white-50" : ""}`}>
            {product.category}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
