"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Location from "./Location";

const INBUILT_PRODUCTS = [
  { id: 1, name: "Smart Watch", price: 2999, category: "Electronics" },
  { id: 2, name: "Wireless Earbuds", price: 1999, category: "Audio" },
  { id: 3, name: "Bluetooth Speaker", price: 2499, category: "Audio" },
  { id: 4, name: "Gaming Mouse", price: 1499, category: "Accessories" },
  { id: 5, name: "Mechanical Keyboard", price: 3499, category: "Accessories" },
  { id: 6, name: "USB-C Fast Charger", price: 999, category: "Electronics" },
  { id: 7, name: "Noise Cancelling Headphones", price: 5499, category: "Audio" },
  { id: 8, name: "Laptop Stand", price: 1299, category: "Accessories" },
  { id: 9, name: "Webcam HD 1080p", price: 2199, category: "Electronics" },
  { id: 10, name: "Portable Power Bank", price: 1799, category: "Electronics" },
  { id: 11, name:"Smartphone Gimbal", price: 3999, category: "Electronics" },
  { id: 12, name:"4K Action Camera", price: 4999, category: "Electronics" },
  { id: 13, name:"Wireless Charging Pad", price: 1499, category: "Electronics" },
  { id: 14, name:"Fitness Tracker", price: 2599, category: "Electronics" },
  { id: 15, name:"VR Headset", price: 7999, category: "Electronics" },
  { id: 16, name:"Smart Home Hub", price: 3499, category: "Electronics" },
  { id: 17, name:"Digital Photo Frame", price: 2299, category: "Electronics" },
  { id: 18, name:"E-Reader", price: 6999, category: "Electronics" },
  { id: 19, name:"Wireless Gaming Headset", price: 5999, category: "Audio" },
  { id: 20, name:"Action Camera Accessories Kit", price: 1299, category: "Accessories" },
];

function PolicyAgreement() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white p-6 shadow-2xl transition hover:bg-white/10">
      <p className="text-sm text-gray-300">
        By using <strong className="text-white">Vision Cart AI</strong>, you agree to our{" "}
        <span className="font-semibold text-cyan-400 hover:text-cyan-300 underline cursor-pointer transition">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="font-semibold text-cyan-400 hover:text-cyan-300 underline cursor-pointer transition">
          Privacy Policy
        </span>.
      </p>

      <label className="mt-4 flex items-center gap-3 text-sm cursor-pointer group">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
        />
        <span className="group-hover:text-white transition">I agree to the Terms & Conditions</span>
      </label>

      {!agreed && (
        <p className="mt-3 text-xs text-rose-400 font-medium">
          * You must agree before proceeding with payments.
        </p>
      )}
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl group cursor-pointer mb-6 transform transition duration-500 hover:scale-[1.01]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop"
        alt="Promotional Banner"
        className="h-56 w-full object-cover sm:h-72 transition duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
        <div className="px-8 sm:px-12 max-w-lg">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-900/30 rounded-full border border-cyan-500/20 backdrop-blur-md">
            New Arrival
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Lifestyle</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 font-medium">
            Discover cutting-edge tech expertly curated for you.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
}

function MovingAdBanner() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 py-3 mb-6 shadow-xl relative backdrop-blur-md border border-white/10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="whitespace-nowrap text-white font-semibold tracking-wide animate-marquee px-4 drop-shadow-md">
        🚀 <span className="font-bold text-yellow-300">Mega Sale!</span> Up to 40% OFF on Smart Watches &nbsp;•&nbsp; 
        🎧 ₹500 OFF on Premium Headphones &nbsp;•&nbsp; 
        ⚡ Secure AI-Powered Checkouts &nbsp;•&nbsp; 
        🛒 Experience Vision Cart AI — Shop Smarter, Live Better!
      </div>
    </div>
  );
}

