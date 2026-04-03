import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState(""); // ✅ use email (matches backend)
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,      // ✅ send plain email
          password,   // ✅ send plain password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful!");

      // ✅ Switch to login (Dashboard integration)
      if (switchToLogin) switchToLogin();

      // OR if using router:
      router.push("/login");

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-white mb-4">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Sign Up
        </button>

        {/* ✅ Switch to Login */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-400 cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;