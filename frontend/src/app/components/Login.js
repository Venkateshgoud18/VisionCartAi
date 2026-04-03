import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState(""); // ✅ use email (matches backend)
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,      // ✅ send email
          password,   // ✅ send plain password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ Save JWT token and username
      localStorage.setItem("token", data.token);
      if (data.user && data.user.email) {
        localStorage.setItem("username", data.user.email.split('@')[0]);
      } else {
        localStorage.setItem("username", "User");
      }

      alert("Login successful!");

      // ✅ Dashboard auth update
      if (onLoginSuccess) onLoginSuccess();

      // ✅ Redirect (if using router)
      router.push("/");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-white mb-4">Log In</h2>

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
          Log In
        </button>

        {/* ✅ Switch to Signup */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <span
            onClick={switchToSignup}
            className="text-blue-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;