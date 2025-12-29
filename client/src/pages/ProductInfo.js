// src/pages/ProductInfo.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ProductInfo.css";
import API from "../api"; // Make sure api.js exists

export default function ProductInfo() {
  const [product, setProduct] = useState(null);
  const location = useLocation();

  // Extract product ID from query params
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const res = await API.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="page product-info-page">
      <h1>{product.name}</h1>
      <img
        src={product.image || ""}
        alt={product.name}
        className="product-image"
      />
      <p>{product.description}</p>
      <p>Price: €{product.price}</p>
      <p>Stock: {product.stock || "N/A"}</p>
      <p>Status: {product.status || "Available"}</p>
    </div>
  );
}
