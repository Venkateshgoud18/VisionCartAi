"use client";

import Signup from "../components/Signup";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <Signup 
      switchToLogin={() => router.push("/login")} 
    />
  );
}
