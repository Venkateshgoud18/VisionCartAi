"use client";

import { useEffect, useState } from "react";
import Checkout from "./Checkout";
import Location from "./Location";

const INBUILT_PRODUCTS = [
  { id: 1, name: "Smart Watch", price: 2999, category: "Electronics" },
  { id: 2, name: "Wireless Earbuds", price: 1999, category: "Audio" },
  { id: 3, name: "Bluetooth Speaker", price: 2499, category: "Audio" },
  { id: 4, name: "Gaming Mouse", price: 1499, category: "Accessories" },

  // 🔥 New products
  { id: 5, name: "Mechanical Keyboard", price: 3499, category: "Accessories" },
  { id: 6, name: "USB-C Fast Charger", price: 999, category: "Electronics" },
  { id: 7, name: "Noise Cancelling Headphones", price: 5499, category: "Audio" },
  { id: 8, name: "Laptop Stand", price: 1299, category: "Accessories" },
  { id: 9, name: "Webcam HD 1080p", price: 2199, category: "Electronics" },
  { id: 10, name: "Portable Power Bank", price: 1799, category: "Electronics" },
  { id:11,name:"Smartphone Gimbal",price:3999,category:"Electronics"},
  { id:12,name:"4K Action Camera",price:4999,category:"Electronics" },
  { id:13,name:"Wireless Charging Pad",price:1499,category:"Electronics" },
  { id:14,name:"Fitness Tracker",price:2599,category:"Electronics" },
  { id:15,name:"VR Headset",price:7999,category:"Electronics" },
  { id:16,name:"Smart Home Hub",price:3499,category:"Electronics" },
  { id:17,name:"Digital Photo Frame",price:2299,category:"Electronics" },
  { id:18,name:"E-Reader",price:6999,category:"Electronics" },
  { id:19,name:"Wireless Gaming Headset",price:5999,category:"Audio" },
  { id:20,name:"Action Camera Accessories Kit",price:1299,category:"Accessories" }
];
function PolicyAgreement() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mt-10 rounded-xl bg-white text-black p-4 shadow">
      <p className="text-sm text-gray-700">
        By using <strong>Vision Cart AI</strong>, you agree to our{" "}
        <span className="font-semibold underline cursor-pointer">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="font-semibold underline cursor-pointer">
          Privacy Policy
        </span>.
      </p>

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="h-4 w-4"
        />
        I agree to the Terms & Conditions
      </label>

      {!agreed && (
        <p className="mt-2 text-xs text-red-500">
          You must agree before proceeding with payments.
        </p>
      )}
    </div>
  );
}
function PromoBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
        alt="Promotional Banner"
        className="h-48 w-full object-cover sm:h-64"
      />

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="px-6">
          <h2 className="text-2xl font-bold text-white">
            Upgrade Your Tech 🔥
          </h2>
          <p className="mt-1 text-sm text-gray-200">
            Best deals on gadgets & accessories
          </p>
        </div>
      </div>
    </div>
  );
}



function MovingAdBanner() {
  return (
    <>
      <style jsx>{`
        .ad-wrapper {
          overflow: hidden;
          background: linear-gradient(
            90deg,
            #7c3aed,
            #ec4899,
            #ef4444
          );
          border-radius: 14px;
          padding: 12px 0;
        }

        .ad-text {
          display: inline-block;
          white-space: nowrap;
          padding-left: 100%;
          font-weight: 600;
          color: white;
          animation: scroll 16s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

      <div className="ad-wrapper">
        <div className="ad-text">
          🔥 Mega Sale! Up to 40% OFF on Smart Watches •
          🎧 ₹500 OFF on Headphones •
          ⚡ Secure Stripe Payments •
          🛒 Vision Cart AI — Shop Smarter 🚀
        </div>
      </div>
    </>
  );
}

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
      <MovingAdBanner />
      <PromoBanner />
      <Location />
      {/* Header */}
      <header>
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
      <PolicyAgreement />
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


