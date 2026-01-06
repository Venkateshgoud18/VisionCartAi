"use client";

import { useEffect, useState } from "react";

export default function DashBoard() {
  const [stats, setStats] = useState({
    products: 0,
    cartItems: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/dashboard", {
          credentials: "include", // for JWT cookies
        });
        const data = await res.json();

        setStats({
          products: data.products || 0,
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
      <div className="p-6 text-gray-500">Loading dashboard...</div>
    );
  }

  return (
    <main className="p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
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
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          AI Suggestions 🤖
        </h2>
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-gray-600">
            Based on your activity, we recommend checking out
            <strong> Smart Watches</strong> and
            <strong> Wireless Earbuds</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
