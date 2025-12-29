// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/Home.css";

const BRANDS = [
  { id: "apple", name: "Apple", tagline: "iPhone cases, chargers & more" },
  { id: "samsung", name: "Samsung", tagline: "Covers, screen protectors & parts" },
  { id: "xiaomi", name: "Xiaomi", tagline: "Affordable accessories" },
  { id: "others", name: "Other Brands", tagline: "Find parts & accessories" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const backendURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.slice(0, 8)); // show only 8 products
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-4 py-12">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              The Link To Your Next Upgrade
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Shop phone accessories or request on-site maintenance quickly.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>

              <button
                onClick={() => navigate("/maintenance")}
                className="btn-outline"
              >
                Request Maintenance
              </button>
            </div>
          </div>

          {/* BRAND SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Choose your brand
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {BRANDS.map((b) => (
                <Link
                  key={b.id}
                  to={`/products?brand=${b.id}`}
                  className="brand-card flex items-center p-3 border rounded-lg transition"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{b.name}</div>
                    <div className="text-sm text-gray-500">{b.tagline}</div>
                  </div>
                  <div className="ml-3 text-blue-600 font-semibold">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <section className="mt-12">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Popular accessories
          </h4>

          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="product-card-home bg-white p-4 rounded-lg shadow flex flex-col"
                >
                  <div className="h-32 rounded-md mb-2 overflow-hidden">
                    <img
                      src={
                        product.img
                          ? `${backendURL}/uploads/${product.img}`
                          : "/no-image.png"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-2 text-sm font-medium text-gray-800">
                    {product.name}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="text-sm font-semibold">
                      €{product.price}
                    </div>
                    <Link
                      to={`/product-info?id=${product.id}`}
                      className="text-xs px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
