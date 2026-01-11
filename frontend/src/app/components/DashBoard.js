"use client";

import { useEffect, useState } from "react";
import Checkout from "./Checkout";

const INBUILT_PRODUCTS = [
  { id: 1, name: "Smart Watch", price: 2999, category: "Electronics" },
  { id: 2, name: "Wireless Earbuds", price: 1999, category: "Audio" },
  { id: 3, name: "Bluetooth Speaker", price: 2499, category: "Audio" },
  { id: 4, name: "Gaming Mouse", price: 1499, category: "Accessories" },
];

export default function DashBoard() {
  const [stats, setStats] = useState({
    products: 0,
    cartItems: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/dashboard", {
          credentials: "include",
        });
        const data = await res.json();

        setStats({
          products: data.products || INBUILT_PRODUCTS.length,
          cartItems: data.cartItems || 0,
          orders: data.orders || 0,
        });
      } catch (error) {
        console.error("Dashboard fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="p-6 space-y-10 text-white">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back to Vision Cart AI
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Cart Items" value={stats.cartItems} />
        <StatCard title="Orders" value={stats.orders} />
      </section>

      {/* AI Suggestions */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          AI Suggestions 🤖
        </h2>
        <div className="rounded-xl bg-white text-black p-4 shadow">
          <p className="text-gray-700">
            Based on your activity, we recommend checking out
            <strong> Smart Watches</strong> and
            <strong> Wireless Earbuds</strong>.
          </p>
        </div>
      </section>

      {/* Products */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          Featured Products 🛒
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INBUILT_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-white text-black p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-md font-semibold">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {product.category}
              </p>
              <p className="mt-2 text-lg font-bold text-green-600">
                ₹{product.price}
              </p>

              <button
                onClick={() => setSelectedProduct(product)}
                className="mt-3 w-full rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
              >
                Pay ₹{product.price}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Section */}
      {selectedProduct && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">
            Complete Payment 💳
          </h2>

          <div className="max-w-md rounded-xl bg-white text-black p-6 shadow">
            <div className="mb-4">
              <h3 className="font-semibold">
                {selectedProduct.name}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedProduct.category}
              </p>
              <p className="mt-1 text-lg font-bold text-green-600">
                ₹{selectedProduct.price}
              </p>
            </div>

            <Checkout amount={selectedProduct.price} />

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 w-full text-sm text-gray-600 hover:underline"
            >
              Cancel Payment
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white text-black p-4 shadow">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>
      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}
