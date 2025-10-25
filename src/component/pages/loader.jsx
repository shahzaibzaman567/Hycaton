// src/components/Loader.jsx
import React from "react";

const Loader = ({ size = 3 }) => {
  // size determines number of dots (default 3)
  return (
    <div className="loader">
      {Array.from({ length: size }).map((_, i) => <span key={i}></span>)}
    </div>
  );
};

export default Loader;