export default function DashBoard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    cartItems: 0,
    orders: 12,
  });

  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("User");
  const [showSignup, setShowSignup] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("Based on your recent browsing activity and our predictive analytics, we highly recommend checking out the new line of Smart Watches and Wireless Earbuds.");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsAuthenticated(true);
      if (storedUsername) setUsername(storedUsername);
      fetchCart();
    }
    fetchProducts();

    // Listen for AI-added products from Chat box
    const handleProductAdded = () => fetchProducts();
    window.addEventListener("product-added", handleProductAdded);
    return () => window.removeEventListener("product-added", handleProductAdded);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setStats(prev => ({ ...prev, products: data.products.length }));
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      // Fallback only if no products are found at all
      if (products.length === 0) setProducts(INBUILT_PRODUCTS);
    }
  };

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5050/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCart(data.cart.items);
        setStats(prev => ({ ...prev, cartItems: data.cart.items.length }));
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setIsAddingToCart(true);
    try {
      const res = await fetch("http://localhost:5050/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id, // Using the local ID for initial lookup
          name: product.name,
          price: product.price,
          category: product.category,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCart(data.cart.items);
        setStats(prev => ({ ...prev, cartItems: data.cart.items.length }));
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5050/api/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCart(data.cart.items);
        setStats(prev => ({ ...prev, cartItems: data.cart.items.length }));
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5050/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCart([]);
        setStats(prev => ({ ...prev, cartItems: 0 }));
      }
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-cyan-400 font-medium tracking-widest animate-pulse">VISION CART AI</p>
        </div>
      </div>
    );
  }

  const router = useRouter();


  return (
    <main className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 border-zinc-800 to-black p-6 sm:p-10 font-sans text-gray-100 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Moving Ad */}
        <MovingAdBanner />

        {/* Top Header / Navbar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-400 font-medium">
              Welcome to <span className="text-cyan-400">Vision Cart AI</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
             {isAuthenticated && (
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-400 hover:text-cyan-400 transition group"
                >
                  <span className="text-2xl">🛒</span>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 bg-cyan-500 text-black text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                      {cart.length}
                    </span>
                  )}
                </button>
             )}
             {!isAuthenticated ? (
               <>
                 <button 
                   onClick={() => router.push('/login')}
                   className="text-sm font-bold text-gray-300 hover:text-cyan-400 transition"
                 >
                   Log In
                 </button>
                 <button 
                   onClick={() => router.push('/signup')}
                   className="text-sm rounded-full bg-cyan-600 px-5 py-2 font-black text-black hover:bg-cyan-500 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                 >
                   Sign Up
                 </button>
               </>
             ) : (
               <>
                 <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px]">
                   <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center text-sm font-bold uppercase">
                     {username.substring(0, 2)}
                   </div>
                 </div>
                 <div className="flex flex-col">
                   <span className="font-semibold text-sm text-gray-300 capitalize">{username}</span>
                   <button 
                     onClick={() => { 
                       localStorage.removeItem("token"); 
                       localStorage.removeItem("username");
                       setIsAuthenticated(false); 
                       setCart([]);
                     }}
                     className="text-xs text-rose-500 hover:text-rose-400 text-left"
                   >
                     Logout
                   </button>
                 </div>
               </>
             )}
          </div>
        </header>

        {/* Global Components */}
        <Location />

        {/* Promo Banner */}
        <div className="space-y-6">
          <PromoBanner />
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard title="Total Products" value={stats.products} icon="📦" gradient="from-emerald-500 to-teal-400" />
          <StatCard title="Cart Items" value={stats.cartItems} icon="🛒" gradient="from-blue-500 to-cyan-400" />
          <StatCard title="Orders Placed" value={stats.orders} icon="🛍️" gradient="from-purple-500 to-pink-500" />
        </section>

        {/* AI Suggestions */}
        <section id="ai-suggestions">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                🤖
              </div>
              <h2 className="text-2xl font-bold tracking-tight">AI Suggestions</h2>
            </div>
            
            <button 
              onClick={() => setIsScannerOpen(true)}
              className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 rounded-xl text-sm font-bold flex items-center gap-2 transition group"
            >
              <span className="group-hover:rotate-12 transition">📸</span> AI Lens Scan
            </button>
          </div>
          
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl text-gray-300 p-6 shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
            <p className="text-base leading-relaxed relative z-10">
              {aiSuggestions}
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30">
                🔥
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Our Collection</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 p-5 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 flex flex-col"
              >
                {/* Visual Placeholder for Product */}
                <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 mb-4 flex items-center justify-center group-hover:from-zinc-700 group-hover:to-zinc-800 transition overflow-hidden relative">
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                   <span className="text-4xl opacity-50 filter drop-shadow-md transition duration-300 group-hover:scale-110">
                     {product.category === 'Electronics' ? '🔋' : product.category === 'Audio' ? '🎧' : '🖱️'}
                   </span>
                </div>


                <div className="flex-1">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-md font-bold text-gray-100 group-hover:text-white transition">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xl font-black text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isAddingToCart}
                    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-xs font-bold text-gray-300 hover:bg-zinc-700 hover:text-white transition-all"
                  >
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                  </button>
                  <button 
                    onClick={async () => {
                        try {
                            const res = await fetch("http://localhost:5050/api/payment/create-checkout-session", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ amount: product.price, productName: product.name }),
                            });
                            const data = await res.json();
                            if (data.url) {
                                window.location.href = data.url;
                            } else {
                                alert("Failed to initialize session.");
                            }
                        } catch (err) {
                            console.error("Single buy redirect error:", err);
                        }
                    }}
                    className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 text-xs font-black text-black hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                  <span className="text-cyan-400">Your</span> Cart
                </h2>
                <div className="flex items-center gap-4">
                  {cart.length > 0 && (
                    <button 
                      onClick={clearCart}
                      className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-rose-500 transition"
                    >
                      Clear All
                    </button>
                  )}
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-40">
                    <span className="text-6xl mb-4">🛒</span>
                    <p className="text-lg font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  cart.filter(item => item && item.productId).map((item) => (
                    <div 
                      key={item._id} 
                      className="group flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition"
                    >
                      <div className="h-16 w-16 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl shadow-inner border border-white/5">
                         {item.productId.category === 'Electronics' ? '🔋' : item.productId.category === 'Audio' ? '🎧' : '🖱️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{item.productId.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-cyan-400 text-sm font-black">₹{item.productId.price.toLocaleString("en-IN")}</p>
                          <span className="text-[10px] text-gray-500 font-bold px-1.5 py-0.5 bg-white/5 rounded-md border border-white/5">x{item.quantity}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId._id)}
                        className="p-2.5 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-medium">Order Total</span>
                    <span className="text-3xl font-black text-white">
                      ₹{cart.reduce((total, item) => total + ((item.productId?.price || 0) * item.quantity), 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  
                  <button 
                    onClick={async () => {
                        try {
                            const totalAmount = cart.reduce((total, item) => total + ((item.productId?.price || 0) * item.quantity), 0);
                            const res = await fetch("http://localhost:5050/api/payment/create-checkout-session", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ amount: totalAmount, productName: "Vision Cart AI Order" }),
                            });
                            const data = await res.json();
                            if (data.url) {
                                window.location.href = data.url;
                            } else {
                                alert("Failed to initialize session. Please check your Stripe config.");
                            }
                        } catch (err) {
                            console.error("Checkout redirect error:", err);
                        }
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-black text-black text-lg hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vision Scanner Modal */}
        {isScannerOpen && (
          <VisionScannerModal 
            onClose={() => setIsScannerOpen(false)} 
            onScanResult={(result) => {
              setAiSuggestions(`Vision AI identified your scan! Based on the image, we suggest looking for: ${result}. Our catalog results are being optimized based on this insight.`);
              // Smooth scroll to suggestions
              document.getElementById("ai-suggestions")?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </main>
  );
}

function VisionScannerModal({ onClose, onScanResult }) {
  const [stream, setStream] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" },
            audio: false 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        alert("Camera access denied or not available.");
        onClose();
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    
    // Get base64 without prefix
    const base64Image = canvasRef.current.toDataURL("image/jpeg").split(',')[1];

    try {
      const res = await fetch("http://localhost:5050/api/vision/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await res.json();
      if (data.success) {
        onScanResult(data.suggestions);
        onClose();
      }
    } catch (error) {
      console.error("Scan error:", error);
      alert("Failed to analyze image. Mocking result for demo...");
      onScanResult("Smart Watch, Portable Charging Pad, Wireless Tech");
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-6 animate-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">AI</span> Lens Scanner
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/5 group">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />
          
          {/* Scanning Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="w-full h-1 bg-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.8)] absolute top-0 animate-scan"></div>
          </div>
          
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-8 opacity-40 pointer-events-none">
             <div className="border-l-2 border-t-2 border-indigo-500 w-12 h-12"></div>
             <div className="border-r-2 border-t-2 border-indigo-500 w-12 h-12 ml-auto"></div>
             <div className="border-l-2 border-b-2 border-indigo-500 w-12 h-12 mt-auto"></div>
             <div className="border-r-2 border-b-2 border-indigo-500 w-12 h-12 mt-auto ml-auto"></div>
          </div>

          {isProcessing && (
             <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                   <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                   <p className="text-sm font-bold text-white tracking-widest animate-pulse">ANALYZING FRAME...</p>
                </div>
             </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
           <button 
             onClick={onClose}
             className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition"
           >
             Cancel
           </button>
           <button 
             onClick={handleCapture}
             disabled={isProcessing}
             className="flex-[2] px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-black text-lg hover:from-indigo-600 hover:to-violet-700 transition shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
           >
             Snap & Analyze
           </button>
        </div>
        
        <p className="mt-6 text-center text-xs text-gray-500 font-medium tracking-wide">
           Point your camera at any tech gadget to get instant AI recommendations.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, gradient }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-6 shadow-xl border border-white/10 transition duration-300 hover:bg-white/10 hover:scale-[1.02] group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition duration-500 rounded-full -mr-10 -mt-10`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            {title}
          </h3>
          <p className="mt-3 text-4xl font-black text-white tracking-tight">
            {value.toLocaleString()}
          </p>
        </div>
        <div className="text-3xl opacity-80 filter drop-shadow">
          {icon}
        </div>
      </div>
    </div>
  );
}
