// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../ProductCard";
import Loader from "./loader";
import { CartContext } from "../context.jsx/cartcontext";
import { ToggleContext } from "../context.jsx/ToogleBtn";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { isDark } = useContext(ToggleContext);

  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceFilter, setPriceFilter] = useState(1000);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setVisible(data);
        const maxP = Math.ceil(Math.max(...data.map(p => p.price)));
        setMaxPrice(maxP);
        setPriceFilter(maxP);

        const catsRes = await fetch("https://fakestoreapi.com/products/categories");
        const cats = await catsRes.json();
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(p => p.price <= priceFilter);
    if (selectedCat !== "all") filtered = filtered.filter(p => p.category === selectedCat);
    if (search.trim()) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    setVisible(filtered);
  }, [products, priceFilter, selectedCat, search]);

  const handleAdd = (product) => addToCart(product);

  // user search kar raha hai to pehla matching product lo
  const matchedProduct = search.trim()
    ? products.find(p => p.title.toLowerCase().includes(search.toLowerCase()))
    : null;

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: "90px" }}
    >
      {/* ✅ Dynamic Banner */}
      <motion.div
        className={`card banner-card mb-4 overflow-hidden ${
          isDark ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        style={{
          position: "relative",
          height: "230px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        whileHover={{ y: -5 }}
      >
        {matchedProduct ? (
          <>
            <motion.img
              src={matchedProduct.image}
              alt={matchedProduct.title}
              className="banner-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(2px)",
              }}
            />
            <div
              className="position-relative text-center"
              style={{
                zIndex: 2,
                backdropFilter: "blur(2px)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h2 className="fw-bold">{matchedProduct.title}</h2>
              <img
                src={matchedProduct.image}
                alt="product"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  marginTop: "10px",
                  background: isDark ? "#222" : "#fff",
                  padding: "8px",
                }}
              />
            </div>
          </>
        ) : (
          <div className="card-body text-center position-relative">
            <h2 className="fw-bold">Welcome to ShopSphere</h2>
            <p>Find the best products and enjoy shopping!</p>
          </div>
        )}
      </motion.div>

      {/* Filters */}
      <div className="d-flex flex-column flex-sm-row align-items-start gap-3 mb-4">
        <div className="flex-grow-1">
          <h3 className="mb-2">Products</h3>
          <p className="text-muted mb-2">Browse items and add to cart.</p>
        </div>
        <div className="d-flex gap-2 w-100 align-items-center">
          <motion.input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.select
            className="form-select"
            style={{ width: 160 }}
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </motion.select>
        </div>
      </div>

      {/* Price Filter */}
      <motion.div
        className="card mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="card-body d-flex flex-column flex-md-row align-items-center gap-3">
          <div>
            <small className="text-muted">Max Price: ${priceFilter}</small>
            <div>
              <input
                type="range"
                min="1"
                max={maxPrice}
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="form-range"
              />
            </div>
          </div>
          <div className="ms-auto">
            <small className="text-muted">Showing {visible.length} items</small>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Loader />
        </div>
      ) : (
        <motion.div className="products-grid" variants={containerVariants} initial="hidden" animate="visible">
          <AnimatePresence>
            {visible.map(product => (
              <motion.div key={product.id} variants={cardVariants} whileHover={{ y: -5 }}>
                <ProductCard product={product} onAdd={handleAdd} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;
