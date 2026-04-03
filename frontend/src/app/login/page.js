"use client";

import Login from "../components/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <Login 
      onLoginSuccess={() => router.push("/")} 
      switchToSignup={() => router.push("/signup")} 
    />
  );
}
