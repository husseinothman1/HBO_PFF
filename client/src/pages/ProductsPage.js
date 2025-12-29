// src/pages/ProductsPage.js
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/ProductsPage.css";
import API from "../api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand");

  // Backend URL from env or fallback
  const backendURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/products";
        if (brand) url += `?brand=${brand}`;
        const res = await API.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [brand]);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="page products-page">
      <h1>{brand ? `${brand} Products` : "All Products"}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product-info?id=${product.id}`}>
              <img
                src={product.img ? `${backendURL}/uploads/${product.img}` : ""}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>€{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
